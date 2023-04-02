
export type User = {
    _id: any,
    first_name: string,
    last_name: string,
    email: string,
    password: string,
}

export async function getUsers(): Promise<User[]> {
    const res = await fetch(
      'http://api-gen.local/users'
    ).then((res) => res.json());
    return res;
}

export async function getUserById(id: any): Promise<User> {
    const res = await fetch(
      'http://api-gen.local/users/'+id
    ).then((res) => res.json());
    return res;
}



export async function getUserByEmail(email: string) {
  const users = await getUsers()
  const filtered = users.filter((user: User) => (user.email == email ))
  return filtered.length > 0 ? filtered[0] : false;
}

export async function verifyLogin(email: string, password: string) {
  const userData = await getUserByEmail(email);
  return userData && userData.password == password ? userData : false;
}

export const validateEmail = (email: string | null) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};