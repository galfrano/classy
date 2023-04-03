import { useState } from 'react';
import SignIn from '~/fragments/sign-in'
import SignUp from '~/fragments/sign-up'
import { json, redirect } from '@remix-run/node';
import type { ActionArgs, LoaderArgs } from "@remix-run/node";
import { createUserSession, getUserId } from "~/session";
import { validateEmail, verifyLogin } from '~/models/users'

export async function loader({ request }: LoaderArgs) {
  const userId = await getUserId(request);
  if (userId) return redirect("/dashboard");
  return json({});
}

export async function action({ request }: ActionArgs) {
  const formData = await request.formData();
  const email = formData.get("email");
  const password = formData.get("password");
  if (email == null || !validateEmail(email.toString())) {
    return json(
      { errors: { email: "Email is invalid", password: null } },
      { status: 400 }
    );
  }
  else if (typeof password !== "string" || password.length === 0) {
    return json(
      { errors: { password: "Password is required", email: null } },
      { status: 400 }
    );
  }
  else{
    const user = await verifyLogin(email.toString(), password);
    if (!user) {
      return json(
        { errors: { email: "Invalid email or password", password: null } },
        { status: 400 }
      );
    }
    return createUserSession({
      request,
      userId: user._id,
      redirectTo: '/dashboard',
    });
  }
}

export default function Index() {
  const [error, setError] = useState(false);
  const [isSignIn, setIsSignIn] = useState(true)
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
          It allows you to get stuck in more remote places...</q>
          <hr />
        <p>Garrison Keillor</p>
        </div>    
      </div>
      <div className="right-side">
        <div className="right-corner">
          {isSignIn ? signUp() : signIn()}
        </div>
        {isSignIn ? <SignIn error={error} /> : <SignUp />}
      </div>
    </div>
  );
}
