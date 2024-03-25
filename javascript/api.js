class API {
  BASE_URL;
  constructor(url) {
    this.BASE_URL = url;
  }
  getGoods() {
    return fetch(`${this.BASE_URL}/api/product`).then((response) =>
      response.json()
    );
  }
}
const API_component = new API("http://localhost:3024");
export { API_component };
