import { useState } from "react";

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNuetral] = useState(0);
  const [bad, setBad] = useState(0);
  let all = good + bad + neutral;
  let average = (good + bad * -1) / all;
  let positive = (good / all) * 100;

  let stats = {
    good: good,
    bad: bad,
    neutral: neutral,
    positive: positive,
    average: average,
  };
  return (
    <>
      <h3>give feedback</h3>
      <button onClick={() => setGood(good + 1)}>good</button>
      <button onClick={() => setNuetral(neutral + 1)}>neutral</button>
      <button onClick={() => setBad(bad + 1)}>bad</button>
      {good || bad || neutral ? (
        <Statistics stats={stats}></Statistics>
      ) : (
        <p>No feedback given</p>
      )}
    </>
  );
};

const Statistics = (props) => {
  const { good, neutral, bad, all, average, positive } = props.stats;
  return (
    <>
      <h3>statistics</h3>
      <table><tbody>
      <StatisticLine text="good" value={good}></StatisticLine>
      <StatisticLine text="neutral" value={neutral}></StatisticLine>
      <StatisticLine text="bad" value={bad}></StatisticLine>
      <StatisticLine text="all" value={all}></StatisticLine>
      <StatisticLine text="average" value={average}></StatisticLine>
      <StatisticLine text="positive" value={positive}></StatisticLine>
      </tbody></table>
    </>
  );
};

const StatisticLine = ({ text, value }) => {
  if (text === "positive")
    return (
      <tr>
        <td>{text}</td>
        <td>  {value}%</td>
      </tr>
    );
  return (
    <tr>
      <td>{text}</td>
      <td>   {value}</td>
    </tr>
  );
};
export default App;
