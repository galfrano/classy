import { updateClass, getClassById } from "~/models/classes"
import { useLoaderData } from "@remix-run/react";
import { getUser } from '~/session'
import { useState, useEffect } from 'react';
//import type { User } from '~/models/users';
import { redirect } from "@remix-run/node";
import { json, Request } from "@remix-run/node";
import type { ActionArgs, LoaderArgs } from "@remix-run/node";
import { Form, useActionData } from "@remix-run/react";
import { createNewClass } from '~/models/classes'

export async function loader({ request, params }: LoaderArgs) {
    const url = new URL(request.url);
    const currentUser = await getUser(request);
    const classData = await getClassById(params.classId);
    if (!classData) {
      throw new Response("Not Found", { status: 403 });
    }
    return { currentUser,  classData };
  }
  export async function action({ request, params }: ActionArgs): Promise<any> {
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
        await updateClass({
          classname,
          description,
          location,
          date,
          no_of_places: parseInt(no_of_places),
          created_by,
        }, params.classId);
        return redirect('/dashboard');
      }
    }
  return { error : false };
}

const dateFormat = (date: string): string => {
  const dateParts = date.split(' ')[0].split('-');
  return dateParts[1]+' / '+dateParts[2]+' / '+dateParts[0];
};

export default function ClassId(){
    const actionData = useActionData<typeof action>();
    const { currentUser,  classData } =  useLoaderData();
    const classFormData = {...classData, title: classData.classname, capacity: classData.no_of_places, date: dateFormat(classData.date)}
    const [error, setError] = useState(actionData?.error != null ? actionData?.error : false);
    const input = (name: string, error: string | false) => {
      console.log({error, name}, error == name)
      const capitalized = name.charAt(0).toUpperCase() + name.slice(1);
      return (
        <input
          name={name}
          placeholder={`${capitalized}${error == name ? ' has to be filled up.': ''}`}
          className={`${error == name ? 'error': ''}`}
          type={name == 'date' ? name : (name == 'capacity' ? 'number' : 'text')}
          onFocus={()=>setError(false)}
          defaultValue={classFormData[name]}
        />
      );
    }
    return (
      <div className="new-class">
        <h2>Create a new class</h2>
        <h4>Enter the details below.</h4>
        <Form method="post">
          {['title', 'description', 'date', 'location', 'capacity'].map((field) => input(field, error))}
          <button>Edit</button>
        </Form>
      </div>
    );
}