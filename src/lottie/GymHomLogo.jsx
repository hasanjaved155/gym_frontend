import React from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import GymLogo from "./GymLogo.lottie";

const GymHomLogo = ({ isMobileOnly }) => {
  return (
    <DotLottieReact
      src={GymLogo}
      loop
      autoplay
      style={{
        width: "100%",
        height: isMobileOnly ? "300px" : "400px",
        maxWidth: "450px",
        margin: "0 auto",
      }}
    />
  );
};

export default GymHomLogo;
