import { request } from './utils/request';

const config = {
    baseUrl: 'https://nomoreparties.co/v1/wff-cohort-35',
    headers: {
      authorization: 'f6cf2233-9853-45a5-a502-9e9e59d8c5ca',
      'Content-Type': 'application/json'
    }
  }
  
  function getApiUrl(endpoint) {
    return `${config.baseUrl}/${endpoint}`;
  }

  export const getInitialCards = () => {
    return request(getApiUrl('cards'), {
      headers: config.headers
    });
  } 

  export const getUserInfo = () => {
    return request(getApiUrl('users/me'), {
      headers: config.headers
    });
  }

  export const updateUserProfile = (name, about) => {
    return request(getApiUrl('users/me'), {
      method: 'PATCH',
      headers: config.headers,
      body: JSON.stringify({ name, about })
    });
  }

  export const postNewCard = (name, link) => {
    return request(getApiUrl('cards'), {
      method: 'POST',
      headers: config.headers,
      body: JSON.stringify({ name, link })
    });
  }
  
export const deleteCard = (cardId) => {
  return request(getApiUrl(`cards/${cardId}`), {
    method: 'DELETE',
    headers: config.headers
  });
}

export const likeCard = (cardId) => {
  return request(getApiUrl(`cards/likes/${cardId}`), {
    method: 'PUT',
    headers: config.headers
  });
}

export const dislikeCard = (cardId) => {
  return request(getApiUrl(`cards/likes/${cardId}`), {
    method: 'DELETE',
    headers: config.headers
  });
}

export const changeAvatar = (avatar) => {
  return request(getApiUrl(`users/me/avatar`), {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({ avatar })
  });
}