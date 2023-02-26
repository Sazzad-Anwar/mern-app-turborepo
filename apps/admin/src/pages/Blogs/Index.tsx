import { FC, useRef, useState } from "react";
import fetcher from "../../utils/fetcher";
import useSWR from "swr";
import { Button, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import { AiOutlineEye } from "react-icons/ai";
import { FiEdit3 } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import BreadCrumb from "../../components/BreadCrumb/Index";
import { BlogsCrumb } from "../../components/BreadCrumb/breadcrumbData";
import { MdDeleteOutline } from "react-icons/md";
import useDeviceWidth from "../../hooks/useDeviceWidth";

export interface IBlog {
  id: number;
  userId: number;
  title: string;
  body: string;
}

const Blogs: FC = () => {
  const {
    data: Blogs,
    isLoading,
    mutate,
    isValidating,
  } = useSWR("/posts", fetcher);
  const navigate = useNavigate();
  const { isMobileWidth } = useDeviceWidth();

  let tableColumns: ColumnsType<IBlog> = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      width: 100,
    },
    {
      title: "User ID",
      dataIndex: "userId",
      key: "userId",
      width: 100,
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Actions",
      dataIndex: "action",
      key: "action",
      width: 200,
      render: (action: any, record: IBlog) => (
        <div className="flex items-center">
          <Button
            onClick={() => navigate(`/blogs/${record?.id}`)}
            type="default"
            className="flex justify-center items-center dark:text-white p-2"
          >
            <AiOutlineEye size={20} />
          </Button>
          <Button
            onClick={() => navigate(`/blogs/${record?.id}/edit`)}
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
        breadCrumbDetails={[BlogsCrumb]}
        details="All blogs are here"
      />

      <section className="bg-white dark:bg-primary-dark-600 dark:border-gray-700 border p-5 mt-5 shadow-md rounded-xl w-auto">
        <Table
          scroll={{
            x: 991,
            y: "calc(100vh - 350px)",
          }}
          loading={isLoading || isValidating}
          columns={tableColumns}
          dataSource={Blogs && Blogs}
          rowKey="id"
          className="max-w-full"
          pagination={{
            size: isMobileWidth ? "small" : "default",
            className: "justify-center",
            hideOnSinglePage: true,
          }}
        />
      </section>
    </>
  );
};

export default Blogs;
