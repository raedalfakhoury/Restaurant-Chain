/* eslint-disable eqeqeq */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import axios from "axios";
import CustomizedSnackbars from "../../../snackBar/Snackbar";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import "../Menu/Menu.css";
const Menu = () => {
  
  const [openSnackBar, setOpenSnackBar] = useState(false);
  const [SnackBarText, setSnackBarText] = useState("");
  const [SnackBarStatus, setSnackBarStatus] = useState("");
  const [menuInfo, setMenuInfo] = useState({});
  const [startTime, setStartTime] = useState();
  const [endTime, setEndTime] = useState();

  const handleClick = () => {
    setOpenSnackBar(true);
  };

  const openPickerButtonStyle = {
    fontSize: "12px",
    width: "20px",
  };

  return (
    <>
      <div
        style={{ marginTop: "80px", marginLeft: "20%" }}
        className="card-container"
      >
        <div className="circle5"></div>
        <div className="circle6"></div>
        <div className="container">
          <div className="log-card">
            <div className="center">
              <p className="heading">Add Menu Item</p>{" "}
            </div>

            <form>
              <div className="input-group">
                <p className="text">Item</p>
                <input
                  required
                  className="input"
                  type="text"
                  onChange={(e) => {
                    setMenuInfo((prevObject) => {
                      return {
                        ...prevObject,
                        item: e.target.value,
                      };
                    });
                  }}
                />
                <p class="text">Description</p>
                <input
                  required
                  className="input"
                  type="text"
                  onChange={(e) => {
                    setMenuInfo((prevObject) => {
                      return {
                        ...prevObject,
                        description: e.target.value,
                      };
                    });
                  }}
                />
                <p className="text">Price</p>
                <input
                  required
                  className="input"
                  type="text"
                  onChange={(e) => {
                    setMenuInfo((prevObject) => {
                      return {
                        ...prevObject,
                        price: e.target.value,
                      };
                    });
                  }}
                />
                <p className="text">Serving Time</p>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={["TimePicker", "TimePicker"]}>
                    <TimePicker
                      label="Start Time"
                      value={startTime}
                      onChange={(newValue) =>
                        setMenuInfo((prevObject) => {
                          setStartTime(newValue);
                          return {
                            ...prevObject,
                            start_time:
                              newValue.$H +
                              ":" +
                              (newValue.$m == "0" ? "00" : newValue.$m),
                          };
                        })
                      }
                      slotProps={{
                        openPickerButton: { style: openPickerButtonStyle },
                      }}
                    />

                    <TimePicker
                      label="End Time"
                      value={endTime}
                      onChange={(newValue) =>
                        setMenuInfo((prevObject) => {
                          setEndTime(newValue);
                          return {
                            ...prevObject,
                            end_time:
                              newValue.$H +
                              ":" +
                              (newValue.$m == "0" ? "00" : newValue.$m),
                          };
                        })
                      }
                      slotProps={{
                        openPickerButton: { style: openPickerButtonStyle },
                      }}
                    />
                  </DemoContainer>
                </LocalizationProvider>

                <div className="create">
                  <button
                    className="btn"
                    onClick={(e) => {
                      e.preventDefault();
                      handleClick();
                      axios
                        .post("http://localhost:5000/restaurant/item", menuInfo)
                        .then((result) => {
                          if (
                            result?.data?.message == "menu created successfully"
                          ) {
                            setSnackBarText(result?.data?.message);
                            setSnackBarStatus("success");
                          }
                        })
                        .catch((error) => {
                          console.log(error);
                          setSnackBarText("failed to create menu");
                          setSnackBarStatus("error");
                        });
                    }}
                  >
                    Create
                  </button>{" "}
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      <CustomizedSnackbars
        open={openSnackBar}
        handleClick={handleClick}
        setOpen={setOpenSnackBar}
        text={SnackBarText}
        status={SnackBarStatus}
      />
    </>
  );
};

export default Menu;
