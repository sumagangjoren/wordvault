import { useNavigate } from "react-router"

function Login() {

    const navigate = useNavigate();
    const handleClick = () => {
        console.log('clicked');
        navigate('/signup');
    }

    return (
        <div>
            <h1>Login Page</h1>
            <input type="text" name="username" placeholder="username"/>
            <input type="password" name="username" placeholder="password"/>
            <button>Login</button>
            <button onClick={handleClick} type="button">Sign up</button>
        </div>
    )
}

export default Login