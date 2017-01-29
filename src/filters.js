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

export function fromNow (value) {
  return moment(value).fromNow()
}

export function date (value) {
  return moment(value).format('L')
}

export function humanDate (value) {
  return moment(value).format('LL')
}
