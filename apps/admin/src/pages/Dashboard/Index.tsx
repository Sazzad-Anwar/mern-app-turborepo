import { FC, Suspense, lazy } from "react";
import CountUp from "react-countup";
import { Avatar, Statistic, Table } from "antd";
import { useGlobalContext } from "../../context/GlobalContextProvider";
import Loader from "../../components/Loader/Index";
const LineChart = lazy(() => import("../../components/Charts/LineChart"));
const BarChart = lazy(() => import("../../components/Charts/BarChart"));
import useSWR from "swr";
import fetcher from "../../utils/fetcher";
import type { ColumnsType } from "antd/es/table";
import { IUser } from "./dashboard.interface";
import { IBlog } from "../Blogs/Index";
import useDeviceWidth from "../../hooks/useDeviceWidth";

const formatter = (value: any) => <CountUp end={value} separator="," />;

const Dashboard: FC = () => {
  const { sideBar } = useGlobalContext();
  const { isMobileWidth } = useDeviceWidth();
  const { data: Users, isLoading } = useSWR(
    "/users?_start=0&_limit=5",
    fetcher
  );
  const { data: Blogs, isLoading: blogLoading } = useSWR(
    "/posts?_start=0&_limit=5",
    fetcher
  );

  const tableColumnUser: ColumnsType<IUser> = [
    {
      title: "Avatar",
      dataIndex: "name",
      key: "avatar",
      render: (name: string) => (
        <Avatar size="default">{name.split("")[0].toUpperCase()}</Avatar>
      ),
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      width: 100,
    },
  ];

  let tableColumnBlog: ColumnsType<IBlog> = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      render: (title: string) => <span className="line-clamp-1">{title}</span>,
    },
  ];

  return (
    <>
      <div
        className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 ${
          sideBar.isOpen ? "2xl:grid-cols-4" : "2xl:grid-cols-5"
        } gap-4`}
      >
        <Statistic
          className="bg-purple-100 border-purple-500 py-3 pl-5 border rounded-md shadow w-full"
          title={
            <span className="text-base font-semibold text-purple-500">
              Active users
            </span>
          }
          value={112893}
          formatter={formatter}
        />
        <Statistic
          className="bg-blue-100 border-blue-500 py-3 pl-5 border rounded-md shadow w-full"
          title={
            <span className="text-base font-semibold text-blue-500">
              Total balance
            </span>
          }
          value={112893}
          formatter={formatter}
        />
        <Statistic
          className="bg-green-100 border-green-500 py-3 pl-5 border rounded-md shadow w-full"
          title={
            <span className="text-base font-semibold text-green-500">
              Total posts
            </span>
          }
          value={112893}
          formatter={formatter}
        />
        <Statistic
          className="bg-red-100 border-red-500 py-3 pl-5 border rounded-md shadow w-full"
          title={
            <span className="text-base font-semibold text-red-500">
              Total stocks
            </span>
          }
          value={112893}
          formatter={formatter}
        />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mt-10 flex-start">
        <div className="bg-blue-50 border-blue-500 border p-5 shadow-md rounded-md">
          <h1 className="text-xl font-semibold w-full bg-blue-100 p-4 rounded-md text-blue-500">
            Total Selling
          </h1>
          <div className="mt-5">
            <Suspense fallback={<Loader />}>
              <LineChart />
            </Suspense>
          </div>
        </div>
        <div className="bg-blue-50 border border-blue-500 p-5 shadow-md rounded-md">
          <h1 className="text-xl font-semibold w-full bg-blue-100 text-blue-500 p-4 rounded-md">
            Total Stock
          </h1>
          <div className="mt-5">
            <Suspense fallback={<Loader />}>
              <BarChart />
            </Suspense>
          </div>
        </div>

        <div className="bg-white dark:bg-primary-dark-600 dark:border-gray-700 border p-5 shadow-md rounded-md w-full">
          <h1 className="text-xl font-semibold w-full bg-gray-200 dark:bg-primary-dark-400 dark:text-white p-4 rounded-md">
            Users registered in last seven days
          </h1>
          <Table
            scroll={{
              x: 375,
            }}
            loading={isLoading}
            columns={tableColumnUser}
            dataSource={Users && Users}
            className="mt-5"
            pagination={{
              showSizeChanger: true,
              hideOnSinglePage: true,
              responsive: true,
            }}
          />
        </div>
        <div className="bg-white border dark:border-gray-700  dark:bg-primary-dark-600 p-5 shadow-md rounded-md">
          <h1 className="text-xl font-semibold w-full bg-gray-200 dark:bg-primary-dark-400 dark:text-white p-4 rounded-md">
            Posts uploaded by
          </h1>
          <Table
            loading={blogLoading}
            columns={tableColumnBlog}
            className="mt-5"
            dataSource={!blogLoading && Blogs}
            rowKey="id"
            pagination={{
              showSizeChanger: true,
              hideOnSinglePage: true,
              responsive: true,
            }}
          />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
