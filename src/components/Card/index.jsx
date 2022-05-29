import React from 'react'
import styles from './Card.module.sass'
import ContentLoader from 'react-content-loader';
import AppContext from '../../context';

const Card = ({ 
    id, 
    title, 
    image, 
    price, 
    onAdd, 
    onFavorite, 
    favorited = false,
    loading = false }) => {

    const [isFavorite, setIsFavorite] = React.useState(favorited);
    const { isItemAdded } = React.useContext(AppContext);
    const obj = { id, parentId: id, title, image, price };

    const onClickPlus = () => {
        onAdd(obj);
    }

    const onClickFavorite = () => {
        setIsFavorite(!isFavorite);
        onFavorite(obj);
    }

    return (
        <div className={ styles.card }>
            {
                loading ?
                <ContentLoader 
                    speed={2}
                    width={155}
                    height={187}
                    viewBox="0 0 155 187"
                    backgroundColor="#f3f3f3"
                    foregroundColor="#ecebeb"
                    
                >
                    <rect x="0" y="0" rx="10" ry="10" width="155" height="90" /> 
                    <rect x="0" y="102" rx="3" ry="3" width="155" height="15" /> 
                    <rect x="0" y="126" rx="3" ry="3" width="93" height="15" /> 
                    <rect x="0" y="158" rx="8" ry="8" width="80" height="25" /> 
                    <rect x="124" y="152" rx="8" ry="8" width="32" height="32" />
                </ContentLoader>
            :
            <>
                {onFavorite && <button className={ styles.favorite } onClick={onClickFavorite}>
                    <img src={isFavorite ? `/assets/img/heart-liked.svg` : "/assets/img/heart-unliked.svg"} alt=""/>
                </button>}
                <div className={ styles.image }>
                    <img src={ image } alt=""/>
                </div>
                <div className={ styles.content }>
                    <p className={ styles.title }>{ title }</p>
                    <div className={ styles.bottom }>
                        <div className={ styles.price }>
                            <span>Цена</span>
                            <b>{ price.toLocaleString('ru-RU') } руб.</b>
                        </div>
                        {onAdd && <button className={ styles.button } onClick={ onClickPlus }>
                            <img src={isItemAdded(id) ? `/assets/img/button-checked.svg` : "/assets/img/button-unchecked.svg"} alt=""/>
                        </button>}
                    </div>
                </div>
            </>
            }
        </div>
    );
}

export default Card;