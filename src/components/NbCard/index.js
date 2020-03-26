import React, { useEffect, useState } from "react"

const NbCard = ({ title, price, temp, winner }) => {
  return (
    <div className="NbCard">
      <h2 className="NbCard__title">{title}</h2>
      <p className="NbCard__price">{price}</p>
      <p className="NbCard__temp">{temp}</p>
      <div>{winner && "fucking wiinner"}</div>
    </div>
  )
}

export default NbCard
