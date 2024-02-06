import { InputAdornment, TextField } from "@mui/material";
import React from "react";
import { FaClockRotateLeft } from "react-icons/fa6";
import SearchImg from "../assets/images/Search.png";
import instance from "../axios/axios";
import { useNavigate } from "react-router-dom";
import { useData } from "../context/FileDataContext";

const Home = () => {
  const navigate = useNavigate();
  const { setfileUpdateData } = useData();
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

  const handleRecentFilesOnclick = (id) => {
    try {
      navigate(`/editor/${id}`);
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
          <div className="m-5 w-40 flex justify-center items-center flex-col  rounded-md shadow-md">
            <img
              src="https://img.freepik.com/premium-vector/plus-flat-blue-simple-icon-with-long-shadowxa_159242-10005.jpg?w=740"
              className="w-[150px] h-[150px]"
              alt="templates"
            />
            <h6>Blank Page</h6>
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
            {recentfiles?.length
              ? recentfiles.map((item, index) => (
                  <div
                    key={index}
                    className="m-5 w-40 flex justify-center items-center flex-col  rounded-md shadow-md"
                    onClick={() => handleRecentFilesOnclick(item?.id)}
                  >
                    <img
                      src={item?.imageUrl}
                      className="w-[150px] h-[150px]"
                      alt="templates"
                    />
                    <h6>{item?.name}</h6>
                  </div>
                ))
              : null}
          </div>
        </div>
      }
    </div>
  );
};

export default Home;
