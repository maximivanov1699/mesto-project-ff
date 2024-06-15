import { initialCards } from './scripts/cards';
import { closeModal, openModal } from './components/modal';
import './styles/index.css';
import { createCard, isLiked, updateLike } from './components/card';
import { enableValidation} from './components/validation';
import { addNewCard, editProfileAvatar, editProfileInfo, getAllCards, getUserInfo, handleDeleteCard, handleDislikeCard, handleLikeCard} from './components/api';

const userData = {_id:''}

// @todo: DOM узлы
const listContainer = document.querySelector('.places__list');
const addButton = document.querySelector('.profile__add-button');
const editButton = document.querySelector('.profile__edit-button');
const popupTypeNewCard = document.querySelector('.popup_type_new-card');
const popupTypeEdit = document.querySelector('.popup_type_edit');
const inputTypeLink = document.querySelector('.popup__input_type_link');
const closeButtons = document.querySelectorAll('.popup__close');
const profileTitle = document.querySelector('.profile__title');
const profileDescr = document.querySelector('.profile__description');
const profileImg = document.querySelector('.profile__image');
const popups = document.querySelectorAll('.popup');
const inputCardName = document.querySelector('.popup__input_type_card-name');
const inputTypeUrl = document.querySelector('.popup__input_type_url');
const openPopup = document.querySelector('.popup_is-opened');
const popupTypeImage = document.querySelector('.popup_type_image');
const popupImageElement = document.querySelector('.popup__image');
const profileImageContainer = document.querySelector('.profile__image-container');
const popupTypeAvatar = document.querySelector('.popup_type_edit-avatar');
const formTypeAvatar = document.forms["edit-avatar"];
const popupCaptionElement = document.querySelector('.popup__caption');
const config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}

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
.catch((error) => {
  console.log(error);
})

//Добавления слушателя по клику, для открытия модального окна
addButton.addEventListener('click', function() {
  openModal(popupTypeNewCard);
});

editButton.addEventListener('click', function() {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescr.textContent;
  openModal(popupTypeEdit);
});

// Открытие по клику на аватар
profileImageContainer.addEventListener('click', function() {
  openModal(popupTypeAvatar);
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
    closeModal(popupTypeEdit);
  })
  .catch((error) => {
    console.log(error);
  })
  .finally(() => {
    changeButtonStatus(profileForm, false)
  })
};

function editAvatarFormSubmit(evt) {
  evt.preventDefault();
  const avatar = inputTypeLink.value;
  console.log(avatar)
  // отправляем запрос на редактирование профиля
  // после получения ответа, обновляем профиль
  changeButtonStatus(formTypeAvatar, true)
  editProfileAvatar({avatar})
  .then((data) => {
    createProfile(data);
    closeModal(editAvatarPopup);
  })
  .catch((error) => {
    console.log(error);
  })
  .finally(() => {
    changeButtonStatus(formTypeAvatar, false)
  })
};

profileForm.addEventListener('submit', handleProfileFormSubmit);
formTypeAvatar.addEventListener('submit', editAvatarFormSubmit);

function renderCards(arr) {
  // @todo: Вывести карточки на страницу
for(let i = 0; i < arr.length; i++) {
  const newCard = createCard(arr[i], handleImageClick, deleteCard, handleLikeClick, userData._id)
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
    const newCard = createCard(data, handleImageClick, deleteCard, handleLikeClick, userData._id);
    listContainer.prepend(newCard);
    formCard.reset(); // clean form
    closeModal(popupTypeNewCard);
  })
  .catch((error) => {
    console.log(error);
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
  openModal(popupTypeImage);
}


// Валидация
enableValidation(config);

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
    .catch((error) => {
      console.log(error);
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
    .catch((error) => {
      console.log(error);
    })
  }

function putLike(card) {
    handleLikeCard(card.id)
    .then((data) => {
      console.log(data)
      updateLike(card, data)
    })
    .catch((error) => {
      console.log(error);
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
