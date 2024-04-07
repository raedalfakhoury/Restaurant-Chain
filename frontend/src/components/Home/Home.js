/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import "../Home/Home.css";
import axios from "axios";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const Home = () => {
  const [restaurant, setRestaurant] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [restaurant_id, setrestaurant_id] = useState({});
  const [menu, setMenu] = useState([]);
  const handleOpenModal = () => {
    setOpenModal(true);
  };
  const handleCloseModal = () => setOpenModal(false);
  const getAllRestaurant = async () => {
    try {
      const result = await axios.get(
        "https://restaurant-chain.onrender.com/restaurant/details"
      );
      console.log(result?.data?.result);
      setRestaurant(result?.data?.result);
    } catch (error) {
      console.log(error);
    }
  };

  const getmenuByRestaurantId = async (id) => {
    try {
      const result = await axios.get(
        `https://restaurant-chain.onrender.com/restaurant/menuByRestaurantId/${id}`
      );
      console.log(result.data.result.length);
      setMenu(result.data.result);
      console.log(menu.length);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllRestaurant();
  }, []);

  return (
    <>
      <Navbar />
      <div
        style={{
          display: "flex",
          width: "100%",
          justifyContent: "center",
          backgroundColor: "black",
        }}
      >
        <img
          height="200px"
          alt=""
          src="https://crispychicken.rest/wp-content/uploads/2020/09/Arabic-english-logo-9001.png"
        />
      </div>

      <div
        style={{
          margin: "20px 0%",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "20px",
        }}
      >
        {restaurant?.map((item) => {
          console.log(item);
          return (
            <div class="card">
              <div
                class="top-section"
                style={{
                  backgroundImage:
                    "url(https://crispychicken.rest/wp-content/uploads/2020/09/Arabic-english-logo-9001.png)",
                  backgroundRepeat: "no-repeat",
                }}
              >
                <div class="icons">
                  <div class="logo">
                    <img
                      style={{ marginTop: "-13px" }}
                      height="40px"
                      width="40px"
                      alt=""
                      src="https://crispychicken.rest/wp-content/uploads/2020/09/Arabic-english-logo-9001.png"
                    />
                  </div>
                  <div
                    class="social-media"
                    onClick={() => {
                      getmenuByRestaurantId(item.restaurant_id);
                      handleOpenModal();
                    }}
                  >
                    <MenuBookIcon
                      className="menu"
                      style={{ cursor: "pointer", fontSize: "40px" }}
                      titleAccess="show menu"
                    />
                  </div>
                </div>
              </div>
              <div class="bottom-section">
                <span class="title"> {item.street_name}</span>
                <span
                  class="title"
                  style={{ fontWeight: "400", marginTop: "5px" }}
                >
                       {item.nearby_landmarks}
                </span>
                <span
                  class="title"
                  style={{ fontWeight: "400", marginTop: "5px" }}
                >
                  {item.maintenance_impact === "Complete shutdown" ? (
                    <p style={{ color: "red" }}>مغلق حاليا</p>
                  ) : (
                    ""
                  )}
                </span>
                <div class="row row1">
                  <div class="item">
                    <span class="big-text">{item.restaurant_start_time}</span>
                    <span class="regular-text">Open</span>
                  </div>
                  <div class="item">
                    <span class="big-text">{item.restaurant_end_time}</span>
                    <span class="regular-text">Close</span>
                  </div>
                  <div class="item">
                    <span class="big-text">{item.phone}</span>
                    <span class="regular-text">Phone</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/*Modal for menu*/}
      <div> 
        <Modal
          open={openModal}
          onClose={handleCloseModal}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box
            sx={{
              display: "flex",
              width: "700px",
              position: "absolute",
              top: "30%",
              left: "25%",
              background: "white",
              maxHeight: "300px",
              overflow: "auto",
            }}
          >
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              <div className="leftRight">
                {menu?.map((item) => {
                  return (
                    <div className="img">
                      <img
                        alt=""
                        src={item?.menu_image}
                        width="200px"
                        height="200px"
                      />

                      <div style={{ display: "flex", flexDirection: "column" }}>
                        <p style={{ fontWeight: "700", fontSize: "40px" }}>
                          {item?.item}
                        </p>
                        <p style={{ fontWeight: "700" }}>{item?.description}</p>
                        <p style={{ fontWeight: "700", color: "goldenrod" }}>
                          {item?.price} JD
                        </p>
                        <p style={{ fontWeight: "700" }}>Serving Time</p>
                        <p style={{ fontWeight: "700", color: "goldenrod" }}>
                          {item?.start_time} am - {item?.end_time} pm
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </Typography>{" "}
          </Box>
        </Modal>
      </div>
    </>
  );
};

export default Home;
