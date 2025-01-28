export function openPopup(popup) {
    popup.classList.add('popup_is-opened');
    document.addEventListener('keydown', handleEscClose);
}

export function closePopup(popup) {
    popup.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', handleEscClose);
}

function handleEscClose(evt) {
    if (evt.key === 'Escape') {
        const openPopup = document.querySelector('.popup_is-opened');
        if (openPopup) {
            closePopup(openPopup);
        }
    }
}

export function handlePopupClick(evt) {
    const isOverlay = evt.target.classList.contains('popup');
    const isCloseButton = evt.target.classList.contains('popup__close'); 
    if (isOverlay || isCloseButton) {
        const popup = evt.currentTarget;
        closePopup(popup);
    }
}
