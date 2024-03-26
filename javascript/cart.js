

class Cart{
  ROOT_element
  GOODSinCart = []
  GoodsInCartCount = 0
  CART_OPEN_element
  CART_CLOSE_element
  CartIsOpen = false
  constructor(root){
    this.ROOT_element = root
  }
  renderCart(){
    const cartContainer = document.createElement('div')
    cartContainer.className = 'cart_container'

    const btnCart = document.createElement('button')
    btnCart.className = 'cart_container_title'
    btnCart.innerHTML = `
                <h2 class="cart_container_title_button">Корзина</h2>
                <span class="totalItems">0</span>`

    btnCart.addEventListener('click',()=>{
      if(this.CartIsOpen){
        this.closeCart()
        this.CartIsOpen = false
      }else{
        this.openCart()
        this.CartIsOpen = true
      }
    })

    cartContainer.append(btnCart)
    document.querySelector(this.ROOT_element).append(cartContainer)
    this.CART_OPEN_element = '.cart_container'


  }
  openCart(){
      const cartOpen = document.createElement('div')
      cartOpen.className = 'cart__open'

      const cartContent = document.createElement('div')
      cartContent.className = 'cartGeneral__content'

      const cartList = document.createElement('div')
      cartList.className = 'cart_container_content'

      cartList.innerHTML = `
                  <div class="cart_container_content_card">
                    <img src="" alt="burger" />
                    <div class="card_text">
                      <h2>Супер сырный</h2>
                      <span>512г</span>
                      <p>589<span>₽</span></p>
                    </div>
                    <div class="card_number">
                      <button class="minus_number">-</button>
                      <p>1</p>
                      <button class="plus_number">+</button>
                    </div>
                  </div>
                  <div class="cart_container_content_card">
                    <img src="" alt="burger" />
                    <div class="card_text">
                      <h2>Супер сырный</h2>
                      <span>512г</span>
                      <p>589<span>₽</span></p>
                    </div>
                    <div class="card_number">
                      <button class="minus_number">-</button>
                      <p>1</p>
                      <button class="plus_number">+</button>
                    </div>
                  </div>
                  `
        const cartFooterBlock = document.createElement('div')
        cartFooterBlock.className = 'cart_container__footer__block'
        const cartFooter = document.createElement('div')
        cartFooter.className = 'cart_container_footer'
        cartFooter.innerHTML = `
          <p>Итого</p>
          <p>1029 <span>₽</span></p>
          `
        const btnSendRequest = document.createElement('button')
        btnSendRequest.className = 'cart_container_footer_button'
        btnSendRequest.textContent = 'Оформить'

        const footerBlock = document.createElement('div')
        footerBlock.className = 'cart_container_footer_info'
        footerBlock.innerHTML = `
        <p>Бесплатная доставка</p>
        `
        const btnCloseCart = document.createElement('button')
        btnCloseCart.textContent = 'Свернуть'
        btnCloseCart.addEventListener('click',()=>{
          this.closeCart()
          this.CartIsOpen = false
        })

      footerBlock.append(btnCloseCart)
      cartFooterBlock.append(cartFooter,btnSendRequest,footerBlock)
      cartContent.append(cartList, cartFooterBlock)
      cartOpen.append(cartContent)
      document.querySelector(this.CART_OPEN_element).append(cartOpen)
      this.CART_CLOSE_element = '.cart__open'
  }
  closeCart(){
    document.querySelector(this.CART_CLOSE_element).remove()
  }
  changeCountInCart(){
    this.GoodsInCartCount = this.GOODSinCart.length
  }
  set addToCart(product){
    this.GOODSinCart.push(product)
  }
}

const CART_component = new Cart('.catalog_start')
export {CART_component}
