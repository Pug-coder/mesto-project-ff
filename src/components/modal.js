export function openPopup(popup) {
    popup.classList.add('popup_is-opened');
    popup.classList.add('popup_is-animated');
    document.addEventListener('keydown', handleEscClose);
}

export function closePopup(popup) {
    popup.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', handleEscClose);
    
    setTimeout(() => {
        popup.classList.remove('popup_is-animated');
    }, 600);
}

function handleEscClose(evt) {
    if (evt.key === 'Escape') {
        const openPopup = document.querySelector('.popup_is-opened');
        if (openPopup) {
            closePopup(openPopup);
        }
    }
}

export function enablePopupClose(popup) {
    popup.addEventListener('click', (evt) => {
        if (evt.target === popup) {
            closePopup(popup);
        }
    });
    const closeButton = popup.querySelector('.popup__close');
    closeButton.addEventListener('click', () => closePopup(popup));
}

export function openImagePopup(name, link) {
    const imagePopup = document.querySelector('.popup_type_image'); 
    const imageElement = imagePopup.querySelector('.popup__image'); 
    const captionElement = imagePopup.querySelector('.popup__caption');

    imageElement.src = link;
    imageElement.alt = name;
    captionElement.textContent = name;
    openPopup(imagePopup);
    enablePopupClose(imagePopup);
}