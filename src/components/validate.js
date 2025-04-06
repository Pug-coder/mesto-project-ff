// Validation settings
const validationSettings = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
  };
  
  function showInputError(formElement, inputElement, errorMessage, settings) {
    const errorElement = formElement.querySelector(`.popup__error_${inputElement.name}`);
    inputElement.classList.add(settings.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(settings.errorClass);
  }
  
  function hideInputError(formElement, inputElement, settings) {
    const errorElement = formElement.querySelector(`.popup__error_${inputElement.name}`);
    inputElement.classList.remove(settings.inputErrorClass);
    errorElement.classList.remove(settings.errorClass);
    errorElement.textContent = '';
  }
  
  function checkInputValidity(formElement, inputElement, settings) {
    if (inputElement.name === 'name' || inputElement.name === 'description') {
      const regex = /^[a-zA-Zа-яА-ЯёЁ\s-]+$/;
      
      if (!regex.test(inputElement.value) && inputElement.value.length > 0) {
        inputElement.setCustomValidity('Поле может содержать только латинские и кириллические буквы, знаки дефиса и пробелы');
      } else {
        inputElement.setCustomValidity('');
      }
    }
    
    if (!inputElement.validity.valid) {
      showInputError(formElement, inputElement, inputElement.validationMessage, settings);
    } else {
      hideInputError(formElement, inputElement, settings);
    }
  }
  
  function hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }
  
  function toggleButtonState(inputList, buttonElement, settings) {
    if (hasInvalidInput(inputList)) {
      buttonElement.classList.add(settings.inactiveButtonClass);
      buttonElement.disabled = true;
    } else {
      buttonElement.classList.remove(settings.inactiveButtonClass);
      buttonElement.disabled = false;
    }
  }
  
  function setEventListeners(formElement, settings) {
    const inputList = Array.from(formElement.querySelectorAll(settings.inputSelector));
    const buttonElement = formElement.querySelector(settings.submitButtonSelector);
    
    toggleButtonState(inputList, buttonElement, settings);
    
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', function () {
        checkInputValidity(formElement, inputElement, settings);
        toggleButtonState(inputList, buttonElement, settings);
      });
    });
  }
  
  export function clearValidationErrors(formElement, settings = validationSettings) {
    const inputList = Array.from(formElement.querySelectorAll(settings.inputSelector));
    const buttonElement = formElement.querySelector(settings.submitButtonSelector);
    
    inputList.forEach((inputElement) => {
      hideInputError(formElement, inputElement, settings);
    });
    
    toggleButtonState(inputList, buttonElement, settings);
  }
  

  export function enableValidation(settings = validationSettings) {
    const formList = Array.from(document.querySelectorAll(settings.formSelector));
    formList.forEach((formElement) => {
      formElement.addEventListener('submit', function (evt) {
        evt.preventDefault();
      });
      
      setEventListeners(formElement, settings);
    });
  }