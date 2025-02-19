import { useEffect, useState } from "react";
import Modal from "@mui/material/Modal";
import ProjectCard from "./component/ProjectCard";
import AddModal from "./component/addModal";
import { fetchProjects } from "../../redux/slices/projectSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import Loader from "../../global/Loader";
import SearchBar from "./../common/SearchBar/SearchBar";
import Sort from "./../common/SearchBar/Sort";
import View from "../common/SearchBar/View";
import AddButton from "../common/SearchBar/AddButton";
import { ProjectData } from "../../../interface/project";
import { fetchTeam } from "../../redux/slices/teamSlice";

const Project = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const dispatch = useAppDispatch();
  const projects: ProjectData[] = useAppSelector(
    (state) => state.projects.projectList
  );

  const getTeams = async () => {
    try {
      await dispatch(fetchTeam())
    } catch (error) {
      console.log(error);
    };
  }

  const handleOpen = () => {
    getTeams();
    setIsOpen(true);
  }
  const handleClose = () => {
    getTeams();
    setTimeout(() => {
      setIsOpen(false);
    }, 1000);
  };

  useEffect(() => {
    getTeams();
    try {
      const fetchData = async () => {
        try {
          setIsLoading(true);
          await dispatch(fetchProjects());
        } catch (error) {
          console.log(error);
        } finally {
          setIsLoading(false);
        }
      };
      fetchData();
    } catch (error) {
      console.log(error);
    }
  }, [dispatch]);

  const filteredProjects = projects.filter((project) =>
    project.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <>
        <div
          style={{
            padding: "0px 50px",
            // backgroundColor: "#F8F8F8",
            height: "100vh",
          }}
        >
          <div className=" gap-2 container-fluid py-3 d-flex justify-content-between align-items-center">
            <div
              style={{
                flex: "1",
              }}
            >
              <SearchBar
                placeholder="projects"
                onChange={(value) => setSearchQuery(value)}
              />
            </div>
            <div
              style={{
                display: "flex",
                gap: "10px",
              }}
            >
              <Sort />
              <View />
              <span onClick={handleOpen}>
                <AddButton placeholder="Project" />
              </span>
            </div>
          </div>
          {isLoading ? (
            <Loader />
          ) : (
            <div className="container-fluid">
              <div className="row project">
                <ProjectCard details={filteredProjects} />
              </div>
            </div>
          )}
        </div>
        <Modal open={isOpen} onClose={handleClose}>
          <AddModal onclose={handleClose} />
        </Modal>
      </>

    </>
  );
};

export default Project;
