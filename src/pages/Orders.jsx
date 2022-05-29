import React from 'react';
import axios from 'axios';
import Card from '../components/Card';
import Info from '../components/Info'

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
    <>
      {orderItems.length > 0 ? <div className="content">
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
      :
      <div className="content--empty">
        <Info
          title="У вас нет заказов"
          description='Вы нищеброд?<br> Оформите хотя бы один заказ.'
          image="/assets/img/no-orders.png"
          text="Вернуться назад"
          link="/"
        />
      </div>
    }
    </>
  )
};

export default Orders;