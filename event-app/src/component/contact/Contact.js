import React, { useState } from "react";
import NavApp from "../nav-app/NavApp";
import Fotter from "../footer/Footer";
import BackToTop from "../Back-to-top/BackTop";
import "./Contact.css";
import Dropzone from "react-dropzone";
import axios from "axios";
import { Row, Container, Col, Form } from "react-bootstrap";
import Iframe from "react-iframe";
const Contact = (props) => {
  const [Contact, setContact] = useState({
    nom: "",
    email: "",
    sujet: "",
    file: "",
    message: "",
  });
  const [FilePath, setFilePath] = useState("");
  const handleChange = (e) => {
    setContact({ ...Contact, [e.target.name]: e.target.value });
  };
  const onDrop = (files) => {
    let formData = new FormData();
    const config = {
      header: { "content-type": "multipart/form-data" },
    };
    formData.append("file", files[0]);
    axios.post("/api/contact/uploadFile", formData, config).then((response) => {
      if (response.data.success) {
        setFilePath(response.data.filePath);
      } else {
        alert("failed to save video");
      }
    });
  };
  return (
    <div>
      <NavApp navContact={props.location.pathname} />
      <section id="contact" style={{ marginTop: "40px" }}>
        <Container style={{ marginTop: -50 }} className="container">
          <div className="section-header">
            <h2>CONTACTEZ NOUS</h2>
          </div>
          <div className=" contact-info">
            <Row>
              <Col md={4}>
                <div className="contact-address">
                  <i className="ion-ios-location-outline" />
                  <h3 id="adresse">ADRESSE</h3>
                  <address>.............</address>
                </div>
              </Col>
              <Col md={4} className="col-md-4">
                <div className="contact-phone">
                  <i className="ion-ios-telephone-outline" />
                  <h3 style={{ paddingLeft: "50px", paddingRight: "50px" }}>
                    TÉLÉPHONE
                  </h3>
                  <p>
                    <a href="tel:+21653045249">+216 53045249</a>
                  </p>
                </div>
              </Col>

              <Col md={4}>
                <div className="contact-email">
                  <i className="ion-ios-email-outline" />
                  <h3>E-MAIL</h3>
                  <p>
                    <a href="mailto:Cjasser580@gmail.com">
                      Cjasser580@gmail.com
                    </a>
                  </p>
                </div>
              </Col>
            </Row>
          </div>
        </Container>
        <Container fluid={true}>
          <Form className="contactForm ">
            <Row className="form-row " style={{ width: "100%" }}>
              <Col xs={12} sm={6} className="form-group ">
                <input
                  style={{ border: "1px solid #ced4da" }}
                  type="text"
                  name="nom"
                  className="form-control"
                  id="name"
                  placeholder="Nom"
                  onChange={handleChange}
                />
              </Col>
              <Col xs={12} sm={6} className="form-group ">
                <input
                  style={{ border: "1px solid #ced4da", width: "100%" }}
                  type="email"
                  className="form-control"
                  name="email"
                  id="email"
                  placeholder=" E-mail"
                  data-rule="email"
                  onChange={handleChange}
                />
              </Col>
            </Row>
            <div className="form-group">
              <input
                style={{ border: "1px solid #ced4da" }}
                type="text"
                className="form-control"
                name="sujet"
                id="subject"
                placeholder="Sujet"
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <textarea
                style={{ border: "1px solid #ced4da" }}
                className="form-control"
                name="message"
                rows={5}
                id="message"
                placeholder="Message"
                onChange={handleChange}
              />
              <Dropzone
                onDrop={onDrop}
                multiple={false}
                maxSize={8000000000000000000}
              >
                {({ getRootProps, getInputProps }) => (
                  <div
                    style={{
                      width: "100%",
                      height: "40px",
                      border: "1px solid lightgray",
                      display: "flex",
                      alignItems: "center",
                      marginTop: "30px",
                      color: "grey",
                    }}
                    {...getRootProps()}
                  >
                    <input {...getInputProps()} />
                    <span style={{ marginLeft: 10 }}>Files</span>
                  </div>
                )}
              </Dropzone>
              <div className="text-center">
                <button
                  type="submit"
                  style={{
                    background: "#f82249",
                    border: 0,
                    padding: "10px 40px",
                    color: "#fff",
                    transition: "0.4s",
                    borderRadius: "50px",
                    cursor: "pointer",
                    outline: "none",
                    height: "45px",
                    marginTop: 20,
                  }}
                >
                  <p id="button" style={{ fontSize: "15px" }}>
                    Envoyer Message
                  </p>
                </button>
              </div>
            </div>
          </Form>
        </Container>
      </section>
      <Container fluid={true}>
        <Row>
          <Col>
            <Iframe
              width="100%"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3235.4883571612736!2d10.636119415115257!3d35.812492080163985!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1302756a7452317b%3A0xfe8bdcb107b21c72!2sInstitut%20Sup%C3%A9rieur%20des%20Sciences%20Appliqu%C3%A9es%20et%20de%20Technologie%20de%20Sousse!5e0!3m2!1sfr!2stn!4v1589028923913!5m2!1sfr!2stn"
              height="400"
            />
          </Col>
        </Row>
      </Container>
      <Fotter />
      <BackToTop />
    </div>
  );
};

export default Contact;
