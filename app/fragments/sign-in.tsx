import { useState } from "react";
import { Form } from "@remix-run/react";

export default function SignIn({ error }: { error: Boolean }){
    const [visible, setVisible] = useState(false);
    return (
       <div className={`sign ${error && "error"}`} >
            <h2>Sign in to Classy</h2>
            <h3>{
            error ?
                "Oops! That email and password combination is not valid":
                "Enter your details below"
            }</h3>
            <Form method="post">
            <input name="email" type="text" placeholder="Email" />
            <input name="password" type={visible ? "text" : "password"} placeholder="Password" />
            <img
                src="images/eye.png"
                onMouseDown={() => setVisible(true)}
                onMouseUp={() => setVisible(false)} />
            <button>SIGN IN</button>
            </Form>
        </div>
        )
}