import { API_component } from "./api.js"

class ModalWindow {
  ROOT_element
  constructor(root){
    this.ROOT_element = root
  }
  async renderModalWindow(id){
    const DATA = await API_component.getGoods(id)

    const modalContainer = document.createElement('div')
    modalContainer.className = 'modal'

    const modalCard = document.createElement('div')
    modalCard.className = 'modal__card'
    modalCard.dataset.productId = DATA.id

    modalCard.innerHTML = `
    <div class="modal__card-title"><h2>${DATA.title}</h2></div>
        <div class="modal__card_information">
          <div class="modal_image">
            <img src="${DATA.image}" alt="${DATA.category}" />
          </div>
          <div class="modal__card-content">
            <p class="modal__card-content_first">
              ${DATA.description}
            </p>
            <span class="modal__card-content-inset">Состав:</span>
            <span class="modal__card-content-outset">${DATA.weight}г, ккал ${DATA.calories}</span>
          </div>
          <div class="modal__footer_info">
            <div class="modal__card-footer">
              <button class="modal__card-footer_button">Добавить</button>
              <div class="card_number">
                <button class="minus_number">-</button>
                <p>1</p>
                <button class="plus_number">+</button>
              </div>
            </div>
            <div class="modal__card-summary">
              <p>${DATA.price}<span>₽</span></p>
            </div>
          </div>
        </div>
        <button class="modal-close">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="currentcolor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              x="5.07422"
              y="5.28249"
              width="1"
              height="20"
              transform="rotate(-45 5.07422 5.28249)"
            />
            <rect
              x="5.78125"
              y="19.4246"
              width="1"
              height="20"
              transform="rotate(-135 5.78125 19.4246)"
            />
          </svg>
        </button>`
    const listOfIngrediens = document.createElement('ul')
    const list = DATA.ingredients.map((el)=>{
      const li = document.createElement('li')
      li.textContent = el
      return li
    })
    listOfIngrediens.append(...list)

    modalCard.querySelector('.modal__card-content-inset').after(listOfIngrediens)
    modalContainer.append(modalCard)
    document.querySelector(this.ROOT_element).append(modalContainer)
    this.closeModal(modalContainer)
  }
  closeModal(HTMLelement){

    HTMLelement.addEventListener('click',()=>{

      if(event.target === HTMLelement || event.target.closest('.modal-close')){
        HTMLelement.remove()
      }

  })
  }
}

const MODAL_component = new ModalWindow('body')
export {MODAL_component}
