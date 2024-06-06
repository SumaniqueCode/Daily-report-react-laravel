import { MenuItem, TextField } from "@mui/material";

const Sort = () => {
  return (
    <div>
      <form
        action="
        "
      >
        <TextField
          required
          fullWidth
          select
          defaultValue="options"
          type="text"
          id="Size"
          size="small"
          sx={{ width: "200px", outline: "none", backgroundColor: "white" }}
          inputProps={{
            sx: {
              "& fieldset": {
                border: "1px solid #E2E2E2",
              },
            },
          }}
        >
          <MenuItem value="options" disabled>
            Sort by activity
          </MenuItem>
          <MenuItem value="Ascending ">Ascending</MenuItem>
          <MenuItem value="Ascending">Descending</MenuItem>
        </TextField>
      </form>
    </div>
  );
};

export default Sort;
