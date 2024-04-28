// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content.querySelector('.card');
// @todo: DOM узлы
const cardContainer = document.querySelector('.places__list');
// @todo: Функция создания карточки
function createCard(card, cardDelete) {
  const newCard = cardTemplate.cloneNode(true);
  const deleteButton = newCard.querySelector('.card__delete-button');
    deleteButton.addEventListener('click', function(){
      cardDelete(newCard);
    })
    const cardImage = newCard.querySelector('.card__image');
    cardImage.src = card.link;
    cardImage.alt = card.name;
    newCard.querySelector('.card__title').textContent = card.name;
    return newCard;
  }
// @todo: Функция удаления карточки
function cardDelete(card) {
  card.remove();
}
// @todo: Вывести карточки на страницу
for(let i = 0; i < initialCards.length; i++) {
   const newCard = createCard(initialCards[i], cardDelete);
   cardContainer.prepend(newCard);
}

