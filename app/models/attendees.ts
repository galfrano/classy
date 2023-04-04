
const endpoint = 'https://ivanbeltrandesigns.com/classy-api/public/';

export async function join(classId: any, userId: any){
    const attendee = {"class": classId, "attendee": userId}
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(attendee)
      };
      const res = await fetch(
        endpoint+'attendees/', requestOptions
      ).then((res) => res.json());
      return res;
}

export async function leave(classId: any, userId: any){
    const attendee = {"class": classId, "attendee": userId}
    const requestOptions = {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(attendee)
      };
      const res = await fetch(
        endpoint+'attendees/'+classId, requestOptions
      ).then((res) => res.json());
      return res;
}