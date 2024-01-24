import { useState } from "react";
import controlImg from "../assets/control.png";
import FolderImg from "../assets/Folder.png";
import SettingImg from "../assets/Setting.png";
import SearchImg from "../assets/Search.png";
import * as RiIcons from "react-icons/ri";
import { Button } from "@mui/material";

const HomeScreen = () => {
  const [open, setOpen] = useState(true);

  const Menus = [
    { title: "Search", src: SearchImg },
    {
      title: "Files ",
      src: FolderImg,
      path: "",
      gap: true,
      iconClosed: <RiIcons.RiArrowDownSFill />,
      iconOpened: <RiIcons.RiArrowUpSFill />,
    },
    { title: "Settings", path: "", src: SettingImg },
    {
      title: "Templates",
      path: "",
      src: "https://cdn-icons-png.freepik.com/256/5080/5080020.png?ga=GA1.1.1847498234.1706074892&semt=ais",
    },
    {
      title: "Trash",
      path: "",
      src: "https://cdn-icons-png.freepik.com/256/13545/13545397.png?ga=GA1.1.1847498234.1706074892&semt=ais",
    },
  ];

  const handleOnClick = () => {};
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
            src="data:image/jpeg;base64,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"
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
                  onClick={Menu?.onClick || handleOnClick}
                  key={index}
                  className={`flex  rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4 
              ${Menu?.gap ? "mt-9" : "mt-2"} ${
                    index === 0 && "bg-light-white"
                  } `}
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
      <div className="h-screen flex-1 p-7  overflow-auto">
        <div className="flex justify-end">
          <Button variant="contained" sx={{
            backgroundColor:"#081a51"
          }}>Share</Button>
        </div>
      </div>
    </div>
  );
};
export default HomeScreen;
