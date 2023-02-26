import {
  createContext,
  Dispatch,
  ReactNode,
  useContext,
  useEffect,
  useReducer,
} from "react";
import SideBarToggleReducer, {
  SideBarActionType,
} from "./reducers/SideBare.reducer";
import { InitialSideBarStateType } from "./interface/Interface";

type GlobalContextProviderChildrenType = {
  children: ReactNode;
};

let sideBarInitialState = {
  isOpen: localStorage.getItem("isSideBarOpen")
    ? JSON.parse(localStorage.getItem("isSideBarOpen") || "{}")
    : true,
};

interface SideBarContextPropsTypes {
  sideBar: InitialSideBarStateType;
  sideBarDispatch: Dispatch<SideBarActionType>;
}

type ContextPropsTypes = SideBarContextPropsTypes;

const GlobalContext = createContext<ContextPropsTypes>({} as ContextPropsTypes);

export const useGlobalContext = () => useContext(GlobalContext);

const GlobalContextProvider = ({
  children,
}: GlobalContextProviderChildrenType) => {
  const [sideBar, sideBarDispatch] = useReducer(
    SideBarToggleReducer,
    sideBarInitialState
  );

  return (
    <GlobalContext.Provider value={{ sideBar, sideBarDispatch }}>
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalContextProvider;
