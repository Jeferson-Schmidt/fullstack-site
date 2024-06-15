import { Link } from 'react-router-dom'

const Header = () => {
    return (
        <div className='header_flex'>
            <div className='menu_flex'>
                <Link to="/" style={{ textDecoration: "none" }}>
                    <div className="menu_gap"></div>
                    <h4>MENU</h4>
                </Link>
            </div>
            <div>
                <Link to="/addcoffee">
                    <button className="btn">Add Coffee</button>
                </Link>
            </div>
        </div>
    );
};

export default Header