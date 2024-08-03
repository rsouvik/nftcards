import React, { ReactNode } from 'react';
import { Link } from 'react-router-dom';

interface LayoutProps {
    children: ReactNode; // Define the type of children prop
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
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
