const endpoint = 'https://ivanbeltrandesigns.com/classy-api/public/';

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
    endpoint+'classes'
  ).then((res) => res.json());
  return res;
}

export async function getClassById(id: any) {
  const res = await fetch(
    endpoint+'classes/'+id
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
    endpoint+'classes/', requestOptions
  ).then((res) => res.json());
  return res;
}

export async function updateClass(classData: NewClassData, classId: any) {
  const requestOptions = {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(classData)
  };
  const res = await fetch(
    endpoint+'classes/'+classId, requestOptions
  ).then((res) => res.json());
  return res;
}