

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Tablelist.css'; // Ensure this CSS file is imported

const TableList = () => {
  const [tablesData, setTablesData] = useState([]);
  const [noOrders, setNoOrders] = useState(false);

  useEffect(() => {
    fetchTables();
  }, []);

  const fetchTables = async () => {
    try {
      const response = await axios.get('http://localhost:5000/useful');
      if (response.data.message === "uf") {
        setNoOrders(true);
        setTablesData([]);
      } else {
        setNoOrders(false);
        setTablesData(response.data);
      }
    } catch (error) {
      console.error('Error fetching tables:', error);
    }
  };

  const handleDelete = async (tableNumber) => {
    try {
      await axios.put(`http://localhost:5000/remove/${tableNumber}`);
      // Remove the deleted table from the state
      setTablesData(tablesData.filter(table => table.number !== tableNumber));
    } catch (error) {
      console.error('Error deleting table:', error);
    }
  };

  return (
    <div className="table-list-container">
      <h1>Table List</h1>
      {noOrders ? (
        <p className='no'><b>No orders</b></p>
      ) : (
        tablesData.map(table => (
          <div className="table-card" key={table._id}>
            <h2>Table Number: {table.number}</h2>
            <h2>Name: {table.name}</h2>
            <h2>Number: {table.phone}</h2>
            <ul>
              {table.orders.map((order, index) => (
                <li key={index}>
                  <p>Title: {order.title}</p>
                  <p>Quantity: {order.quantity}</p>
                </li>
              ))}
            </ul>
            <button onClick={() => handleDelete(table.number)}>Delete</button>
          </div>
        ))
      )}
    </div>
  );
};

export default TableList;
