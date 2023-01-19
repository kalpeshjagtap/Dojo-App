import { useState } from 'react';// import react functionalities
import './Login.css';       // import stylesheet
import { useLogin } from '../../hooks/useLogin' // import login functionality
const Login = () => {
    const [email, setEmail] = useState('');          // variable to store user provided email
    const [password, setPassword] = useState('');    // variable to store user provided password
    const { login, error, isPending } = useLogin()
    const handleSubmit = e => {
        e.preventDefault();
        login(email, password);
    }
    return (
        <form onSubmit={handleSubmit} className="auth-form">
            <h2>Login</h2>
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
            {!isPending && <button className="btn">Login</button>}
            {isPending && <button className="btn" disabled>Loading</button>}
            {error && <div className="error">{error}</div>}
        </form>
    )
}

export default Login;
