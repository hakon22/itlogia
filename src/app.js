import axios from 'axios';
import IMask from 'imask';
import routes from './routes.js'

const app = () => {
  const form = document.getElementById('form');
  const modalBody = form.querySelector('.modal-body');
  const modalSubmitButton = form.querySelector('button[type=submit]');
  const modalCloseButton = form.querySelector('button[data-bs-dismiss=modal]');
  const phoneInput = form.querySelector('input[type=tel]');
  const checkBox = form.querySelector('input[type=checkbox]');
  const checkArray = [checkBox, phoneInput];
  
  const phoneMask = new IMask(phoneInput, {
    mask: "+{7} (000) 000-00-00",
  });

  checkArray.forEach((input) => {
    input.addEventListener('input', () => {
      const isCorrect = phoneMask.masked.isComplete && checkBox.checked;
      modalSubmitButton.disabled = !isCorrect;
      // адский блок, react передаёт привет
      if (!phoneMask.masked.isComplete && form.classList.contains('was-validated')) {
        if (!phoneInput.classList.contains('no-valid')) {
          phoneInput.classList.add('no-valid', 'is-invalid');
        }
      } else {
        if (phoneInput.classList.contains('no-valid')) {
          phoneInput.classList.remove('no-valid', 'is-invalid');
        }
      }
      if (form.classList.contains('was-validated') && !checkBox.checked) {
        if (!checkBox.classList.contains('no-valid-check')) {
          checkBox.classList.add('no-valid-check', 'is-invalid');
          checkBox.nextElementSibling.classList.add('no-valid-rules');
        }
      } else {
        if (checkBox.classList.contains('no-valid-check')) {
          checkBox.classList.remove('no-valid-check', 'is-invalid');
          checkBox.nextElementSibling.classList.remove('no-valid-rules');
        }
      }
    });
  });

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    modalSubmitButton.disabled = !form.checkValidity();
    const formElements = [...form.querySelectorAll('.form-control')];
    const formValues = formElements.reduce((acc, element) => {
      const { id, value } = element;
      acc[id] = value;
      return acc;
    }, {});

    form.classList.add('was-validated');

    try {
      await axios.post(routes.sendEmail, formValues);
      form.reset();
      modalSubmitButton.remove();
      modalCloseButton.classList.remove('btn-secondary');
      modalCloseButton.classList.add('btn-success');
      modalCloseButton.textContent = 'Закрыть';
      modalBody.textContent = 'Форма успешно отправлена!';
    } catch (e) {
      const isAlertErrorEnabled = form.querySelector('div[role=alert]');
      if (!isAlertErrorEnabled) {
        const alertError = document.createElement('div');
        alertError.classList.add('alert', 'alert-danger', 'mt-3');
        alertError.setAttribute('role', 'alert');
        alertError.textContent = 'Произошла ошибка при отправке формы';
        modalBody.append(alertError);
      }
    }
  });
}

export default app;
