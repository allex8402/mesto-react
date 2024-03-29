import React from 'react';
import api from '../utils/Api';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import DeletePopup from './DeletePopup';

function App() {
  // Состояния компонента
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isDeletePopupOpen, setIsDeletePopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(null);
  const [currentUser, setCurrentUser] = React.useState('');
  const [cards, setCards] = React.useState([]);
  const [removeCard, setRemoveCard] = React.useState('');

  // Получение данных пользователя и начальных карточек при загрузке компонента
  React.useEffect(() => {
    Promise.all([api.getUserInfo(), api.getInitialCards()])
      .then(([userData, initialCards]) => {
        setCurrentUser(userData);
        setCards(initialCards);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // Обработчики открытия попапов
  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  };

  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  };

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  };

  const handleDeletePopupClick = (card) => {
    setIsDeletePopupOpen(true);
    setRemoveCard(card)
  };


  // Обработчик клика по карточке
  const handleCardClick = (card) => {
    setSelectedCard(card);
  };

  // Закрытие всех попапов
  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsDeletePopupOpen(false);
    setSelectedCard(null);
  }

  // Обработчик лайка карточки
  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    // Отправляем запрос в API и получаем обновлённые данные карточки
    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => (c._id === card._id ? newCard : c)));
      })
      .catch((err) => console.log(err));
  }

  // Удаление карточки
  function handleCardDelete(card) {
    // Отправляем запрос в API для удаления карточки
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((cards) => cards.filter((c) => card._id !== c._id));
        closeAllPopups();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  // Обновление информации о пользователе
  function handleUpdateUser(userData) {
    api
      .editProfile({
        name: userData.name,
        about: userData.about
      })
      .then((updatedUser) => {
        setCurrentUser(updatedUser);
        closeAllPopups();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  // Обновление аватара пользователя
  function handleUpdateAvatar(data) {
    api
      .editAvatar({ avatar: data.avatar })
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  // Добавление новой карточки
  const handleAddPlaceSubmit = (data) => {
    api
      .addNewCard(data)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      });
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page__container">
        <Header />
        <Main
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onEditAvatar={handleEditAvatarClick}
          onCardClick={handleCardClick}
          cards={cards}
          onCardLike={handleCardLike}
          onCardDelete={handleCardDelete}
          onDeletePopup={handleDeletePopupClick}
        />
        <Footer />

        <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />

        <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />

        <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit} />

        <DeletePopup card={removeCard} isOpen={isDeletePopupOpen} onClose={closeAllPopups} onCardDelete={handleCardDelete} />

        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;