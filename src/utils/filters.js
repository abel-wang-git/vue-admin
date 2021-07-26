export function dateFilter(time) {
  if (!time) {
    return ''
  } else {
    const date = new Date(time)
    const dateNumFun = (num) => num < 10 ? `0${num}` : num
    const [Y, M, D, h, m, s] = [
      date.getFullYear(),
      dateNumFun(date.getMonth() + 1),
      dateNumFun(date.getDate()),
      dateNumFun(date.getHours()),
      dateNumFun(date.getMinutes()),
      dateNumFun(date.getSeconds())
    ]
    const diff = (date - Date.now()) / 1000
    if (diff < 60) {
      return '马上'
    }

    if (diff < 3600) {
      return '一小时内'
    }
    if (diff < 86400) {
      return `${h}:${m}:${s}`
    } else {
      return `${Y}-${M}-${D}`
    }
  }
}

export default { dateFilter }
