import { FC } from "react";
import BreadCrumb from "../../components/BreadCrumb/Index";
import { UsersCrumb } from "../../components/BreadCrumb/breadcrumbData";
import useSWR from "swr";
import fetcher from "../../utils/fetcher";
import { useParams } from "react-router-dom";
import { IUser } from "../Dashboard/dashboard.interface";

const User: FC = () => {
  const params = useParams();
  const { data: user, isLoading } = useSWR<IUser>(
    `/users/${params?.id}`,
    fetcher
  );

  return (
    <>
      <BreadCrumb
        breadCrumbDetails={[
          UsersCrumb,
          { isRoute: false, name: (user && user?.name) ?? "" },
        ]}
        details="User details"
      />

      {isLoading ? (
        <div className="rounded-md px-4 py-3 bg-gray-200 text-white my-5">
          <div className="w-[4ch] h-5 bg-gray-400 mb-2 rounded" />
          <div className="w-[50ch] h-6 bg-gray-400 mb-2 rounded" />
          <div className="mt-5">
            <div className="w-[50ch] h-6 bg-gray-400 mb-2 rounded" />
            <div className="w-[50ch] h-6 bg-gray-400 mb-2 rounded" />
            <div className="w-[25ch] h-6 bg-gray-400 mb-2 rounded" />
          </div>
        </div>
      ) : (
        <article className="rounded-md shadow-md p-5 bg-gray-200 dark:bg-primary-dark-600 text-black my-5">
          <h1 className="text-lg mb-1 dark:text-white">#{user && user?.id}</h1>
          <div className="flex items-center my-3">
            <div className="h-10 w-10 flex justify-center items-center rounded-full bg-gray-500 dark:bg-primary-dark-400 text-white uppercase ring-2 text-sm">
              {user && user?.name.split(" ")[0].split("")[0]}
              {user && user?.name.split(" ")[1].split("")[0]}
            </div>
            <h1 className="ml-3 text-2xl dark:text-white">
              {user && user?.name}
            </h1>
          </div>
          <h2 className="text-xl mb-2 capitalize dark:text-white">
            Email: {user && user?.email}
          </h2>
          <h2 className="text-xl mb-2 capitalize dark:text-white">
            Username: {user && user?.username}
          </h2>
          <address className="text-xl mb-2 capitalize dark:text-white">
            Address: {user && user?.address?.street},{" "}
            {user && user?.address?.city} ,{user && user?.address?.zipcode}
          </address>
        </article>
      )}
    </>
  );
};

export default User;
