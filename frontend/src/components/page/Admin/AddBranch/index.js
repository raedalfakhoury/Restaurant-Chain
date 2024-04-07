/* eslint-disable eqeqeq */
/* eslint-disable no-unused-vars */
import React, { useContext, useState } from "react";
import axios from "axios";
import CustomizedSnackbars from "../../../snackBar/Snackbar";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import "../AddBranch/index.css";
import { ApplicationContext } from "../../../../App";
const AddBranch = () => {
  const { token } = useContext(ApplicationContext);

  const [branchInfo, setBranchInfo] = useState({});
  const [openSnackBar, setOpenSnackBar] = useState(false);
  const [SnackBarText, setSnackBarText] = useState("");
  const [SnackBarStatus, setSnackBarStatus] = useState("");

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
        <div className="circle1"></div>
        <div className="circle2"></div>
        <div className="container">
          <div className="log-card">
            <div className="center">
              <p className="heading">Add New Branch</p>{" "}
            </div>

            <form>
              <div className="input-group">
                <p className="text">Restaurant Name</p>
                <input
                  required
                  className="input"
                  type="username"
                  onChange={(e) => {
                    setBranchInfo((prevObject) => {
                      return {
                        ...prevObject,
                        restaurant_Name: e.target.value,
                      };
                    });
                  }}
                />
                <p class="text">Phone</p>
                <input
                  required
                  className="input"
                  type="tel"
                  onChange={(e) => {
                    setBranchInfo((prevObject) => {
                      return {
                        ...prevObject,
                        Phone: e.target.value,
                      };
                    });
                  }}
                />
                <p className="text">Street Name</p>
                <input
                  required
                  className="input"
                  type="text"
                  onChange={(e) => {
                    setBranchInfo((prevObject) => {
                      return {
                        ...prevObject,
                        Street_name: e.target.value,
                      };
                    });
                  }}
                />

                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={["TimePicker", "TimePicker"]}>
                    <TimePicker
                      label="Start Time"
                      value={startTime}
                      onChange={(newValue) =>
                        setBranchInfo((prevObject) => {
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
                        setBranchInfo((prevObject) => {
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
                <p class="text">Nearby Landmarks</p>
                <input
                  required
                  className="input"
                  type="text"
                  onChange={(e) => {
                    setBranchInfo((prevObject) => {
                      return {
                        ...prevObject,
                        nearby_landmarks: e.target.value,
                      };
                    });
                  }}
                />

                <div className="create">
                  <button
                    className="btn"
                    onClick={(e) => {
                      e.preventDefault();
                      handleClick();
                      axios
                        .post(
                          "http://localhost:5000/restaurant/add",
                          branchInfo,
                          {
                            headers: {
                              Authorization: `Bearer ${token}`,
                            },
                          }
                        )
                        .then((result) => {
                          if (
                            result?.data?.message ==
                            "restaurant created successfully"
                          ) {
                            setSnackBarText(result?.data?.message);
                            setSnackBarStatus("success");
                          }
                        })
                        .catch((error) => {
                          console.log(error);
                          setSnackBarText(
                            "failed to create branch or branch already exist"
                          );
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

export default AddBranch;
