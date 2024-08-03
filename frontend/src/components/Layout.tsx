import React from 'react';
import { Link } from 'react-router-dom';

const Layout: React.FC = ({ children }) => {
    return (
        <div className="layout">
            <header>
                <nav>
                    <Link to="/">Home</Link>
                    <Link to="/cart">Cart</Link>
                </nav>
            </header>
            <main>{children}</main>
            <footer>&copy; My NFT Store</footer>
        </div>
    );
};

export default Layout;