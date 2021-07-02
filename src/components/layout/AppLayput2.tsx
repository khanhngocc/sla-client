import Link from "next/link";
import { useEffect, useState } from "react";
import Ddm from "../ddm/DropDownMenu";
import Meta from "../site/Meta";

import { RootStore } from "../../utils/TypeScript";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { getUserProfile } from "../../redux/actions/authAction";

interface Props {
  title: string;
  desc: string;
  children: React.ReactNode;
}

const ddmItems = [
  {
    label: "Your Profile",
    link: "/me",
  },
  {
    label: "Setting",
    link: "/setting",
  },
  {
    label: "Help",
    link: "help",
  },
  {
    label: "Logout",
    link: "/logout",
  },
];

const ddmItemsAdd = [
  {
    label: "New study set ",
    link: "/me",
  },
  {
    label: "New folder",
    link: "/setting",
  },
  {
    label: "New class",
    link: "help",
  },
];

const AppLayput2 = (props: Props) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const [isOpenSidebar, setOpenSidebar] = useState(true);

  useEffect(() => {
    if (localStorage.getItem("access-token")) {
      dispatch(getUserProfile());
    } else {
      router.push("/login");
    }
  }, []);

  const { auth, alert } = useSelector((state: RootStore) => state);

  const handleOnClick = () => {
    setOpenSidebar(!isOpenSidebar);
  };

  return (
    <div>
      <Meta pageTitle={props.title} description={props.desc} />
      <main className="dark:bg-gray-800 bg-white relative overflow-hidden h-screen">
        <header className="h-20 sm:h-16 bg-white flex items-center z-30 w-full shadow-sm border-b-1">
          <div className="container mx-auto px-6 flex items-center justify-between">
            <div className="uppercase text-gray-700 dark:text-white  flex items-center">
              <span className="text-2xl font-bold ml-3">SLA</span>
              <div className="relative text-gray-600 ml-6">
                <svg
                  className="absolute left-0 mt-2.5 w-4 h-4 ml-4 text-gray-500 pointer-events-none fill-current group-hover:text-gray-400 sm:block"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M12.9 14.32a8 8 0 1 1 1.41-1.41l5.35 5.33-1.42 1.42-5.33-5.34zM8 14A6 6 0 1 0 8 2a6 6 0 0 0 0 12z"></path>
                </svg>
                <input
                  type="text"
                  className="block w-full py-1.5 pl-10 pr-4 leading-normal rounded-2xl focus:border-transparent focus:outline-none focus:ring-2 focus:ring-gray-200 ring-opacity-90 bg-gray-100 dark:bg-gray-800 text-gray-400 aa-input"
                  placeholder="Search"
                />
              </div>
              <div className="px-6 relative">
                <Ddm
                  icon={
                    <svg
                      width="20px"
                      height="20px"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12 4V20M4 12L20 12"
                        stroke="#001A72"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  }
                  withBackground={false}
                  forceOpen={false}
                  items={ddmItemsAdd.map((item) => {
                    return { label: item.label };
                  })}
                />
              </div>
            </div>
            <div className="flex items-center font-semibold">
              <nav className=" text-gray-700 dark:text-white text-sm lg:flex items-center hidden">
                <Link href="/home">
                  <a
                    className={`py-2 px-4 flex hover:text-black ${
                      router.pathname.indexOf("/home") !== -1
                        ? "justify-start border-b-2 border-green-500"
                        : ""
                    }`}
                  >
                    HOME
                  </a>
                </Link>
                <Link href="/schedule">
                  <a
                    className={`py-2 px-4 flex hover:text-black ${
                      router.pathname.indexOf("/schedule") !== -1
                        ? "justify-start border-b-2 border-green-500"
                        : ""
                    }`}
                  >
                    SCHEDULE
                  </a>
                </Link>
                <Link href="/library">
                  <a
                    className={`py-2 px-4 flex hover:text-black ${
                      router.pathname.indexOf("/library") !== -1
                        ? "justify-start border-b-2 border-green-500"
                        : ""
                    }`}
                  >
                    LIBRARY
                  </a>
                </Link>
                <Link href="/activity">
                  <a
                    className={`py-2 px-4 flex hover:text-black ${
                      router.pathname.indexOf("/activity") !== -1
                        ? "justify-start border-b-2 border-green-500"
                        : ""
                    }`}
                  >
                    ACTIVITY
                  </a>
                </Link>
                <Link href="/explore">
                  <a
                    className={`py-2 px-4 flex hover:text-black ${
                      router.pathname.indexOf("/explore") !== -1
                        ? "justify-start border-b-2 border-green-500"
                        : ""
                    }`}
                  >
                    EXPLORE
                  </a>
                </Link>
                <div className="flex ml-12 pl-4">
                  <div className="ml-3 relative">
                    <button className="flex p-2 items-center bg-white  text-gray-400 hover:text-gray-700 text-md">
                      <svg
                        width="20"
                        height="20"
                        className="text-gray-400"
                        fill="currentColor"
                        viewBox="0 0 1792 1792"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M912 1696q0-16-16-16-59 0-101.5-42.5t-42.5-101.5q0-16-16-16t-16 16q0 73 51.5 124.5t124.5 51.5q16 0 16-16zm816-288q0 52-38 90t-90 38h-448q0 106-75 181t-181 75-181-75-75-181h-448q-52 0-90-38t-38-90q50-42 91-88t85-119.5 74.5-158.5 50-206 19.5-260q0-152 117-282.5t307-158.5q-8-19-8-39 0-40 28-68t68-28 68 28 28 68q0 20-8 39 190 28 307 158.5t117 282.5q0 139 19.5 260t50 206 74.5 158.5 85 119.5 91 88z"></path>
                      </svg>
                      <div className="bg-red-500 w-2 h-2 rounded-full right-1 top-1 absolute"></div>
                    </button>
                  </div>
                  <div className="px-0 relative">
                    <Ddm
                      icon={
                        <svg
                          width="20"
                          fill="currentColor"
                          height="20"
                          className="text-gray-800"
                          viewBox="0 0 1792 1792"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M1523 1339q-22-155-87.5-257.5t-184.5-118.5q-67 74-159.5 115.5t-195.5 41.5-195.5-41.5-159.5-115.5q-119 16-184.5 118.5t-87.5 257.5q106 150 271 237.5t356 87.5 356-87.5 271-237.5zm-243-699q0-159-112.5-271.5t-271.5-112.5-271.5 112.5-112.5 271.5 112.5 271.5 271.5 112.5 271.5-112.5 112.5-271.5zm512 256q0 182-71 347.5t-190.5 286-285.5 191.5-349 71q-182 0-348-71t-286-191-191-286-71-348 71-348 191-286 286-191 348-71 348 71 286 191 191 286 71 348z" />
                        </svg>
                      }
                      withBackground={false}
                      forceOpen={false}
                      items={ddmItems.map((item) => {
                        return { label: item.label };
                      })}
                      username={auth.userResponse?.username}
                    />
                  </div>
                </div>
              </nav>
              <button
                className="lg:hidden flex flex-col ml-4"
                onClick={handleOnClick}
              >
                <span className="w-6 h-1 bg-gray-800 dark:bg-white mb-1" />
                <span className="w-6 h-1 bg-gray-800 dark:bg-white mb-1" />
                <span className="w-6 h-1 bg-gray-800 dark:bg-white mb-1" />
              </button>
            </div>
          </div>
        </header>
        <div className="bg-yellow-50 flex z-20 items-center">
          <div className="container mx-auto flex flex-col justify-between items-center py-4">
            {props.children}
          </div>
        </div>
      </main>
    </div>
  );
};

export default AppLayput2;
