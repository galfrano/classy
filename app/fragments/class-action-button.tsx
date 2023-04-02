const getName = (user: any) => (
    user.first_name+(user.last_name != null ? ' '+user.last_name : '')
)
export default function ClassActionButton(id: any, userData: any, attendees: string[]){
    return userData._id == id ?
      (<button className="edit">Edit</button>) :
        ( attendees.filter((name: string) => (getName(userData) == name)).length == 0 ?
            (<button className="join">Join</button>) :
            (<button className="leave">Leave</button>)) ;
}