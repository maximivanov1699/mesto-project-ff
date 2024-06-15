const config = {
  url: `https://nomoreparties.co/v1/wff-cohort-15`,
  headers: {
    authorization: '3edc714a-c9d7-4fef-8e94-6bdb254545b0',
    'Content-Type': 'application/json'
  }
}

// fetch запрос
function handleFetch(path, method, body) {
  return fetch(`${config.url}${path}`, {
    method, body:JSON.stringify(body),
    headers:config.headers
  })
  // обработка ответа
  .then(res => {
    if (res.ok) {
      return res.json();
  }
  return Promise.reject(`Ошибка ${res.status}`);
  })
}

// получаем информацию о пользователе
function getUserInfo() {
  return handleFetch('/users/me', 'GET')
}

// достаем информацию о карточках
function getAllCards() {
  return handleFetch('/cards', 'GET')
}

function editProfileInfo(data) {
  return handleFetch('/users/me', 'PATCH', data)
}

function addNewCard(data) {
  return handleFetch('/cards', 'POST', data)
}

function handleDeleteCard(id) {
  return handleFetch(`/cards/${id}`, 'DELETE')
}

function handleLikeCard(id) {
  return handleFetch(`/cards/likes/${id}`, 'PUT')
}

function handleDislikeCard(id) {
  return handleFetch(`/cards/likes/${id}`, 'DELETE')
}

function editProfileAvatar(data) {
  return handleFetch('/users/me/avatar', 'PATCH', data)
}

export {
  getUserInfo, getAllCards, editProfileInfo, addNewCard, handleDeleteCard, handleLikeCard,
  handleDislikeCard, editProfileAvatar
}

