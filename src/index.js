import './pages/index.css';

import { deletePlace, createPlaceCard, setLike } from './components/cards.js';
import { openPopup, closePopup, handlePopupClick} from './components/modal.js';
import { enableValidation, clearValidationErrors } from './components/validate.js';
import { getInitialCards, getUserInfo, updateUserProfile, postNewCard, changeAvatar } from './api.js';
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

// For user id detection 
let currentUser = null;

const avatarElement = document.querySelector('.profile__image');
const avatarPopup = document.querySelector('.popup_type_avatar');
const avatarForm = avatarPopup.querySelector('.popup__form');
const avatarLinkInput = avatarForm.querySelector('.popup__input_type_avatar-link');


avatarElement.addEventListener('click', () => {
    clearValidationErrors(avatarForm);
    openPopup(avatarPopup);
});

avatarForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    
    // Показываем индикатор загрузки
    const submitButton = avatarForm.querySelector('.popup__button');
    const originalButtonText = submitButton.textContent;
    submitButton.textContent = 'Сохранение...';
    
    changeAvatar(avatarLinkInput.value)
      .then((userData) => {
        avatarElement.style.backgroundImage = `url('${userData.avatar}')`;
        closePopup(avatarPopup);
        evt.target.reset();
      })
      .catch((err) => {
        console.log('Ошибка при обновлении аватара:', err);
      })
      .finally(() => {
        // Возвращаем оригинальный текст кнопки
        submitButton.textContent = originalButtonText;
      });
  });

function populateProfileForm() {
    nameInput.value = profileName.textContent;
    jobInput.value = profileDescription.textContent;
}

function handleProfileFormSubmit(evt) {
    evt.preventDefault();

    const submitButton = profileFormElement.querySelector('.popup__button');
    const originalButtonText = submitButton.textContent;
    submitButton.textContent = 'Сохранение...';

    updateUserProfile(nameInput.value, jobInput.value)
    .then((userData) => {
        updateUserInfo(userData);
        closePopup(editPopup);
    })
    .catch((err) => {
        console.log('Ошибка при обновлении данных пользователя', err);
    })
    .finally(() => {
        submitButton.textContent = originalButtonText;
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

    const submitButton = addCardForm.querySelector('.popup__button');
    const originalButtonText = submitButton.textContent;
    submitButton.textContent = 'Сохранение...';

    postNewCard(cardNameInput.value, cardLinkInput.value)
    .then((newCard) => {
        const placeCard = createPlaceCard(newCard, deletePlace, setLike, openImagePopup, currentUser._id);
        placesContainer.prepend(placeCard);
        evt.target.reset();
        closePopup(addCardPopup);
    })
    .catch((err) => {
        console.log('Ошибка при добавлении карточки', err);
    })
    .finally(() => {
        submitButton.textContent = originalButtonText;
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

    if (userInfo.avatar) {
        avatarElement.style.backgroundImage = `url('${userInfo.avatar}')`;
    }
}

Promise.all([getInitialCards(), getUserInfo()])
    .then(([cards, userInfo]) => {
        updateUserInfo(userInfo);
        currentUser = userInfo;

        cards.forEach((cardData) => {
            const placeCard = createPlaceCard(cardData, deletePlace, setLike, openImagePopup, userInfo._id);
            placesContainer.append(placeCard);
        });
        
    })
    .catch((err) => {
        console.log('Ошибка при получении данных', err);
    });

enableValidation();