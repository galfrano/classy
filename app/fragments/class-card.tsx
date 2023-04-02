import { ClassData } from "~/models/classes"
import { Link } from "@remix-run/react";
import ClassActionButton from './class-action-button';

export default function ClassCard({ classData, currentUser }: { classData: ClassData, currentUser: any }){

    return (
        <div className="class-card">
            <div className="date">{classData.date}</div>
            <h2><Link to={classData._id.toString()}>{classData.classname}</Link></h2>
            <span className="author">{classData.created_by_name}</span>
            <p>{classData.description}</p>
            <div className="bottom">
                <img src="images/person.png" />{classData.attendees.length} of {classData.no_of_places}
                {ClassActionButton(classData.created_by, currentUser, classData.attendees)}
            </div>
        </div>
    )
}