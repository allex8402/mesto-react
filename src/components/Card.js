import React from 'react';

function Card({ card, onCardClick }) {
    function handleClick() {
        onCardClick(card);
    }

    return (
        <li className="element" key={card._id}>
            <button type="button" className="element__remove"></button>
            <img
                className="element__img"
                style={{ backgroundImage: `url(${card.link})` }}
                onClick={handleClick}

            />
            <div className="element__content">
                <h2 className="element__title">{card.name}</h2>
                <div className="element__hart-counter">
                    <button type="button" className="element__hart"></button>
                    <span className="element__likes">{card.likes.length}</span>
                </div>
            </div>
        </li>
    );
}

export default Card;