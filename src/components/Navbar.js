// style sheet and images svg
import './Navbar.css';
import Temple from '../assets/temple.svg';

// react-router-dom module import
import { Link } from 'react-router-dom';

import { useLogout } from '../hooks/useLogout';    // importing logout functionality

import { useAuthContext } from '../hooks/useAuthContext';          // importing user authentication functionalities


// functional component
export default function Navbar() {

    const { user } = useAuthContext();
    const { logout, isPending } = useLogout();      // using hook functionalities


    return (
        <div className="navbar">
            <ul>
                <li className="logo">
                    <Link to="/">
                        <img src={Temple} alt="dojo logo" />
                        <span>The Dojo</span>
                    </Link>
                </li>

                {!user && (
                    <>
                        <li>
                            <Link to="/login">Login</Link>
                        </li>
                        <li>
                            <Link to="/signup">Signup</Link>
                        </li>
                    </>
                )}

                {user && (
                    <li>
                        {!isPending && <button className="btn" onClick={logout}>Logout</button>}
                        {isPending && <button className="btn" disabled>Loggin out ...</button>}
                    </li>
                )}
            </ul>
        </div>
    )
}
