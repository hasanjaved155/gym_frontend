import { useEffect } from "react";
import { useLocation } from "react-router-dom";

import Hero from "../components/Hero";

import Footer from "../components/Footer";

export default function HomePage() {
  const location = useLocation();

  useEffect(() => {
    // If there's a hash, scroll to that element
    if (location.hash) {
      const element = document.querySelector(location.hash);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth" });
        }, 100);
      }
    }
  }, [location]);

  return (
    <>
      <div id="home">
        <Hero />
      </div>
      <Footer />
    </>
  );
}
