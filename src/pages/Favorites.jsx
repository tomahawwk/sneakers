import React from 'react';
import Card from '../components/Card';
import AppContext from '../context';
import Info from '../components/Info'

const Favorites = () => {
    const { favorites, onAddToFavorite, onCartAdd } = React.useContext(AppContext);

    return (
      <>
        {favorites.length > 0 ?
          <div className="content">
            <div className="content__head">
              <h1>Мои закладки</h1>
            </div>
            <div className="cards">
                {favorites.map((card) => 
                    <Card
                      key={card.key}
                      onAdd = {() => onCartAdd(card)}
                      onFavorite={() => onAddToFavorite(card)}
                      favorited={true}
                      {...card}
                    />
                  )
                }
            </div>
          </div>
          :
          <div className="content--empty">
            <Info
              title="Закладок нет :("
              description="Вы ничего не добавляли в закладки"
              image="/assets/img/empty-favorites.png"
              buttonText="Вернуться назад"
            />
          </div>
        }
    </>
)};

export default Favorites;