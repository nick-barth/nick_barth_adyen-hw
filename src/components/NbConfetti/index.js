import React from "react"

import "./styles.scss"

const NbConfetti = () => {
  const confettiElements = Array(300).fill(0)
  return (
    <div>
      {confettiElements.map((confetti, index) => {
        return <div key={index} className={`NbConfetti NbConfetti--${index}`} />
      })}
    </div>
  )
}

export default NbConfetti
