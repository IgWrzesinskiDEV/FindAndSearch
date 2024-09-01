import { useImperativeHandle, useState, forwardRef } from 'react';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { createPortal } from 'react-dom';

const TablePopOver = forwardRef(function TablePopOver({ children }, ref) {
    const [anchorEl, setAnchorEl] = useState(null);
    useImperativeHandle(ref, () => ({
        openPop: (event) => {
            setAnchorEl(event.currentTarget);
        },
        closePop: () => {
            setAnchorEl(null);
        }
    }), []);
    // const handleClick = (event) => {
    //     setAnchorEl(event.currentTarget);
    // };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    return createPortal((
        <div >
            {/* <Button aria-describedby={id} variant="contained" onClick={handleClick}>
                Open Popover
            </Button> */}
            <Popover
                id={id}

                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                sx={{ left: "-1px" }}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
            >
                {children}
            </Popover>
        </div>
    ), document.getElementById("popOver"));
})

export default TablePopOver;