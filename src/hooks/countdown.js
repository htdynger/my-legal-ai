import { useEffect, useState } from 'react'

const targetDate = new Date()
targetDate.setDate(7)
targetDate.setHours(12, 0, 0, 0)

// если сегодня уже позже 7 числа, переход на след. месяц
if (new Date() > targetDate) {
  targetDate.setMonth(targetDate.getMonth() + 1)
}

export function useCountdown() {
  const [timeLeft, setTimeLeft] = useState(getTimeRemaining())

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(getTimeRemaining())
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  return formatTime(timeLeft)
}

function getTimeRemaining() {
  const now = new Date()
  const diff = targetDate - now

  const totalSeconds = Math.max(0, Math.floor(diff / 1000))

  return {
    days: Math.floor(totalSeconds / 86400),
    hours: Math.floor((totalSeconds % 86400) / 3600),
    minutes: Math.floor((totalSeconds % 3600) / 60),
    seconds: totalSeconds % 60,
  }
}

function formatTime({ days, hours, minutes, seconds }) {
  return `${days}d ${hours}h ${minutes}m ${seconds}s`
}
