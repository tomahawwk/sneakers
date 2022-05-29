import React from 'react';
import axios from 'axios';
import Card from '../components/Card';
import Info from '../components/Info'
import AppContext from '../context';

const Orders = () => {
  const [orderItems, setOrderItems] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState([]);
  React.useEffect(() => {
    (async () => {
      try{
        const { data } = await axios.get("https://6280015c7532b4920f6b1399.mockapi.io/orders");
        setOrderItems(data.map((obj) => obj.items).flat())
        setIsLoading(false);
      }
      catch(error){
        alert('Ошибка при запросе заказов')
      }
      
    })();
  }, [])

  return (
    <div className="content">
      <div className="content__head">
        <h1>Мои заказы</h1>
      </div>
      <div className="cards">
        {(isLoading ? [...Array(10)] : orderItems).map((card, index) => 
          <Card
            key={index}
            loading={isLoading}
            {...card}
          />
        )}
      </div>
    </div>
  )
};

export default Orders;