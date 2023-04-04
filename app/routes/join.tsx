import { LoaderArgs, ActionArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { join } from '~/models/attendees'
import { getUser } from '~/session'
export async function loader({ request, params }: LoaderArgs) {
    const url = new URL(request.url);
    const user = await getUser(request);
    if(user !== null && params.classId != null) {
        await join(params.classId, user._id)
    }
    else {
      throw new Response("Bad Request", { status: 400 });
    }
    return redirect("/dashboard");
}

export async function action({ request, params }: ActionArgs) {
    console.log('action')
    const url = new URL(request.url);
    const user = await getUser(request);
    if(user !== null && params.classId != null) {
        await join(params.classId, user._id)
    }
    else {
      throw new Response("Bad Request", { status: 400 });
    }
    return redirect("/dashboard");
}
  