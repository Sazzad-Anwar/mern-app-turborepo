import { FC } from "react";
import { BreadcrumbPropType, BreadcrumbType } from "./customBreadcrumb.type";
import { Breadcrumb } from "antd";
import { Link } from "react-router-dom";
import { nanoid } from "nanoid";
import { BiChevronRight } from "react-icons/bi";

const BreadCrumb = ({ breadCrumbDetails, details }: BreadcrumbPropType) => {
  return (
    <>
      <Breadcrumb
        className="flex items-center dark:text-white"
        // separator={<BiChevronRight className="dark:text-white" size={20} />}
      >
        {breadCrumbDetails.map((item: BreadcrumbType) => {
          if (item.isRoute && item.route) {
            return (
              <Breadcrumb.Item key={nanoid()}>
                <Link to={item.route}>
                  <span className="font-bold dark:text-white">{item.name}</span>
                </Link>
              </Breadcrumb.Item>
            );
          } else {
            return (
              <Breadcrumb.Item
                className="font-semibold dark:text-white"
                key={nanoid()}
              >
                {item.name}
              </Breadcrumb.Item>
            );
          }
        })}
      </Breadcrumb>
      <div className="mt-2 text-2xl font-semibold dark:text-white">
        {details}
      </div>
    </>
  );
};

export default BreadCrumb;
