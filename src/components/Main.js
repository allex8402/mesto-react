import React from 'react';
import api from '../utils/Api';
import Card from './Card'




function Main({ onEditProfile, onAddPlace, onEditAvatar, onCardClick }) {
    const [userName, setUserName] = React.useState('');
    const [userDescription, setUserDescription] = React.useState('');
    const [userAvatar, setUserAvatar] = React.useState('');
    const [cards, setCards] = React.useState([]);


    React.useEffect(() => {
        api.getUserInfo()
            .then((data) => {
                setUserName(data.name);
                setUserDescription(data.about);
                setUserAvatar(data.avatar);
            })
            .catch((error) => {
                console.log(error);
            });
        api.getInitialCards()
            .then((data) => {
                setCards(data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);


    return (<div>
        <main>
            <section className="profile">
                <img className="profile__avatar" style={{
                    backgroundImage: `url(${userAvatar})`, backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }} />
                <button className="profile__avatar-button" onClick={onEditAvatar}></button>
                <div className="profile__info">
                    <div className="profile__card">
                        <h1 className="profile__title">{userName}</h1>
                        <button className="profile__rectangle" onClick={onEditProfile}></button>
                    </div>
                    <p className="profile__subtitle">{userDescription}</p>
                </div>
                <button className="profile__button" onClick={onAddPlace}></button>

            </section>
            <section className="elements">
                <ul className="elements__container">
                    {cards.map((card) => (
                        <Card key={card._id} card={card} onCardClick={onCardClick} />
                    ))}
                </ul>
            </section>

        </main>
    </div>
    );
}

export default Main;