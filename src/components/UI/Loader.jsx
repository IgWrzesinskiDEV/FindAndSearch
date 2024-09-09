/* eslint-disable react/prop-types */
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

export default function Loader({ loaderText }) {
  return (
    <Box
      sx={{ display: "flex" }}
      className="flex flex-col items-center justify-center gap-4 mt-4"
    >
      <h1 className="text-3xl uppercase">{loaderText}</h1>
      <CircularProgress
        size={80}
        sx={{
          color: "#38bdf8",
        }}
      />
    </Box>
  );
}
