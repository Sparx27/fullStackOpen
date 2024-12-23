import StatisticLine from "./StatisticLine"

const Statistics = ({ stats }) => {
  const { good, neutral, bad } = stats

  function calcPositive() {
    return good / (good + neutral + bad) * 100
  }

  function calcAverage() {
    return (good - bad) / (good + neutral + bad)
  }

  return (
    <article>
      <h2>Statistics</h2>

      {
        good + neutral + bad > 0
          ? (
            <table>
              <tbody>
                <StatisticLine text={"good"} stat={good} />
                <StatisticLine text={"neutral"} stat={neutral} />
                <StatisticLine text={"bad"} stat={bad} />
                <StatisticLine text={"All"} stat={good + neutral + bad} />
                <StatisticLine text={"Average"} stat={calcAverage()} />
                <StatisticLine text={"Positive"} stat={calcPositive() + " %"} />
              </tbody>
            </table>
          )
          : (
            <p>No feedback given</p>
          )
      }
    </article>
  )
}

export default Statistics