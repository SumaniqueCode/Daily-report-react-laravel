import { Link, useLocation } from "react-router-dom";
import { Avatar, Popover, List, ListItem } from "@mui/material";
import { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import WorkSpaceDropDown from "./WorkSpaceDropDown";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { getWorkSpace } from "../../Onboarding/api/api";
import { userProfile } from "../apis/profile/profileapi";
import User_Icon from "../../../public/assets/User_Icon.png"
import Logo from "../../../public/logo/logo.png"
import { ToastContainer } from "react-toastify";

interface Workspace {
  created_at: string;
  deleted_at: string | null;
  description: string | null;
  id: number;
  logo: string | null;
  name: string;
  size: string;
  slug: string;
  updated_at: string;
  user_id: number;
}

const Header = () => {
  const location = useLocation();
  const [user, setUser] = useState<any>();
  const getUserData = async () => {
    try {
      const response = await userProfile();
      if (response) {
        setUser(response.data.user);
      }
      else {
        console.log("Error in getting the data");
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getUserData();
  }, []);

  const [totalWorkSpace, setTotalWorkSpace] = useState<Workspace[]>([]);
  const [currentWorkspace, setCurrentWorkspace] = useState<
    Workspace | undefined
  >(undefined);
  useEffect(() => {
    const getWorkSpaceDetails = async () => {
      const res = await getWorkSpace();
      if (res && res.data) {
        setCurrentWorkspace(res.data.current_workspace);
        setTotalWorkSpace([
          ...totalWorkSpace,
          ...res.data.my_workspace,
          ...res.data.joined_workspace,
        ]);
      }
    };
    getWorkSpaceDetails();
  }, []);

  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const [anchorElWorkspace, setAnchorElWorkspace] =
    useState<HTMLElement | null>(null);

  const handleWorkSpaceClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElWorkspace(event.currentTarget);
  };

  const handleAvatarClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseAvatar = () => {
    setAnchorEl(null);
  };

  const handleCloseWorkSpace = () => {
    setAnchorElWorkspace(null);
  };

  const openWorkspace = Boolean(anchorElWorkspace);

  const openAvatar = Boolean(anchorEl);

  const isActive = (path: string) => {
    return location.pathname === path ? "active" : "";
  };
  return (
    <>
      <nav className="navbar-expand-lg bg-body-white shadow-sm">
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "2%",
            marginLeft: "2%",
          }}
        >
          <div style={{ flex: "1" }}>
            <div style={{ display: "flex", alignItems: "center" }}>
              <a className="navbar-brand" href="#">
                <img src={Logo} width="100" alt="" />
              </a>
              <span
                style={{
                  marginLeft: "3px",
                  marginRight: "3px",
                  fontWeight: "bold",
                }}
              >
                /
              </span>

              {currentWorkspace ? (
                <div
                  key={currentWorkspace.id}
                  style={{
                    marginLeft: "5px",
                    width: "100%",
                    borderRadius: "10px",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <img
                    src={
                      currentWorkspace.logo !== null
                        ? `${currentWorkspace.logo}`
                        : `https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png`
                    }
                    alt="logo"
                    height="20px"
                    width="20px"
                    style={{ borderRadius: "50%" }}
                  />
                  <Typography
                    style={{
                      display: "inline",
                      marginLeft: "10px",
                    }}
                  >
                    {currentWorkspace.name}
                  </Typography>
                  <ArrowDropDownIcon
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = "#f0f0f0";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "none";
                    }}
                    sx={{
                      borderRadius: "10px",
                      cursor: "pointer",
                      marginBottom: "2px",
                    }}
                    onClick={(event: React.MouseEvent<SVGSVGElement>) =>
                      handleWorkSpaceClick(event as any)
                    }
                  />
                </div>
              ) : (
                <></>
              )}
              <Popover
                open={openWorkspace}
                anchorEl={anchorElWorkspace}
                onClose={handleCloseWorkSpace}
                anchorReference="anchorPosition"
                anchorPosition={{ top: 60, left: 160 }}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                PaperProps={{
                  style: {
                    borderRadius: "10px",
                    border: "0.1px solid 	#D3D3D3",
                  },
                }}
              >
                <WorkSpaceDropDown />
              </Popover>
            </div>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse " id="navbarNav">
              <ul
                className="navbar-nav"
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  width: "100%",
                }}
              >
                <li className="nav-item">
                  <Link
                    className={`nav-link ${isActive("/dashboard")}`}
                    aria-current="page"
                    to="/dashboard"
                    style={{
                      marginRight: "10px",
                      paddingLeft: "10px",
                      paddingRight: "10px",
                    }}
                  >
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className={`nav-link ${isActive("/dashboard/project")}`}
                    to="/dashboard/project"
                    style={{
                      marginRight: "10px",
                      paddingLeft: "10px",
                      paddingRight: "10px",
                    }}
                  >
                    Projects
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className={`nav-link ${isActive("/dashboard/task")}`}
                    to="/dashboard/task"
                    style={{
                      marginRight: "10px",
                      paddingLeft: "10px",
                      paddingRight: "10px",
                    }}
                  >
                    Tasks
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className={`nav-link ${isActive("/dashboard/report")}`}
                    to="/dashboard/report"
                    style={{
                      marginRight: "10px",
                      paddingLeft: "10px",
                      paddingRight: "10px",
                    }}
                  >
                    Reports
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    to="/dashboard/team"
                    className={`nav-link ${isActive("/dashboard/team")}`}
                    style={{
                      marginRight: "10px",
                      paddingLeft: "10px",
                      paddingRight: "10px",
                    }}
                  >
                    Team
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    to="/dashboard/setting"
                    className={`nav-link ${isActive("/dashboard/setting")}`}
                    style={{
                      marginRight: "10px",
                      paddingLeft: "10px",
                      paddingRight: "10px",
                    }}
                  >
                    Settings
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div style={{ marginRight: "2%", flex: "" }}>
            <Avatar sx={{  bgcolor:'lightGray',border:2, cursor: "pointer", marginRight: "2%", flex: "1/3" }}
              alt="User Avatar" onClick={handleAvatarClick}
              src={user && user.profile_picture ? (`${user.profile_picture}`
              ) : (`${User_Icon}`)} />
            <Popover
              open={openAvatar}
              anchorEl={anchorEl}
              onClose={handleCloseAvatar}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
            >
              <List>
                <ListItem button>
                  <Link to="/profile" className="nav-link">
                    Profile
                  </Link>
                </ListItem>
                <ListItem button>
                  <Link to="/dashboard/setting" className="nav-link">
                    Settings
                  </Link>
                </ListItem>
                <ListItem button>
                  <Link to="/logout" className="nav-link">
                    Logout
                  </Link>
                </ListItem>
              </List>
            </Popover>
          </div>
        </Box>
      </nav>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="light" />
    </>
  );
};

export default Header;
