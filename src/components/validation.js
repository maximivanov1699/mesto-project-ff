
// Добавление/снятие класса ошибки
const showError = (formElement, formInput, errorMessage, config) => {
  const formError = formElement.querySelector(`.${formInput.id}-error`);
  formInput.classList.add(config.inputErrorClass);
  formError.textContent = errorMessage;
}

const hideError = (formElement, formInput, config) => {
  const formError = formElement.querySelector(`.${formInput.id}-error`);
  formInput.classList.remove(config.inputErrorClass);
  formError.textContent = '';
}

// Проверка полей ввода на валидацию
const checkInputValidity = (formElement, formInput, config) => {
  if (formInput.validity.patternMismatch) {
    formInput.setCustomValidity(formInput.dataset.error)
  } else {
    formInput.setCustomValidity("");
  }
  if (!formInput.validity.valid) {
    showError(formElement, formInput, formInput.validationMessage, config);
  } else {
    hideError(formElement, formInput, config)
  }
}

// Поиск всех полей ввода по классу
const setEventListeners = (formElement, config) => {
  const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
  const buttonElement = formElement.querySelector(config.submitButtonSelector);
  toggleButtonState(inputList, buttonElement, config);
  inputList.forEach((formInput) => {
    formInput.addEventListener('input', () => {
      checkInputValidity(formElement, formInput, config);
      toggleButtonState(inputList, buttonElement, config);
    })
  })
}

export const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((formElement) => {
    setEventListeners(formElement, config)
  })
}


// Фунция проверяет наличие невалидного поля
const hasInvalidInput = (inputList) => {
  return inputList.some((formInput) => {
    return !formInput.validity.valid;
  })
}

export const toggleButtonState = (inputList, buttonElement, config) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.disabled = true;
    buttonElement.classList.add(config.inactiveButtonClass);
  } else {
    buttonElement.disabled = false;
    buttonElement.classList.remove(config.inactiveButtonClass);
  }
}
