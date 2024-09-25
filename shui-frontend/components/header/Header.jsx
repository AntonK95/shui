import './header.css';
import logo from '../../public/img/logo.png';
import { Link } from 'react-router-dom';

function Header() {
    
    return (
        <header className='header'>
            <Link to={"/"}>
                <img src={logo} alt="Shui-logo" />
            </Link>
        </header>
    )
}

export default Header;