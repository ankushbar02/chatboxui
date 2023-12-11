import React from "react";
import pic from "../Assets/pexels-andrea-piacquadio-733872 (1).jpg";
export default function NavBar() {
  return (
    <div
      className="d-flex  justify-content-between  align-items-center p-3  text-light"
      style={{ backgroundColor: "#E29578" }}
    >
      <div className="d-flex align-items-center">
        <span className="material-symbols-outlined">arrow_back_ios</span>
        <img width="60px" className="rounded-circle px-2" src={pic} alt="" />
        <span>Marry Jonas</span>
      </div>

      <div>
        <span className="material-symbols-outlined mx-3">call</span>
        <span className="material-symbols-outlined">more_vert</span>
      </div>
    </div>
  );
}
