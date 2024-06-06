import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";

interface SearchBarProps {
  placeholder: string;
  onChange: (value: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ placeholder, onChange }) => {
  const handleChange = (e: any) => {
    const value = e.target.value;
    onChange(value);
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "15px",
          backgroundColor: "white",
        }}
      >
        <form
          style={{
            flex: 1,
          }}
        >
          <TextField
            sx={{ bgcolor: "white", borderRadius: 2 }}
            id="search-bar"
            className="text"
            fullWidth
            onChange={handleChange}
            placeholder={`Search ${placeholder}`}
            size="small"
            InputProps={{
              startAdornment: (
                <IconButton
                  type="submit"
                  aria-label="search"
                  sx={{ marginRight: "10px" }}
                >
                  <SearchIcon />
                </IconButton>
              ),
              sx: {
                "& fieldset": {
                  border: "1px solid #E2E2E2",
                  transition: "border-color 0.2s",
                  cursor: "default",
                  "&:hover": { borderColor: "#000" },
                },
              },
            }}
          />
        </form>
      </div>
    </>
  );
};

export default SearchBar;
