export async function join(classId: any, userId: any){
    const attendee = {"class": classId, "attendee": userId}
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(attendee)
      };
      const res = await fetch(
        'http://api-gen.local/attendee/', requestOptions
      ).then((res) => {console.log({res, attendee: JSON.stringify(attendee)});return res.json()});
      return res;
}