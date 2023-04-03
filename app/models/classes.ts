
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

export type NewClassData = {
  classname: string,
  description: string,
  location: string,
  date: string,
  no_of_places: number,
  created_by: any,
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

export async function createNewClass(classData: NewClassData) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(classData)
  };
  const res = await fetch(
    'http://api-gen.local/classes/', requestOptions
  ).then((res) => res.json());
  return res;
}