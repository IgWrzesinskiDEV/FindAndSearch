/* eslint-disable react/prop-types */
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

export default function Loader({ loaderText }) {
  return (
    <Box className="flex flex-col items-center justify-center w-full gap-4 h-lvh">
      <h1 className="text-3xl text-center uppercase">{loaderText}</h1>
      <CircularProgress
        size={80}
        sx={{
          color: "#38bdf8",
        }}
      />
    </Box>
  );
}
