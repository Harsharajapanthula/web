// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// const Front = () => {
//     const [numberOfPersons, setNumberOfPersons] = useState(1);
//     const [tables, setTables] = useState([]);
//     const [selectedTable, setSelectedTable] = useState(null);
//     const navigate = useNavigate();
//     const fetchTables = async () => {
//         try {
//             console.log(`Fetching tables for ${numberOfPersons} persons`);
//             const response = await axios.get(`http://localhost:5000/tables?capacity=${numberOfPersons}`);
//             setTables(response.data);
//             console.log("Tables fetched successfully:", response.data);
//         } catch (error) {
//             console.error('Error fetching tables:', error);
//         }
//     };
//     const handleCheckboxChange = (tableNumber) => {
//         setSelectedTable(tableNumber);
//         alert(`You have selected table number ${tableNumber}`);
//     };

//     const handleFormSubmit = () => {
//         fetchTables();
//     };

//     const handleNavigateToMenu = () => {
//         if (selectedTable !== null) {
//             navigate('/Menu', { state: { table: selectedTable } });
//         } else {
//             alert('Please select a table before proceeding.');
//         }
//     };

//     return (
//         <div>
//             <p><b>Choose your table</b></p>
//             <form onSubmit={(e) => { e.preventDefault(); handleFormSubmit(); }}>
//                 <input 
//                     type="number" 
//                     value={numberOfPersons}
//                     onChange={(e) => setNumberOfPersons(e.target.value)} 
//                     min="1" // Optional: to ensure the number is positive
//                 />
//                 <button type="submit">OK</button>
//             </form>
//             <ul>
//                 {tables.map(table => (
//                     <li key={table._id}>
//                         <input 
//                             type="checkbox" 
//                             id={`table-${table.number}`} 
//                             value={table.number} 
//                             checked={selectedTable === table.number} 
//                             onChange={() => handleCheckboxChange(table.number)}
//                         />
//                         <label htmlFor={`table-${table.number}`}>Table {table.number}</label>
//                     </li>
//                 ))}
//             </ul>
//             <button type="button" onClick={handleNavigateToMenu}>Proceed to Menu</button>
//         </div>
//     );
// };

// export default Front;
