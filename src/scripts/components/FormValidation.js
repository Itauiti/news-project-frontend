export class FormValidation {
  constructor(form, formClassLists, errorMessages) {
    this._form = form;
    this._errorMessages = errorMessages;
    this._formClassLists = formClassLists;
  }

  initialization = () => {
    this._setEventListeners();
    const error = this._form.querySelectorAll(this._formClassLists.errorClass);
    this._error = error;
    this._inputs = Array.from(this._form.querySelectorAll(this._formClassLists.inputClass));
    const submit = this._form.querySelector(this._formClassLists.buttonClass);
    this._submit = submit;
  }

  setServerError = (message) => {
    const errorFromServer = this._form.querySelector(this._formClassLists.serverErrorClass);
    errorFromServer.style.display = 'block';
    errorFromServer.textContent = message;
  }

  _setEventListeners = () => {
    this._form.addEventListener('input', this._validateInputElement, true);
  }

  _setSubmitButtonState = (state) => {
    if (state) {
      this._submit.removeAttribute('disabled');
      this._submit.classList.add(this._formClassLists.activButtonClass);
    } else {
      this._submit.setAttribute('disabled', true);
      this._submit.classList.remove(this._formClassLists.activButtonClass);
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
    if (input.type === 'text' && input.validity.valueMissing) {
      input.setCustomValidity(this._errorMessages.empty);
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
}