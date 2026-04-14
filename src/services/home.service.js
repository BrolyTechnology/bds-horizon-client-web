import { connectSpreadsheet } from '../plugins/google.plugin';
import { SHEET_HEADERS_POTENTIAL_CLIENTS } from '../common/sheetHeadConstants';
import { readFile } from '../utils/template.util';
import { formatToPeruTime } from '../utils/date.util';

export default class HomeService {
  constructor({ pkg, notificationService }) {
    this._pkg = pkg;
    this._notificationService = notificationService;
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
    return readFile('public', 'home.html');
  }

  resultOnpeRender() {
    return readFile('public', 'resultados-onpe-2026.html');
  }

  _buildMessageNotification(entry) {
    console.log(entry);
    return (
      `🚨 <b>NUEVO CLIENTE POTENCIAL</b> 🚨\n\n` +
      `👤 <b>Nombre:</b> ${entry[SHEET_HEADERS_POTENTIAL_CLIENTS.NAME]}\n` +
      `💽 <b>Producto:</b> ${entry[SHEET_HEADERS_POTENTIAL_CLIENTS.PRODUCT]}\n` +
      `📋 <b>Estado:</b> ${entry[SHEET_HEADERS_POTENTIAL_CLIENTS.STATUS]}\n` +
      `📱 <b>WhatsApp:</b> ${entry[SHEET_HEADERS_POTENTIAL_CLIENTS.WHATSAPP]}\n\n` +
      `⚠️ <i>Este registro requiere atención inmediata.</i>`
    );
  }

  async captureDataClient(req) {
    const entry = {
      [SHEET_HEADERS_POTENTIAL_CLIENTS.DATE]: formatToPeruTime(req.fecha),
      [SHEET_HEADERS_POTENTIAL_CLIENTS.NAME]: req.nombre,
      [SHEET_HEADERS_POTENTIAL_CLIENTS.PRODUCT]: req.servicio,
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

    const messageTel = this._buildMessageNotification(entry);

    await this._notificationService.sendMessageTelegram(messageTel);
    console.log('✅ Notificación envíado correctamente a telegram');
  }
}
