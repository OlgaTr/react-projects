import { useState } from "react";

const Header = ({text}) => <p>{text}</p>

const Button = (props) => <button onClick={props.handleClick}>{props.text}</button>

const Statistics = (props) => {
  if(props.all == 0) {
    return <p>No feedback given</p>
  }
  return (
    <div>
      <p>statistics</p>
      <StatisticLine text="good" value={props.good} />
      <StatisticLine text="neutral" value={props.neutral} />
      <StatisticLine text="bad" value={props.bad} />
      <StatisticLine text="all" value={props.all} />
      <StatisticLine text="average" value={props.average} />
      <StatisticLine text="positive" value={props.positive} />
    </div>
  )
}

const StatisticLine = ({text, value}) => (
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>
)

const App = () => {
  const[good, setGood] = useState(0)
  const[neutral, setNeutral] = useState(0)
  const[bad, setBad] = useState(0)
  const[all, setAll] = useState(0)
  const[average, setAverage] = useState(0)
  const[positive, setPositive] = useState(0)

  const handleClickGood = () => {
    const newGood = good + 1
    const newAll = newGood + neutral + bad
    setGood(newGood)
    setAll(newAll)
    setAverage((newGood - bad)/newAll)
    setPositive(newGood/newAll * 100)
  }

  const handleClickNeutral = () => {
    const newNeutral = neutral + 1
    const newAll = good + newNeutral + bad
    setNeutral(newNeutral)
    setAll(newAll)
    setAverage((good - bad)/newAll)
    setPositive(good/newAll)
  }

  const handleClickBad = () => {
    const newBad = bad + 1
    const newAll = good + neutral + newBad
    setBad(newBad)
    setAll(newAll)
    setAverage((good - newBad)/newAll)
    setPositive(good/newAll)
  }

  return (
    <div>
      <Header text="give feedback"/>
      <Button handleClick={handleClickGood} text="good" />
      <Button handleClick={handleClickNeutral} text="neutral" />
      <Button handleClick={handleClickBad} text="bad" />
      <Statistics good={good} neutral={neutral} bad={bad} all={all} average={average} positive={[positive, " %"]} />
    </div>
  );
}

export default App;