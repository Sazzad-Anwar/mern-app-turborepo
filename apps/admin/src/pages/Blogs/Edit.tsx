import { FC, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useSWR from "swr";
import fetcher from "../../utils/fetcher";
import { Button, Form, Input } from "antd";
import BreadCrumb from "../../components/BreadCrumb/Index";
import { BlogsCrumb } from "../../components/BreadCrumb/breadcrumbData";
import Loader from "../../components/Loader/Index";
import { FaQuoteLeft, FaQuoteRight } from "react-icons/fa";
import { IBlog } from "./Index";
import useNotification from "../../hooks/useNotification";
import api from "../../utils/api";

const EditBlog: FC = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const { contextHolder, openNotification } = useNotification();
  const {
    data: post,
    isLoading,
    isValidating,
  } = useSWR(`/posts/${params?.id}`, fetcher);

  useEffect(() => {
    if (!isLoading && post) {
      form.setFieldsValue({
        id: post?.id,
        userId: post?.userId,
        title: post?.title,
        body: post?.body,
      });
    }
  }, [post]);

  const saveBlog = async (values: IBlog) => {
    try {
      await api.post(`/posts/${values.id}`, values);
      openNotification({
        type: "success",
        message: "Blog is saved !",
        redirectUrl: "/blogs",
      });
    } catch (error: any) {
      openNotification({
        type: "error",
        message: error?.response?.message ?? error?.message,
      });
    }
  };

  return (
    <>
      {contextHolder}
      <BreadCrumb
        breadCrumbDetails={[
          BlogsCrumb,
          { isRoute: false, name: post && post?.title },
        ]}
        details={
          <span className="line-clamp-1">
            Edit blog
            <i className="ml-3">
              <sup>
                <FaQuoteLeft size={10} />
              </sup>
              {post && post?.title}
              <sup>
                <FaQuoteRight size={10} />
              </sup>
            </i>
          </span>
        }
      />
      <section className="p-5 mt-5 bg-white dark:bg-primary-dark-600 rounded-md">
        <Form onFinish={saveBlog} form={form} name="Blog" layout="vertical">
          {isLoading ? (
            <Loader />
          ) : (
            <>
              <Form.Item
                name="id"
                label={<span className="dark:text-white">Blog ID</span>}
              >
                <Input
                  size="large"
                  className="dark:text-white"
                  placeholder="ID"
                  disabled
                />
              </Form.Item>
              <Form.Item
                name="userId"
                label={<span className="dark:text-white">User ID</span>}
              >
                <Input
                  size="large"
                  className="dark:text-white"
                  placeholder="ID"
                  disabled
                />
              </Form.Item>
              <Form.Item
                name="title"
                label={<span className="dark:text-white">Blog Title</span>}
              >
                <Input
                  size="large"
                  className="dark:text-white"
                  placeholder="Blog Title"
                />
              </Form.Item>
              <Form.Item
                name="body"
                label={<span className="dark:text-white">Blog Body</span>}
              >
                <Input.TextArea
                  size="large"
                  className="dark:text-white"
                  placeholder="Blog Title"
                  autoSize
                />
              </Form.Item>
              <Form.Item>
                <Button htmlType="submit" type="default" size="large">
                  Save
                </Button>
              </Form.Item>
            </>
          )}
        </Form>
      </section>
    </>
  );
};

export default EditBlog;
