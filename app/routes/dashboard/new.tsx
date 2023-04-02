//import { useState } from 'react';
import { getUsers } from '~/models/users';
import { json, Request } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { Form } from "@remix-run/react";

type LoaderData = {
  data: Awaited<ReturnType<typeof getUsers>>;
};

export const loader = async (/*{ request }: { request: Request }*/) => {
  return json<LoaderData>({
    data: await getUsers(),
 });
};

//ACTION MF!!!

export default function New() {
  return (
    <div className="new-class">
      <h2>Create a new class</h2>
      <h4>Enter the details below.</h4>
      <Form method="post">
        <input name="classname" placeholder="Title" type="text" />
        <input name="description" placeholder="Description" type="text" />
        <input name="date" placeholder="Date" type="date" />
        <input name="location" placeholder="Location" type="text" />
        <input name="capacity" placeholder="Capacity" type="number" />
        <button className="join">Create a new class</button>
      </Form>
    </div>
  );
}
