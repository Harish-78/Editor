import { InputAdornment, TextField } from "@mui/material";
import React from "react";
import { FaClockRotateLeft } from "react-icons/fa6";
import SearchImg from "../assets/images/Search.png";

const Home = () => {
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
          </div>
        }
      </div>
  );
};

export default Home;
