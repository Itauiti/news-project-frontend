export class Form {
  constructor(form, errorMessages) {
    this._form = form;
    this._errorMessages = errorMessages;
  }

  setServerError = () => {} //сделать alreadyExistsError: 'Такой пользователь уже есть',

  _getInfo = () => {
    return this._form.elements;
  } //сделать

  _setEventListeners = () => {
    this._form.addEventListener('input', this._validateInputElement, true);
    //повесить слушатель на сабмит
  }

  initialization = () => {
    this._setEventListeners();
    const error = this._form.querySelectorAll('.form__error');
    this._error = error;
    this._inputs = Array.from(this._form.querySelectorAll('.form__input'));
    const submit = this._form.querySelector('.form__button');
    this._submit = submit;
  }

  _setSubmitButtonState = (state) => {
    if (state) {
      this._submit.removeAttribute('disabled');
      this._submit.classList.add('form__button_activ');
    } else {
      this._submit.setAttribute('disabled', true);
      this._submit.classList.remove('form__button_activ');
    }
  }

  _validateInputElement = (event) => {
    this.isFieldValid(event.target);
    this._setSubmitButtonState(this._inputs.every(this._isValidate));
  }

  isFormValid = () => {
    let valid = true;
    this._inputs.forEach((input) => {
      if (!isFieldValid(input)) valid = false;
    });
    return valid;
  }

  isFieldValid = (input) => {
    const errorElem = this._form.querySelector(`#${input.id}-error`);
    const valid = this._isValidate(input);
    errorElem.textContent = input.validationMessage;
    return valid;
  }

  _isValidate = (input) => {
    input.setCustomValidity("");
    if (input.validity.valueMissing) {
      input.setCustomValidity(this._errorMessages.empty); //не работает
      return false;
    }

    if (input.type === 'password' && input.validity.tooShort) {
      input.setCustomValidity(this._errorMessages.passwordError);
      return false;
    }

    if (input.type === 'text' && (input.validity.tooShort || input.validity.tooLong)) {
      input.setCustomValidity(this._errorMessages.textError);
      return false;
    }

    if (input.type === 'email' && input.validity.typeMismatch) {
      input.setCustomValidity(this._errorMessages.emailError);
      return false;
    }
    return input.checkValidity();
  }

  clear = () => {
    this._error.forEach(item => item.textContent = '') // _clear — вспомогательный метод, очищает поля формы???
  }
}

// setServerError — добавляет форме ошибку, пришедшую с сервера;
// _validateInputElement — валидирует переданный в качестве аргумента инпут;
// _validateForm — валидирует всю форму;
// _clear — вспомогательный метод, очищает поля формы;
// _getInfo — вспомогательный метод, возвращает данные формы.