import React from "react";
import { Link } from "react-router-dom";
import style from "./Landing.module.css";
import gif from "../../Utils/landing/gif3.mp4";
export default function LandingPage() {
  return (
    <div className={style.container}>
      <div className={style.promo}>
        <Link to="/home">
          <button className={style.glowOnHover}>HOME</button>
        </Link>
      </div>
      <video muted autoPlay loop>
        <source src={gif} type="video/mp4" />
      </video>
      <div className={style.capa}></div>
    </div>
  );
}
