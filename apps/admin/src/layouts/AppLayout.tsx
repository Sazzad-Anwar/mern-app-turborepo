import { FC, useEffect } from "react";
import Header from "../components/Header/Index";
import SidePanel from "../components/SidePanel/Index";
import { Outlet } from "react-router-dom";
import { useGlobalContext } from "../context/GlobalContextProvider";
import { useLocation } from "react-router-dom";
import useDeviceWidth from "../hooks/useDeviceWidth";

const AppLayout: FC = () => {
  const { sideBar } = useGlobalContext();
  const { isMobileWidth } = useDeviceWidth();
  let routeLocation = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [routeLocation.pathname]);

  return (
    <>
      <div className="flex dark:bg-primary-dark-500">
        <SidePanel />
        <div className="bg-gray-100 dark:bg-primary-dark-400">
          <Header />
          <div
            className="p-5 overflow-y-auto overflow-x-hidden"
            style={{
              minHeight: "calc(100vh - 65px)",
              width: `calc(100vw - ${
                sideBar.isOpen
                  ? "256px"
                  : !sideBar?.isOpen && isMobileWidth
                  ? "0px"
                  : "80px"
              })`,
            }}
          >
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};

export default AppLayout;
