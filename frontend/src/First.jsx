
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './First.css';

const First = () => {
  const [numberOfPersons, setNumberOfPersons] = useState(1);
  const [tables, setTables] = useState([]);
  const [selectedTable, setSelectedTable] = useState(null);
  const [name, setName] = useState('');
  const [num, setNum] = useState('');
  const navigate = useNavigate();

  const fetchTables = async () => {
    try {
      console.log(`Fetching tables for ${numberOfPersons} persons`);
      const response = await axios.get(`http://localhost:5000/tables?capacity=${numberOfPersons}`);
      setTables(response.data);
      console.log("Tables fetched successfully:", response.data);
    } catch (error) {
      console.error('Error fetching tables:', error);
    }
  };

  const handleCheckboxChange = (tableNumber) => {
    setSelectedTable(tableNumber);
    alert(`You have selected table number ${tableNumber}`);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchTables();
  };

  const handleNavigateToMenu = () => {
    if (selectedTable !== null && name && num) {
      navigate('/Menu', { state: { table: selectedTable, name: name, num: num } });
    } else {
      alert('Please provide all details and select a table before proceeding.');
    }
  };

  return (
    <div className='all'>
      <h1>Apply Here</h1>
      <div className='login-container'>
        <form onSubmit={handleSubmit} className='login-form'>
          <div>
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="phoneNumber">Phone Number:</label>
            <input
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              value={num}
              onChange={(e) => setNum(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="entryCapacity">Entry Capacity:</label>
            <input 
              type="number" 
              value={numberOfPersons}
              onChange={(e) => setNumberOfPersons(e.target.value)} 
              min="1" 
            />
            <button type="submit">OK</button>
          </div>
        </form>
      
        <ul>
          {tables.map(table => (
            <li key={table._id}>
              <input 
                type="checkbox" 
                id={`table-${table.number}`} 
                value={table.number} 
                checked={selectedTable === table.number} 
                onChange={() => handleCheckboxChange(table.number)}
              />
              <label htmlFor={`table-${table.number}`}>Table {table.number}</label>
            </li>
          ))}
        </ul>
        <button type="button" onClick={handleNavigateToMenu} className='mainbtn'>Proceed to Menu</button>
      </div>
    </div>
  );
};

export default First;
