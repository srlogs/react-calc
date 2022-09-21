import React, { useState } from "react";
import Wrapper from "./components/Wrapper";
import Screen from "./components/Screen";
import ButtonWrapper from "./components/ButtonWrapper";
import Button from "./components/Button";

const btnValues = [
  ["C", "+-", "%", "/"],
  [7, 8, 9, "X"],
  [4, 5, 6, "-"],
  [1, 2, 3, "+"],
  [0, ".", "="],
];

const App = () => {
  const [calc, setCalc] = useState({
    num: 0,
    res: 0,
    sign: "",
    display: "",
  });

  const updateDisplay = (value) => {
    console.log("update display called ", value);
    if (calc.display === "") {
      return value;
    }
    return calc.display + String(value);
  };

  const numClickHandler = (value) => {
    setCalc({
      ...calc,
      num: calc.num !== 0 ? Number(String(calc.num) + value) : value,
      res: !calc.sign ? 0 : calc.res,
      display: updateDisplay(value),
    });
  };

  const comaClickHandler = (value) => {
    setCalc({
      ...calc,
      num: !calc.num.toString().includes(".") ? calc.num + value : calc.num,
      display: !calc.num.toString().includes(".") ? calc.num + value : calc.num,
    });
  };

  const math = (a, b, sign) => {
    console.log(`a = ${a} | b = ${b} | sign = ${sign}`);
    return sign === "+"
      ? a + b
      : sign === "-"
      ? a - b
      : sign === "X"
      ? a * b
      : a / b;
  };

  const resetClickHandler = () => {
    setCalc({
      ...calc,
      num: 0,
      res: 0,
      sign: "",
      display: "",
    });
    console.log(`reset handler called`);
  };

  const inverseClickHandler = () => {
    setCalc({
      ...calc,
      num: calc.num * -1,
      res: calc.res * -1,
      display: calc.num !== 0 ? calc.num * -1 : calc.res * -1,
    });
  };

  const percentClickHandler = (value) => {
    setCalc({
      ...calc,
      num: calc.num / Math.pow(100, 1),
      display: calc.num / Math.pow(100, 1),
    });
  };

  const signClickHandler = (value) => {
    setCalc({
      ...calc,
      sign: value,
      res:
        calc.num === 0
          ? calc.res
          : calc.res === 0
          ? calc.num
          : math(calc.res, calc.num, calc.sign),
      num: 0,
      display: calc.display + value,
    });
  };

  const equalsClickHandler = () => {
    console.log(`expression we typed ${calc.display}`);
    setCalc({
      ...calc,
      num: math(calc.res, calc.num, calc.sign),
      display: math(calc.res, calc.num, calc.sign),
      res: 0,
      sign: "",
    });
  };

  return (
    <Wrapper>
      <Screen value={calc.display ? calc.display : 0}></Screen>
      <ButtonWrapper>
        {btnValues.flat().map((btn, i) => {
          return (
            <Button
              key={i}
              className={btn === "=" ? "equals" : ""}
              value={btn}
              onClick={() => {
                if (btn === "C") resetClickHandler();
                else if (btn === "+-") inverseClickHandler(btn);
                else if (btn === "%") percentClickHandler(btn);
                else if (btn === "=") equalsClickHandler();
                else if (btn === ".") comaClickHandler(btn);
                else if (
                  btn === "/" ||
                  btn === "X" ||
                  btn === "+" ||
                  btn === "-"
                )
                  signClickHandler(btn);
                  else numClickHandler(btn);
              }}
            />
          );
        })}
      </ButtonWrapper>
    </Wrapper>
  );
};

export default App;
