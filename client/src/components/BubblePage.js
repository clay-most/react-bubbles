import React, { useState, useEffect } from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";

import Bubbles from "./Bubbles";
import ColorList from "./ColorList";

const BubblePage = () => {
  
  const [colorList, setColorList] = useState([]);

  useEffect(() => {
    localStorage.getItem("token") &&
      axiosWithAuth()
        .get(".colors")
        .then(response => {
          setColorList(response.data);
        })
        .catch(error => console.log("Error", error));
  }, []);

  return (
    <>
      <ColorList colors={colorList} updateColors={setColorList} />
      <Bubbles colors={colorList} />
    </>
  );
};

export default BubblePage;
