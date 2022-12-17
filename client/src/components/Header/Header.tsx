import React from 'react';
import './Header.scss';
import logo from '../../resources/logo.png'
import add from '../../resources/icons/add.svg';

const Header = (props: any) => {
    const user = "użytkowniku";

    const logoClicked = () => {
        console.log("logo clicked");
    }


    const addRoomClicked = () => {
        console.log("add room clicked");
    }

    const settingsClicked = () => {
        console.log("settings clicked");
    }

    const signOutClicked = () => {
        console.log("signout clicked");
    }

    return (
        <nav className='container'>
            <div className='first'>
                <img src={logo} onClick={logoClicked}></img>
                <h2>Witaj, <b>{props.user ?? user}!</b></h2>
            </div>
            <div className='second'>
                <button className='addroom' onClick={addRoomClicked}><span>Utwórz pokój</span><img src={add}></img></button>
                <button className='settings' onClick={settingsClicked}></button>
                <button className='out' onClick={signOutClicked}></button>
            </div>
        </nav>
    )
}

export default Header;