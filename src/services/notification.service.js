import { connectBot } from '../plugins/telegram.plugin';
import AppError from '../utils/appError.util';

export default class NotificationService {
  constructor({ config }) {
    this._config = config;
  }

  async sendMessageTelegram(text, options = {}) {
    const chatId = this._config.TELEGRAM_BOT_CHAT_ID;

    if (!chatId) {
      throw new AppError(400, 'ERROR_TELEGRAM_NOTIFICATION', 'TELEGRAM_BOT_CHAT_ID is not defined in environment variables');
    }

    const bot = connectBot();
    const result = await bot.sendMessage(chatId, text, { parse_mode: 'HTML', ...options });

    return result;
  }
}
