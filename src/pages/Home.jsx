import React from 'react';
import Card from '../components/Card';
import Search from '../components/Search';

const Home = ({
  items,
  searchValue, 
  setSearchValue,
  onChangeSearch, 
  onAddToFavorite, 
  onCartAdd, 
  isLoading
}) => {
    
    const renderItems = () => {
      const filteredItems = items.filter((item) => 
        item.title.toLowerCase().includes(searchValue.toLowerCase())
      );

      return(isLoading ? [...Array(15)] : filteredItems).map((card, index) => (
        <Card
          key={index}
          loading={isLoading}
          onAdd = {(card) => onCartAdd(card)}
          onFavorite={(card) => onAddToFavorite(card)}
          {...card}
        />
      ));
    }
    
    return (
    <div className="content">
        <div className="content__head">
        <h1>{searchValue ? `Поиск по запросу: "${searchValue}"` : "Все кроссовки"}</h1>
            <Search
              onChangeInput={onChangeSearch}
              value={searchValue}
              setValue={setSearchValue}
            />
        </div>
        <div className="cards">{renderItems()}</div>
    </div>
)};

export default Home;