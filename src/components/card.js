// @todo: Темплейт карточки
const templateCard = document.querySelector('#card-template').content.querySelector('.card');


// @todo: Функция создания карточки
export function createCard(card, handleImageClick) {
  const newCard = templateCard.cloneNode(true);
  const deleteButton = newCard.querySelector('.card__delete-button');

  deleteButton.addEventListener('click', function(){
    deleteCard(newCard)
  });

  const cardImage = newCard.querySelector('.card__image');
  cardImage.src = card.link;
  cardImage.alt = card.name;
  newCard.querySelector('.card__title').textContent = card.name;

  cardImage.addEventListener('click', function() {
    handleImageClick(card)
  })

  const likeButton = newCard.querySelector('.card__like-button');
  likeButton.addEventListener('click', addLike);
  return newCard;
}

// функция лайка
function addLike(event) {
  event.target.classList.toggle('card__like-button_is-active')
}

// @todo: Функция удаления карточки
function deleteCard(card) {
  card.remove();
}
