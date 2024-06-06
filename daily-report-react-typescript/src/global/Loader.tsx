import CircularProgress from "@mui/material/CircularProgress";

const Loader = () => {
  return (
    <CircularProgress
      style={{ position: "absolute", top: "50%", left: "50%", }}
    />
  );
};

export default Loader;
