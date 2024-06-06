import { Button } from "@mui/material";
import React from "react";

interface addButtonProps {
  placeholder: string;
}

const AddButton: React.FC<addButtonProps> = ({ placeholder }) => {
  return (
    <>
      <Button
        type="submit"
        variant="contained"
        sx={{
          textTransform: "capitalize",
          borderRadius: "5px",
        }}
      >
        Add {placeholder} +
      </Button>
    </>
  );
};

export default AddButton;
