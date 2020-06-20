import React, { useState, useEffect } from "react";

// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";
import { Form } from "antd";
import Modal from "react-bootstrap/Modal";
import NativeSelect from "@material-ui/core/NativeSelect";
import Button from "react-bootstrap/Button";
import EditIcon from "@material-ui/icons/Edit";
import TextField from "@material-ui/core/TextField";
import { modelEdit } from "../../../../actions/modelAction";
import FileUploadtwo from "./FileUploadtwo";
import DeleteIcon from "@material-ui/icons/Delete";
import { saveEvent, editEvent, deleteEvent } from "../../../../actions/actions";

import GridItem from "../../components@material/Grid/GridItem.js";
import GridContainer from "../../components@material/Grid/GridContainer.js";

import Card from "../../components@material/Card/Card.js";

import { connect } from "react-redux";
import styled from "styled-components";
import { Link } from "react-router-dom";

import styles from "../../assets/jss/material-dashboard-react/views/dashboardStyle.js";
const Continents = [
  { key: 1, value: "Sportif" },
  { key: 2, value: "Educatif" },
  { key: 3, value: "Scientifique" },
  { key: 4, value: "Festivate" },
  { key: 5, value: "Artisanat" },
];
function Dashboard(props) {
  const [show, setShow] = useState(props.model);
  useEffect(() => {
    setShow(props.model);
  }, [props.model]);
  const handleClose = () => props.modelEdit(false);
  const handleShow = () => props.modelEdit(true);
  const useStyles = makeStyles(styles);
  const classes = useStyles();
  const [save, setSave] = useState([]);

  const handleChange = (e) => {
    setSave({ ...save, [e.target.name]: e.target.value });
  };
  const [Images, setImages] = useState([]);
  const handleChangeDate = (e) => {
    setSave({
      ...save,
      [e.target.name]: new Date(e.target.value.replace(/-0+/g, "-")).getTime(),
    });
  };
  const updateImages = (newImages) => {
    setImages(newImages.value);
    setSave({ ...save, EventImage: newImages });
  };

  useEffect(() => {
    setSave(props.save);
  }, [props.save]);
  const handleSave = () => {
    if (
      save.Type_event === "" ||
      save.EventImage.length === 0 ||
      save.City === "" ||
      save.Country === "" ||
      save.Zip_Code === "" ||
      save.Description === "" ||
      save.Start_date === "" ||
      save.End_date === "" ||
      save.Titre === ""
    ) {
      alert("all filed are required");
    } else {
      props.editEvent(save);
    }
  };
  return (
    <div style={{ backgroundColor: "white" }}>
      {props.event.EventsAdherent.map((el, i) => (
        <ProductWrapper key={i}>
          <div
            className="card container"
            style={{
              backgroundColor: "#f3f3f3",
              marginTop: "20px",
              padding: 40,
              borderRadius: "10px",
            }}
          >
            <div className="row">
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <h3
                  style={{
                    fontFamily: "permanent Marker, cursive",
                    textTransform: "uppercase",
                    color: "#f82249",
                  }}
                >
                  <Link
                    style={{ textDecoration: "none" }}
                    to={`/evenemet/${el.id}`}
                  >
                    {el.Titre}
                  </Link>
                </h3>
                <h4
                  style={{
                    color: "white",
                    backgroundColor: "#f82249",
                    paddingRight: "15px",
                    paddingLeft: "15px",
                    paddingTop: 10,
                    paddingBottom: 10,
                    borderRadius: "10px",
                    textAlign: "center",
                  }}
                >
                  {el.Type_event.toString() === "1" && "Sportif"}
                  {el.Type_event.toString() === "2" && "Educatif"}
                  {el.Type_event.toString() === "3" && "Scientifique"}
                  {el.Type_event.toString() === "4" && "Culturel"}
                  {el.Type_event.toString() === "5" && "Artisanat"}
                  {el.Type_event.toString() === "6" && "Festivate"}
                </h4>
                <div className="cart-icon">
                  <DeleteIcon
                    style={{
                      fontSize: " 1.8rem",
                      color: "#ffa400 ",
                      marginRight: 15,
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      props.deleteEvent(el._id);
                    }}
                  />

                  <EditIcon
                    onClick={() => {
                      props.saveEvent(el);
                      handleShow();
                    }}
                    style={{
                      fontSize: "1.8rem",
                      color: "#ffa400 ",
                      cursor: "pointer",
                    }}
                  ></EditIcon>
                </div>
              </div>
            </div>
            <div className="row">
              <h5 style={{ color: "grey", marginRight: 15 }}>
                {new Intl.DateTimeFormat("en-GB", {
                  day: "numeric",
                  month: "numeric",
                  year: "numeric",
                }).format(el.Start_date)}
              </h5>
              <h5 style={{ color: "grey" }}>
                {new Intl.DateTimeFormat("en-GB", {
                  day: "numeric",
                  month: "numeric",
                  year: "numeric",
                }).format(el.End_date)}
              </h5>
            </div>
            <div className="row">
              <h5 style={{ color: "grey" }}>{el.Country}-</h5>
              <h5 style={{ color: "grey" }}>{el.City}</h5>
            </div>

            <div className="row">
              <div className=" col-6">
                <p
                  className="text-capitalize font-weight-bold "
                  style={{ marginTop: "10px" }}
                >
                  Description :
                </p>
                <p className="text-muted lead" style={{ fontSize: "14px" }}>
                  {el.Description}
                  ssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssasasasasassssssssssssssssssssssssssssssss
                </p>
              </div>
              <div style={{ textAlign: "center" }} className="col-6">
                <img
                  className="img-fluid "
                  alt="map"
                  src={`http://localhost:5000/${el.EventImage[0]}`}
                  style={{
                    height: "210px",
                    width: "420px",
                    borderRadius: "10px",
                  }}
                />
              </div>
            </div>
          </div>
        </ProductWrapper>
      ))}
      <div>
        <Modal
          style={{
            width: "100%",
            textAlign: "center",
            display: "flex",
            justifyContent: "center",
          }}
          size="lg"
          show={show}
          onHide={handleClose}
        >
          <GridContainer styles={{ BackgroundColor: "blue !important" }}>
            <GridItem xs={12} sm={12} md={12}>
              <Card>
                <div className="container">
                  <Form>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-around",
                      }}
                    >
                      <FileUploadtwo
                        Images={Images}
                        name={"EventImage"}
                        onChange={handleChange}
                        value={save.EventImage}
                        refreshfunction={updateImages}
                        label="Image"
                      />
                    </div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-around",
                      }}
                    >
                      <TextField
                        style={{ width: "90%", marginTop: 5 }}
                        value={save.Titre}
                        onChange={handleChange}
                        name="Titre"
                        label="Titre"
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />
                    </div>

                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-around",
                      }}
                    >
                      <NativeSelect
                        value={Continents.key}
                        onChange={handleChange}
                        name="Type_event"
                        className={classes.selectEmpty}
                      >
                        <option value="">None</option>
                        {Continents.map((option) => (
                          <option
                            aria-label="None"
                            key={Number(option.key)}
                            value={Number(option.key)}
                          >
                            {option.value}
                          </option>
                        ))}
                      </NativeSelect>
                      <TextField
                        onChange={handleChangeDate}
                        style={{ marginTop: 5 }}
                        label="date de debut"
                        type="date"
                        name="Start_date"
                        className={classes.textField}
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />
                      <TextField
                        onChange={handleChangeDate}
                        style={{ marginTop: 5, width: "23%" }}
                        label="date fe fin"
                        type="date"
                        name="End_date"
                        className={classes.textField}
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />
                    </div>

                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-around",
                      }}
                    >
                      <TextField
                        value={save.City}
                        style={{ marginTop: 5 }}
                        onChange={handleChange}
                        name="City"
                        label="Gouvernorat"
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />

                      <TextField
                        value={save.Country}
                        onChange={handleChange}
                        style={{ marginTop: 5 }}
                        name="Country"
                        label="Ville"
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />

                      <TextField
                        value={save.Zip_Code}
                        onChange={handleChange}
                        name="Zip_Code"
                        label="Code postal"
                        type="number"
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />
                    </div>

                    <div style={{ marginTop: "30px" }}>
                      <TextField
                        value={save.Description}
                        onChange={handleChange}
                        style={{
                          width: "90%",
                          marginBottom: "10px",
                          marginTop: 5,
                        }}
                        label="Description"
                        name="Description"
                        id="outlined-multiline-static"
                        multiline
                        rows={4}
                        variant="outlined"
                      />
                    </div>
                    <Button
                      onClick={handleSave}
                      style={{
                        backgroundColor: "rgba(6, 12, 34, 0.98)",
                        color: "white",
                        fontSize: "23px",
                        borderRadius: "5px",
                        padding: "0 15px",
                        borderColor: "transparent",
                        marginTop: "10px",
                      }}
                    >
                      {props.save ? "edit" : "ajouter"}
                    </Button>
                  </Form>
                  <br />
                </div>
              </Card>
            </GridItem>
          </GridContainer>
        </Modal>
      </div>
    </div>
  );
}
const ProductWrapper = styled.div`
  .card {
    border-color: transparent;
    transition: all 1s linear;
  }
  .card-footer {
    background: transparent;
    border-top: transparent;
    transition: all 1s linear;
  }
  &:hover {
    .card {
      border: 0.04rem solid rgba(0, 0, 0, 0.2);
      box-shadow: 2px 2px 5px 0px rgba(0, 0, 0, 0.2);
    }
    .card-footer {
      background: rgb(233, 233, 233);
    }
  }
  .img-container {
    position: relative;
    overflow: hidden;
  }
  .card-img-top {
    transition: all 1s linear;
  }
  .img-container:hover .card-img-top {
    transform: scale(1.1);
  }
  .cart-btn {
    position: absolute;
    bottom: 0;
    right: 0;
    padding: 0rem 0.4rem;
    background: var(--lightBleu);
    border: none;
    color: var(--mainWhite);
    font-size: 1.4rem;
    border-radius: 0.5rem 0 0 0;
    transform: translate(100%, 100%);
  }
  .img-container:hover .cart-btn {
    transform: translate(0, 0);
    transition: all 1s linear;
  }
  .cart-btn:hover {
    color: var(--mainBleu);
    cursor: pointer;
  }
`;
const mapStateToProps = (state) => {
  return {
    event: state.Reducer1,
    model: state.modelReducer.modelEdit,
    save: state.Reducer1.saved,
  };
};

export default connect(mapStateToProps, {
  editEvent,
  saveEvent,
  modelEdit,
  deleteEvent,
})(Dashboard);
