import moment from 'moment'

export default function (date, format) {
  return moment(date).format(format || 'YYYY-MM-DD HH:mm:ss')
}