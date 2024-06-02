export function openModal(modal) {
  modal.classList.add('popup_is-opened');
  document.addEventListener('keydown', handleEscape);
  document.addEventListener('click', closeByOverlay)
}

export function closeModal(modal) {
  modal.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', handleEscape);
  document.removeEventListener('click', closeByOverlay)
}

function handleEscape(evt) {
  if (evt.key == 'Escape') {
    const openedPopup = document.querySelector('.popup_is-opened');
    closeModal(openedPopup)
  }
};

//Закрытие модального окна кликом по "overlay"
  function closeByOverlay(evt) {
  if (evt.target.classList.contains('popup_is-opened')) {
    const openedPopup = document.querySelector('.popup_is-opened');
    closeModal(openedPopup)
  }
 }







