import { Form } from "@remix-run/react";


const getName = (user: any) => (
    user.first_name+(user.last_name != null ? ' '+user.last_name : '')
)
export default function ClassActionButton(classId: any, userId: any, userData: any, attendees: string[]){
  const buttonType  = userData._id == userId ? "edit" :
    (attendees.filter((name: string) => (getName(userData) == name)).length == 0 ? 'join' : 'leave' );
  return (
    <Form method="post" action={`/${buttonType}/${classId}`}>
      <button name={buttonType} className={buttonType} value={classId}>{buttonType}</button>
    </Form>
  );
}