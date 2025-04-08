import { deleteCard, likeCard, dislikeCard } from '../api.js';

export function deletePlace(evt, cardId) {
    const placeCardTarget = evt.target.closest('.places__item');
    deleteCard(cardId)
    .then(() => {
        placeCardTarget.remove();
    })
    .catch((err) => {
        console.log('Ошибка при удалении карточки', err);
    });
}

export function setLike(likeButton, cardId) {
  const isLiked = likeButton.classList.contains('card__like-button_is-active');
  const likeCountElement = likeButton.closest('.card__like-container').querySelector('.card__like-count');
  
  if (!isLiked) {
    likeCard(cardId)
      .then((updatedCard) => {
        likeButton.classList.add('card__like-button_is-active');
        likeCountElement.textContent = updatedCard.likes.length;
      })
      .catch((err) => {
        console.log('Ошибка при добавлении лайка:', err);
      });
  } else {
    dislikeCard(cardId)
      .then((updatedCard) => {
        likeButton.classList.remove('card__like-button_is-active');
        likeCountElement.textContent = updatedCard.likes.length;
      })
      .catch((err) => {
        console.log('Ошибка при удалении лайка:', err);
      });
  }
}

export function createPlaceCard(cardData, deleteHandler, setLike, openImagePopup, userId) {
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
    const likeCount = placeElement.querySelector('.card__like-count');

    likeCount.textContent = cardData.likes.length;

    likeButton.addEventListener('click', () => {
        setLike(likeButton, cardData._id);
    });

    const isOwner = cardData.owner._id === userId;
    if (!isOwner) {
        removePlaceButton.remove();
    }

    removePlaceButton.addEventListener('click', (evt) => {
      deleteHandler(evt, cardData._id);
    });

    return placeElement;
}
