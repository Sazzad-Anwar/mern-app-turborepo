import { FC, useEffect } from "react";
import config from "../../config/config";
import { Button, Checkbox, Form, Input } from "antd";
import { HiOutlineMail } from "react-icons/hi";
import { AiFillLock } from "react-icons/ai";
import { ImEye, ImEyeBlocked } from "react-icons/im";
import { useNavigate } from "react-router-dom";

interface IFormData {
  email: string;
  password: string;
  remember: boolean;
}

const Login: FC = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("login")) {
      form.setFieldsValue({
        email: JSON.parse(localStorage.getItem("login")!).email,
        password: JSON.parse(localStorage.getItem("login")!).password,
        remember: JSON.parse(localStorage.getItem("login")!).remember,
      });
    }
  }, []);

  const onFinish = (values: IFormData) => {
    if (values.remember) {
      localStorage.setItem("login", JSON.stringify(values));
    } else {
      localStorage.removeItem("login");
    }
    form.resetFields();
    navigate("/");
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-6">
      <div className="hidden lg:col-span-4 w-full h-screen lg:flex justify-center items-center bg-primary-dark-400 dark:bg-primary-dark-500 relative">
        <img
          className="h-auto w-auto brightness-50"
          src={config.loginImage}
          alt={config.loginImage}
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center backdrop-blur-sm">
          <img className="h-20 w-auto" src={config.logo} alt="logo" />
        </div>
      </div>
      <div className="lg:col-span-2 p-10 flex items-center h-screen w-full border-l dark:border-gray-700 bg-primary-dark-400 lg:bg-transparent dark:bg-primary-dark-500">
        <div className="mx-auto w-full relative">
          <img
            className="h-auto w-auto brightness-50 block lg:hidden"
            src={config.loginImage}
            alt={config.loginImage}
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center backdrop-blur-md">
            <img
              className="flex justify-self-center h-10 w-10 mx-auto text-center"
              src={config.logo}
              alt="logo"
            />
            <Form
              form={form}
              onFinish={onFinish}
              name="login"
              layout="vertical"
              autoComplete="off"
              className="mt-10 lg:mx-6"
            >
              <Form.Item
                name="email"
                className="w-full"
                rules={[
                  {
                    type: "email",
                    message: "This is not a valid email",
                  },
                  {
                    required: true,
                    message: "Email is required",
                  },
                ]}
              >
                <Input
                  allowClear
                  size="large"
                  placeholder="Email"
                  prefix={<HiOutlineMail size={25} />}
                />
              </Form.Item>
              <Form.Item
                name="password"
                className="w-full pt-5"
                rules={[
                  {
                    type: "string",
                    min: 6,
                  },
                  {
                    required: true,
                    message: "Password is required",
                  },
                ]}
              >
                <Input.Password
                  allowClear
                  size="large"
                  placeholder="********"
                  prefix={<AiFillLock size={25} />}
                />
              </Form.Item>

              <Form.Item className="mb-0">
                <Form.Item name="remember" valuePropName="checked">
                  <Checkbox className="text-white lg:text-black dark:text-white">
                    Remember me
                  </Checkbox>
                </Form.Item>
              </Form.Item>

              <Form.Item shouldUpdate>
                {() => (
                  <Button
                    size="large"
                    type="default"
                    htmlType="submit"
                    className="w-full"
                    disabled={
                      !form.isFieldsTouched(true) ||
                      !!form
                        .getFieldsError()
                        .filter(({ errors }) => errors.length).length
                    }
                  >
                    Log in
                  </Button>
                )}
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
