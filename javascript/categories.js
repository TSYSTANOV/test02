import { PRODUCTS_component } from "./products.js";
class Categories {
  ROOT_element;
  constructor(root) {
    this.ROOT_element = root;
  }
  renderCategories() {
    const container = document.createElement("div");
    container.className = "container";

    const categoryList = document.createElement("ul");
    categoryList.className = "scrollbar_main_title";
    categoryList.innerHTML = `
    <a href="#!" data-item-id="Все" class="scrollbar_main_title_item item1">Все товары</a>
    <a href="#!" data-item-category="burger" class="scrollbar_main_title_item item2">Бургеры</a>
    <a href="#!" data-item-category="hot-dog" class="scrollbar_main_title_item item4">Сосиски</a>
    <a href="#!" data-item-category="snack" class="scrollbar_main_title_item item3">Закуски</a>
    <a href="#!" data-item-category="shawarma" class="scrollbar_main_title_item item1">Шаверма</a>
    <a href="#!" data-item-category="combo" class="scrollbar_main_title_item item6">Комбо</a>
    <a href="#!" data-item-category="pizza" class="scrollbar_main_title_item item7">Пицца</a>
    <a href="#!" data-item-category="dessert" class="scrollbar_main_title_item item3">Десерт</a>
    <a href="#!" data-item-category="sauce" class="scrollbar_main_title_item item5">Соусы</a>
    `;
    container.append(categoryList);
    document.querySelector(this.ROOT_element).append(container);
    PRODUCTS_component.renderProducts();
  }
}

const CATEGORY_component = new Categories(".scrollbar_main");
export { CATEGORY_component };
