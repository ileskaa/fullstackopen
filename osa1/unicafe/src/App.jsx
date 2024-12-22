import { useState } from "react";

const Button = ({ label, value, setValue }) => {
  const handleClick = () => {
    setValue(value + 1);
  };
  return <button onClick={handleClick}>{label}</button>;
};

const StatisticLine = ({ label, value }) => {
  return (
    <tr>
      <td>{label}</td>
      <td>{value}</td>
    </tr>
  );
};

const Statistics = ({ good, neutral, bad }) => {
  const all = () => good + neutral + bad;

  if (!all())
    return (
      <div>
        <div>No feedback given</div>
      </div>
    );

  return (
    <table>
      <tbody>
        <StatisticLine label="good" value={good} />
        <StatisticLine label="neutral" value={neutral} />
        <StatisticLine label="bad" value={bad} />
        <StatisticLine label="all" value={all()} />
        <StatisticLine label="average" value={(good - bad) / all()} />
        <StatisticLine label="positive" value={(good * 100) / all() + " %"} />
      </tbody>
    </table>
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

      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

export default App;
