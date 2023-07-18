import { Link } from "react-router-dom";
import '../styles/Default.css';

export default function Header() {
    return (
        <div className="row" id="header">
            <div className="logo-section">
                <Link to="/">
                    <img src="/Logo.jpg" alt="Logo" style={{ height: '47px' }} />
                </Link>
            </div>
            <nav className="nav-links">
                <Link to="/">Home</Link>
                <Link to="/about">About</Link>
                <Link to="/destination">Destination</Link>
                <Link to="/contact">Contact</Link>
            </nav>
            <div className="auth-links">
                <Link to="/register">Register</Link>
                <Link to="/login" className="login-button">Login</Link>
            </div>
        </div>
    );
}