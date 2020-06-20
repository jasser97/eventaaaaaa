import React, { useEffect, useState } from "react";
import { Avatar, Descriptions } from "antd";
import { connect } from "react-redux";
import axios from "axios";
const Infos = (props) => {
  const [Number, setNumber] = useState(0);
  const [Followed, setFollowed] = useState(false);
  useEffect(() => {
    const variable = {
      idCreateure: props.idCreature,
      userId: props.userId,
    };
    axios.post("/api/follow/FollowresNumber", variable).then((res) => {
      if (res.data.success) {
        setNumber(res.data.followresNumber);
      }
    });
    axios.post("/api/follow/followed", variable).then((response) => {
      if (response.data.success) {
        setFollowed(response.data.followres);
      }
    });
  }, []);

  const handleFollow = () => {
    let variable = {
      userId: props.userId,
      idCreateure: props.idCreature,
    };
    if (Followed) {
      axios.post("/api/follow/unFollow", variable).then((response) => {
        if (response.data.success) {
          setNumber(Number - 1);
          setFollowed(!Followed);
        } else {
          alert("failed to unrfollow");
        }
      });
    } else {
      axios.post("/api/follow/followUser", variable).then((response) => {
        if (response.data.success) {
          setNumber(Number + 1);
          setFollowed(!Followed);
        } else {
          alert("failed to follow");
        }
      });
    }
  };

  return (
    <div>
      {props.Adherent.User && (
        <div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Avatar
              size={100}
              src={`http://localhost:5000/${props.Adherent.userImage}`}
            />
          </div>

          <Descriptions title="Profile">
            <Descriptions.Item label="Nom">
              {`${props.Adherent.User.lastName}  
              ${props.Adherent.User.firstName}`}
            </Descriptions.Item>
            <Descriptions.Item label="Email">
              <span
                style={{
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <span>{`${props.Adherent.User.email}`} </span>
                <span>
                  <span style={{ fontStyle: "gras" }}>Tel:</span>{" "}
                  <span>{`${props.Adherent.Phone}`}</span>
                </span>
              </span>
            </Descriptions.Item>
            <Descriptions.Item label="Nombre des événements">
              {`${props.Adherent.nbr_events}`}
            </Descriptions.Item>
            <Descriptions.Item label="À propos">
              {`${props.Adherent.aPropos}`}
            </Descriptions.Item>
          </Descriptions>
          <div
            style={{
              marginTop: 30,
              display: "flex",
              justifyContent: "center",
            }}
          >
            {props.user.isAuthenticated === false ? (
              <button
                style={{
                  backgroundColor: `${Followed ? "#AAAAAA" : "#CC0000"}`,
                  color: "white",
                  padding: "8px 13px",
                  fontWeight: "500",
                  fontSize: "1rem",
                  borderRadius: 50,
                  marginRight: 30,
                  border: 0,
                  outline: "none",
                  textTransform: "uppercase",
                }}
              >
                {Followed ? "Followed" : "Follow"} ({Number})
              </button>
            ) : (
              <div>
                {props.userId && (
                  <div>
                    {props.userId.toString() === props.idCreature.toString() ? (
                      <button
                        style={{
                          backgroundColor: `${
                            Followed ? "#AAAAAA" : "#CC0000"
                          }`,
                          borderRadius: 50,
                          color: "white",
                          padding: "8px 13px",
                          fontWeight: "500",
                          fontSize: "1rem",
                          marginRight: 30,
                          border: 0,
                          outline: "none",
                          textTransform: "uppercase",
                        }}
                      >
                        {Followed ? "Followed" : "Follow"} ({Number})
                      </button>
                    ) : (
                      <button
                        style={{
                          backgroundColor: `${
                            Followed ? "#AAAAAA" : "#CC0000"
                          }`,
                          borderRadius: 50,
                          color: "white",
                          padding: "8px 13px",
                          fontWeight: "500",
                          border: 0,
                          fontSize: "1rem",
                          outline: "none",
                          marginRight: 30,
                          textTransform: "uppercase",
                        }}
                        onClick={handleFollow}
                      >
                        {Followed ? "Followed" : "Follow"} ({Number})
                      </button>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    userId: state.auth.user.id,
    user: state.auth,
  };
};
export default connect(mapStateToProps)(Infos);
