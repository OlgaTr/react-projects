const Header = ({course}) => <h1>{course.name}</h1>

const Part =({part}) => <p>{part.name} {part.exercises}</p>

const Content =({parts}) => {
  return (
    <div>
      {parts.map(part =>
        <Part key={part.id} part={part}/>
      )}
    </div>
  )
}

const Total = ({parts}) => {

  const total = () => {
    const exercises = parts.map(part => part.exercises)
    return exercises.reduce((accumulator, currentValue) => accumulator + currentValue)
  }

  return (
    <p>Total of {total()} exercises</p>
  )
}

const Course = ({course}) => {
  return (
    <div>
      <Header course={course} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )  
}

export default Course