export async function join(classId: any, userId: any){
    const attendee = {"class": classId, "attendee": userId}
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(attendee)
      };
      const res = await fetch(
        'http://api-gen.local/attendees/', requestOptions
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
        'http://api-gen.local/attendees/', requestOptions
      ).then((res) => res.json());
      return res;
}