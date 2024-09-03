/* eslint-disable react/prop-types */
import { useImperativeHandle, useState, forwardRef } from "react";
import Popover from "@mui/material/Popover";

import { createPortal } from "react-dom";

const TablePopOver = forwardRef(function TablePopOver(
  { children, ...props },
  ref
) {
  const [anchorEl, setAnchorEl] = useState(null);
  useImperativeHandle(
    ref,
    () => ({
      openPop: (event) => {
        setAnchorEl(event.currentTarget);
      },
      closePop: handleClose,
    }),
    []
  );
  // const handleClick = (event) => {
  //     setAnchorEl(event.currentTarget);
  // };

  const handleClose = () => {
    setAnchorEl(null);
    props.setIsSelected(false);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return createPortal(
    <div>
      {/* <Button aria-describedby={id} variant="contained" onClick={handleClick}>
                Open Popover
            </Button> */}
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        {children}
      </Popover>
    </div>,
    document.getElementById("popOver")
  );
});

export default TablePopOver;
