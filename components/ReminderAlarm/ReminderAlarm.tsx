import { useEffect } from "react";
import { Reminder } from "@/types/reminder";

interface ReminderAlarmProps {
  reminders: Reminder[];
}

export default function ReminderAlarm({ reminders }: ReminderAlarmProps) {
  useEffect(() => {
    const checkReminders = () => {
      const now = new Date();
      reminders.forEach((reminder) => {
        const reminderDate = new Date(`${reminder.date}T${reminder.time}`);
        if (
          now.getFullYear() === reminderDate.getFullYear() &&
          now.getMonth() === reminderDate.getMonth() &&
          now.getDate() === reminderDate.getDate() &&
          now.getHours() === reminderDate.getHours() &&
          now.getMinutes() === reminderDate.getMinutes()
        ) {
          alert(`Reminder 📣: ${reminder.title}`);
          // You can replace alert with a sound or other notification
        }
      });
    };

    const intervalId = setInterval(checkReminders, 60000); // Check every minute

    return () => clearInterval(intervalId); // Cleanup on unmount
  }, [reminders]);

  return null; // This component does not render anything
}
