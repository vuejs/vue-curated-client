import numeral from 'numeral'
import marked from 'marked'
import moment from 'moment'

export function shortenNumber (value) {
  value = parseInt(value)
  if (value < 1000) {
    return value
  } else {
    return numeral(value).format('0.0a')
  }
}

export function markdown (value) {
  return marked(value)
}

export function humanDate (value) {
  const m = moment(value)
  return m.fromNow()
}
