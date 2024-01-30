import React, { useState } from "react";
import { templates } from "../assets/data/templates";
import { useData } from "../context/DataContext";
import { useNavigate } from "react-router-dom";
const TemplatesScreen = () => {
  const { setSharedData } = useData();
  const navigate = useNavigate();
  const handleTemplatesOnclick = (newData) => {
    setSharedData(newData);
    console.log(newData);
    navigate("/files");
  };
  return (
    <div className="overflow-scroll h-full">
      <div className="flex flex-wrap h-full">
        {templates?.length
          ? templates.map((item, index) => (
              <div
                key={index}
                className="m-5 w-40 flex justify-center items-center flex-col  rounded-md shadow-md"
                onClick={() => handleTemplatesOnclick(item?.data)}
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
  );
};

export default TemplatesScreen;
