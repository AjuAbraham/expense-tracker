import { useContext, useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ImStatsDots } from "react-icons/im";
import { FaMoneyCheckDollar } from "react-icons/fa6";
import { GiReceiveMoney } from "react-icons/gi";
import { ImExit } from "react-icons/im";
import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { TokenContext } from "@/context/tokenContext";
import axios from "@/axios";

interface User {
  email?: string;
  password?: string;
  avatar?: string;
  firstName?: string;
  lastName?: string;
}

const Home = () => {
  const navigate = useNavigate();
  const { getToken, removeToken } = useContext(TokenContext);
  const [user, setUser] = useState<User | null>(null);

  const handleLogout = () => {
    removeToken();
    navigate("/auth/login");
  };

  const handleDataFetch = async (token: string | null) => {
    const res = await axios.get("/users/getUserById", {
      headers: { Authorization: `Bearer ${token}` },
    });
    setUser(res.data.user);
  };

  useEffect(() => {
    const token = getToken();
    if (!token) {
      navigate("/auth/login");
    }
    handleDataFetch(token);
  }, [getToken, navigate]);

  return (
    <>
      <div className="grid h-screen w-screen grid-cols-12">
        <div className="col-span-3 m-3 rounded-2xl border-2 sm:block hidden">
          {/* Avatar */}
          <div className="mt-10 flex ml-[30px]">
            <div className="flex items-center justify-center gap-4">
              <Avatar className="w-[60px] h-[60px]">
                <AvatarImage
                  src={user?.avatar ? user.avatar : "https://github.com/shadcn.png"}
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <h2 className="text-xl font-bold text-white">
                  {user?.firstName} {user?.lastName}
                </h2>
              </div>
            </div>
          </div>

          {/* Nav Bar */}
          <ul className="mt-24 ml-[40px] text-[#C7D1DB]">
            <li>
              <NavLink
                to="/dashboard"
                className={({ isActive }) =>
                  `flex gap-5 items-center cursor-pointer mb-5 p-2 rounded-md transition-all duration-300 transform hover:scale-105 active:scale-95 w-[280px] ${
                    isActive ? "bg-orange-600 text-black rounded-lg" : "hover:bg-orange-900"
                  }`
                }
              >
                <ImStatsDots size={25} />
                <p className="font-bold">Dashboard</p>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/incomes"
                className={({ isActive }) =>
                  `flex gap-5 items-center cursor-pointer mb-5 p-2 rounded-md transition-all duration-300 transform hover:scale-105 active:scale-95 w-[280px] ${
                    isActive ? "bg-orange-600 text-black rounded-lg" : "hover:bg-orange-900"
                  }`
                }
              >
                <FaMoneyCheckDollar size={25} />
                <p className="font-bold">Incomes</p>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/expenses"
                className={({ isActive }) =>
                  `flex gap-5 items-center cursor-pointer mb-5 p-2 rounded-md transition-all duration-300 transform hover:scale-105 active:scale-95 w-[280px] ${
                    isActive ? "bg-orange-600 text-black rounded-lg" : "hover:bg-orange-900"
                  }`
                }
              >
                <GiReceiveMoney size={25} />
                <p className="font-bold">Expenses</p>
              </NavLink>
            </li>
          </ul>

          {/* Logout Button */}
          <div className="mt-[390px] ml-[20px]">
            <Button
              className="rounded-xl bg-white text-black hover:bg-slate-500"
              onClick={handleLogout}
            >
              <ImExit size={20} />
              <h3 className="text-lg font-bold">Log Out</h3>
            </Button>
          </div>
        </div>

        <div className="col-span-9 m-3 rounded-2xl">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default Home;
