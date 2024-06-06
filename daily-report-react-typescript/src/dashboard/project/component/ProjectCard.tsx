import React, { useState } from "react";
import { Link } from "react-router-dom";
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";
import { Popover } from "@mui/material";
import { Box } from "@mui/material";
import { formatDistanceToNow } from "date-fns";
import Modal from "@mui/material/Modal";
import DeleteModal from "./deleteModal";
import EditModal from "./editModal";
import { ProjectData } from "../../../../interface/project";
import { PriorityOptions } from "../../common/GlobalData/PSoptions";

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

interface ProjectCardProps {
  details: ProjectData[];
}

const ProjectCard: React.FC<ProjectCardProps> = ({ details }) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [selectedProject, setSelectedProject] = useState<ProjectData>({
    assigned_team: [],
    created_at: "",
    description: "",
    id: 0,
    name: "",
    priority: 0,
    slug: "",
    status:0,
    updated_at: "",
    workspace_id: 0,
  });

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
    project: ProjectData
  ) => {
    setAnchorEl(event.currentTarget);
    setSelectedProject(project);
  };

  const handleCloseDotted = () => {
    setAnchorEl(null);
  };

  const handleEditProject = () => {
    handleEditOpen();
    handleCloseDotted();
  };

  const handleDeleteProject = async () => {
    handleOpen();
    handleCloseDotted();
  };

  const openDotted = Boolean(anchorEl);

  return (
    <>
      {details.map((project) => (
        <div className="col-lg-4 mt-2" key={project.id}>
          <div
            className="card text-start shadow-sm"
            style={{ borderLeft: "2px solid red " }}
          >
            <div className="card-body d-flex flex-md-column">
              <div className="title d-flex justify-content-between">
                <Link
                  to={`/dashboard/project-details/${project.id}`}
                  style={{ textDecoration: "none" }}
                >
                  <h4 className="card-title">{project.name}</h4>
                </Link>
                <span style={{ cursor: "pointer" }}>
                  <MoreHorizOutlinedIcon
                    onClick={(event: React.MouseEvent<SVGSVGElement>) =>
                      handleDottedClick(event as any, project)
                    }
                  />
                </span>
                {selectedProject === project && (
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
                      onEdit={handleEditProject}
                      onDelete={handleDeleteProject}
                    />
                  </Popover>
                )}
              </div>
              <div>
                <p className="card-text mb-3">{project.description}</p>
              </div>

              <div className="members">
                {project.assigned_team.map((team, index) => (
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
                  <span className="timestamp">
                    {formatDistanceToNow(new Date(project.updated_at), {
                      addSuffix: true,
                    })}
                  </span>
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
                      PriorityOptions.find(
                        (priority) => priority.value == project.status
                      )?.label
                    }{" "}
                  </div>
                  <span>Status</span>
                  <div style={{ color: "red" }}>
                    {
                      PriorityOptions.find(
                        (priority) => priority.value == project.priority
                      )?.label
                    }{" "}
                  </div>
                  <span>Priority</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
      {isOpen && (
        <Modal open={isOpen} onClose={handleClose}>
          <DeleteModal onclose={handleClose} id={selectedProject.id} />
        </Modal>
      )}
      {isEditOpen && (
        <Modal open={isEditOpen} onClose={handleEditClose}>
          <EditModal onclose={handleEditClose} project={selectedProject} />
        </Modal>
      )}
    </>
  );
};

export default ProjectCard;
