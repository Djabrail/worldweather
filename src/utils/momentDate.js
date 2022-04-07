import moment from 'moment'

const momentDate = function (newDate) {
  return moment(newDate).fromNow()
}

export { momentDate }
