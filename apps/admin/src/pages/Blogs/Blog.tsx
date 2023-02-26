import { FC } from "react";
import BreadCrumb from "../../components/BreadCrumb/Index";
import { BlogsCrumb } from "../../components/BreadCrumb/breadcrumbData";
import { useParams } from "react-router-dom";
import useSWR from "swr";
import fetcher from "../../utils/fetcher";
import { Spin } from "antd";
import Loader from "../../components/Loader/Index";

const Blog: FC = () => {
  const params = useParams();

  const {
    data: post,
    isLoading,
    isValidating,
  } = useSWR(`/posts/${params?.id}`, fetcher);
  const { data: users } = useSWR(`/users`, fetcher);

  return (
    <>
      <BreadCrumb
        breadCrumbDetails={[
          BlogsCrumb,
          { isRoute: false, name: (post && post?.title) ?? "" },
        ]}
        details="Blog details"
      />
      {isLoading || isValidating ? (
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
        <article className="rounded-md p-5 bg-gray-200 dark:bg-primary-dark-600 text-black my-5">
          <h1 className="text-lg mb-1 dark:text-white">#{post && post.id}</h1>
          <div className="flex items-center my-3">
            <div className="h-10 w-10 flex justify-center items-center rounded-full bg-gray-500 dark:text-white text-white uppercase ring-2 text-sm">
              {users && users[post.userId].name.split(" ")[0].split("")[0]}{" "}
              {users && users[post.userId].name.split(" ")[1].split("")[0]}
            </div>
            <h1 className="ml-3 text-2xl dark:text-white">
              {users && users[post.userId].name}
            </h1>
          </div>
          <h2 className="text-xl mb-2 capitalize dark:text-white">
            {post && post.title}
          </h2>
          <p className="text-base capitalize italic font-semibold mt-5 dark:text-white">
            {post && post.body}
          </p>
        </article>
      )}
    </>
  );
};

export default Blog;
