
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import menu from './data.js';
import './Menu.css';
import axios from 'axios';

const Menu = () => {
  const [quantities, setQuantities] = useState({});
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const table = location.state?.table;
  const name = location.state?.name;
  const num = location.state?.num;

  const increase = (id, title) => {
    setQuantities(prev => {
      const newQuantities = {
        ...prev,
        [id]: (prev[id] || 0) + 1
      };
      handleOrder(id, title, newQuantities[id]);
      return newQuantities;
    });
  };

  const decrease = (id, title) => {
    setQuantities(prev => {
      const newQuantities = {
        ...prev,
        [id]: (prev[id] || 0) > 0 ? prev[id] - 1 : 0
      };
      handleOrder(id, title, newQuantities[id]);
      return newQuantities;
    });
  };

  const handleOrder = (id, title, quantity) => {
    setOrders(prev => {
      const existingOrder = prev.find(order => order.id === id);
      if (quantity > 0) {
        if (existingOrder) {
          return prev.map(order =>
            order.id === id ? { ...order, quantity } : order
          );
        } else {
          return [...prev, { id, title, quantity }];
        }
      } else {
        return prev.filter(order => order.id !== id);
      }
    });
  };

  const handleSubmit = async () => {
    const ordersList = menu.map(item => ({
      id: item.id,
      title: item.title,
      quantity: quantities[item.id] || 0
    })).filter(order => order.quantity > 0);

    try {
      await axios.post('http://localhost:5000/submitorders', {
        tableNumber: table,
        orders: ordersList,
        name: name,
        phone: num
      });
      navigate('/OrderSummary', { state: { orders: ordersList, table } });
    } catch (error) {
      console.error('Error updating orders:', error);
    }
  };

  return (
    <div className="menuall">
      <div className="menu">
        {menu.map(item => (
          <div key={item.id} className="gallery">
            <img src={item.img} alt={item.title} />
            <div className="item-info">
              <h3>{item.title}</h3>
              <p className="price">${item.price}</p>
              <p className="desc">{item.desc}</p>
              <div className="btn">
                <button onClick={() => decrease(item.id, item.title)}>-</button>
                <button>{quantities[item.id] || 0}</button>
                <button onClick={() => increase(item.id, item.title)}>+</button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <button onClick={handleSubmit} className="click">Submit Orders</button>
    </div>
  );
};

export default Menu;
