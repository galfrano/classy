import { getClassById } from "~/models/classes"
import type { LoaderArgs, ActionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { redirect } from "@remix-run/node";
import { join } from  '~/models/attendees'

export async function loader({ request, params }: LoaderArgs) {
    const url = new URL(request.url);
    const classData = await getClassById(params.classId);
    if (!classData) {
      throw new Response("Not Found", { status: 403 });
    }
    return classData;
  }
export async function action({ request }: ActionArgs) {
  return redirect("/");
}
