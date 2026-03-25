import { GoogleSpreadsheet } from 'google-spreadsheet';
import { JWT } from 'google-auth-library';
import config from '../container/config';

export async function connectSpreadsheet() {
  const serviceAccountAuth = new JWT({
    email: config.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    key: config.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY.replace(new RegExp('\\\\n', 'g'), '\n'),
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });

  return new GoogleSpreadsheet(config.GOOGLE_SPREADSHEET_ID, serviceAccountAuth);
}
