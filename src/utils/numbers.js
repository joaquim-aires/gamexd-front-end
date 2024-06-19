export function formatNumber(num) {
  if (num >= 1000) {
    const formattedNum = (num / 1000).toFixed(1)
    return formattedNum.endsWith('.0') ? formattedNum.slice(0, -2) + 'k' : formattedNum + 'k'
  } else {
    return num.toString()
  }
}
