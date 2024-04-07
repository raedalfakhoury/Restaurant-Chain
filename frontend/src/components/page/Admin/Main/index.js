/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable eqeqeq */
import React, { useState, useEffect, useContext } from "react";
import { DataGrid } from "@mui/x-data-grid";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import "../Main/index.css";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import CustomizedSnackbars from "../../../snackBar/Snackbar";
import dayjs from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { ApplicationContext } from "../../../../App";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import SettingsSuggestIcon from "@mui/icons-material/SettingsSuggest";
import EditIcon from "@mui/icons-material/Edit";
export const Main = () => {
  const { token } = useContext(ApplicationContext);
  const [allBranch, setAllBranch] = useState([]);
  const [menu, setmenu] = useState([]);
  const [openSnackBar, setOpenSnackBar] = useState(false);
  const [SnackBarText, setSnackBarText] = useState("");
  const [SnackBarStatus, setSnackBarStatus] = useState("");
  const [resMenuId, setResMenuId] = useState({});
  const [maintenanceInfo, setMaintenanceInfo] = useState({});
  const [placeHolderBranch, setPlaceHolderBranch] = useState({});
 // for maintenance modal
 const [openModal, setOpenModal] = useState(false);
 // for edit branch modal

 const [openModalEdit, setOpenModalEdit] = useState(false);
 // for maintenance modal
  const getResId = async (id) => {
    try {
      const result = await axios.get(
        `http://localhost:5000/restaurant/branch/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      ); 
      setResMenuId({
        restaurant_id: result.data.result.restaurant_id,
      }); 
      setPlaceHolderBranch({
        restaurant_Name: result.data.result.restaurant_name,
        Phone: result.data.result.phone,
        Street_name: result.data.result.street_name,
        start_time: result.data.result.start_time,
        end_time: result.data.result.end_time,
        nearby_landmarks: result.data.result.nearby_landmarks,
        restaurant_id: result.data.result.restaurant_id,
      });
      handleOpenModalEdit();
    } catch (error) {
      console.log(error);
    }
  };

  const editBranchById = async (e) => {
    e.preventDefault();
    try {
      const result = await axios.put(
        "http://localhost:5000/restaurant/branch/editres",
        placeHolderBranch,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      handleCloseModalEdit();

      setSnackBarText("restaurant updated successfully");
      setSnackBarStatus("success");
      getAllBranch();
      setTimeout(() => {
        handleClickSnack();
      }, 500);
    } catch (error) { 
      setSnackBarText("Server Error");
      setSnackBarStatus("error");
      handleClickSnack();
      handleCloseModalEdit();
    }
  };
  
 
  const handleOpenModal = () => {
    setOpenModal(true);
  };
  // for maintenance modal

  const handleCloseModal = () => setOpenModal(false);
  // for edit branch modal

  const handleOpenModalEdit = () => {
    setOpenModalEdit(true);
  };
  // for edit branch modal

  const handleCloseModalEdit = () => setOpenModalEdit(false);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClickSnack = () => {
    setOpenSnackBar(true);
  };
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const ITEM_HEIGHT = 48;

  const getAllBranch = () => {
    axios
      .get("http://localhost:5000/restaurant/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((result) => {
        const rowsWithId = result.data.result.map((row) => ({
          id: row.restaurant_id,
          ...row,
        }));
        setAllBranch(rowsWithId);
        // console.log(rowsWithId);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getAllMenu = async () => {
    try {
      const result = await axios.get(
        "http://localhost:5000/restaurant/allmenu",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setmenu(result.data.result);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllBranch();
    getAllMenu();
  }, []);

  const handleDeleteBranch = (restaurant_id) => {
    axios
      .put(
        `http://localhost:5000/restaurant/restaurantBranch/delete/${restaurant_id}`
      )
      .then((result) => {
        if (result.data.message === "restaurant deleted successfully") {
          setSnackBarText("Restaurant deleted successfully");
          setSnackBarStatus("success");
        }
        getAllBranch();
        handleClickSnack();
      }) 
      .catch((err) => {
        console.log(err);
        setSnackBarText("Server Error");
        setSnackBarStatus("error");
      });
  };
  

  const columns = [
    {
      field: "restaurant_name",
      headerName: "Restaurant Name",
      width: 150,
      headerClassName: "custom-header",
      cellClassName: "custom-cell",
    },
    {
      field: "phone",
      headerName: "Phone",
      width: 110,
      headerClassName: "custom-header",
      cellClassName: "custom-cell",
    },
    {
      field: "street_name",
      headerName: "Street",
      width: 200,
      headerClassName: "custom-header",
      cellClassName: "custom-cell",
    },
    {
      field: "start_time",
      headerName: "Start Time",
      width: 100,
      headerClassName: "custom-header",
      cellClassName: "custom-cell",
    },
    {
      field: "end_time",
      headerName: "End Time",
      width: 100,
      headerClassName: "custom-header",
      cellClassName: "custom-cell",
    },
    {
      field: "nearby_landmarks",
      headerName: "Landmarks",
      width: 100,
      headerClassName: "custom-header",
      cellClassName: "custom-cell",
    },
    {
      field: "add",
      headerName: "Add Menu Item",
      width: 100,
      headerClassName: "custom-header",
      cellClassName: "custom-cell",
      renderCell: (params) => (
        <IconButton
          aria-label="Add"
          style={{ width: "50px", color: "blue" }}
          onClick={(event) => {
            handleClick(event);
            setResMenuId((prev) => {
              return {
                ...prev,
                restaurant_id: params.row.restaurant_id,
              };
            });
          }}
        >
          <MoreVertIcon />
        </IconButton>
      ),
    },
    {
      field: "add Maintenance",
      headerName: "maintenance",
      width: 100,
      headerClassName: "custom-header",
      cellClassName: "custom-cell",
      renderCell: (params) => (
        <IconButton
          aria-label="Add"
          style={{ width: "50px", color: "blue" }}
          onClick={() => {
            setMaintenanceInfo((prev) => {
              return {
                ...prev,
                restaurant_id: params.row.restaurant_id,
              };
            });
            handleOpenModal();
          }}
        >
          <SettingsSuggestIcon />
        </IconButton>
      ),
    },
    {
      field: "Edit Branch",
      headerName: "Edit Branch",
      width: 100,
      headerClassName: "custom-header",
      cellClassName: "custom-cell",
      renderCell: (params) => (
        <IconButton
          aria-label="Add"
          style={{ width: "50px", color: "blue" }}
          onClick={async (e) => {
            getResId(params.row.restaurant_id); 
            e.preventDefault();
          }}
        >
          <EditIcon />
        </IconButton>
      ),
    },
    {
      field: "actions",
      headerName: "Delete",
      width: 120,
      headerClassName: "custom-header",
      cellClassName: "custom-cell",
      renderCell: (params) => (
        <IconButton
          onClick={() => {
            handleDeleteBranch(params.row.restaurant_id);
            getAllBranch();
            console.log(params.row.restaurant_id);
          }}
          aria-label="delete"
          style={{ width: "10px", color: "red" }}
        >
          <DeleteIcon />
        </IconButton>
      ),
    },
  ];

  return (
    <>
      <div style={{ width: "100%", marginTop: "80px", marginLeft: "2px" }}>
        <Box sx={{ mb: 1 }}></Box>
        <div style={{ height: 600 }}>
          <DataGrid
            slotProps={{
              baseIconButton: { style: { fontSize: "12px", width: "20px" } },
            }}
            rows={allBranch}
            columns={columns}
          />
          <div>
            <Menu
              id="long-menu"
              MenuListProps={{
                "aria-labelledby": "long-button",
              }}
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              PaperProps={{
                style: {
                  maxHeight: ITEM_HEIGHT * 4.5,
                  width: "20ch",
                },
              }}
            >
              {menu?.map((option) => (
                <MenuItem
                  style={{}}
                  key={option.menu_id}
                  onClick={() => {
                    setResMenuId((prev) => {
                      return {
                        ...prev,
                        menu_id: option.menu_id,
                      };
                    });

                    handleClose();
                    axios
                      .post(
                        `http://localhost:5000/restaurant/menu`,
                        resMenuId,
                        {
                          headers: {
                            Authorization: `Bearer ${token}`,
                          },
                        }
                      )
                      .then((result) => {
                        handleClickSnack();
                        if (result.data.message === "Added Successfully") {
                          setSnackBarText("added successfully");
                          setSnackBarStatus("success");
                        }
                      })
                      .catch((err) => {
                        setSnackBarText("failed to add item");
                        setSnackBarStatus("error");
                      });
                  }}
                >
                  {option.item}
                </MenuItem>
              ))}
            </Menu>
          </div>
        </div>
      </div>
      {/* snack bar */}
      <CustomizedSnackbars
        open={openSnackBar}
        handleClick={handleClickSnack}
        setOpen={setOpenSnackBar}
        text={SnackBarText}
        status={SnackBarStatus}
      />
      {/*Modal for maintenance*/}
      <div>
        <Button onClick={handleOpenModal}>Open modal</Button>
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
              top: "-15px",
              left: "50%",
            }}
          >
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              <div
                style={{ marginTop: "80px", marginLeft: "20%" }}
                className="card-container"
              >
                <div className="container">
                  <div className="log-cards">
                    <div className="center">
                      <p className="heading">Maintenance Information</p>{" "}
                    </div>

                    <form>
                      <div className="input-group">
                        <p className="text">Maintenance Date</p>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <DemoContainer
                            components={["DatePicker", "DatePicker"]}
                          >
                            <DatePicker
                              label="Start Date"
                              defaultValue={dayjs("2024-04-17")}
                              slotProps={{
                                openPickerButton: { style: { width: "20px" } },
                                nextIconButton: { style: { width: "20px" } },
                                previousIconButton: {
                                  style: { width: "20px" },
                                },
                                switchViewButton: { style: { width: "20px" } },
                              }}
                              onChange={(newValue) =>
                                setMaintenanceInfo((prevObject) => {
                                  return {
                                    ...prevObject,
                                    start_maintenance_date: newValue,
                                  };
                                })
                              }
                            />
                            <DatePicker
                              label="End Date"
                              slotProps={{
                                openPickerButton: { style: { width: "20px" } },
                                nextIconButton: { style: { width: "20px" } },
                                previousIconButton: {
                                  style: { width: "20px" },
                                },
                                switchViewButton: { style: { width: "20px" } },
                              }}
                              onChange={(newValue) =>
                                setMaintenanceInfo((prevObject) => {
                                  return {
                                    ...prevObject,
                                    end_maintenance_date: newValue,
                                  };
                                })
                              }
                            />
                          </DemoContainer>
                        </LocalizationProvider>
                        <p class="text">Number of Workers</p>
                        <input
                          required
                          className="input"
                          type="number"
                          onChange={(e) => {
                            setMaintenanceInfo((prev) => {
                              return {
                                ...prev,
                                Labour_Number: e.target.value,
                              };
                            });
                          }}
                        />
                        <p className="text">The worker's wage per day</p>
                        <input
                          required
                          className="input"
                          type="text"
                          onChange={(e) => {
                            setMaintenanceInfo((prev) => {
                              return {
                                ...prev,
                                Labor_Rate_Per_day: e.target.value,
                              };
                            });
                          }}
                        />
                        <p className="text">Material Cost</p>
                        <input
                          required
                          className="input"
                          type="text"
                          onChange={(e) => {
                            setMaintenanceInfo((prev) => {
                              return {
                                ...prev,
                                material_cost: e.target.value,
                              };
                            });
                          }}
                        />

                        <p className="text">Comment</p>
                        <textarea
                          style={{ width: "100%" }}
                          id="w3review"
                          name="w3review"
                          rows="4"
                          cols="50"
                          placeholder="Comments"
                          onChange={(e) => {
                            setMaintenanceInfo((prev) => {
                              return {
                                ...prev,
                                comments: e.target.value,
                              };
                            });
                          }}
                        ></textarea>
                        <p className="text" style={{ marginBottom: "3px" }}>
                          Impact On The Restaurant
                        </p>
                        <div class="radio">
                          <button
                            class="value"
                            onClick={(e) => {
                              e.preventDefault();
                              setMaintenanceInfo((prev) => {
                                return {
                                  ...prev,
                                  impact: e.target.innerText,
                                };
                              });
                            }}
                          >
                            <svg
                              data-name="Layer 2"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 16 16"
                            >
                              <path
                                d="m1.5 13v1a.5.5 0 0 0 .3379.4731 18.9718 18.9718 0 0 0 6.1621 1.0269 18.9629 18.9629 0 0 0 6.1621-1.0269.5.5 0 0 0 .3379-.4731v-1a6.5083 6.5083 0 0 0 -4.461-6.1676 3.5 3.5 0 1 0 -4.078 0 6.5083 6.5083 0 0 0 -4.461 6.1676zm4-9a2.5 2.5 0 1 1 2.5 2.5 2.5026 2.5026 0 0 1 -2.5-2.5zm2.5 3.5a5.5066 5.5066 0 0 1 5.5 5.5v.6392a18.08 18.08 0 0 1 -11 0v-.6392a5.5066 5.5066 0 0 1 5.5-5.5z"
                                fill="#7D8590"
                              ></path>
                            </svg>
                            Complete shutdown
                          </button>
                          <button
                            class="value"
                            onClick={(e) => {
                              e.preventDefault();
                              setMaintenanceInfo((prev) => {
                                return {
                                  ...prev,
                                  impact: e.target.innerText,
                                };
                              });
                            }}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 32 32"
                              id="Line"
                            >
                              <path
                                d="m17.074 30h-2.148c-1.038 0-1.914-.811-1.994-1.846l-.125-1.635c-.687-.208-1.351-.484-1.985-.824l-1.246 1.067c-.788.677-1.98.631-2.715-.104l-1.52-1.52c-.734-.734-.78-1.927-.104-2.715l1.067-1.246c-.34-.635-.616-1.299-.824-1.985l-1.634-.125c-1.035-.079-1.846-.955-1.846-1.993v-2.148c0-1.038.811-1.914 1.846-1.994l1.635-.125c.208-.687.484-1.351.824-1.985l-1.068-1.247c-.676-.788-.631-1.98.104-2.715l1.52-1.52c.734-.734 1.927-.779 2.715-.104l1.246 1.067c.635-.34 1.299-.616 1.985-.824l.125-1.634c.08-1.034.956-1.845 1.994-1.845h2.148c1.038 0 1.914.811 1.994 1.846l.125 1.635c.687.208 1.351.484 1.985.824l1.246-1.067c.787-.676 1.98-.631 2.715.104l1.52 1.52c.734.734.78 1.927.104 2.715l-1.067 1.246c.34.635.616 1.299.824 1.985l1.634.125c1.035.079 1.846.955 1.846 1.993v2.148c0 1.038-.811 1.914-1.846 1.994l-1.635.125c-.208.687-.484 1.351-.824 1.985l1.067 1.246c.677.788.631 1.98-.104 2.715l-1.52 1.52c-.734.734-1.928.78-2.715.104l-1.246-1.067c-.635.34-1.299.616-1.985.824l-.125 1.634c-.079 1.035-.955 1.846-1.993 1.846zm-5.835-6.373c.848.53 1.768.912 2.734 1.135.426.099.739.462.772.898l.18 2.341 2.149-.001.18-2.34c.033-.437.347-.8.772-.898.967-.223 1.887-.604 2.734-1.135.371-.232.849-.197 1.181.089l1.784 1.529 1.52-1.52-1.529-1.784c-.285-.332-.321-.811-.089-1.181.53-.848.912-1.768 1.135-2.734.099-.426.462-.739.898-.772l2.341-.18h-.001v-2.148l-2.34-.18c-.437-.033-.8-.347-.898-.772-.223-.967-.604-1.887-1.135-2.734-.232-.37-.196-.849.089-1.181l1.529-1.784-1.52-1.52-1.784 1.529c-.332.286-.81.321-1.181.089-.848-.53-1.768-.912-2.734-1.135-.426-.099-.739-.462-.772-.898l-.18-2.341-2.148.001-.18 2.34c-.033.437-.347.8-.772.898-.967.223-1.887.604-2.734 1.135-.37.232-.849.197-1.181-.089l-1.785-1.529-1.52 1.52 1.529 1.784c.285.332.321.811.089 1.181-.53.848-.912 1.768-1.135 2.734-.099.426-.462.739-.898.772l-2.341.18.002 2.148 2.34.18c.437.033.8.347.898.772.223.967.604 1.887 1.135 2.734.232.37.196.849-.089 1.181l-1.529 1.784 1.52 1.52 1.784-1.529c.332-.287.813-.32 1.18-.089z"
                                id="XMLID_1646_"
                                fill="#7D8590"
                              ></path>
                              <path
                                d="m16 23c-3.859 0-7-3.141-7-7s3.141-7 7-7 7 3.141 7 7-3.141 7-7 7zm0-12c-2.757 0-5 2.243-5 5s2.243 5 5 5 5-2.243 5-5-2.243-5-5-5z"
                                fill="#7D8590"
                                id="XMLID_1645_"
                              ></path>
                            </svg>
                            Partial shutdown
                          </button>
                          <button
                            class="value"
                            onClick={(e) => {
                              e.preventDefault();
                              setMaintenanceInfo((prev) => {
                                return {
                                  ...prev,
                                  impact: e.target.innerText,
                                };
                              });
                            }}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 128 128"
                            >
                              <path
                                d="m109.9 20.63a6.232 6.232 0 0 0 -8.588-.22l-57.463 51.843c-.012.011-.02.024-.031.035s-.023.017-.034.027l-4.721 4.722a1.749 1.749 0 0 0 0 2.475l.341.342-3.16 3.16a8 8 0 0 0 -1.424 1.967 11.382 11.382 0 0 0 -12.055 10.609c-.006.036-.011.074-.015.111a5.763 5.763 0 0 1 -4.928 5.41 1.75 1.75 0 0 0 -.844 3.14c4.844 3.619 9.4 4.915 13.338 4.915a17.14 17.14 0 0 0 11.738-4.545l.182-.167a11.354 11.354 0 0 0 3.348-8.081c0-.225-.02-.445-.032-.667a8.041 8.041 0 0 0 1.962-1.421l3.16-3.161.342.342a1.749 1.749 0 0 0 2.475 0l4.722-4.722c.011-.011.018-.025.029-.036s.023-.018.033-.029l51.844-57.46a6.236 6.236 0 0 0 -.219-8.589zm-70.1 81.311-.122.111c-.808.787-7.667 6.974-17.826 1.221a9.166 9.166 0 0 0 4.36-7.036 1.758 1.758 0 0 0 .036-.273 7.892 7.892 0 0 1 9.122-7.414c.017.005.031.014.048.019a1.717 1.717 0 0 0 .379.055 7.918 7.918 0 0 1 4 13.317zm5.239-10.131c-.093.093-.194.176-.293.26a11.459 11.459 0 0 0 -6.289-6.286c.084-.1.167-.2.261-.3l3.161-3.161 6.321 6.326zm7.214-4.057-9.479-9.479 2.247-2.247 9.479 9.479zm55.267-60.879-50.61 56.092-9.348-9.348 56.092-50.61a2.737 2.737 0 0 1 3.866 3.866z"
                                fill="#7D8590"
                              ></path>
                            </svg>
                            Normal operations
                          </button>
                        </div>
                        <div className="create">
                          <button
                            className="btn"
                            onClick={(e) => {
                              e.preventDefault();
                              axios
                                .post(
                                  "http://localhost:5000/restaurant/maintenance/",
                                  maintenanceInfo,
                                  {
                                    headers: {
                                      Authorization: `Bearer ${token}`,
                                    },
                                  }
                                )
                                .then((result) => {
                                  handleClickSnack();
                                  if (
                                    result?.data?.message ==
                                    "maintenance created successfully"
                                  ) {
                                    setSnackBarText(
                                      "maintenance created successfully"
                                    );
                                    setSnackBarStatus("success");
                                    handleCloseModal();
                                  }
                                })
                                .catch((err) => {
                                  console.log("87");
                                  console.log(err, "err");
                                  setSnackBarText("Server Error");
                                  setSnackBarStatus("error");
                                  handleClickSnack();
                                });
                            }}
                          >
                            Submit
                          </button>{" "}
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </Typography>{" "}
          </Box>
        </Modal>
      </div>
      {/*Modal for Edit Branch*/}
      <div>
        <Button onClick={handleOpenModalEdit}>Open modal</Button>
        <Modal
          open={openModalEdit}
          onClose={handleCloseModalEdit}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box
            sx={{
              display: "flex",
              width: "700px",
              position: "absolute",
              top: "-15px",
              left: "50%",
            }}
          >
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              <div
                style={{ marginTop: "80px", marginLeft: "20%" }}
                className="card-container"
              >
                <div className="container">
                  <div className="log-cards">
                    <div className="center">
                      <p className="heading">Edit Branch Information</p>{" "}
                    </div>

                    <form>
                      <div className="input-group">
                        <p className="text">Restaurant Name</p>
                        <input
                          className="input"
                          value={placeHolderBranch.restaurant_Name}
                          type="username"
                          onChange={(e) => {
                            setPlaceHolderBranch((prev) => {
                              return {
                                ...prev,
                                restaurant_Name: e.target.value,
                              };
                            });
                          }}
                        />
                        <p class="text">Phone</p>
                        <input
                          className="input"
                          type="tel"
                          value={placeHolderBranch.Phone}
                          onChange={(e) => {
                            setPlaceHolderBranch((prev) => {
                              return {
                                ...prev,
                                Phone: e.target.value,
                              };
                            });
                          }}
                        />
                        <p className="text">Street Name</p>
                        <input
                          className="input"
                          type="text"
                          value={placeHolderBranch.Street_name}
                          onChange={(e) => {
                            setPlaceHolderBranch((prev) => {
                              return {
                                ...prev,
                                Street_name: e.target.value,
                              };
                            });
                          }}
                        />
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <DemoContainer
                            components={["TimePicker", "TimePicker"]}
                          >
                            <TimePicker
                              label="Start Time"
                              onChange={(newValue) =>
                                setPlaceHolderBranch((prev) => {
                                  return {
                                    ...prev,
                                    start_time:
                              newValue.$H +
                              ":" +
                              (newValue.$m == "0" ? "00" : newValue.$m),
                                  };
                                })
                              }
                              slotProps={{
                                openPickerButton: { style: { width: "20px" } },
                              }}
                            />

                            <TimePicker
                              label="End Time"
                              onChange={(newValue) =>
                                setPlaceHolderBranch((prev) => {
                                  return {
                                    ...prev,
                                    end_time:
                                    newValue.$H +
                                    ":" +
                                    (newValue.$m == "0" ? "00" : newValue.$m),
                                  };
                                })
                              }
                              slotProps={{
                                openPickerButton: { style: { width: "20px" } },
                              }}
                            />
                          </DemoContainer>
                        </LocalizationProvider>

                        <p class="text">Nearby Landmarks</p>
                        <input
                          className="input"
                          value={placeHolderBranch.nearby_landmarks}
                          type="text"
                          onChange={(e) => {
                            setPlaceHolderBranch((prev) => {
                              return {
                                ...prev,
                                nearby_landmarks: e.target.value,
                              };
                            });
                          }}
                        />

                        <div className="create">
                          <button
                            className="btn"
                            onClick={(e) => {
                              editBranchById(e);
                            }}
                          >
                            Edit
                          </button>{" "}
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </Typography>{" "}
          </Box>
        </Modal>
      </div>
    </>
  );
};
