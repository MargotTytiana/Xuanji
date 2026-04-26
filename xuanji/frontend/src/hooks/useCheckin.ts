'use client'
import { useEffect, useState } from 'react'

const STORAGE_KEY = 'xuanji-checkin'

interface CheckinState {
  checkedIn: boolean
  streak: number       // consecutive days
  lastDate: string | null
}

export function useCheckin() {
  const [state, setState] = useState<CheckinState>({
    checkedIn: false,
    streak: 0,
    lastDate: null,
  })
  const [toast, setToast] = useState('')

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (!stored) return

    const parsed: CheckinState = JSON.parse(stored)
    const today = todayStr()

    // Reset checkedIn flag if it's a new day
    if (parsed.lastDate !== today) {
      setState({ ...parsed, checkedIn: false })
    } else {
      setState(parsed)
    }
  }, [])

  function handleCheckin() {
    const today = todayStr()

    if (state.checkedIn) {
      showToast('今日已签到 ✓\nAlready checked in today')
      return
    }

    const yesterday = offsetDay(-1)
    const newStreak = state.lastDate === yesterday ? state.streak + 1 : 1

    const next: CheckinState = { checkedIn: true, streak: newStreak, lastDate: today }
    setState(next)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next))

    showToast(`✦ 签到成功！连续 ${newStreak} 天\n今日运势正在开启…`)
  }

  function showToast(msg: string) {
    setToast(msg)
    setTimeout(() => setToast(''), 3000)
  }

  return { ...state, handleCheckin, toast }
}

function todayStr() {
  return new Date().toISOString().slice(0, 10)
}

function offsetDay(offset: number) {
  const d = new Date()
  d.setDate(d.getDate() + offset)
  return d.toISOString().slice(0, 10)
}