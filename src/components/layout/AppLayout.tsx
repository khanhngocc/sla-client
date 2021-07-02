import SideBar from "../sidebar/SideBar";
import Meta from "../site/Meta";
import Header from "../header/Header";
import { useEffect, useState } from "react";
import { RootStore } from "../../utils/TypeScript";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { getUserProfile } from "../../redux/actions/authAction";

interface Props {
  title: string;
  desc: string;
  children: React.ReactNode;
}

const AppLayout = ({ title, desc, children }: Props) => {
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    if (localStorage.getItem("access-token")) {
      dispatch(getUserProfile());
      router.push("/home");
    } else {
      router.push("/");
    }
  }, []);

  const { auth, alert } = useSelector((state: RootStore) => state);

  const ddmItems = [
    {
      label: "Settings",
    },
    {
      label: "Account",
    },
    {
      label: "Logout",
    },
  ];

  const [isOpen, setIsOpen] = useState(true);

  return (
    <div>
      <Meta pageTitle={title} description={desc} />
      <main className="bg-gray-100 dark:bg-gray-800 rounded-2xl h-screen overflow-hidden relative">
        <div className="flex items-start justify-between">
          <SideBar isHide={false} />
          <div className="flex flex-col w-full pl-0 md:p-4 md:space-y-4">
            <Header username={auth.userResponse?.username} />
            <div className="overflow-auto h-screen pb-24 pt-2 pr-2 pl-2 md:pt-0 md:pr-0 md:pl-0">
              {children}
            </div>
            <div>{/* footer */}</div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AppLayout;
