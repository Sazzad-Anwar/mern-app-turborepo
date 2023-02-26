import { ReactNode } from "react";

export type BreadcrumbType = {
  isRoute: boolean;
  name: string;
  route?: string;
};

export type BreadcrumbPropType = {
  breadCrumbDetails: BreadcrumbType[];
  details?: string | ReactNode;
};
