import { initialCards } from './scripts/cards';
import { closeModal, openModal } from './components/modal';
import './styles/index.css';
import { createCard, isLiked, updateLike } from './components/card';
import { enableValidation} from './components/validation';
import { addNewCard, editProfileAvatar, editProfileInfo, getAllCards, getUserInfo, handleDeleteCard, handleDislikeCard, handleLikeCard, userData } from './components/api';


// @todo: DOM узлы
const listContainer = document.querySelector('.places__list');
const addButton = document.querySelector('.profile__add-button');
const editButton = document.querySelector('.profile__edit-button');
const newPopup = document.querySelector('.popup_type_new-card');
const editPopup = document.querySelector('.popup_type_edit');
const linkInput = document.querySelector('.popup__input_type_link');
const closeButtons = document.querySelectorAll('.popup__close');
const profileTitle = document.querySelector('.profile__title');
const profileDescr = document.querySelector('.profile__description');
const profileImg = document.querySelector('.profile__image');
const popups = document.querySelectorAll('.popup');
const inputCardName = document.querySelector('.popup__input_type_card-name');
const inputTypeUrl = document.querySelector('.popup__input_type_url');
const openPopup = document.querySelector('.popup_is-opened');
const imagePopup = document.querySelector('.popup_type_image');
const popupImageElement = document.querySelector('.popup__image');
const profileImageContainer = document.querySelector('.profile__image-container');
const editAvatarPopup = document.querySelector('.popup_type_edit-avatar');
const editAvatarForm = document.forms["edit-avatar"];
const popupCaptionElement = document.querySelector('.popup__caption');

//Форма редактирования
const profileForm = document.forms["edit-profile"];
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_description');
const formCard = document.forms["new-place"];

Promise.all([getUserInfo(), getAllCards()]).then(([userInfo, cards]) => {
  userData._id = userInfo._id
  createProfile(userInfo);
  renderCards(cards);
})

//Добавления слушателя по клику, для открытия модального окна
addButton.addEventListener('click', function() {
  openModal(newPopup);
});

editButton.addEventListener('click', function() {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescr.textContent;
  openModal(editPopup);
});

// Открытие по клику на аватар
profileImageContainer.addEventListener('click', function() {
  openModal(editAvatarPopup);
})

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
  const name = nameInput.value;
  const about = jobInput.value;
  // отправляем запрос на редактирование профиля
  // после получения ответа, обновляем профиль
  changeButtonStatus(profileForm, true)
  editProfileInfo({name, about})
  .then((data) => {
    createProfile(data);
    closeModal(editPopup);
  })
  .finally(() => {
    changeButtonStatus(profileForm, false)
  })
};

function editAvatarFormSubmit(evt) {
  evt.preventDefault();
  const avatar = linkInput.value;
  console.log(avatar)
  // отправляем запрос на редактирование профиля
  // после получения ответа, обновляем профиль
  changeButtonStatus(editAvatarForm, true)
  editProfileAvatar({avatar})
  .then((data) => {
    createProfile(data);
    closeModal(editAvatarPopup);
  })
  .finally(() => {
    changeButtonStatus(editAvatarForm, false)
  })
};

profileForm.addEventListener('submit', handleProfileFormSubmit);
editAvatarForm.addEventListener('submit', editAvatarFormSubmit);

function renderCards(arr) {
  // @todo: Вывести карточки на страницу
for(let i = 0; i < arr.length; i++) {
  const newCard = createCard(arr[i], handleImageClick, deleteCard, handleLikeClick)
  listContainer.append(newCard)
}
}


// Обработчик добавления карточки
formCard.addEventListener('submit', function(evt) {
  evt.preventDefault();
  const name = inputCardName.value;
  const link = inputTypeUrl.value;
  // Отправляем запрос на создание карточки
  // после получения ответа, отображаем ее на странице
  changeButtonStatus(formCard, true)
  addNewCard({name, link})
  .then((data) => {
    const newCard = createCard(data, handleImageClick, deleteCard, handleLikeClick);
    listContainer.prepend(newCard);
    formCard.reset(); // clean form
    closeModal(newPopup);
  })
  .finally(() => {
    changeButtonStatus(formCard, false)
  })
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


// Валидация
enableValidation();

// Функция обновления данных профиля
function createProfile(data) {
  profileTitle.textContent = data.name;
  profileDescr.textContent = data.about;
  profileImg.src = data.avatar;
}

//Удаление карточки с сервера
function deleteCard(card, id) {
  handleDeleteCard(id)
  .then(() => {
      card.remove();
    })
  }


// Функция управления лайками
function handleLikeClick(card) {
    if(isLiked(card)) {
      removeLike(card)
    }
    else {
      putLike(card)
    }
  }

function removeLike(card) {
    handleDislikeCard(card.id)
    .then((data) => {
      updateLike(card, data)
    })
  }

function putLike(card) {
    handleLikeCard(card.id)
    .then((data) => {
      console.log(data)
      updateLike(card, data)
    })
  }

// Изменение текста кнопки
function changeButtonStatus(form, isLoading) {
    const button = form.querySelector('.popup__button');
    if (isLoading) {
      button.textContent = 'Сохранение...'
    } else {
      button.textContent = 'Сохранить';
    }
  }
