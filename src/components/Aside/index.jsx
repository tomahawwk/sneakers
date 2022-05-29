import Info from '../Info'
import React from 'react';
import axios from 'axios';
import { useCart } from '../../hooks/useCart'

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const Aside = ({ onRemove, items = [], opened }) => {
    const [isOrderComplete, setIsOrderComplete] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(false);
    const [orderId, setOrderId] = React.useState(null);
    const { cartItems, setCartItems, totalPrice, setCartOpened } = useCart();
    const onClickOrder = async () => {
        try{
            setIsLoading(true);
            const {data} = await axios.post('https://6280015c7532b4920f6b1399.mockapi.io/orders', {items: cartItems});
            setOrderId(data.id)
            setCartItems([]);
            setIsOrderComplete(true);
            for (let i = 0; i < cartItems.length; i++) {
                const item = cartItems[i];
                await axios.delete('https://6280015c7532b4920f6b1399.mockapi.io/cart/' + item.id);
                await delay(1000);
            }
        }
        catch(error){
            alert("Ошибка при создании заказа :(")
        } 
        setIsLoading(false);
    }
    return (
        <div className="aside">
            <div className="aside__close" onClick={() => {setCartOpened(false)}}></div>
            <div className="aside__container">
                <div className="aside__content">
                <div className="aside__head">
                    <h2>Корзина</h2>
                    <button className="cart-close" onClick={() => {setCartOpened(false)}}>
                        <img src="/assets/img/close.svg" alt=""/>
                    </button>
                </div>
                {
                    items.length ?
                        <div className="aside__inner"> 
                            <ul className="cart-list">
                                {items.map((card) => 
                                    <li className="cart-item" key={card.key}>
                                        <img src={ card.image } alt=""/>
                                        <div className="cart-item__content">
                                            <p className="cart-item__title">{ card.title }</p>
                                            <b className="cart-item__price">{ card.price.toLocaleString('ru-RU') } руб.</b>
                                        </div>
                                        <button className="cart-close" onClick={() => onRemove(card.id)}>
                                            <img src="/assets/img/close.svg" alt=""/>
                                        </button>
                                    </li>
                                )}
                            </ul>
                        </div>
                    :
                    <div class="aside__state">
                        <Info
                            title={isOrderComplete ? "Заказ оформлен!" : "Корзина пустая"}
                            description={isOrderComplete ? `Ваш заказ #${orderId} скоро будет передан курьерской доставке` : "Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ."}
                            image={isOrderComplete ? "/assets/img/order-complete.jpg" : "/assets/img/box.png"}
                            text="Вернуться назад"
                            buttonEvent={() => setCartOpened(false)}
                        />
                    </div>
                }
                </div>

                {items.length > 0 &&
                    <div className="aside__footer">
                        <div className="cart-total">
                            <div className="cart-total__item">
                            <p>Итого:</p>
                            <b>{totalPrice.toLocaleString('ru-RU')} руб.</b>
                            </div>
                            <div className="cart-total__item">
                            <p>Налог 5%:</p>
                            <b>{(totalPrice / 100 * 5).toLocaleString('ru-RU')} руб.</b>
                            </div>
                        </div>
                        <button disabled={isLoading} className="button-green" onClick={onClickOrder}>
                            <span>Оформить заказ</span>
                            <img src="/assets/img/arrow.svg" alt=""/>
                        </button>
                    </div>
                }
            </div>
        </div>
    );
}

export default Aside;