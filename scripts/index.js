const placesContainer = document.querySelector('.places__list');


function deletePlace(evt) {
    const placeCardTarget = evt.target.closest('.places__item');
    placeCardTarget.remove();
    
}

function createPlaceCard(cardData, deleteHandler) {
    const placeTemplate = document.querySelector('#card-template').content;
    const placeElement = placeTemplate.querySelector('.places__item').cloneNode(true);

    placeElement.querySelector('.card__title').textContent = cardData.name;

    const placeImg = placeElement.querySelector('.card__image');
    placeImg.src = cardData.link;
    placeImg.alt = cardData.name;
    
    const removePlaceButton = placeElement.querySelector('.card__delete-button');

    removePlaceButton.addEventListener('click', deleteHandler);

    return placeElement;
}

function addPlaces() {
    initialCards.forEach( (cardData) =>  {
        const placeCard = createPlaceCard(cardData, deletePlace)
        placesContainer.append(placeCard)
    });
}


addPlaces();
