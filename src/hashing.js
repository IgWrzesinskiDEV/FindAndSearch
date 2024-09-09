import bcrypt from "bcryptjs";

export const checkUserAnswer = async (userAnswer, hashedCorrectAnswer) => {
  const isCorrect = await bcrypt.compare(userAnswer, hashedCorrectAnswer);
  return isCorrect;
};

export const hashCorrectAnswer = async (answer) => {
  const saltRounds = 10;
  const hashedAnswer = await bcrypt.hash(answer, saltRounds);
  return hashedAnswer;
};
