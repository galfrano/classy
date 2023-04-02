import { useState } from 'react';
import SignIn from '../fragments/sign-in'
import SignUp from '../fragments/sign-up'


export default function Index() {
  const signUp = () => (
    <>Don't have an account? <a >SIGN UP</a></>
  )

  return (
    <div className="wrapper">
      <div className="dog">
        <h1>Classy.io</h1>
        <div className="quote">
        <q>Intelligence is like a four-wheel drive.
          It allows you to get stuck in more remote places...</q>
          <hr />
        <p>Garrison Keillor</p>
        </div>    
      </div>
      <div className="right-side">
        <div className="right-corner">
          {signUp()}
        </div>
        <div className="not-found">
            <h2>404 Error - Page not found</h2>
            <p>Seems like someone didn’t study hard enough in programming class!</p>
            <p>Please press the refresh button and everything should be fine again. </p>
            <button>Refresh</button>
        </div>
      </div>
    </div>
  );
}
