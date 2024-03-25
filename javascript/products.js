import { API_component } from "./api.js";

class Products {
  ROOT_element;
  constructor(root) {
    this.ROOT_element = root;
  }
  async renderProducts(category = "Все товары") {
    const DATA = await API_component.getGoods();
    console.log(DATA);

    const container = document.createElement("div");
    container.className = "container";
    const div = document.createElement("div");
    div.className = "cards_items_card";
    div.append(this.renderTitleOfProducts(category));

    const listOfProducts = document.createElement("div");
    listOfProducts.className = "cards_items__products";
    const products = DATA.map((item) => {
      const div = document.createElement("div");
      div.dataset.productId = item.id;
      div.className = "item__product";
      div.innerHTML = `
        <img src="${item.image}" alt="${item.category}" />
                <p class="item__product1">${item.price}<span> ₽</span></p>
                <p class="product_name">${item.title}</p>
                <p class="product_detail">${item.weight}г</p>
                <button>Добавить</button>
            `;
      return div;
    });

    listOfProducts.append(...products);
    div.append(listOfProducts);
    container.append(div);
    document.querySelector(this.ROOT_element).append(container);
  }
  renderTitleOfProducts(title) {
    const div = document.createElement("div");
    div.className = "cards_items_title";
    div.innerHTML = `<h2>${title}</h2>`;
    return div;
  }
}

const PRODUCTS_component = new Products(".cards_items");
export { PRODUCTS_component };
