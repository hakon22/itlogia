import axios from 'axios';
import IMask from 'imask';
import WOW from 'wow.js';
import './modal.js';
import routes from './routes.js'

const app = () => {
  document.body.classList.remove('preload');
  new WOW().init();

  const menu = document.querySelector('.header__logo-menu');
  const menuButton = document.querySelector('.menu-btn');

  menuButton.addEventListener('click', () => {
    menuButton.classList.toggle('active');
    menu.classList.toggle('active');
  });


  const form = document.getElementById('submit');
  const phoneInput = form.querySelector('input[type=tel]');
  
  const phoneMask = new IMask(phoneInput, {
    mask: "+{7} (000) 000-00-00",
  });

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const errors = [];
    const formElements = [...form.querySelectorAll('.form-control')];
    const formValues = formElements.reduce((acc, element) => {
      const { id, value } = element;
      if (id === 'name' || id === 'adress') {
        if (value.length < 3) {
          errors.push({ [id]: 'Минимум 3 символа' });
          element.nextElementSibling.textContent = 'Минимум 3 символа';
        }
        if (value.length > 30) {
          errors.push({ [id]: 'Максимум 30 символов' });
          element.nextElementSibling.textContent = 'Максимум 30 символов';
        }
      } else {
        if (value.replace(/[^\d]/g, '').length !== 11) {
          errors.push({ [id]: 'Введите корректный номер' });
          element.nextElementSibling.textContent = 'Введите корректный номер';
        }
      }
      acc[id] = value;
      return acc;
    }, {});

    form.classList.add('was-validated');
    
    try {
      console.log(errors);
      if (!phoneMask.masked.isComplete && !check) {
        console.log(check);
      }
      await axios.post(routes.sendEmail, formValues);
      form.reset();
      modalBody.textContent = 'Форма успешно отправлена!';
    } catch (e) {
      console.log(e.errors);
      const isAlertErrorEnabled = form.querySelector('div[role=alert]');
      if (!isAlertErrorEnabled) {
        const alertError = document.createElement('div');
        alertError.classList.add('alert', 'alert-danger', 'mt-3');
        alertError.setAttribute('role', 'alert');
        alertError.textContent = 'Произошла ошибка при отправке формы';
        form.append(alertError);
      }
    }
  });
}

export default app;
