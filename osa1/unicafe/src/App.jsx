import { useState } from "react";

const Button = (props) => {
  const handleClick = () => {
    props.setValue(props.value + 1);
  };
  return <button onClick={handleClick}>{props.label}</button>;
};

const Stat = (props) => {
  return (
    <div>
      {props.label} {props.value}
    </div>
  );
};

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const all = () => good + neutral + bad;

  return (
    <div>
      <h1>give feeback</h1>
      <Button label="good" value={good} setValue={setGood} />
      <Button label="neutral" value={neutral} setValue={setNeutral} />
      <Button label="bad" value={bad} setValue={setBad} />
      <h1>statistics</h1>
      <Stat label="good" value={good} />
      <Stat label="neutral" value={neutral} />
      <Stat label="bad" value={bad} />
      <Stat label="all" value={all()} />
      <Stat label="average" value={(good - bad) / all() || 0} />
      <Stat label="positive" value={(good * 100) / (all() || 1) + " %"} />
    </div>
  );
};

export default App;
