
// Добавление/снятие класса ошибки
const showError = (formElement, formInput, errorMessage) => {
  const formError = formElement.querySelector(`.${formInput.id}-error`);
  formInput.classList.add('popup__input__error');
  formError.textContent = errorMessage;
  formError.classList.add('input__error_active')
}

const hideError = (formElement, formInput) => {
  const formError = formElement.querySelector(`.${formInput.id}-error`);
  formInput.classList.remove('popup__input__error');
  formError.classList.remove('input__error_active');
  formError.textContent = '';
}

// Проверка полей ввода на валидацию
const checkInputValidity = (formElement, formInput) => {
  if (formInput.validity.patternMismatch) {
    formInput.setCustomValidity(formInput.dataset.error)
  } else {
    formInput.setCustomValidity("");
  }
  if (!formInput.validity.valid) {
    showError(formElement, formInput, formInput.validationMessage);
  } else {
    hideError(formElement, formInput)
  }
}

// Поиск всех полей ввода по классу
const setEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
  const buttonElement = formElement.querySelector('.popup__button');
  toggleButtonState(inputList, buttonElement);
  inputList.forEach((formInput) => {
    formInput.addEventListener('input', () => {
      checkInputValidity(formElement, formInput);
      toggleButtonState(inputList, buttonElement);
    })
  })
}

export const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll('.popup__form'));
  formList.forEach((formElement) => {
    setEventListeners(formElement)
  })
}


// Фунция проверяет наличие невалидного поля
const hasInvalidInput = (inputList) => {
  return inputList.some((formInput) => {
    return !formInput.validity.valid;
  })
}

export const toggleButtonState = (inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.disabled = true;
    buttonElement.classList.add('popup__button__not__active');
  } else {
    buttonElement.disabled = false;
    buttonElement.classList.remove('popup__button__not__active');
  }
}
