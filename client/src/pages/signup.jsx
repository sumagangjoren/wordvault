import { useNavigate } from "react-router"

function SignUp() {

    const navigate = useNavigate();
    const handleClick = () => {
        navigate('/login');
    }

  return (
    <div>
        <h1>Sign up Page</h1>
        <input type="text" name="username" placeholder="username"/>
        <input type="email" name="Email" placeholder="email"/>
        <input type="password" name="username" placeholder="password"/>
        <button>Sign up</button>
        <button onClick={handleClick}>Login</button>
    </div>
  )
}

export default SignUp