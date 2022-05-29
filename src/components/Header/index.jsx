import Logo from '../Logo';
import styles from './Header.module.sass'
import { Link } from 'react-router-dom';
import React from 'react';
import { useCart } from '../../hooks/useCart'

const Header = () => {
    const { totalPrice, setCartOpened } = useCart();
    return (
        <header className={ styles.header }>
            <div className="header__left">
                <Link to="/">
                    <Logo/>
                </Link>
            </div>
            <div className="header__right">
                <div className={ styles.buttons }>
                    <button className={ styles.button } onClick={() => setCartOpened(true)}>
                        <img src="/assets/img/cart.svg" alt=""/>
                        <span>{totalPrice.toLocaleString('ru-RU')} руб.</span>
                    </button>
                    <li className={ styles.button }>
                        <Link to="/favorites">
                            <img src="/assets/img/favorite.svg" alt=""/>
                        </Link>
                    </li>
                    <li className={ styles.button }>
                        <Link to="/orders">
                            <img src="/assets/img/user.svg" alt=""/>
                        </Link>
                    </li>
                </div>
            </div>
        </header>
    );
}

export default Header;