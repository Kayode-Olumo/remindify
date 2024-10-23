import { useState } from "react";
import { Reminder } from "@/types/reminder";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Calendar as CalendarIcon,
  Clock,
  ChevronLeft,
  Tag,
  RepeatIcon,
} from "lucide-react";
import { Calendar } from "@/components/ui/calendar";

interface ReminderDetailProps {
  reminder: Reminder;
  onBack: () => void;
}

export default function ReminderDetail({
  reminder,
  onBack,
}: ReminderDetailProps) {
  const [date, setDate] = useState<Date | undefined>(new Date(reminder.date));

  return (
    <Card className={`${reminder.color} w-full h-full mx-auto overflow-hidden`}>
      <CardHeader className="pb-2">
        <Button variant="ghost" className="mb-2 p-0 h-auto" onClick={onBack}>
          <ChevronLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        <CardTitle className="text-xl font-bold">{reminder.title}</CardTitle>
      </CardHeader>
      <CardContent className="pb-2 space-y-4">
        <p className="text-sm">{reminder.description}</p>
        <div className="flex flex-col space-y-2">
          <div className="flex items-center">
            <CalendarIcon className="mr-2 h-4 w-4" />
            <span className="text-sm">{reminder.date}</span>
          </div>
          <div className="flex items-center">
            <Clock className="mr-2 h-4 w-4" />
            <span className="text-sm">{reminder.time}</span>
          </div>
          <div className="flex items-center">
            <Tag className="mr-2 h-4 w-4" />
            <span className="text-sm">{reminder.category}</span>
          </div>
          <div className="flex items-center">
            <RepeatIcon className="mr-2 h-4 w-4" />
            <span className="text-sm">
              {reminder.isRecurring
                ? `Recurring every ${reminder.recurringDay}`
                : "Not recurring"}
            </span>
          </div>
        </div>
        <div className="flex justify-center">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="rounded-md border shadow"
          />
        </div>
      </CardContent>
      <CardFooter className="flex justify-between pt-4">
        <Button variant="destructive" size="sm">
          Delete
        </Button>
        <Button size="sm">Edit</Button>
      </CardFooter>
    </Card>
  );
}
