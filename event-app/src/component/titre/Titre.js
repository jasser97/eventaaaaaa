import React from "react";
import "./Titre.css";
const Titre = (props) => {
  return (
    <div className="section-header">
      <h2>{props.titre}</h2>
    </div>
  );
};

export default Titre;
