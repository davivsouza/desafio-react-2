import { useState } from 'react'
import './App.css'
function App() {
  const [clicks, setClicks] = useState([])
  const [lastDots, setLastDots] = useState([])

  const colors = ['#A63D40', '#E9B872', '#90A959', '#22AED1', '#8A84E2', '#CAB6CD']

  function handleUndo() {
    const dots = [...clicks]
    dots.splice(dots.length - 1, 1)
    setClicks(dots)
  }

  function handleRedo() {
    const dots = [...clicks]

    if(dots.length === lastDots.length){
      return;
    }
    dots.push(lastDots[dots.length])
    setClicks(dots)
  }

  function handleMousePosition(ev) {
    const x = ev.clientX
    const y = ev.clientY

    const randomColor = colors[Math.floor(Math.random() * 6)]

    setClicks(prevState => [...prevState, {
      x,
      y,
      color: randomColor
    }])
    setLastDots(prevState => [...prevState, {x, y, color: randomColor}])
  }
  return (
    <>
      <button onClick={handleUndo}>desfazer</button>
      <button onClick={handleRedo}>refazer</button>
      <div className="container" onClick={handleMousePosition}>

        {clicks.map((click, idx) => (
          <div
            key={idx}
            className='clicks-div'
            style={{
              left: click.x,
              top: click.y,
              background: click.color
            }}
          />

        ))}
      </div>
    </>

  )
}

export default App
