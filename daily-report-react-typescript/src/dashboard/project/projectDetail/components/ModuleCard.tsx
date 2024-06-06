import React, { useState } from "react";
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";
import { Popover } from "@mui/material";
import { Box } from "@mui/material";
import Modal from "@mui/material/Modal";
import DeleteModal from "./deleteModal";
import EditModal from "./editModal";
import { getModuleData } from "../../../../../interface/project";
import { formatDistanceToNow } from "date-fns";
import { Link } from "react-router-dom";
import { StatusOptions } from "../../../common/GlobalData/PSoptions";

const DottedPopover = ({
  onEdit,
  onDelete,
}: {
  onEdit: () => void;
  onDelete: () => void;
}) => {
  return (
    <Box
      sx={{
        width: "200px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: "10px",
        padding: "2px",
      }}
    >
      <div
        style={{
          cursor: "pointer",
          width: "100%",
          textAlign: "center",
          padding: "5px",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = "#f0f0f0";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = "none";
        }}
        onClick={onEdit}
      >
        Edit
      </div>
      <div
        style={{
          cursor: "pointer",
          width: "100%",
          textAlign: "center",
          padding: "5px",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = "#f0f0f0";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = "none";
        }}
        onClick={onDelete}
      >
        Delete
      </div>
    </Box>
  );
};

interface ModuleCardProps {
  details: getModuleData[];
}

const ModuleCard: React.FC<ModuleCardProps> = ({ details }) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [selectedModule, setSelectedModule] = useState<getModuleData>({
    assigned_team: [],
    description: "",
    end_date: "",
    id: 0,
    lead: [],
    name: "",
    start_date: "",
    status: 0,
    project_id: 0,
    updated_at: "",
  });

  console.log(details);

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const [isEditOpen, setIsEditOpen] = useState<boolean>(false);

  const handleEditOpen = () => setIsEditOpen(true);
  const handleEditClose = () => {
    setTimeout(() => {
      setIsEditOpen(false);
    }, 2000);
  };

  const handleOpen = () => setIsOpen(true);

  const handleClose = () => setIsOpen(false);

  const handleDottedClick = (
    event: React.MouseEvent<HTMLElement>,
    module: getModuleData
  ) => {
    setAnchorEl(event.currentTarget);
    setSelectedModule(module);
  };

  const handleCloseDotted = () => {
    setAnchorEl(null);
  };

  const handleEditModule = () => {
    handleEditOpen();
    handleCloseDotted();
  };

  const handleDeleteModule = async () => {
    handleOpen();
    handleCloseDotted();
  };

  const openDotted = Boolean(anchorEl);

  if (!details) {
    return <p>Loading details...</p>;
  }

  return (
    <>
      {details.map((module) => (
        <div className="col-lg-4 mt-3" key={module.id}>
          <div
            className="card text-start shadow-sm"
            style={{ borderLeft: "2px solid red " }}
          >
            <div className="card-body d-flex flex-md-column">
              <div className="title d-flex justify-content-between">
              <Link
                  to={`/dashboard/project-details/${module.project_id}/module-details/${module.id}`}
                  style={{ textDecoration: "none" }}
                >
                <h4 className="card-title">{module.name}</h4>
                </Link>

                <span style={{ cursor: "pointer" }}>
                  <MoreHorizOutlinedIcon
                    onClick={(event: React.MouseEvent<SVGSVGElement>) =>
                      handleDottedClick(event as any, module)
                    }
                  />
                </span>
                {selectedModule === module && (
                  <Popover
                    open={openDotted}
                    anchorEl={anchorEl}
                    onClose={handleCloseDotted}
                    anchorOrigin={{
                      vertical: "bottom",
                      horizontal: "right",
                    }}
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    PaperProps={{
                      style: {
                        borderRadius: "10px",
                        border: "1px solid #D3D3D3",
                        outline: "none",
                      },
                    }}
                  >
                    <DottedPopover
                      onEdit={handleEditModule}
                      onDelete={handleDeleteModule}
                    />
                  </Popover>
                )}
              </div>
              <div>
                <p className="card-text mb-3">{module.description}</p>
              </div>

              <div className="members">
                {module.assigned_team.map((team, index) => (
                  <img
                    key={index}
                    src={
                      team?.profile_picture !== null
                        ? `${team?.profile_picture}`
                        : `https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png`
                    }
                    title={team?.display_name}
                    className="avatar"
                    style={{
                      marginRight: "2px",
                    }}
                  />
                ))}
              </div>

              <div className="time-board mt-2 d-flex justify-content-between">
                <span className="time">
                  Updated{" "}
                  {module?.updated_at !== null ? (
                    <span className="timestamp">
                      {formatDistanceToNow(new Date(module?.updated_at), {
                        addSuffix: true,
                      })}
                    </span>
                  ) : (
                    <></>
                  )}
                </span>
                <div
                  style={{
                    display: "flex",
                    gap: "5px",
                    fontSize: "13px",
                  }}
                >
                  <div style={{ color: "green" }}>
                    {
                      StatusOptions.find(
                        (status) => status.value == module.status
                      )?.label
                    }{" "}
                  </div>
                  <span>Status</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
      {isOpen && (
        <Modal open={isOpen} onClose={handleClose}>
          <DeleteModal onclose={handleClose} id={selectedModule.id} />
        </Modal>
      )}
      {isEditOpen && (
        <Modal open={isEditOpen} onClose={handleEditClose}>
          <EditModal onclose={handleEditClose} module={selectedModule} />
        </Modal>
      )}
    </>
  );
};

export default ModuleCard;
