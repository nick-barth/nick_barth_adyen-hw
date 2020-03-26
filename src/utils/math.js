export const getStandardDeviation = data => {
  let m = getMean(data)
  return Math.sqrt(
    data.reduce((sq, n) => {
      return sq + Math.pow(n - m, 2)
    }, 0) /
      (data.length - 1)
  )
}

export const getMean = data => {
  return (
    data.reduce((a, b) => {
      return Number(a) + Number(b)
    }) / data.length
  )
}

export const normalise = data => {
  const sd = getStandardDeviation(data)
  const mean = getMean(data)
  const zedScore = data.map(item => (item - mean) / sd)
  return zedScore
}
