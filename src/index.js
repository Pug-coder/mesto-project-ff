import './pages/index.css';

import { initialCards, deletePlace, createPlaceCard, setLike } from './components/cards.js';
import { openPopup, closePopup, handlePopupClick} from './components/modal.js';

const placesContainer = document.querySelector('.places__list');


const profileName = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');


const profileFormElement = document.querySelector('.popup__form');
const nameInput = profileFormElement.querySelector('.popup__input_type_name');
const jobInput = profileFormElement.querySelector('.popup__input_type_description');


const addCardButton = document.querySelector('.profile__add-button');
const editPopup = document.querySelector('.popup_type_edit');
const editProfileButton = document.querySelector('.profile__edit-button');

const addCardPopup = document.querySelector('.popup_type_new-card');
const addCardForm = addCardPopup.querySelector('.popup__form');
const cardNameInput = addCardForm.querySelector('.popup__input_type_card-name');
const cardLinkInput = addCardForm.querySelector('.popup__input_type_url');

const popups = document.querySelectorAll('.popup');

const imagePopup = document.querySelector('.popup_type_image'); 
const imageElement = imagePopup.querySelector('.popup__image'); 
const captionElement = imagePopup.querySelector('.popup__caption');

function populateProfileForm() {
    nameInput.value = profileName.textContent;
    jobInput.value = profileDescription.textContent;
}

function handleProfileFormSUbmit(evt) {
    evt.preventDefault();

    profileName.textContent = nameInput.value;
    profileDescription.textContent = jobInput.value;

    closePopup(editPopup);
}

function openImagePopup(name, link) {
    imageElement.src = link;
    imageElement.alt = name;
    captionElement.textContent = name;
    
    openPopup(imagePopup);
}

function handleAddCardSubmit(evt) {
    evt.preventDefault();

    const newCard = {
        name: cardNameInput.value,
        link: cardLinkInput.value,
    };

    const placeCard = createPlaceCard(newCard, deletePlace, setLike, openImagePopup);
    placesContainer.prepend(placeCard);

    cardNameInput.value = '';
    cardLinkInput.value = '';

    closePopup(addCardPopup);
}

popups.forEach((popup) => {
    popup.addEventListener('click', handlePopupClick);
});

profileFormElement.addEventListener('submit', handleProfileFormSUbmit);
editProfileButton.addEventListener('click', () => {
    populateProfileForm();
    openPopup(editPopup);
});


addCardButton.addEventListener('click', () => {
    openPopup(addCardPopup);
});
addCardForm.addEventListener('submit', handleAddCardSubmit);

function addPlaces() {
    initialCards.forEach((cardData) => {
        const placeCard = createPlaceCard(cardData, deletePlace, setLike, openImagePopup);
        placesContainer.append(placeCard);
    });
}
addPlaces();