import { NextResponse } from 'next/server'
import { v4 as uuidv4 } from 'uuid'
import { Reminder } from '@/types/reminder'
import { getReminders, saveReminders } from '@/lib/storage'

export async function GET() {
  const reminders = getReminders()
  return NextResponse.json(reminders)
}

export async function POST(request: Request) {
  const body = await request.json()
  const newReminder: Reminder = {
    id: uuidv4(),
    ...body
  }
  const reminders = getReminders()
  reminders.push(newReminder)
  saveReminders(reminders)
  return NextResponse.json(newReminder, { status: 201 })
}