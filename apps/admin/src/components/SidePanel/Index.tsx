import { FC } from "react";
import {
  AppstoreOutlined,
  ContainerOutlined,
  DesktopOutlined,
  MailOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PieChartOutlined,
} from "@ant-design/icons";
import { Button, MenuProps, theme } from "antd";
import { Menu, Affix } from "antd";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { MdDashboard, MdOutlinePeopleAlt } from "react-icons/md";
import { BsMoon, BsSun } from "react-icons/bs";
import { IoNewspaperSharp } from "react-icons/io5";
import { useGlobalContext } from "../../context/GlobalContextProvider";
import config from "../../config/config";
import { RouteEnums } from "../../routes/routes.model";
import useTheme from "../../hooks/useTheme";
import { AiOutlineLogout, AiOutlineMenu } from "react-icons/ai";
import useDeviceWidth from "../../hooks/useDeviceWidth";
import { RiMenu2Line } from "react-icons/ri";
import { SIDE_BAR_TOGGLE } from "../../context/constants/SideBar.contatns";

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: "group"
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
}

const SidePanel: FC = () => {
  const { sideBar, sideBarDispatch } = useGlobalContext();
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const { isMobileWidth } = useDeviceWidth();

  const items: MenuItem[] = [
    getItem(
      <Link
        onClick={() =>
          isMobileWidth &&
          sideBarDispatch({ type: SIDE_BAR_TOGGLE, payload: false })
        }
        to={RouteEnums.Dashboard}
      >
        Dashboard
      </Link>,
      RouteEnums.Dashboard,
      <MdDashboard size={20} />
    ),
    getItem(
      <Link
        onClick={() =>
          isMobileWidth &&
          sideBarDispatch({ type: SIDE_BAR_TOGGLE, payload: false })
        }
        to={RouteEnums.Blogs}
      >
        Blogs
      </Link>,
      RouteEnums.Blogs,
      <IoNewspaperSharp size={20} />
    ),
    getItem(
      <Link
        onClick={() =>
          isMobileWidth &&
          sideBarDispatch({ type: SIDE_BAR_TOGGLE, payload: false })
        }
        to={RouteEnums.Users}
      >
        Users
      </Link>,
      RouteEnums.Users,
      <MdOutlinePeopleAlt size={20} />
    ),

    getItem(
      <button
        onClick={() => toggleTheme()}
        className="dark:text-white w-full text-left flex items-center"
      >
        <span className="capitalize">
          toggle {theme === "dark" ? "light" : "dark"} theme
        </span>
      </button>,
      "themeSwitch",
      <button className="">
        {theme === "light" ? (
          <BsSun onClick={() => toggleTheme()} size={17} />
        ) : (
          <BsMoon onClick={() => toggleTheme()} size={17} />
        )}
      </button>
    ),
    getItem(
      <button
        onClick={() => navigate("/auth/login")}
        className="dark:text-white w-full text-left flex items-center"
      >
        Logout
      </button>,
      "logout",
      <AiOutlineLogout onClick={() => navigate("/auth/login")} size={20} />
    ),
  ];

  return (
    <Affix>
      <aside
        className="dark:bg-primary-500 border-r dark:border-gray-700"
        style={{
          width:
            sideBar?.isOpen && isMobileWidth
              ? "100vw"
              : sideBar?.isOpen && !isMobileWidth
              ? 256
              : !sideBar?.isOpen && isMobileWidth
              ? 0
              : 80,
          display: !sideBar?.isOpen && isMobileWidth ? "none" : "block",
        }}
      >
        <div className="relative px-5 h-16 dark:bg-primary-dark-500 bg-white border-r-0 flex items-center justify-start ml-5 lg:ml-0 lg:justify-center border-b dark:border-gray-700">
          <img src={config.logo} height={30} width={30} alt={config.name} />
          {sideBar?.isOpen && (
            <h1 className="text-xl font-bold ml-4 dark:text-white">
              {config.name}
            </h1>
          )}
          {sideBar?.isOpen && isMobileWidth && (
            <Button
              icon={
                sideBar?.isOpen ? (
                  <RiMenu2Line size={25} />
                ) : (
                  <AiOutlineMenu size={25} />
                )
              }
              type="default"
              className="absolute right-5 flex justify-center items-center dark:text-gray-200"
              size="large"
              onClick={() =>
                sideBarDispatch({
                  type: SIDE_BAR_TOGGLE,
                  payload: !sideBar?.isOpen,
                })
              }
            />
          )}
        </div>
        <Menu
          defaultSelectedKeys={["/"]}
          defaultOpenKeys={["/" + location.pathname.split("/")[1]]}
          selectedKeys={["/" + location.pathname.split("/")[1]]}
          mode="inline"
          theme={theme}
          className="dark:bg-primary-dark-500 pt-3"
          style={{
            minHeight: "calc(100vh - 65px)",
          }}
          inlineCollapsed={!sideBar?.isOpen}
          items={items}
        />
      </aside>
    </Affix>
  );
};

export default SidePanel;
