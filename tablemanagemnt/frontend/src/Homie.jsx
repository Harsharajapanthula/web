// import React from 'react';
// import { Link } from 'react-router-dom';
// import './Homie.css'; // Import the CSS file
// // import Front from './Front.jsx';
// import { useNavigation } from 'react-router-dom';
// import Menu from './Menu.jsx'
// import Tablelist from './Tablelist.jsx'
// const Homie = () => {
//   const nav = useNavigation();
//   const handleuser =()=>{
//     nav('/Menu')
//   }
//   const handleadmin=()=>{
//     nav('/Tablelist')
//   }
//   return (
//     <div className='display'>
//       <nav className='navbar'>
//         <ul>
//           <li className='active'><Link to='/'>Home</Link></li> 
//           <li><Link to='/Menu'>Menu</Link></li>
//           <li><Link to='/Contacts'>Contacts</Link></li>
//           <li><Link to='/About'>About</Link></li>
//           {/* <li className='tag'><Front/></li> */}
//         </ul>
//       </nav>
//       <div className='btn'>
//         <button onClick={handleuser}>User</button>
//         <button onClick={handleadmin}>admin</button>
//       </div>

//     </div>
//   );
// };

// export default Homie;


import React from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Correct import of useNavigate
import './Homie.css'; // Import the CSS file

const Homie = () => {
  const navigate = useNavigate(); // Correct hook for navigation

  const handleUser = () => {
    navigate('/First'); // Correct navigation to Menu
  };

  const handleAdmin = () => {
    navigate('/Tablelist'); // Correct navigation to Tablelist
  };

  return (
    <div className='display'>
      <nav className='navbar'>
        <ul>
          <li className='active'><Link to='/'>Home</Link></li>
          <li><Link to='/Menu'>Menu</Link></li>
          <li><Link to='/Contacts'>Contacts</Link></li>
          <li><Link to='/About'>About</Link></li>
        </ul>
      </nav>
      <div className='btn'>
        <button onClick={handleUser}>User</button>
        <button onClick={handleAdmin}>Admin</button>
      </div>
    </div>
  );
};

export default Homie;
