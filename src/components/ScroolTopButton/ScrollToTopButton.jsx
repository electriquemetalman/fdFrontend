import React, { useState, useEffect } from "react";
import "./ScrollToTopButton.css"; // tu peux ajouter un style séparé

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  // 🔹 Vérifie la position du scroll
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  // 🔹 Fonction pour remonter
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // défilement fluide
    });
  };

  return (
    isVisible && (
      <button className="scroll-to-top" onClick={scrollToTop}>
        ⬆
      </button>
    )
  );
};

export default ScrollToTopButton;