import { Button } from "@chakra-ui/react";
import { GAMESTATUS, getNumbers } from "@/pages";

export function GameBtn({
  keydownRef,
  numbersIndex,
  setNumbersIndex,
  numbers,
  setNumbers,
  gameStatus,
  setGameStatus,
  time,
  setTime,
  setFinishTime,
}) {
  const btnText = {
    startBtnText: "start game",
    playingBtnText: "playing",
    finishBtnText: "finish",
  };

  let gameBtnText = "";
  if (gameStatus == GAMESTATUS.WAITING) gameBtnText = btnText.startBtnText;
  if (gameStatus == GAMESTATUS.PLAYING) gameBtnText = btnText.playingBtnText;
  if (numbersIndex == numbers.length - 1) gameBtnText = btnText.finishBtnText;
  if (gameStatus == GAMESTATUS.FINISHED) gameBtnText = btnText.startBtnText;

  const handleClick = () => {
    if (gameStatus == GAMESTATUS.FINISHED) {
      setNumbersIndex(0);
      setNumbers(getNumbers(100));
      setGameStatus(GAMESTATUS.PLAYING);
    }
    if (
      gameStatus == GAMESTATUS.PLAYING &&
      gameBtnText == btnText.finishBtnText
    ) {
      setFinishTime(time);
      setGameStatus(GAMESTATUS.FINISHED);
    }
    if (gameStatus == GAMESTATUS.WAITING) {
      setGameStatus(GAMESTATUS.PLAYING);
      setNumbers(getNumbers(100));
      setTime(0);
    }
    keydownRef.current.focus();
  };

  return (
    <Button onClick={handleClick} colorScheme="teal" size="md">
      {gameBtnText}
    </Button>
  );
}
