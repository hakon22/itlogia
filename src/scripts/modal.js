const imageArray = document.querySelectorAll('[data-modal]');
const modalWindow = document.querySelector('.modalWindow');
const modalBackground = document.querySelector('.modalBackground');
const modalClose = document.querySelector('.modalClose');

const scrollBar = window.innerWidth - document.body.clientWidth;

export const isMobile = window.screen.width < 768;

export const successSubmitForm = (text) => {
  modalBackground.style.display = 'block';
  modalBackground.firstElementChild.style.width = '60vw';
  modalBackground.firstElementChild.style.overflow = 'hidden';
  modalBackground.firstElementChild.style.padding = '1.5em';
  modalBackground.firstElementChild.style.textAlign = 'center';
  modalBackground.firstElementChild.style.fontSize = '2em';
  modalBackground.parentElement.style.overflow = 'hidden';

  if (!isMobile) {
    document.body.style.marginRight = `${scrollBar}px`;
    document.querySelector('.header').style.paddingRight = `${scrollBar}px`;
  }

  modalWindow.textContent = text;
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
        modalBackground.firstElementChild.style.backgroundColor = '';
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
    modalBackground.firstElementChild.style.backgroundColor = 'unset';

    const { offsetWidth, offsetHeight } = image;
    const tempImg = image.cloneNode();
    const newImg = document.createElement('div');
    newImg.append(tempImg);
    newImg.style.width = `${offsetWidth * (isMobile ? 1.7 : 4)}px`;
    newImg.style.height = `${offsetHeight * (isMobile ? 1.7 : 4)}px`;
    
    if (!isMobile) {
      document.body.style.marginRight = `${scrollBar}px`;
      document.querySelector('.header').style.paddingRight = `${scrollBar}px`;
    }
    modalWindow.innerHTML = newImg.outerHTML;
  });
});