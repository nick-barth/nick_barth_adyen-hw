import React, { useEffect, useState } from "react"

import "./styles.scss"

const NbCard = ({ title, price, temp, winner, score }) => {
  return (
    <div className={`NbCard ${winner && "NbCard--winner"}`}>
      <h2 className="NbCard__title">{title}</h2>
      <div className="NbCard__price">
        <div className="NbCard__label">price</div>${price}
      </div>
      <div className="NbCard__temp">
        <div className="NbCard__label">temperature</div>°{temp}
      </div>
      <div className="NbCard__score">
        <div className="NbCard__label">score</div>
        {score}
      </div>
    </div>
  )
}

export default NbCard
