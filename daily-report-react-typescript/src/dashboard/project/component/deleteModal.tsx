import React from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useAppDispatch } from "../../../redux/hooks";
import { deleteProject } from "../../../redux/slices/projectSlice";

interface AddModalProps {
  onclose: () => void;
  id: number;
}

const DeleteModal: React.FC<AddModalProps> = ({ onclose, id }) => {
  const dispatch = useAppDispatch();

  const handleYesClick = async () => {
    dispatch(deleteProject(id));
    onclose();
  };

  const handleNoClick = async () => {
    onclose();
  };

  return (
    <>
      <Container
        component="main"
        sx={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            bgcolor: "background.paper",
            width: 300,
            height: 110,
            transform: "translate(-50%, -50%)",
            border: "1px solid #fff",
            borderRadius: "5px",
            boxShadow: 24,
            p: 2,
          }}
        >
          <Typography
            sx={{
              fontWeight: 600,
              marginBottom: "20px",
            }}
          >
            Are you sure?
          </Typography>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Typography
              sx={{
                fontWeight: 400,
                marginBottom: "30px",
                padding: "4px",
                cursor: "pointer",
                width: "25%",
                textAlign: "center",
                borderRadius: "3px",
                outline: "none",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#f0f0f0";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "none";
              }}
              onClick={handleYesClick}
            >
              Yes
            </Typography>
            <Typography
              sx={{
                fontWeight: 400,
                marginBottom: "30px",
                padding: "4px",
                cursor: "pointer",
                width: "25%",
                textAlign: "center",
                borderRadius: "3px",
                outline: "none",
              }}
              onClick={handleNoClick}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#f0f0f0";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "none";
              }}
            >
              No
            </Typography>
          </div>
        </Box>
      </Container>
    </>
  );
};

export default DeleteModal;
