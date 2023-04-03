import { useState, useEffect } from 'react';
import { getUser } from '~/session';
//import type { User } from '~/models/users';
import { redirect } from "@remix-run/node";
import { json, Request } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import type { ActionArgs, LoaderArgs } from "@remix-run/node";
import { Form, useActionData } from "@remix-run/react";
import { createNewClass } from '~/models/classes'

export async function action({ request }: ActionArgs): Promise<any> {
  const user = await getUser(request);
  if(user != null){
    const formData = await request.formData();
    const created_by = user._id;
    const classname = formData.get('title');
    const description = formData.get('description');
    const date = formData.get('date');
    const location = formData.get('location');
    const no_of_places = formData.get('capacity');
    if (typeof classname !== 'string' || classname.length === 0) {
      return json({ error: 'title' });
    }
    else if(typeof description !== 'string' || description.length === 0) {
      return json({ error: 'description' });
    }
    else if(typeof date !== 'string' || date.length === 0) {
      return json({ error: 'date' });
    }
    else if(typeof location !== 'string' || location.length === 0) {
      return json({ error: 'location' });
    }
    else if(typeof no_of_places !== 'string' || Number.isNaN(no_of_places)) {
      return json({ error: 'no_of_places' });
    }
    else{
      await createNewClass({
        classname,
        description,
        location,
        date,
        no_of_places: parseInt(no_of_places),
        created_by,
      });
      return redirect('/dashboard');
    }
  }
  return { error : false };
}

type LoaderData = {
  data: Awaited<ReturnType<typeof getUser>>;
};

export const loader = async ({ request }: { request: Request }) => {
  const user = await getUser(request);
  return user ? json<LoaderData>({ data: user }) : redirect("/");
};

const inputAttributes = (name: string, error: string) => {
  return {
    name,
    placeholder: name
  }
}

export default function New() {
  const actionData = useActionData<typeof action>();
  const [error, setError] = useState(actionData?.error != null ? actionData?.error : false);
  const input = (name: string, error: string | false) => {
    const capitalized = name.charAt(0).toUpperCase() + name.slice(1);
    return (
      <input
        name={name}
        placeholder={`${capitalized}${error == name ? ' has to be filled up.': ''}`}
        className={`${error == name ? 'error': ''}`}
        type={name == 'date' ? name : (name == 'capacity' ? 'number' : 'text')}
        onFocus={()=>setError(false)}
      />
    );
  }
  return (
    <div className="new-class">
      <h2>Create a new class</h2>
      <h4>Enter the details below.</h4>
      <Form method="post">
        {['title', 'description', 'date', 'location', 'capacity'].map((field) => input(field, error))}
        <button>Create a new class</button>
      </Form>
    </div>
  );
}
