import React from "react"

import "./styles.scss"

const NbSpinner = ({ dark }) => {
  return <div className={`NbSpinner ${dark && "NbSpinner--dark"}`} />
}

export default NbSpinner
