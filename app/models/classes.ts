
export type ClassData = {
    _id: any,
    classname: string,
    description: string,
    location: string,
    date: string,
    attendees: string[],
    no_of_places: number,
    created_by: any,
    created_by_name: string,
    create_date: string,
}

export async function getClasses() {
    const res = await fetch(
      'http://api-gen.local/classes'
    ).then((res) => res.json());
    return res;
}

export async function getClassById(id: any) {
    const res = await fetch(
      'http://api-gen.local/classes/'+id
    ).then((res) => res.json());
    return res;
  }