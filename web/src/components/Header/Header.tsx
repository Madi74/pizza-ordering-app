import { NavLink } from 'react-router-dom';
import './Header.css';

const Header = () => {
  return (
    <header className='header'>
        <p className='header_title'>Turtle Pizza Admin</p>
        <ul className='menu'>
          <li className='menu_item'><NavLink to='/' className='nav_link'>Dishes</NavLink></li>
          <li className='menu_item'><NavLink to='/orders' className='nav_link'>Orders</NavLink></li>
        </ul>
    </header>
  )
};

export default Header;