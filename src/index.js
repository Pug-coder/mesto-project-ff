import './pages/index.css';

import { deletePlace, createPlaceCard, setLike } from './components/cards.js';
import { openPopup, closePopup, handlePopupClick} from './components/modal.js';
import { enableValidation, clearValidationErrors } from './components/validate.js';
import { getInitialCards, getUserInfo, updateUserProfile, postNewCard } from './api.js';
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

function handleProfileFormSubmit(evt) {
    evt.preventDefault();

    updateUserProfile(nameInput.value, jobInput.value)
    .then((userData) => {
        updateUserInfo(userData);
        closePopup(editPopup);
    })
    .catch((err) => {
        console.log('Ошибка при обновлении данных пользователя', err);
    });
    
}

function openImagePopup(name, link) {
    imageElement.src = link;
    imageElement.alt = name;
    captionElement.textContent = name;
    
    openPopup(imagePopup);
}

function handleAddCardSubmit(evt) {
    evt.preventDefault();

    Promise.all([postNewCard(cardNameInput.value, cardLinkInput.value), getUserInfo()])
    .then(([newCard, userInfo]) => {
        updateUserInfo(userInfo);
        const placeCard = createPlaceCard(newCard, deletePlace, setLike, openImagePopup);
        placesContainer.prepend(placeCard);
        evt.target.reset();
        closePopup(addCardPopup);
    })
    .catch((err) => {
        console.log('Ошибка при добавлении карточки', err);
    });

}

popups.forEach((popup) => {
    popup.addEventListener('click', handlePopupClick);
});

profileFormElement.addEventListener('submit', handleProfileFormSubmit);
editProfileButton.addEventListener('click', () => {
    populateProfileForm();
    clearValidationErrors(profileFormElement);
    openPopup(editPopup);
});


addCardButton.addEventListener('click', () => {
    clearValidationErrors(addCardForm);
    openPopup(addCardPopup);
});
addCardForm.addEventListener('submit', handleAddCardSubmit);

function updateUserInfo(userInfo) {
    profileName.textContent = userInfo.name;
    profileDescription.textContent = userInfo.about;
}

Promise.all([getInitialCards(), getUserInfo()])
    .then(([cards, userInfo]) => {
        cards.forEach((cardData) => {
            updateUserInfo(userInfo);

            const placeCard = createPlaceCard(cardData, deletePlace, setLike, openImagePopup);
            placesContainer.append(placeCard);
        });
        
    })
    .catch((err) => {
        console.log('Ошибка при получении данных', err);
    });

enableValidation();