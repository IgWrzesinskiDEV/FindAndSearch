import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useDispatch, useSelector } from "react-redux";
import isEmpty from "../../util/validate";
const steps = ["Create question", "Select area"];
import { newGameDataActions } from "../../store/newGameStore/newGameData";

export default function QuestionCreateSteper({
  question,
  answer,
  handleFinish,
}) {
  const dispatch = useDispatch();
  const activeStep = useSelector((state) => state.newGame.activeStep);
  const errors = useSelector((state) => state.newGame.subbmitedQuestionErors);

  function validateQAndA(question, answer) {
    if (isEmpty(question)) {
      dispatch(
        newGameDataActions.setSubbmitedQuestionErors({
          questionText: true,
        })
      );
    }
    if (isEmpty(answer)) {
      dispatch(
        newGameDataActions.setSubbmitedQuestionErors({
          answer: true,
        })
      );
    }
  }
  const handleNext = () => {
    if (activeStep === 0) {
      validateQAndA(question, answer);
      dispatch(newGameDataActions.setActiveStep(activeStep + 1));
    }
  };

  const handleBack = () => {
    dispatch(newGameDataActions.setActiveStep(activeStep - 1));
  };

  const isStepFailed = (step) => {
    if (step === 0 && (errors.questionText || errors.answer)) {
      return true;
    }
    if (step === 1 && errors.polygonsCords) {
      return true;
    }
    return false;
  };

  return (
    <Box sx={{ width: "100%" }}>
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
          onClick={activeStep !== steps.length - 1 ? handleNext : handleFinish}
          disabled={activeStep === 0 && (errors.questionText || errors.answer)}
          sx={{
            color: "#38bdf8",
            fontWeight: "bold",
            fontSize: ["1rem", "1.2rem"],
          }}
        >
          {activeStep === steps.length - 1 ? "Finish" : "Next"}
        </Button>
      </Box>

      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const labelProps = {};
          if (isStepFailed(index)) {
            labelProps.optional = (
              <Typography
                variant="caption"
                color="error"
                sx={{
                  fontSize: ["0.6rem", "1.2rem"],
                }}
              >
                Required value
              </Typography>
            );

            labelProps.error = true;
          }
          return (
            <Step
              key={label}
              sx={{
                p: [0.1, 2],
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
                {...labelProps}
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
