import './pages/index.css';

import { initialCards, deletePlace, createPlaceCard, setLike } from './components/cards.js';
import { openPopup, closePopup, enablePopupClose, openImagePopup } from './components/modal.js';

const placesContainer = document.querySelector('.places__list');


const profileName = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');


const formElement = document.querySelector('.popup__form');
const nameInput = formElement.querySelector('.popup__input_type_name');
const jobInput = formElement.querySelector('.popup__input_type_description');


const editPopup = document.querySelector('.popup_type_edit');
const editProfileButton = document.querySelector('.profile__edit-button');

const addCardButton = document.querySelector('.profile__add-button');
const addCardPopup = document.querySelector('.popup_type_new-card');
const addCardForm = addCardPopup.querySelector('.popup__form');
const cardNameInput = addCardForm.querySelector('.popup__input_type_card-name');
const cardLinkInput = addCardForm.querySelector('.popup__input_type_url');


function populateForm() {
    nameInput.value = profileName.textContent;
    jobInput.value = profileDescription.textContent;
}


function handleFormSubmit(evt) {
    evt.preventDefault();

    profileName.textContent = nameInput.value;
    profileDescription.textContent = jobInput.value;

    closePopup(editPopup);
}


function handleAddCardSubmit(evt) {
    evt.preventDefault();

    const newCard = {
        name: cardNameInput.value,
        link: cardLinkInput.value,
    };

    initialCards.unshift(newCard);
    const placeCard = createPlaceCard(newCard, deletePlace, setLike, openImagePopup);
    placesContainer.prepend(placeCard);

    cardNameInput.value = '';
    cardLinkInput.value = '';

    closePopup(addCardPopup);
}


formElement.addEventListener('submit', handleFormSubmit);
editProfileButton.addEventListener('click', () => {
    populateForm();
    openPopup(editPopup);
});
enablePopupClose(editPopup);


addCardButton.addEventListener('click', () => {
    openPopup(addCardPopup);
});
addCardForm.addEventListener('submit', handleAddCardSubmit);
enablePopupClose(addCardPopup);

function addPlaces() {
    initialCards.forEach((cardData) => {
        const placeCard = createPlaceCard(cardData, deletePlace, setLike, openImagePopup);
        placesContainer.append(placeCard);
    });
}
addPlaces();