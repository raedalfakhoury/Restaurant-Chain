/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import "../Home/Home.css";
import axios from "axios";
import MenuBookIcon from "@mui/icons-material/MenuBook";
const Home = () => {
  const [restaurant, setRestaurant] = useState([]);
  const getAllRestaurant = async () => {
    try {
      const result = await axios.get(
        "http://localhost:5000/restaurant/details"
      );
      console.log(result.data.result);
      setRestaurant(result?.data?.result);
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
                  <div class="social-media">
                    <MenuBookIcon
                      className="menu"
                      style={{ cursor: "pointer", fontSize: "40px" }}
                    />
                  </div>
                </div>
              </div>
              <div class="bottom-section">
                <span class="title">فرع {item.street_name}</span>
                <span
                  class="title"
                  style={{ fontWeight: "400", marginTop: "5px" }}
                >
                  اقرب معلم : {item.nearby_landmarks}
                </span>
                <span
                  class="title"
                  style={{ fontWeight: "400", marginTop: "5px" }}
                >
                   {item.maintenance_impact === "Complete shutdown" ? <p style={{color:"red"  }}>مغلق حاليا</p> : ""}
                </span>
                <div class="row row1">
                  <div class="item">
                    <span class="big-text">{item.start_time} Am</span>
                    <span class="regular-text">Open</span>
                  </div>
                  <div class="item">
                    <span class="big-text">{item.end_time} Pm</span>
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
    </>
  );
};

export default Home;
