import numeral from 'numeral'

export function shortenNumber (value) {
  value = parseInt(value)
  if (value < 1000) {
    return value
  } else {
    return numeral(value).format('0.0a')
  }
}
