import React, { useState } from "react";
import controlImg from "../assets/images/control.png";
import FolderImg from "../assets/images/Folder.png";
import SettingImg from "../assets/images/Setting.png";
import SearchImg from "../assets/images/Search.png";
import aroopaImg from "../assets/images/aroopa.jpeg";
import SettingsScreen from "../Screens/SettingsScreen";
import TemplatesScreen from "../Screens/TemplatesScreen";
import TrashScreen from "../Screens/TrashScreen";
import FilesScreen from "../Screens/FilesScreen";

const HomeScreen = () => {
  const [open, setOpen] = useState(true);
  const [renderComponent, setRenderComponent] = useState(null);
  const [title, setTitle] = useState("");
  const Menus = [
    { title: "Search", path: "/", src: SearchImg },
    {
      title: "Files ",
      src: FolderImg,
      path: "/files",
      gap: true,
    },
    { title: "Settings", path: "/settings", src: SettingImg },
    {
      title: "Templates",
      path: "/templates",
      src: "https://cdn-icons-png.freepik.com/256/5080/5080020.png?ga=GA1.1.1847498234.1706074892&semt=ais",
    },
    {
      title: "Trash",
      path: "/trash",
      src: "https://cdn-icons-png.freepik.com/256/13545/13545397.png?ga=GA1.1.1847498234.1706074892&semt=ais",
    },
  ];
  const handleOnClick = (item, title) => {
    console.log(item);
    setTitle(title);
    switch (item) {
      case "/files":
        setRenderComponent(<FilesScreen />);
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
        <div className="w-full  shadow-md p-6 text-dark-purple text-xl font-medium ">
          {title}{" "}
        </div>
        {renderComponent}
      </div>
    </div>
  );
};
export default HomeScreen;
