import { useState } from "react";

export default function SignIn(){
    const [error, setError] = useState(false);
    const [message, setMessage] = useState("Enter your details below");
    return (
       <div className={`sign ${error && "error"}`} >
            <h2>Get started absolutely free.</h2>
            <h3>{message}</h3>
            <form method="post">
            <input type="text" placeholder="Name" />
            <input type="text" placeholder="Last Name" />
            <input type="text" placeholder="Email" />
            <input type="password" placeholder="Password" />
            <input type="password" placeholder="Repeat password" />
            <button>SIGN UP</button>
            </form>
        </div>
        )
}