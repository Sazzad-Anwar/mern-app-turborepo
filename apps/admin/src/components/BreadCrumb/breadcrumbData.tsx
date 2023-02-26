import { RouteEnums } from "../../routes/routes.model";
import { BreadcrumbType } from "./customBreadcrumb.type";

export const DashboardCrumb: BreadcrumbType = {
  isRoute: true,
  route: RouteEnums.Dashboard,
  name: "Dashboard",
};

export const BlogsCrumb: BreadcrumbType = {
  isRoute: true,
  route: RouteEnums.Blogs,
  name: "Blogs",
};

export const UsersCrumb: BreadcrumbType = {
  isRoute: true,
  route: RouteEnums.Users,
  name: "Users",
};
