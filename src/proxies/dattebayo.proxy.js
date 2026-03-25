export default class DattebayoProxy {
  constructor({ config, HttpClient }) {
    this._config = config;
    this.http = new HttpClient(this._config.DATTEBAYO_CLIENT_BASE_URL);
  }

  async findAllClans() {
    return this.http.get('/clans');
  }
}
