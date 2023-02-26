import { FC } from "react";
import { Button, Result } from "antd";
import { useNavigate, useRouteError } from "react-router-dom";
import { RouterError } from "./error.interface";

const Error: FC = () => {
  const navigate = useNavigate();
  const error = useRouteError() as RouterError;

  return (
    <Result
      status={error?.status}
      title={error?.status}
      subTitle={`${error?.statusText}`}
      extra={
        <Button type="default" onClick={() => navigate(-1)}>
          Go Back
        </Button>
      }
    />
  );
};

export default Error;
