import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

const SideBar: React.FC = () => {
  const router = useRouter();

  return (
    <div className="fixed top-0 left-0 w-[5.2rem] m-0 flex flex-col bg-color-base h-screen items-center gap-10 pt-10">
      <SideBarIcon currentPath={router.pathname} sidebarIconName="user" />
      <SideBarIcon currentPath={router.pathname} sidebarIconName="games" />
    </div>
  );
};

export default SideBar;

const getIconClass = (sidebarIconName: SidebarIconName) => {
  if (sidebarIconName === "user") {
    return "fa-solid fa-user";
  }
  if (sidebarIconName === "games") {
    return "fa-solid fa-football";
  }
};

const getOnClickPath = (sidebarIconName: SidebarIconName): string => {
  if (sidebarIconName === "user") return "/user";
  if (sidebarIconName === "games") return "/games";
  return "games";
};

const isIconSelected = (
  currentPath: string,
  sidebarIconName: SidebarIconName,
) => {
  return currentPath.includes(sidebarIconName);
};

type SidebarIconName = "user" | "games" | "create-game";

type SideBarIconProps = {
  sidebarIconName: SidebarIconName;
  currentPath: string;
};

const SideBarIcon: React.FC<SideBarIconProps> = ({
  sidebarIconName,
  currentPath,
}) => {
  return (
    <Link href={getOnClickPath(sidebarIconName)}>
      <a>
        <i
          className={`${getIconClass(sidebarIconName)} text-5xl ${
            isIconSelected(currentPath, sidebarIconName)
              ? "text-color-base"
              : "text-color-white"
          } ${
            isIconSelected(currentPath, sidebarIconName)
              ? "bg-color-white"
              : "bg-color-base"
          } rounded-md p-2`}
        ></i>
      </a>
    </Link>
  );
};
