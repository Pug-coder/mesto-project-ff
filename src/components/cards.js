export const initialCards = [
    {
      name: "Архыз",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
    },
    {
      name: "Челябинская область",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
    },
    {
      name: "Иваново",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
    },
    {
      name: "Камчатка",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
    },
    {
      name: "Холмогорский район",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
    },
    {
      name: "Байкал",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
    }
];


export function deletePlace(evt) {
    const placeCardTarget = evt.target.closest('.places__item');
    placeCardTarget.remove();
    
}

export function setLike(placeCardElement) {
  placeCardElement.classList.toggle('card__like-button_is-active');
}

export function createPlaceCard(cardData, deleteHandler, setLike, openImagePopup) {
    const placeTemplate = document.querySelector('#card-template').content;
    const placeElement = placeTemplate.querySelector('.places__item').cloneNode(true);

    placeElement.querySelector('.card__title').textContent = cardData.name;

    const placeImg = placeElement.querySelector('.card__image');
    placeImg.src = cardData.link;
    placeImg.alt = cardData.name;
    
    placeImg.addEventListener('click', () => {
        openImagePopup(cardData.name, cardData.link)
    });
    
    const removePlaceButton = placeElement.querySelector('.card__delete-button');

    const likeButton = placeElement.querySelector('.card__like-button');
    likeButton.addEventListener('click', () => {
        setLike(likeButton);
    });

    removePlaceButton.addEventListener('click', deleteHandler);

    return placeElement;
}


function openPlaceCardForm() {
  
}