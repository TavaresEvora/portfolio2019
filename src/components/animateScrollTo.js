//t = current time
//b = start value
//c = change in value
//d = duration
const easeInOutQuad = (t, b, c, d) => {
  t /= d / 2
  if (t < 1) return (c / 2) * t * t + b
  t = t - 1
  return (-c / 2) * (t * (t - 2) - 1) + b
}

const scrollTo = (element, to, duration) => {
  const start = element.scrollTop
  const change = to - start
  let currentTime = 0
  let increment = 20

  const animateScroll = function() {
    currentTime += increment
    const val = easeInOutQuad(currentTime, start, change, duration)
    element.scrollTop = val
    if (currentTime < duration) {
      setTimeout(animateScroll, increment)
    }
  }
  animateScroll()
}

export default scrollTo
