import React, { useState } from "react";
import controlImg from "../assets/images/control.png";
import SettingImg from "../assets/images/Setting.png";
import SearchImg from "../assets/images/Search.png";
import aroopaImg from "../assets/images/aroopa.jpeg";
import SettingsScreen from "../Screens/SettingsScreen";
import TemplatesScreen from "../Screens/TemplatesScreen";
import TrashScreen from "../Screens/TrashScreen";
import { useNavigate } from "react-router-dom";
import SimpleDialogDemo from "../components/SearchDialog";
import Home from "../Screens/Home";

const HomeScreen = () => {
  const [open, setOpen] = useState(true);
  const navigate = useNavigate();
  const [renderComponent, setRenderComponent] = useState(<Home />);
  const [title, setTitle] = useState("");
  const Menus = [
    {
      title: "Home",
      path: "/home",
      src: "https://cdn-icons-png.freepik.com/256/13956/13956008.png?ga=GA1.1.1847498234.1706074892&semt=ais",
    },
    { title: "Search", path: "/searchDialog", src: SearchImg },

    {
      title: "Templates",
      path: "/templates",
      src: "https://cdn-icons-png.freepik.com/256/5080/5080020.png?ga=GA1.1.1847498234.1706074892&semt=ais",
    },
    { title: "Settings", path: "/settings", src: SettingImg },

    {
      title: "Trash",
      path: "/trash",
      src: "https://cdn-icons-png.freepik.com/256/13545/13545397.png?ga=GA1.1.1847498234.1706074892&semt=ais",
    },
  ];
  const handleOnClick = (item, title) => {
    setTitle(title);
    switch (item) {
      case "/home":
        setRenderComponent(<Home />);
        break;
      case "/searchDialog":
        setRenderComponent(<SimpleDialogDemo />);
        break;

      case "/settings":
        setRenderComponent(<SettingsScreen />);
        break;
      case "/templates":
        setRenderComponent(<TemplatesScreen />);
        break;
      case "/trash":
        setRenderComponent(<TrashScreen />);
        break;
      default:
        break;
    }
  };

  return (
    <div className="flex">
      <div
        className={` ${
          open ? "md:w-72 w-40" : "md:w-20 w-20"
        } bg-dark-purple h-screen p-5  pt-8 relative duration-300`}
      >
        <img
          src={controlImg}
          className={`absolute cursor-pointer -right-3 top-9 w-7 border-dark-purple
           border-2 rounded-full  ${!open && "rotate-180"}`}
          onClick={() => setOpen(!open)}
          alt="mtgybh"
        />
        <div className="flex gap-x-4 items-center">
          <img
            onClick={() => {
              navigate("/");
            }}
            src={aroopaImg}
            className={`cursor-pointer duration-500 w-7 b ${
              open && "rotate-[360deg]"
            }`}
            alt="arooopa"
          />
          <h1
            className={`text-white origin-left font-medium text-xl duration-200 ${
              !open && "scale-0"
            }`}
          >
            Aroopa Wiki
          </h1>
        </div>
        <ul className="pt-6">
          {Menus?.length
            ? Menus?.map((Menu, index) => (
                <li
                  onClick={() => handleOnClick(Menu?.path, Menu?.title)}
                  key={index}
                  className={`flex  relative right-9 bottom-7  rounded-md p-2 cursor-pointer hover:bg-light-white  text-gray-300 text-sm items-center gap-x-4 
              ${Menu?.gap ? "mt-9" : "mt-2"} ${Menu ? "hover:w-9" : null} `}
                >
                  <img src={Menu?.src} className="w-5 h-5" alt="dkhvk" />
                  <span
                    className={`${!open && "hidden"} origin-left duration-200`}
                  >
                    {Menu?.title}
                  </span>
                </li>
              ))
            : null}
        </ul>
      </div>
      <div className="h-screen  overflow-hidden w-full">
        <div className="w-full   shadow-md ">
          <p
            className={` text-dark-purple ${
              title ? `p-2 m-4` : `py-5 m-4`
            } text-xl font-medium`}
          >
            {title}
          </p>
        </div>
        {renderComponent}
      </div>
    </div>
  );
};
export default HomeScreen;
