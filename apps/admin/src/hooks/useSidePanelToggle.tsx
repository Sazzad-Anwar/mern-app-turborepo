import { useState } from "react";

export default function useSidePanelToggle() {
  const [collapsed, setCollapsed] = useState<boolean>(false);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };
  return { collapsed, toggleCollapsed };
}
