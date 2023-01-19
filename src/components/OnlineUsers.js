// styles
import './OnlineUsers.css';

import Avatar from './Avatar';    // avatar component

import { useCollection } from '../hooks/useCollection' // useCollection hook

import { useAuthContext } from '../hooks/useAuthContext';  // importing user authentication functionalities

export default function OnlineUsers() {
    const { error, documents } = useCollection('users')
    const { user } = useAuthContext();
    return (
        <div className="user-list">
            <h2>Team Members</h2>
            {error && <div className="error">{error}</div>}
            {
                documents &&
                documents.map(u => (

                    (user.displayName !== u.displayName) && (<div key={u.id} className="user-list-item" >
                        {u.online && <span className="online-user"></span>}
                        <span> {u.displayName} </span>
                        <Avatar src={u.photoURL} />
                    </div>)
                ))
            }
        </div>
    )
}
