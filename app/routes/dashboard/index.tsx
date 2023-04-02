import { useState } from 'react';
import { getClasses } from '~/models/classes';
import type { ClassData } from '~/models/classes';
import { json, Request } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import ClassCard from '~/fragments/class-card';
import ClassLine from '~/fragments/class-line';
import { getSession, getUser } from '~/session';
// import { getUserById } from '~/models/users';

export const loader = async ({ request }: { request: Request }) => {
  const { data: { userId } } = await getSession(request);
  return json({
    classesData: await getClasses(),
    user: await getUser(request),
  });
};

const isPast = (date: string) => {
  let dateTime = new Date(date).getTime();
  console.log({dateTime, now: Date.now(), w: dateTime < Date.now()})
  return dateTime < Date.now();
};
export default function Index(){
    const [isGrid, setIsGrid] = useState(true);
    const { classesData, user } = useLoaderData<typeof loader>();
    const [filter, setFilter] = useState('all');
  
    const classes = filter == 'all' ? classesData :
      (filter == 'past' ? classesData.filter((c: ClassData) => (isPast(c.date))) : classesData.filter((c: ClassData) => (!isPast(c.date)))  ) ;
    return user != null && (<>
    <div className="menubar">
        <div className="filters">
            <span role="button" className={`${filter == 'all' ? 'active' : ''}`} onClick={()=>setFilter('all')}>All classes</span>
            <span role="button" className={`${filter == 'future' ? 'active' : ''}`} onClick={()=>setFilter('future')}>Future classes</span>
            <span role="button" className={`${filter == 'past' ? 'active' : ''}`} onClick={()=>setFilter('past')}>Past classes</span>
        </div>
        <div className="view">
        <img role="button" src={`images/grid${isGrid ? '-active': ''}.png`} onClick={()=>{setIsGrid(true)}} />
        <img role="button" src={`images/list${!isGrid ? '-active': ''}.png`} onClick={()=>{setIsGrid(false)}} />
        </div>
    </div>
    {isGrid ?
    classes.map((c: ClassData)=> (<ClassCard currentUser={user} classData={c} key={c._id} />)):
    classes.map((c: ClassData)=> (<ClassLine currentUser={user} classData={c} key={c._id} />))
    }</>)
}