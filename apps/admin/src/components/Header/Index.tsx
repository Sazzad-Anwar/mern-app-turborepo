import { FC } from "react";
import config from "../../config/config";
import { Button, Avatar, Tag, Affix } from "antd";
import { AiOutlineMenu } from "react-icons/ai";
import { FaUserCircle } from "react-icons/fa";
import { RiMenu2Line } from "react-icons/ri";
import { useGlobalContext } from "../../context/GlobalContextProvider";
import { SIDE_BAR_TOGGLE } from "../../context/constants/SideBar.contatns";
import useDeviceWidth from "../../hooks/useDeviceWidth";

const Header: FC = () => {
  const { sideBar, sideBarDispatch } = useGlobalContext();
  const { isMobileWidth } = useDeviceWidth();

  return (
    <Affix>
      <header
        style={{
          width: !isMobileWidth
            ? `calc(100vw - ${sideBar?.isOpen ? "256px" : "80px"})`
            : "100%",
        }}
        className="flex items-center border-b dark:border-gray-700 z-10 h-16 px-3 justify-between bg-white dark:bg-primary-dark-500 dark:text-white"
      >
        <Button
          icon={
            sideBar?.isOpen ? (
              <RiMenu2Line size={25} />
            ) : (
              <AiOutlineMenu size={25} />
            )
          }
          type="default"
          className="flex justify-center items-center dark:text-gray-200"
          size="large"
          onClick={() =>
            sideBarDispatch({
              type: SIDE_BAR_TOGGLE,
              payload: !sideBar?.isOpen,
            })
          }
        />

        <div className="flex md:mr-5 md:pr-3">
          <Avatar
            className="flex justify-center items-center"
            size={45}
            icon={<FaUserCircle size={45} />}
          />
          <div className="pl-4 max-w-44">
            <h3 className="text-base font-bold dark:text-gray-200 text-gray-700 line-clamp-1 truncate">
              Guest user
            </h3>
            <Tag color="geekblue" className="text-xs">
              Admin
            </Tag>
          </div>
        </div>
      </header>
    </Affix>
  );
};

export default Header;
