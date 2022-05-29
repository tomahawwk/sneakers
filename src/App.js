import React from 'react';
import { Route, Routes } from 'react-router-dom';
import axios from 'axios';
import Header from './components/Header';
import Aside from './components/Aside';
import Home from './pages/Home';
import Favorites from './pages/Favorites';
import Orders from './pages/Orders';
import AppContext from './context';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';

const App = () => {
  const [items, setItems] = React.useState([]);
  const [cartItems, setCartItems] = React.useState([]);
  const [favorites, setFavorites] = React.useState([]);
  const [cartOpened, setCartOpened] = React.useState(false);
  const [searchValue, setSearchValue] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    async function fetchData() {
      try{
        const [cartResponse, favoriteResponse, itemsResponse] = await Promise.all([
          axios.get("https://6280015c7532b4920f6b1399.mockapi.io/cart"),
          axios.get("https://6280015c7532b4920f6b1399.mockapi.io/favorites"), 
          axios.get("https://6280015c7532b4920f6b1399.mockapi.io/items")
        ]);

        setIsLoading(false);
        setCartItems(cartResponse.data);
        setFavorites(favoriteResponse.data);
        setItems(itemsResponse.data);
      }
      catch(error){ 
        alert("Ошибка при запросе данных")
      }
    }
    fetchData();
  }, [])

  const onCartAdd = async (obj) => {
    try{
      const findItem = cartItems.find((cartObj) => Number(cartObj.parentId) === Number(obj.id));
      if(findItem){
        setCartItems(prev => prev.filter(item => Number(item.parentId) !== Number(obj.id)))
        await axios.delete(`https://6280015c7532b4920f6b1399.mockapi.io/cart/${findItem.id}`)
      }
      else{
        setCartItems((prev) => [...prev, obj]);
        const { data } = await axios.post("https://6280015c7532b4920f6b1399.mockapi.io/cart", obj)
        setCartItems((prev) => prev.map(item => {
          if(item.parentId === data.parentId){
            return {
              ...item,
              id: data.id
            }
          }
          return item;
        }));
      }
    }
    catch(error){
      alert('Не удалось добавить товар')
    }
  }

  const onAddToFavorite = async (obj) => {
    try {
      if(favorites.find((favObj) => Number(favObj.id) === Number(obj.id))){
        axios.delete(`https://6280015c7532b4920f6b1399.mockapi.io/favorites/${obj.id}`)
        setFavorites((prev) => prev.filter((item) => Number(item.id) !== Number(obj.id)));
      }
      else{
        const { data } = await axios.post("https://6280015c7532b4920f6b1399.mockapi.io/favorites", obj);
        setFavorites(prev => [...prev, data])
      }
    }
    catch(error){
      alert('Не удалось добавить в избранное')
    }
  }
  
  const onRemoveFromCart = async (id) => {
    try{
      await axios.delete(`https://6280015c7532b4920f6b1399.mockapi.io/cart/${id}`)
      setCartItems((prev) => prev.filter((item) => Number(item.id) !== Number(id)));
    }
    catch(error){
      console.log("Ошибка при удалении из корзины")
    }
  }

  const onChangeSearch = (e) => {
    setSearchValue(e.target.value)
  }

  const isItemAdded = (id) => {
    return cartItems.some(obj => Number(obj.parentId) === Number(id));
  }

  return(
  <AppContext.Provider value={{ 
    cartItems,
    favorites,
    items,
    isItemAdded,
    onAddToFavorite,
    onCartAdd,
    setCartOpened,
    setCartItems
    }}>

    <div className="wrapper">
    <CSSTransitionGroup 
      transitionName="aside"
      transitionEnterTimeout={500}
      transitionLeaveTimeout={500}>
      {cartOpened && 
        <Aside 
          onRemove={onRemoveFromCart}
          items={cartItems}  
          opened={cartOpened}
        />
      }
      </CSSTransitionGroup>
      <Header
        onOpenCart={() => setCartOpened(true)}
      />
      <Routes>
        <Route path="/" exact element={
          <Home
            items={items}
            cartItems={cartItems}
            searchValue={searchValue}
            setSearchValue={setSearchValue}
            onChangeSearch={onChangeSearch}
            onAddToFavorite={onAddToFavorite}
            onCartAdd={onCartAdd}
            isLoading={isLoading}
          />
        } />
        <Route path="/favorites" exact element={
          <Favorites/>
        } />
        <Route path="/orders" exact element={
          <Orders/>
        } />
      </Routes>
    </div>
  </AppContext.Provider>  
  )
}

export default App;