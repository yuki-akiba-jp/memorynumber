import { NumberCard } from "../components/numbercard.jsx";
import { VStack, Flex, Box } from "@chakra-ui/react";
import { GameBtn } from "../components/GameBtn.jsx";
import { useState, useRef, useEffect } from "react";
export function getNumbers(len) {
  let re = [];
  let tempNumbers = [];
  for (let index = 0; index < len; index++) tempNumbers.push(index);
  while (tempNumbers.length > 10) {
    const index = Math.floor(Math.random() * (tempNumbers.length - 1));
    const num = tempNumbers.splice(index, 1);
    re.push(num);
  }

  return re;
}

export const GAMESTATUS = {
  WAITING: "WAITING",
  PLAYING: "PLAYING",
  FINISHED: "FINISHED",
};

export default function Home() {
  let tempNumbers = [];
  for (let index = 0; index < 100; index++) tempNumbers.push(index);

  const [gameStatus, setGameStatus] = useState(GAMESTATUS.WAITING);
  const [numbersIndex, setNumbersIndex] = useState(0);
  const [time, setTime] = useState(0);
  const [finishTime, setFinishTime] = useState(0);

  const [numbers, setNumbers] = useState(tempNumbers);
  const keydownRef = useRef();

  useEffect(() => {
    window.setInterval(() => {
      setTime((time) => time + 0.5);
    }, 1000);
  }, []);

  const handleKeyDown = (event) => {
    if (event.key == "ArrowRight" && numbersIndex < numbers.length - 1)
      setNumbersIndex((number) => number + 1);
    if (event.key == "ArrowLeft" && numbersIndex > 0)
      setNumbersIndex((number) => number - 1);
  };

  return (
    <VStack>
      <Flex
        onKeyDown={handleKeyDown}
        ref={keydownRef}
        alignItems="center"
        height="100vh"
      >
        <VStack>
          {gameStatus == GAMESTATUS.FINISHED ? (
            <Box>{"time:" + showTime(finishTime)}</Box>
          ) : (
            ""
          )}
          {gameStatus == GAMESTATUS.WAITING ? (
            <NumberCard number={"?"} />
          ) : (
            <NumberCard number={numbers[numbersIndex]} />
          )}

          <GameBtn
            keydownRef={keydownRef}
            numbersIndex={numbersIndex}
            setNumbersIndex={setNumbersIndex}
            numbers={numbers}
            setNumbers={setNumbers}
            gameStatus={gameStatus}
            setGameStatus={setGameStatus}
            time={time}
            setTime={setTime}
            setFinishTime={setFinishTime}
          />
        </VStack>
      </Flex>
    </VStack>
  );
}

function showTime(time) {
  let show = "";
  if (time >= 60) {
    show += Math.floor(time / 60).toString() + ":";
    show += Math.floor(time % 60).toString();
  } else {
    show += time.toString();
  }
  return show;
}
