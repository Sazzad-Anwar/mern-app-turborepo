import { notification } from "antd";
import { ReactNode } from "react";
import { useNavigate } from "react-router-dom";

interface NotificationPropsType {
  type: "success" | "info" | "warning" | "error";
  message: string;
  description?: string | ReactNode;
  redirectUrl?: string;
}

const useNotification = () => {
  const [api, contextHolder] = notification.useNotification();
  const navigate = useNavigate();

  const openNotification = ({
    type,
    message,
    description,
    redirectUrl,
  }: NotificationPropsType) => {
    api[type]({
      message,
      description,
    });
    if (redirectUrl) {
      setTimeout(() => {
        navigate(redirectUrl);
      }, 2000);
    }
  };

  return { contextHolder, openNotification };
};

export default useNotification;
