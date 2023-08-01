import moment from 'moment'
moment.locale("pt-br")

export function formatDateHour(date: Date | moment.Moment | string) {
  return moment(date).format('DD/MM/YYYY HH:mm')
}

export function formatDate(date: Date | moment.Moment | string) {
  return moment(date).format('DD/MM/YYYY')
}

export function formatHour(date: Date | moment.Moment | string) {
  return moment(date).format('HH:mm')
}

