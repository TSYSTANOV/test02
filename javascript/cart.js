import { API_component } from "./api.js";
import { LOCALSTORAGE_component } from "./localStorage.js";

class Cart {
  ROOT_element;
  GOODSinCart = [];
  GoodsInCartCount = 0;
  CART_OPEN_element;
  CART_CLOSE_element;
  CartIsOpen = false;
  countClass;
  constructor(root) {
    this.ROOT_element = root;
  }
  renderCart() {
    this.changeCountInCart();
    this.GOODSinCart = LOCALSTORAGE_component.getItem("cartYouMeal");
    this.changeCountInCart();

    const cartContainer = document.createElement("div");
    cartContainer.className = "cart_container";

    const btnCart = document.createElement("button");
    btnCart.className = "cart_container_title";
    btnCart.innerHTML = `
                <h2 class="cart_container_title_button">Корзина</h2>
                <span class="totalItems">${this.GoodsInCartCount}</span>`;
    this.countClass = ".totalItems";
    btnCart.addEventListener("click", () => {
      if (this.CartIsOpen) {
        this.closeCart();
        this.CartIsOpen = false;
      } else {
        this.openCart();
        this.CartIsOpen = true;
      }
    });

    cartContainer.append(btnCart);
    document.querySelector(this.ROOT_element).append(cartContainer);
    this.CART_OPEN_element = ".cart_container";
    this.visibleCount();
  }
  async openCart() {
    const cartOpen = document.createElement("div");
    cartOpen.className = "cart__open";

    const cartContent = document.createElement("div");
    cartContent.className = "cartGeneral__content";

    const cartList = document.createElement("div");
    cartList.className = "cart_container_content";

    const idOfGoods = this.GOODSinCart.map((el) => el.id);
    let listOfProducts = await API_component.getListOfGoods(
      idOfGoods.join(",")
    );
    const elements = listOfProducts
      .map((el) => {
        const goods = this.GOODSinCart.find((elem) => elem.id === el.id);
        el.count = goods.count;
        return el;
      })
      .map((item) => {
        const container = document.createElement("div");
        container.className = "cart_container_content_card";
        container.innerHTML = `      
      <img src="${item.image}" alt="${item.category}" />
      <div class="card_text">
        <h2>${item.title}</h2>
        <span>${item.weight}г</span>
        <p>${item.price}<span>₽</span></p>
      </div>
      <div class="card_number">
      <button class="minus_number">-</button>
         <p>${item.count}</p>
        <button class="plus_number">+</button>
   </div>`;

        return container;
      });

    cartList.append(...elements);

    const cartFooterBlock = document.createElement("div");
    cartFooterBlock.className = "cart_container__footer__block";
    const cartFooter = document.createElement("div");
    cartFooter.className = "cart_container_footer";
    cartFooter.innerHTML = `
          <p>Итого</p>
          <p>1029 <span>₽</span></p>
          `;

    const btnSendRequest = document.createElement("button");
    btnSendRequest.className = "cart_container_footer_button";
    btnSendRequest.textContent = "Оформить";

    const footerBlock = document.createElement("div");
    footerBlock.className = "cart_container_footer_info";
    footerBlock.innerHTML = `
        <p>Бесплатная доставка</p>
        `;
    const btnCloseCart = document.createElement("button");
    btnCloseCart.textContent = "Свернуть";
    btnCloseCart.addEventListener("click", () => {
      this.closeCart();
      this.CartIsOpen = false;
    });

    footerBlock.append(btnCloseCart);
    cartFooterBlock.append(cartFooter, btnSendRequest, footerBlock);
    cartContent.append(cartList, cartFooterBlock);
    cartOpen.append(cartContent);
    document.querySelector(this.CART_OPEN_element).append(cartOpen);
    this.CART_CLOSE_element = ".cart__open";
    this.addListener(cartList);
  }
  closeCart() {
    document.querySelector(this.CART_CLOSE_element).remove();
    this.CartIsOpen = false;
  }
  changeCountInCart() {
    this.GoodsInCartCount = this.GOODSinCart.reduce((acc, el) => {
      acc += el.count;
      return acc;
    }, 0);
  }
  visibleCount() {
    const catalog = document.querySelector(this.ROOT_element);
    catalog.querySelector(this.countClass).textContent = this.GoodsInCartCount;
  }
  set addToCart(product) {
    console.log(this.GoodsInCartCount);
    this.GOODSinCart.push(product);
    this.changeCountInCart();
    this.visibleCount();
    LOCALSTORAGE_component.setItem("cartYouMeal", this.GOODSinCart);
  }
  get cartIsOpen() {
    return this.CartIsOpen;
  }

  addListener(HTMLelement) {
    HTMLelement.addEventListener("click", () => {
      console.log(1);
    });
  }
}

const CART_component = new Cart(".catalog_start");
export { CART_component };
