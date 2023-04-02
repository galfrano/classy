import { Form } from "@remix-run/react";
import { useState } from 'react';
import type { User } from '~/models/users'

export default function Header({ userData: { first_name, last_name } }: { userData: User }){
    const initials = first_name.charAt(0)+(last_name ? last_name.charAt(0) : '');
    const [logoutOpen, setLogoutOpen] = useState(false)
    return (
        <header className="header">
            <h1>Classy.io</h1>
            <div className="user">
                <div className="circle"><span>{initials}</span></div>
                <div className="user-name">&nbsp;{first_name} {last_name} <button onClick={()=>setLogoutOpen(!logoutOpen)}>&#9660;</button></div>
                {logoutOpen &&
                    (<div className="logout"><Form method="post" action="/logout"><button>Log out</button></Form></div>)
                }
            </div>
        </header>
    )
}