import { initialCards } from './scripts/cards';
import { closeModal, openModal } from './components/modal';
import './styles/index.css';
import { createCard } from './components/card';



// @todo: DOM узлы
const listContainer = document.querySelector('.places__list');
const addButton = document.querySelector('.profile__add-button');
const editButton = document.querySelector('.profile__edit-button');
const newPopup = document.querySelector('.popup_type_new-card');
const editPopup = document.querySelector('.popup_type_edit');
const closeButtons = document.querySelectorAll('.popup__close');
const profileTitle = document.querySelector('.profile__title');
const profileDescr = document.querySelector('.profile__description');
const popup = document.querySelectorAll('.popup');
const inputCardName = document.querySelector('.popup__input_type_card-name');
const inputTypeUrl = document.querySelector('.popup__input_type_url');
//Форма редактирования
const formElement = document.forms["edit-profile"];
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_description');
const formCard = document.forms["new-place"];

//Добавления слушателя по клику, для открытия модального окна
addButton.addEventListener('click', function() {
  openModal(newPopup)
});

editButton.addEventListener('click', function() {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescr.textContent;
  openModal(editPopup);
});

//Добавление цикла с слушателем для закрытия модальных окон по кнопке
for(let i = 0; i < closeButtons.length; i++) {
  const button = closeButtons[i];
  button.addEventListener('click', function(){
    const modal = button.closest('.popup');
    closeModal(modal)
  }
)};

//Добавления цикла, закрытия модальных окон по "esc"
document.addEventListener('keydown', function(evt) {
  if (evt.keyCode == 27) {
    for (var i = 0; i < popup.length; i++) {
      popup[i].classList.remove('popup_is-opened');
    }
  }
});

//Закрытие модального окна кликом по "overlay"
document.addEventListener('mousedown', function(evt) {
  if (evt.target.classList.contains('popup_is-opened')) {
    for (var i= 0; i < popup.length; i++) {
      popup[i].classList.remove('popup_is-opened');
    }
  }
})

// Обработчик редактирования профиля
function handleFormSubmit(evt) {
  evt.preventDefault();
  const nameValue = nameInput.value;
  const jobValue = jobInput.value;
  const name = document.querySelector('.profile__title');
  const description = document.querySelector('.profile__description');
  name.textContent = nameValue;
  description.textContent = jobValue;
  closeModal(editPopup);
};

formElement.addEventListener('submit', handleFormSubmit);

// @todo: Вывести карточки на страницу
for(let i = 0; i < initialCards.length; i++) {
  const newCard = createCard(initialCards[i])
  listContainer.prepend(newCard)
}

// Обработчик добавления карточки
formCard.addEventListener('submit', function(evt) {
  evt.preventDefault();
  const name = inputCardName.value;
  const link = inputTypeUrl.value;
  const newCard = createCard({name, link});
  listContainer.prepend(newCard);
  closeModal(newPopup);
})

// Класс анимации
popup.forEach(function(item) {
    item.classList.add('popup_is-animated')
})

