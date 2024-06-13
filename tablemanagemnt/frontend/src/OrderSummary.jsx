

import React from 'react';
import { useLocation } from 'react-router-dom';
import './OrderSummary.css'; // Create and import a CSS file for styling

const OrderSummary = () => {
  const location = useLocation();
  const { orders, table } = location.state || { orders: [], table: '' };

  return (
    <div className="order-summary">
      <h2>Order Summary for Table {table}</h2>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Quantity</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(order => (
            <tr key={order.id}>
              <td>{order.title}</td>
              <td>{order.quantity}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button >Pay the Bill</button>
      </div>
  );
};

export default OrderSummary;
