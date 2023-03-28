import { useState } from "react";

export default function Index() {
  const [visible, setVisible] = useState(false)

  return (
    <div className="wrapper">
      <div className="dog">
        <h1>Classy.io</h1>
        <div className="quote">
        <q>Intelligence is like a four-wheel drive.
          It allows you to get stuck in more remote places..</q>
          <hr />
        <p>Garrison Keillor</p>
        </div>    
      </div>
      <div className="right-side">
        <div className="right-corner">
          Don't have an account? <a href="">SIGN UP</a>
        </div>
        <div className="sign">
          <h2>Sign in to Classy</h2>
          <h3>Enter your details below</h3>
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
      </div>
    </div>
  );
}
