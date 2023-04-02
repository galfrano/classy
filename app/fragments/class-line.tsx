import { ClassData } from "~/models/classes"
import { Link } from "@remix-run/react";
import { User } from "~/models/users"


export default function ClassLine({ classData, currentUser }: { classData: ClassData, currentUser: any }){
    return (
        <div className="class-line">
            <h2><Link to={classData._id.toString()}>{classData.classname}</Link></h2>
            <p>{classData.description}</p>
            <span className="author">{classData.created_by_name}</span>
            <div className="date">{classData.date}</div>
            <span className="attendees">{classData.attendees.length} of {classData.no_of_places}</span>
            <button>Edit</button>
            
        </div>
    )
}