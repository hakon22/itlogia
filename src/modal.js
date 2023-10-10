const imageArray = document.querySelectorAll('[data-modal]');
const modalWindow = document.querySelector('.modalWindow');
const modalBackground = document.querySelector('.modalBackground');
const modalClose = document.querySelector('.modalClose');

const scrollBar = window.innerWidth - document.body.clientWidth;

const isMobile = window.screen.width < 768;

export const successSubmitForm = (el) => {

};

[modalClose, modalBackground].forEach((modal) => {
  modal.addEventListener('click', ({ target }) => {
    if (target === modalBackground || target === modalClose) {
      modalBackground.style.display = 'none';
      modalBackground.parentElement.style.overflow = '';
      if (modalBackground.firstElementChild.style.width !== '81.25%') {
        modalBackground.firstElementChild.style.width = '';
        modalBackground.firstElementChild.style.overflow = 'auto';
        modalBackground.firstElementChild.style.padding = '';
        document.body.style.marginRight = '';
      }
    }
  });
});

imageArray.forEach((image) => {
  image.addEventListener('click', () => {
    modalBackground.style.display = 'block';
    modalBackground.firstElementChild.style.width = 'max-content';
    modalBackground.firstElementChild.style.overflow = 'hidden';
    modalBackground.firstElementChild.style.padding = '0';
    modalBackground.parentElement.style.overflow = 'hidden';

    const { offsetWidth, offsetHeight } = image;
    const tempImg = image.cloneNode();
    const newImg = document.createElement('div');
    newImg.append(tempImg);
    newImg.style.width = `${offsetWidth * (isMobile ? 1.7 : 2)}px`;
    newImg.style.height = `${offsetHeight * (isMobile ? 1.7 : 2)}px`;
    
    if (!isMobile) {
      document.body.style.marginRight = `${scrollBar}px`;
      document.querySelector('.header').style.paddingRight = `${scrollBar}px`;
    }
    modalWindow.innerHTML = newImg.outerHTML;
  });
});