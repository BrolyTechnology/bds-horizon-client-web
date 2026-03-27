import TelegramBot from 'node-telegram-bot-api';
import config from '../container/config';
import AppError from '../utils/appError.util';

let botInstance = null;

export function connectBot() {
  if (!botInstance) {
    if (!config.TELEGRAM_BOT_TOKEN) {
      throw new AppError(400, 'ERROR_TELEGRAM_NOTIFICATION', 'TELEGRAM_BOT_TOKEN is not defined in environment variables');
    }

    botInstance = new TelegramBot(config.TELEGRAM_BOT_TOKEN, { polling: false });
  }
  return botInstance;
}
