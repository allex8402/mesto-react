import React from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({ isOpen, onClose, onAddPlace }) {

    const imageRef = React.useRef();
    const linkRef = React.useRef();

    function handleSubmit(e) {
        e.preventDefault();
        onAddPlace({
            image: imageRef.current.value,
            link: linkRef.current.value
        });
    }

    return (
        <PopupWithForm title="Новое место" name="card" isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit} submitButtonText="Сохранить">
            <fieldset className="popup__fieldset" name="personal_info">
                <input className="popup__input popup__input_type_image" ref={imageRef} id="image" type="text" name="image" placeholder="Название" required minLength="2" maxLength="30" />
                <span className="image-error error"></span>
                <input className="popup__input popup__input_type_link" ref={linkRef} id="link" type="url" name="link" placeholder="Ссылка на картинку" required />
                <span className="link-error error"></span>
            </fieldset>
        </PopupWithForm>
    )
}
export default AddPlacePopup;
