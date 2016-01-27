export default class Response {
  constructor() {
    this.response = {
      status: 200
    };
  }

  status(status) {
    this.response.status = status;
    return this;
  }

  send(body) {
    this.response.body = body;
    return this;
  }

  end(body) {
    this.response.body = body;
    return this;
  }
}