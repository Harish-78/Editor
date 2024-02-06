import { InputAdornment, TextField } from "@mui/material";
import React from "react";
import { FaClockRotateLeft } from "react-icons/fa6";
import SearchImg from "../assets/images/Search.png";
import instance from "../axios/axios";

const Home = () => {
  const [recentfiles, setRecentFiles] = React.useState([]);
  const getRecentFiles = async () => {
    try {
      const response = await instance.get(`/getallfiledata`);
      const { data } = response.data || {};
      setRecentFiles(data);
    } catch (err) {
      console.log(err.message);
    }
  };
  React.useEffect(() => {
    getRecentFiles();
  }, []);
  console.log(recentfiles);

  return (
    <div className="w-full">
      {
        <div>
          <div className="m-3 flex justify-end">
            <TextField
              size="small"
              margin="dense"
              variant="standard"
              placeholder="Search"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <img src={SearchImg} alt="SearchImg" />
                  </InputAdornment>
                ),
              }}
            />
          </div>
          <div className="flex">
            <div className="my-6 mx-4">
              <FaClockRotateLeft />
            </div>
            <p className="text-dark-purple font-medium text-xl">
              Recent documents
            </p>
          </div>
          <div className="flex flex-wrap h-full">
          {!recentfiles.some(item => item.id === 1) ? (
  recentfiles.map((item, index) => (
    <div
      key={index}
      className="m-5 w-40 flex justify-center items-center flex-col  rounded-md shadow-md"
      // onClick={() => handleTemplatesOnclick(item?.data, item?.name)}
    >
      <img
        src={item?.imageUrl}
        className="w-[150px] h-[150px]"
        alt="templates"
      />
      <h6>{item?.name}</h6>
    </div>
  ))
) : null}

          </div>
        </div>
      }
    </div>
  );
};

export default Home;
