import { userData } from "./api";

// @todo: Темплейт карточки
const templateCard = document.querySelector('#card-template').content.querySelector('.card');


// @todo: Функция создания карточки
export function createCard(card, handleImageClick, deleteCard, addLike) {
  const newCard = templateCard.cloneNode(true);
  const deleteButton = newCard.querySelector('.card__delete-button');
  newCard.setAttribute('id', card._id);
  if(card.owner._id != userData._id) {
    deleteButton.remove()
  }
  else {
    deleteButton.addEventListener('click', function(){
      deleteCard(newCard, card._id)
    });
  }

  const cardImage = newCard.querySelector('.card__image');
  cardImage.src = card.link;
  cardImage.alt = card.name;
  newCard.querySelector('.card__title').textContent = card.name;

  cardImage.addEventListener('click', function() {
    handleImageClick(card)
  })

  const likeButton = newCard.querySelector('.card__like-button');
  likeButton.addEventListener('click', function(){
    addLike(newCard)
  });
  if(card.likes.find((item) => item._id === userData._id)) {
    likeButton.classList.add('card__like-button_is-active')
  }
  const likeCounter = newCard.querySelector('.card__like-counter');
  likeCounter.textContent = card.likes.length;
  return newCard;
}

// функция лайка
export function isLiked(card) {
  return card.querySelector('.card__like-button').classList.contains('card__like-button_is-active')
}

export function updateLike(card, data) {
  const likeButton = card.querySelector('.card__like-button');
  const likeCounter = card.querySelector('.card__like-counter');
  likeCounter.textContent = data.likes.length
  likeButton.classList.toggle('card__like-button_is-active');
}

