import { connectSpreadsheet } from '../plugins/google.plugin';
import { SHEET_HEADERS_POTENTIAL_CLIENTS } from '../common/sheetHeadConstants';
import { readFile } from '../utils/template.util';
import { formatToPeruTime } from '../utils/date.util';
import AppError from '../utils/appError.util';

export default class HomeService {
  constructor({ pkg }) {
    this._pkg = pkg;
    this.clientCaputeSheet = 'client_capture';
  }

  index() {
    return {
      status: 200,
      message: `Welcome to application ${this._pkg.name.split('-').join(' ')}.`,
      version: `${this._pkg.version}`,
    };
  }

  viewRender() {
    return readFile('home.html');
  }

  async captureDataClient(req) {
    const entry = {
      [SHEET_HEADERS_POTENTIAL_CLIENTS.DATE]: formatToPeruTime(req.fecha),
      [SHEET_HEADERS_POTENTIAL_CLIENTS.NAME]: req.nombre,
      [SHEET_HEADERS_POTENTIAL_CLIENTS.STATUS]: 'PENDIENTE',
      [SHEET_HEADERS_POTENTIAL_CLIENTS.WHATSAPP]: req.whatsapp,
      [SHEET_HEADERS_POTENTIAL_CLIENTS.MESSAGE]: req.mensaje,
    };

    const doc = await connectSpreadsheet();
    await doc.loadInfo();
    console.log('Conectado a:', doc.title);

    let sheet = doc.sheetsByTitle[this.clientCaputeSheet];
    const sheetHeaders = Object.values(SHEET_HEADERS_POTENTIAL_CLIENTS);

    if (!sheet) {
      console.log('La hoja no existe, creándola...');
      sheet = await doc.addSheet({ title: this.clientCaputeSheet, headerValues: sheetHeaders });
    } else {
      await sheet.loadHeaderRow().catch(async () => {
        console.log('La hoja existe pero no tiene encabezados. Configurando...');
        await sheet.setHeaderRow(sheetHeaders);
      });
    }

    await sheet.addRow(entry);
    console.log('✅ Datos guardados correctamente en Google Sheets');
  }
}
