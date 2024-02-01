import React from "react";
import { templates } from "../assets/data/templates";
import { useData } from "../context/DataContext";
import { useNavigate } from "react-router-dom";
const TemplatesScreen = () => {
  const { setSharedData } = useData();
  const navigate = useNavigate();
  const handleTemplatesOnclick = (newData, name) => {
    setSharedData(() => {
      const availableData = [];
      availableData.push(newData, name);
      return availableData;
    });
    console.log(newData);
    navigate("/editor");
  };
  
  return (
    <div className="overflow-scroll h-full">
      <div className="flex flex-wrap h-full">
        {templates?.length
          ? templates.map((item, index) => (
              <div
                key={index}
                className="m-5 w-40 flex justify-center items-center flex-col  rounded-md shadow-md"
                onClick={() => handleTemplatesOnclick(item?.data, item?.name)}
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
