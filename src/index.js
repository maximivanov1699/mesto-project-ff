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
const popups = document.querySelectorAll('.popup');
const inputCardName = document.querySelector('.popup__input_type_card-name');
const inputTypeUrl = document.querySelector('.popup__input_type_url');
const openPopup = document.querySelector('.popup_is-opened');
const imagePopup = document.querySelector('.popup_type_image');
const popupImageElement = document.querySelector('.popup__image');
const popupCaptionElement = document.querySelector('.popup__caption');
//Форма редактирования
const profileForm = document.forms["edit-profile"];
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

// Обработчик редактирования профиля
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  const nameValue = nameInput.value;
  const jobValue = jobInput.value;
  profileTitle.textContent = nameValue;
  profileDescr.textContent = jobValue;
  closeModal(editPopup);
};

profileForm.addEventListener('submit', handleProfileFormSubmit);

// @todo: Вывести карточки на страницу
for(let i = 0; i < initialCards.length; i++) {
  const newCard = createCard(initialCards[i], handleImageClick)
  listContainer.prepend(newCard)
}

// Обработчик добавления карточки
formCard.addEventListener('submit', function(evt) {
  evt.preventDefault();
  const name = inputCardName.value;
  const link = inputTypeUrl.value;
  const newCard = createCard({name, link}, handleImageClick);
  listContainer.prepend(newCard);
  closeModal(newPopup);
  formCard.reset();
})

// Класс анимации
popups.forEach(function(item) {
    item.classList.add('popup_is-animated')
})

function handleImageClick(card) {
  popupImageElement.src = card.link;
  popupImageElement.alt = card.name;
  popupCaptionElement.textContent = card.name;
  openModal(imagePopup);
}
