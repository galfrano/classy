import { useState } from "react";

export default function SignIn(){
    const [visible, setVisible] = useState(false)
    const [error, setError] = useState(false)
    return (
       <div className={`sign ${error && "error"}`} >
            <h2>Sign in to Classy</h2>
            <h3>{
            error ?
                "Oops! That email and password combination is not valid":
                "Enter your details below"
            }</h3>
            <form method="post">
            <input type="text" placeholder="Email" />
            <input type={visible ? "text" : "password"} placeholder="Password" />
            <img
                src="images/eye.png"
                onMouseDown={() => setVisible(true)}
                onMouseUp={() => setVisible(false)} />
            <button>SIGN IN</button>
            </form>
        </div>
        )
}