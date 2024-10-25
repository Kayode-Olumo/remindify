import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import ReminderForm from "@/components/ReminderForm/ReminderForm";

describe("ReminderForm", () => {
  const mockOnAddReminder = jest.fn();
  const mockOnCancel = jest.fn();
  const mockCategories = [
    { id: "1", name: "Work", count: 0 },
    { id: "2", name: "Personal", count: 0 },
  ];

  it("renders the form fields", () => {
    render(
      <ReminderForm
        onAddReminder={mockOnAddReminder}
        onCancel={mockOnCancel}
        categories={mockCategories}
      />
    );

    expect(screen.getByLabelText(/title/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/description/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/date/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/time/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/category/i)).toBeInTheDocument();
  });

  it("calls onAddReminder when form is submitted with valid data", async () => {
    render(
      <ReminderForm
        onAddReminder={mockOnAddReminder}
        onCancel={mockOnCancel}
        categories={mockCategories}
      />
    );

    await userEvent.type(screen.getByLabelText(/title/i), "Test Reminder");
    await userEvent.type(
      screen.getByLabelText(/description/i),
      "This is a test"
    );
    await userEvent.type(screen.getByLabelText(/date/i), "2023-07-01");
    await userEvent.type(screen.getByLabelText(/time/i), "14:00");
    await userEvent.selectOptions(screen.getByLabelText(/category/i), "Work");

    await userEvent.click(
      screen.getByRole("button", { name: /add reminder/i })
    );

    expect(mockOnAddReminder).toHaveBeenCalledWith({
      title: "Test Reminder",
      description: "This is a test",
      date: "2023-07-01",
      time: "14:00",
      category: "Work",
      isRecurring: false,
      recurringDay: null,
    });
  });

  it("calls onCancel when cancel button is clicked", async () => {
    render(
      <ReminderForm
        onAddReminder={mockOnAddReminder}
        onCancel={mockOnCancel}
        categories={mockCategories}
      />
    );

    await userEvent.click(screen.getByRole("button", { name: /cancel/i }));

    expect(mockOnCancel).toHaveBeenCalled();
  });
});
