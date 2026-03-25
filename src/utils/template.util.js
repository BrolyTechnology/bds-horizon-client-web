import { readFileSync } from 'fs';
import path from 'path';

export function readFile(filename) {
  const route = path.join(process.cwd(), 'assets', 'templates', filename);
  return readFileSync(route, 'utf-8');
}

export function replaceAttibutes(html, values = {}) {
  // The HTML template must have this format {{key}}
  return Object.entries(values).reduce((acc, [key, value]) => {
    const regex = new RegExp(`\\{\\{\\s*${key}\\s*\\}\\}`, 'g');
    return acc.replace(regex, String(value));
  }, html);
}
