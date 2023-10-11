import axios from 'axios';
import IMask from 'imask';
import WOW from 'wow.js';
import * as yup from 'yup';
import './modal.js';
import { successSubmitForm } from './modal.js';
import routes from './routes.js';

const validation = yup.object().shape({
  name: yup
    .string()
    .trim()
    .min(3, 'Минимум 3 символа')
    .max(20, 'Максимум 20 символов')
    .required('Обязательное поле'),
  address: yup
    .string()
    .trim()
    .min(3, 'Минимум 3 символа')
    .max(20, 'Максимум 20 символов')
    .required('Обязательное поле'),
  phone: yup
    .string()
    .trim()
    .transform((value) => value.replace(/[^\d]/g, ''))
    .length(11, 'Введите корректный номер')
    .required('Обязательное поле'),
});

const app = () => {
  document.body.classList.remove('preload');
  new WOW().init();

  const menu = document.querySelector('.header__logo-menu');
  const menuButton = document.querySelector('.menu-btn');
  const navLinks = document.querySelectorAll('.header__logo-menu > ul > li');

  const navHandler = () => {
    menuButton.classList.toggle('active');
    menu.classList.toggle('active');
    if (menu.classList.contains('active')) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  };

  [menuButton, ...navLinks].forEach((el) => el.addEventListener('click', navHandler));


  const form = document.getElementById('submit');
  const phoneInput = form.querySelector('input[type=tel]');
  const nameInput = document.getElementById('name');
  
  new IMask(phoneInput, {
    mask: "+{7} (000) 000-00-00",
  });

  nameInput.addEventListener('input', () => {
    nameInput.value = nameInput.value.replace(/\./g, '');
  });

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formElements = [...form.querySelectorAll('.form-control')];

    const formValues = formElements.reduce((acc, element) => {
      const { id, value } = element;
      acc[id] = value;
      return acc;
    }, {});
    
    try {
      formElements.forEach((el) => {
        if (el.classList.contains('invalid')) {
          el.classList.remove('invalid');
          el.nextElementSibling.textContent = '';
        }
      });

      await validation.validate(formValues, { abortEarly: false });

      form.reset();
      successSubmitForm('Спасибо за заказ!');
      await axios.post(routes.sendForm, formValues);
    } catch (e) {
      const pathArray = [];
      e.inner?.forEach(({ path, message }) => {
        const el = document.getElementById(path);
        el.nextElementSibling.textContent = message;
        if (el.classList.contains('valid')) {
          el.classList.remove('valid');
        }
        el.classList.add('invalid');
        pathArray.push(path);
      });
      const keys = Object.keys(formValues);
      keys.forEach((field) => {
        if (!pathArray.includes(field)) {
          document.getElementById(field).classList.add('valid');
        }
      });
    }
  });
}

export default app;
