import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

const SideBar: React.FC = () => {
  const router = useRouter();

  return (
    <div className="fixed top-0 left-0 w-20 m-0 flex flex-col bg-color-base h-screen items-center gap-6 pt-7">
      <SideBarIcon currentPath={router.pathname} sidebarIconName="user" />
      <SideBarIcon currentPath={router.pathname} sidebarIconName="games" />
    </div>
  );
};

export default SideBar;

const getIconD = (sidebarIconName: SidebarIconName) => {
  if (sidebarIconName === "user") {
    return "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z";
  }
  if (sidebarIconName === "games") {
    return "M8 16l2.879-2.879m0 0a3 3 0 104.243-4.242 3 3 0 00-4.243 4.242zM21 12a9 9 0 11-18 0 9 9 0 0118 0z";
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
        <svg
          className={`w-11 h-11 hover:cursor-pointer rounded-md ${
            isIconSelected(currentPath, sidebarIconName) ? "bg-color-white" : ""
          }`}
          fill="none"
          stroke={
            isIconSelected(currentPath, sidebarIconName) ? "#4F46E5" : "white"
          }
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d={getIconD(sidebarIconName)}
          ></path>
        </svg>
      </a>
    </Link>
  );
};
