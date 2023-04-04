import { Link } from "@remix-run/react";

export default function Footer(){
    return (
    <div className="footer">
        <Link to="/dashboard/new">+</Link>
    </div>
    )
}