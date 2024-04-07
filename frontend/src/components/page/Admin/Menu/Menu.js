/* eslint-disable eqeqeq */
/* eslint-disable no-unused-vars */
import React, { useContext, useState } from "react";
import axios from "axios";
import CustomizedSnackbars from "../../../snackBar/Snackbar";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { styled } from "@mui/material/styles";

import "../Menu/Menu.css";
import { ApplicationContext } from "../../../../App";

const Menu = () => {
  const { token } = useContext(ApplicationContext);
  const [openSnackBar, setOpenSnackBar] = useState(false);
  const [SnackBarText, setSnackBarText] = useState("");
  const [SnackBarStatus, setSnackBarStatus] = useState("");
  const [menuInfo, setMenuInfo] = useState({});
  const [startTime, setStartTime] = useState();
  const [endTime, setEndTime] = useState();
  console.log(menuInfo);
  const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
  });
  const handleClick = () => {
    setOpenSnackBar(true);
  };
  const pr_key = "rllytlm7";
  const cloud_name = "dmmo3zzyc";

  const getImageUrl = (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", pr_key);

    axios
      .post(
        `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,
        formData
      )
      .then((result) => { 
        handleClick()
        setSnackBarText("uploaded successfully")
        setSnackBarStatus("success")
        setMenuInfo((prevObject) => {
          return {
            ...prevObject,
            image: result.data.url,
          }; 
        });
      
      })
      .catch((err) => {
        console.log(err);
        setSnackBarText("failed upload image")
        setSnackBarStatus("error")
      });
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
                <div style={{display:"flex" , width:"100%" , justifyContent:"center" , marginTop:"10px"}}>
                <Button
                      component="label"
                      role={undefined}
                      variant="contained"
                      tabIndex={-1}
                      startIcon={<CloudUploadIcon />}
                    >
                      Upload image
                      <VisuallyHiddenInput
                        type="file"
                        onChange={(e) => {
                          getImageUrl(e); 
                        }}
                      />
                    </Button>
                </div>
                <div className="create">
                  <button
                    className="btn"
                    onClick={(e) => {
                      e.preventDefault();
                      handleClick();
                      axios
                        .post("https://restaurant-chain.onrender.com/restaurant/item", menuInfo,
                        {
                          headers: {
                            Authorization: `Bearer ${token}`,
                          },
                        })
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
