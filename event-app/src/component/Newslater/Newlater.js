import React from "react";
import "./Newslater.css";
import Titre from "../titre/Titre";
const Newslater = (props) => {
  return (
    <section id="subscribe">
      <div className="container">
        <Titre titre="NewsLetter" />
        <form method="POST" action="#">
          <div className="form-row justify-content-center">
            <div className="col-auto">
              <input
                type="text"
                className="form-control"
                placeholder="Enter votre Email"
              />
            </div>
            <div className="col-auto">
              <button type="submit">Subscribe</button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Newslater;
