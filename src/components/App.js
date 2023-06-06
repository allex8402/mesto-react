import React from 'react'
import Header from './Header'
import Main from './Main'
import Footer from './Footer'
import PopupWithForm from './PopupWithForm'
import ImagePopup from './ImagePopup'


function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(null);

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  };

  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  };

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  };
  const handleCardClick = (card) => {
    setSelectedCard(card)
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard(null)
  }
  return (
    <div className="page__container">
      <Header />
      <Main
        onEditProfile={handleEditProfileClick}
        onAddPlace={handleAddPlaceClick}
        onEditAvatar={handleEditAvatarClick}
        onCardClick={handleCardClick}
      />
      <Footer />

      <PopupWithForm title="Обновить аватар" name="avatar" isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} >
        <fieldset className="popup__fieldset" name="personal_info">
          <input className="popup__input popup__input_type_avatar" id="avatar" type="url" name="avatar" placeholder="Ссылка на картинку" required />
          <span className="avatar-error error"></span>
        </fieldset>
      </PopupWithForm>

      <PopupWithForm title="Редактировать профиль" name="user" isOpen={isEditProfilePopupOpen} onClose={closeAllPopups}>
        <fieldset className="popup__fieldset" name="personal_info">
          <input id="name" className="popup__input popup__input_type_name" type="text" name="name" required minLength="2" maxLength="40" />
          <span className="name-error error"></span>
          <input id="job" className="popup__input popup__input_type_job" type="text" name="about" required minLength="2" maxLength="200" />
          <span className="job-error error"></span>
        </fieldset>
      </PopupWithForm>

      <PopupWithForm title="Новое место" name="card" isOpen={isAddPlacePopupOpen} onClose={closeAllPopups}>
        <fieldset className="popup__fieldset" name="personal_info">
          <input className="popup__input popup__input_type_image" id="image" type="text" name="image" placeholder="Название" required minLength="2" maxLength="30" />
          <span className="image-error error"></span>
          <input className="popup__input popup__input_type_link" id="link" type="url" name="link" placeholder="Ссылка на картинку" required />
          <span className="link-error error"></span>
        </fieldset>
      </PopupWithForm>

      <PopupWithForm title="Вы уверены?" name="delete">
        <button className="popup__button" type="submit">Да</button>
      </PopupWithForm>
      <ImagePopup card={selectedCard} onClose={closeAllPopups} />

    </div>
  );
}

export default App;
