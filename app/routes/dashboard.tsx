import Header from '~/fragments/header';
import { Outlet, useLoaderData } from "@remix-run/react";
import Footer from '~/fragments/footer';
import { getUser } from '~/session';
import { json, Request } from "@remix-run/node";

type LoaderData = {
  data: Awaited<ReturnType<typeof getUser>>;
};

export const loader = async ({ request }: { request: Request }) => {
  return json<LoaderData>({
    data: await getUser(request),
  });
};


export default function Index() {
  const { data } = useLoaderData() as LoaderData;
  return (
    data && (
      <div className="dashboard-wrapper">
        <Header userData={data} />
        <div className="dashboard">
          <Outlet />
        </div>
        <Footer />
      </div>
    )
  )
}
