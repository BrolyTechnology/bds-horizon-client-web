import { responseViewOk } from '../utils/reponse.util';

export default class HomeController {
  constructor({ homeService }) {
    this._homeService = homeService;

    this.index = this.index.bind(this);
    this.viewRender = this.viewRender.bind(this);
  }

  index(req, res) {
    const data = this._homeService.index();
    return res.status(data.status).send(data);
  }

  viewRender(req, res) {
    return responseViewOk(res, this._homeService.viewRender());
  }
}
