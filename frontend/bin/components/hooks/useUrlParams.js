import { useLocation } from "react-router-dom";

const useURLParams = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const getValueFromQueryString = (paramName) => {
    return queryParams.get(paramName);
  };

  return {
    getValueFromQueryString,
  };
};

export default useURLParams;