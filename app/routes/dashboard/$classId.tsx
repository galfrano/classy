import { getClassById } from "~/models/classes"
import type { LoaderArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
export async function loader({ request, params }: LoaderArgs) {
    const url = new URL(request.url);
    // const categoryId = url.searchParams.get("category");
    const classData = await getClassById(params.classId);
    console.log(classData);
    if (!classData) {
      throw new Response("Not Found", { status: 403 });
    }
    return classData;
  }

export default function ClassId(){
    const classData = useLoaderData<typeof loader>();
    return (<>
        <div className="class-detail">
            <div className="menubar">Detail class: #{classData._id}</div>
            <br /><br />
            <div className="class-data">
                <div className="date">{classData.date}</div>
                <h1>{classData.classname}</h1>
                <h3 className="author">{classData.created_by_name}</h3>
                <p>{classData.description}</p>
                <div>
                    <img src="/images/person.png" /> {classData.attendees.length} of {classData.no_of_places}
                    <button>Join</button>
                </div>
            </div>
            <div className="class-attendees">
                <div>
                    <h2>Attendees</h2>
                    {classData.attendees.map((a: string) => (<span>{a}</span>))}
                </div>
            </div>
        </div>
    </>)
}