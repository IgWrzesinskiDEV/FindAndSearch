import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useDispatch, useSelector } from "react-redux";

const steps = ["Create question", "Select area"];
import { newGameDataActions } from "../../store/newGameStore/newGameData";

export default function QuestionCreateSteper() {
  const dispatch = useDispatch();
  const activeStep = useSelector((state) => state.newGame.activeStep);

  const handleNext = () => {
    dispatch(newGameDataActions.setActiveStep(activeStep + 1));
  };

  const handleBack = () => {
    dispatch(newGameDataActions.setActiveStep(activeStep - 1));
  };

  return (
    <Box sx={{ width: "100%" }}>
      {activeStep === steps.length ? (
        <>
          <Typography sx={{ mt: 2, mb: 1 }}>
            All steps completed - you&apos;re finished
          </Typography>
        </>
      ) : (
        <>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-evenly",
              p: [1.5, 4],
            }}
          >
            <Button
              color="inherit"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{
                fontWeight: "bold",
                fontSize: ["1rem", "1.2rem"],
                ":disabled": {
                  color: "grey",
                },
              }}
            >
              Back
            </Button>

            <Button
              onClick={handleNext}
              sx={{
                color: "#38bdf8",
                fontWeight: "bold",
                fontSize: ["1rem", "1.2rem"],
              }}
            >
              {activeStep === steps.length - 1 ? "Finish" : "Next"}
            </Button>
          </Box>
        </>
      )}
      <Stepper activeStep={activeStep}>
        {steps.map((label) => {
          return (
            <Step
              key={label}
              sx={{
                p: 1,
                fontSize: "1.2rem",
              }}
              root={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-evenly",
              }}
            >
              <StepLabel
                StepIconProps={{
                  sx: {
                    color: "grey",
                  },
                }}
              >
                <p className="text-white text-md lg:text-xl">{label}</p>
              </StepLabel>
            </Step>
          );
        })}
      </Stepper>
    </Box>
  );
}
