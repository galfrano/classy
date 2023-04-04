import { LoaderArgs, ActionArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { leave } from '~/models/attendees'
import { getUser } from '~/session'
export async function loader({ request, params }: LoaderArgs) {
    console.log('leave 1')
    const url = new URL(request.url);
    const user = await getUser(request);
    if(user !== null && params.classId != null) {
        await leave(params.classId, user._id)
    }
    else {
      throw new Response("Bad Request", { status: 400 });
    }
    return redirect("/dashboard");
}

export async function action({ request, params }: ActionArgs) {
    console.log('leave')
    const url = new URL(request.url);
    const user = await getUser(request);
    if(user !== null && params.classId != null) {
        await leave(params.classId, user._id)
    }
    else {
      throw new Response("Bad Request", { status: 400 });
    }
    return redirect("/dashboard");
}
  