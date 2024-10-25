"use client";

import { useState, useEffect } from "react";
import { Bell, Grid, Search, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import ReminderAlarm from "@/components/ReminderAlarm/ReminderAlarm";
import dynamic from "next/dynamic";
import { Reminder, Category } from "@/types/reminder";

const ReminderForm = dynamic(
  () => import("@/components/ReminderForm/ReminderForm"),
  { ssr: false }
);

export default function ReminderPage() {
  const [reminders, setReminders] = useState<Reminder[]>([]);
  const [categories, setCategories] = useState<Category[]>([
    { id: "1", name: "Work", count: 0 },
    { id: "2", name: "Personal", count: 0 },
    { id: "3", name: "Health", count: 0 },
    { id: "4", name: "Finance", count: 0 },
    { id: "5", name: "Social", count: 0 },
  ]);
  const [activeView, setActiveView] = useState<"list" | "form" | "detail">(
    "list"
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    loadReminders();
  }, []);

  useEffect(() => {
    if (isClient && reminders.length > 0) {
      localStorage.setItem("reminders", JSON.stringify(reminders));
    }
  }, [reminders, isClient]);

  const loadReminders = () => {
    const storedReminders = localStorage.getItem("reminders");
    if (storedReminders) {
      const parsedReminders = JSON.parse(storedReminders);
      setReminders(parsedReminders);
      updateCategoryCounts(parsedReminders);
    } else {
      fetchReminders();
    }
  };

  const fetchReminders = async () => {
    try {
      const response = await fetch("/api/reminders");
      const data = await response.json();
      setReminders(data);
      updateCategoryCounts(data);
    } catch (error) {
      console.error("Error fetching reminders:", error);
    }
  };

  const updateCategoryCounts = (reminders: Reminder[]) => {
    setCategories((prevCategories) =>
      prevCategories.map((category) => ({
        ...category,
        count: reminders.filter(
          (reminder) => reminder.category === category.name
        ).length,
      }))
    );
  };

  const addReminder = async (
    reminder: Omit<Reminder, "id" | "isPinned" | "color">
  ) => {
    try {
      const newReminder = {
        ...reminder,
        id: Date.now().toString(),
        isPinned: false,
        color: `bg-${
          ["blue", "green", "red", "yellow", "purple"][
            Math.floor(Math.random() * 5)
          ]
        }-200`,
      };
      const response = await fetch("/api/reminders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newReminder),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const savedReminder = await response.json();
      setReminders((prevReminders) => [...prevReminders, savedReminder]);
      updateCategoryCounts([...reminders, savedReminder]);
      setActiveView("list");
    } catch (error) {
      console.error("Error adding reminder:", error);
    }
  };

  const filteredReminders = reminders.filter(
    (reminder) =>
      reminder.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      reminder.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (!isClient) {
    return null;
  }

  return (
    <div className="min-h-screen bg-slate-900 p-4 md:p-8">
      <ReminderAlarm reminders={reminders} />
      <div className="max-w-6xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden">
        <div className="flex flex-col md:flex-row">
          <Sidebar
            categories={categories}
            onCreateReminder={() => setActiveView("form")}
          />
          <MainContent
            activeView={activeView}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            filteredReminders={filteredReminders}
            onAddReminder={addReminder}
            onCancel={() => setActiveView("list")}
            categories={categories}
          />
        </div>
      </div>
    </div>
  );
}

const Sidebar = ({
  categories,
  onCreateReminder,
}: {
  categories: Category[];
  onCreateReminder: () => void;
}) => (
  <div className="w-full md:w-1/5 bg-gray-50 p-6 border-r">
    <h1 className="text-2xl font-bold mb-8">Remindify</h1>
    <div className="space-y-2">
      {categories.map((category: Category) => (
        <div
          key={category.id}
          className="flex justify-between items-center p-2 hover:bg-gray-100 rounded-lg cursor-pointer"
        >
          <span>{category.name}</span>
          <span className="bg-gray-200 px-2 py-1 rounded-full text-sm">
            {category.count}
          </span>
        </div>
      ))}
    </div>
    <Button
      className="mt-4 w-full bg-black text-white"
      onClick={onCreateReminder}
    >
      + Create Reminder
    </Button>
  </div>
);

const MainContent = ({
  activeView,
  searchQuery,
  setSearchQuery,
  filteredReminders,
  onAddReminder,
  onCancel,
  categories,
}: {
  activeView: "list" | "form" | "detail";
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  filteredReminders: Reminder[];
  onAddReminder: (
    reminder: Omit<Reminder, "id" | "isPinned" | "color">
  ) => Promise<void>;
  onCancel: () => void;
  categories: Category[];
}) => (
  <div className="w-full md:w-4/5 p-8">
    {activeView === "list" ? (
      <ListView
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        filteredReminders={filteredReminders}
        onCreateReminder={() => onCancel()}
      />
    ) : (
      <ReminderForm
        onAddReminder={onAddReminder}
        onCancel={onCancel}
        categories={categories}
      />
    )}
  </div>
);

const ListView = ({
  searchQuery,
  setSearchQuery,
  filteredReminders,
  onCreateReminder,
}: {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  filteredReminders: Reminder[];
  onCreateReminder: () => void;
}) => (
  <>
    <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
    <ReminderList reminders={filteredReminders} />
    <Button
      className="fixed bottom-8 right-8 w-14 h-14 rounded-full shadow-lg border-2 border-white"
      onClick={onCreateReminder}
    >
      <Plus size={24} />
    </Button>
  </>
);

const SearchBar = ({
  searchQuery,
  setSearchQuery,
}: {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}) => (
  <div className="flex flex-col md:flex-row justify-between items-center mb-6">
    <div className="relative w-full md:w-64 mb-4 md:mb-0">
      <Input
        type="text"
        placeholder="Search your reminders"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="pl-10 pr-4 py-2 w-full"
      />
      <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
    </div>
    <div className="flex space-x-4">
      <Button variant="outline" size="icon">
        <Bell size={20} />
      </Button>
      <Button variant="outline" size="icon">
        <Grid size={20} />
      </Button>
    </div>
  </div>
);

const ReminderList = ({ reminders }: { reminders: Reminder[] }) => (
  <>
    <ReminderSection
      title="Pinned"
      reminders={reminders.filter((r) => r.isPinned)}
    />
    <ReminderSection
      title="Upcoming"
      reminders={reminders.filter((r) => !r.isPinned)}
    />
  </>
);

const ReminderSection = ({
  title,
  reminders,
}: {
  title: string;
  reminders: Reminder[];
}) => (
  <>
    <h2 className="text-xl font-semibold mb-4">{title}</h2>
    <div
      className={`grid grid-cols-1 ${
        title === "Pinned" ? "md:grid-cols-2" : "md:grid-cols-3"
      } gap-4 mb-8`}
    >
      {reminders.map((reminder: Reminder) => (
        <ReminderCard key={reminder.id} reminder={reminder} />
      ))}
    </div>
  </>
);

const ReminderCard = ({ reminder }: { reminder: Reminder }) => (
  <Card className={`${reminder.color} cursor-pointer`}>
    <CardHeader>
      <CardTitle>{reminder.title}</CardTitle>
      <CardDescription>{reminder.description}</CardDescription>
    </CardHeader>
    <CardContent>
      <p className="text-xs bg-white bg-opacity-30 inline-block px-2 py-1 rounded-full">
        {reminder.date}, {reminder.time}
        {reminder.isRecurring && ` (Recurring: ${reminder.recurringDay})`}
      </p>
    </CardContent>
  </Card>
);
