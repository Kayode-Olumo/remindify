import fs from 'fs'
import path from 'path'
import { Reminder } from '@/types/reminder'

const DATA_FILE = path.join(process.cwd(), 'data', 'reminders.json')

export function getReminders(): Reminder[] {
  if (!fs.existsSync(DATA_FILE)) {
    return []
  }
  const data = fs.readFileSync(DATA_FILE, 'utf8')
  return JSON.parse(data)
}

export function saveReminders(reminders: Reminder[]): void {
  const dirPath = path.dirname(DATA_FILE)
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true })
  }
  fs.writeFileSync(DATA_FILE, JSON.stringify(reminders, null, 2))
}