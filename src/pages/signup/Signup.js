// import react hooks
import { useState } from 'react';

import { useSignup } from '../../hooks/useSignup'

// import stylesheet
import './Signup.css';

export default function Signup() {
    const [email, setEmail] = useState('');                     // variable to store user provided email
    const [password, setPassword] = useState('');               // variable to store user provided password
    const [displayName, setDisplayName] = useState('');         // variable to store user provided display name
    const [thumbnail, setThumbnail] = useState(null);           // variable to store user provided thumbnail
    const [thumbnailError, setThumbnailError] = useState(null);   // variable to store profile upload error

    const { signup, isPending, error } = useSignup()
    // on submiting the form
    const handleSubmit = e => {
        e.preventDefault();
        signup(email, password, displayName, thumbnail);
    }

    // function will handle the profile pic uploading
    const handleFileChange = e => {
        setThumbnail(null);
        let selected = e.target.files[0];

        // validate the user selection
        if (!selected) {
            setThumbnailError("Please select the file");
            return;
        }
        if (!selected.type.includes('image')) {
            setThumbnailError('Selected file must be image');
            return;
        }
        if (selected.size > 1000000) {
            setThumbnailError('Image files size must be less than 1mb');
            return;
        }
        setThumbnailError(null);
        setThumbnail(selected);
        console.log("thumbnail updated");
    }




    return (
        <form onSubmit={handleSubmit} className="auth-form">
            <h2>Sign Up</h2>
            <label>
                <span>Email:</span>
                <input
                    required
                    type="email"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                />
            </label>
            <label>
                <span>Password:</span>
                <input
                    required
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                />
            </label>
            <label>
                <span>Display Name:</span>
                <input
                    required
                    type="text"
                    onChange={(e) => setDisplayName(e.target.value)}
                    value={displayName}
                />
            </label>
            <label>
                <span>Profile Thumbnail:</span>
                <input
                    required
                    type="file"
                    onChange={handleFileChange}
                />
                {thumbnailError && <div className="error">{thumbnailError}</div>}
            </label>
            {!isPending && <button className="btn">Sign up</button>}
            {isPending && <button className="btn" disabled>Loading</button>}
            {error && <div className="error">{error}</div>}
        </form>
    )
}

