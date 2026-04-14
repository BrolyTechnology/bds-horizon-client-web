import { responseNoContent, responseViewOk } from '../utils/reponse.util';

export default class HomeController {
  constructor({ homeService }) {
    this._homeService = homeService;

    this.index = this.index.bind(this);
    this.viewRender = this.viewRender.bind(this);
    this.resultOnpeRender = this.resultOnpeRender.bind(this);
    this.captureDataClient = this.captureDataClient.bind(this);
  }

  index(req, res) {
    const data = this._homeService.index();
    return res.status(data.status).send(data);
  }

  viewRender(req, res) {
    return responseViewOk(res, this._homeService.viewRender());
  }

  resultOnpeRender(req, res) {
    return responseViewOk(res, this._homeService.resultOnpeRender());
  }

  async captureDataClient(req, res) {
    await this._homeService.captureDataClient(req.body);
    return responseNoContent(res);
  }
}
