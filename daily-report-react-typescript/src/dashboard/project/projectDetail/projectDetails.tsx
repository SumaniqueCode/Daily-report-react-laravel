import { useParams } from "react-router-dom";
import SearchBar from "../../common/SearchBar/SearchBar";
import Sort from "../../common/SearchBar/Sort";
import View from "../../common/SearchBar/View";
import AddButton from "../../common/SearchBar/AddButton";
import { getOneProject } from "../../apis/project/projectapi";
import { useEffect, useState } from "react";
import { ProjectData, getModuleData } from "../../../../interface/project";
import { Modal } from "@mui/material";
import AddModal from "./components/addModal";
import Loader from "../../../global/Loader";
import ModuleCard from "./components/ModuleCard";
import { fetchModules } from "../../../redux/slices/moduleSlice";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";

const ProjectDetail = () => {
  const { id } = useParams();
  const projectId: string | undefined =
    (id ? parseInt(id, 10) : undefined) + "";
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [projectDetails, setProjectDetails] = useState<ProjectData>();
  const [searchQuery, setSearchQuery] = useState<string>("");

  const dispatch = useAppDispatch();
  const modules: getModuleData[] = useAppSelector(
    (state) => state.modules.moduleList
  );

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => {
    setTimeout(() => {
      setIsOpen(false);
    }, 1000);
  };

  useEffect(() => {
    try {
      const getProject = async () => {
        try {
          if (projectId !== undefined) {
            setIsLoading(true);
            const response = await getOneProject(projectId);
            setProjectDetails(response?.data.project);
          }
        } catch (error) {
          console.log(error);
        } finally {
          setIsLoading(false);
        }
      };
      const getModules = async () => {
        try {
          if (projectId != undefined) {
            setIsLoading(true);
            await dispatch(fetchModules(projectId));
          }
        } catch (error) {
          console.log(error);
        } finally {
          setIsLoading(false);
        }
      };
      getModules();
      getProject();
    } catch (error) {
      console.log(error);
    }
  }, [dispatch]);

  const filteredModules = modules.filter((module) =>
    module.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <div
            style={{
              padding: "0px 50px",
              backgroundColor: "#F8F8F8",
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
                  placeholder="Module"
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
                  <AddButton placeholder="Module" />
                </span>
              </div>
            </div>

            <div className="container-fluid">
              <h6>Project Module</h6>
            </div>

            <div className="container-fluid">
              <div className="row my-3 project">
                <ModuleCard details={filteredModules} />
              </div>
            </div>

            <div className="container-fluid">
              <div className="row my-3 project-member">
                <h6>Project Members</h6>
                {projectDetails?.assigned_team.map((team) => (
                  <div className="col-lg-4 mt-3">
                    <div className="card text-start border-0 shadow-sm">
                      <div className="card-body">
                        <div className="title d-flex justify-content-between">
                          <a href="" style={{ textDecoration: "none" }}>
                            <h4 className="card-title">{team.display_name} </h4>
                          </a>
                        </div>
                        <p className="card-text">{team.email}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <Modal open={isOpen} onClose={handleClose}>
            <AddModal onclose={handleClose} />
          </Modal>
        </>
      )}
    </>
  );
};

export default ProjectDetail;
