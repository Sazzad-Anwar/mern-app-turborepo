import { FC } from "react";
import useSWR from "swr";
import fetcher from "../../utils/fetcher";
import { IAddress, IUser } from "../Dashboard/dashboard.interface";
import { Avatar, Button, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import BreadCrumb from "../../components/BreadCrumb/Index";
import { UsersCrumb } from "../../components/BreadCrumb/breadcrumbData";
import { AiOutlineEye } from "react-icons/ai";
import { FiEdit3 } from "react-icons/fi";
import { MdDeleteOutline } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import useDeviceWidth from "../../hooks/useDeviceWidth";

const Users: FC = () => {
  const { data: Users, isLoading } = useSWR("/users", fetcher);
  const navigate = useNavigate();
  const { isMobileWidth } = useDeviceWidth();

  const tableColumnUser: ColumnsType<IUser> = [
    {
      title: "Avatar",
      dataIndex: "name",
      key: "avatar",
      render: (name: string) => (
        <Avatar size="large">{name.split("")[0].toUpperCase()}</Avatar>
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
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
      render: (address: IAddress) =>
        address.street + ", " + address.city + ", " + address.zipcode,
    },
    {
      title: "Actions",
      dataIndex: "action",
      key: "action",
      render: (action: any, record: IUser) => (
        <div className="flex items-center">
          <Button
            onClick={() => navigate(`/users/${record?.id}`)}
            type="default"
            className="flex justify-center items-center dark:text-white p-2"
          >
            <AiOutlineEye size={20} />
          </Button>
          <Button
            onClick={() => navigate(`/users/${record?.id}`)}
            type="default"
            className="flex justify-center items-center dark:text-white p-2 ml-2"
          >
            <FiEdit3 size={20} />
          </Button>
          <Button
            type="default"
            className="flex justify-center items-center dark:text-white p-2 ml-2"
          >
            <MdDeleteOutline size={20} />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <>
      <BreadCrumb
        breadCrumbDetails={[UsersCrumb]}
        details="All users are here"
      />
      <div className="bg-white dark:bg-primary-dark-600 dark:border-gray-700 border p-5 mt-5 shadow-md rounded-xl w-full">
        <Table
          scroll={{
            x: 991,
            y: "calc(100vh - 350px)",
          }}
          loading={isLoading}
          columns={tableColumnUser}
          dataSource={Users && Users}
          className="mt-5"
          pagination={{
            size: isMobileWidth ? "small" : "default",
            className: "justify-center",
            hideOnSinglePage: true,
          }}
        />
      </div>
    </>
  );
};

export default Users;
