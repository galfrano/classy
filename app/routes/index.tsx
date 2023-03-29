import { useState } from 'react';
import SignIn from './sign-in'
import SignUp from './sign-up'


export default function Index() {
  const [isSignIn, setIsSignIn] = useState(false)
  const signUp = () => (
    <>Don't have an account? <span role="button" onClick={()=>setIsSignIn(false)}>SIGN UP</span></>
  )
  const signIn = () => (
    <>Already have an account? <span role="button" onClick={()=>setIsSignIn(true)}>SIGN IN</span></>
  )
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
          {isSignIn ? signUp() : signIn()}
        </div>
        {isSignIn ? <SignIn /> : <SignUp />}
      </div>
    </div>
  );
}
