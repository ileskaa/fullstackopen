import { useState } from "react";

const Button = ({ label, value, setValue }) => {
  const handleClick = () => {
    setValue(value + 1);
  };
  return <button onClick={handleClick}>{label}</button>;
};

const Stat = (props) => {
  return (
    <div>
      {props.label} {props.value}
    </div>
  );
};

const Statistics = ({ good, neutral, bad }) => {
  const all = () => good + neutral + bad;

  if (!all())
    return (
      <div>
        <h1>statistics</h1>
        <div>No feedback given</div>
      </div>
    );

  return (
    <div>
      <h1>statistics</h1>
      <Stat label="good" value={good} />
      <Stat label="neutral" value={neutral} />
      <Stat label="bad" value={bad} />
      <Stat label="all" value={all()} />
      <Stat label="average" value={(good - bad) / all()} />
      <Stat label="positive" value={(good * 100) / all() + " %"} />
    </div>
  );
};

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
      <h1>give feeback</h1>
      <Button label="good" value={good} setValue={setGood} />
      <Button label="neutral" value={neutral} setValue={setNeutral} />
      <Button label="bad" value={bad} setValue={setBad} />

      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

export default App;
