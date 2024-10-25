# Remindify

Remindify is a simple reminder application built with React. It allows users to create, view, and manage reminders with various categories and recurring options.

## Features

- Create reminders with title, description, date, time, and category
- Set recurring reminders
- View reminders in a list, separated by pinned and upcoming
- Search reminders
- Categorize reminders
- Receive notifications when a reminder is due

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm (v6 or later)

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/remindify.git
   cd remindify
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the development server:
   ```
   npm start
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to view the app.

## Usage

1. Click the "+" button to add a new reminder.
2. Fill in the reminder details in the form.
3. View your reminders on the main page.
4. Use the search bar to find specific reminders.
5. Click on a reminder to view its details.

## API Server

The app uses a simple Express.js server to handle API requests. To start the server:

1. Navigate to the server directory:
   ```
   cd server
   ```

2. Install server dependencies:
   ```
   npm install
   ```

3. Start the server:
   ```
   npm start
   ```

The server will run on [http://localhost:3001](http://localhost:3001).

## Future Enhancements

Here are some potential improvements that could be made to the Remindify app:

```
// TODO: Implement user authentication and personalized reminder lists
// TODO: Add the ability to edit existing reminders
// TODO: Implement reminder sharing functionality between users
// TODO: Create a mobile app version using React Native
// TODO: Integrate with calendar applications (Google Calendar, Apple Calendar, etc.)
// TODO: Add support for attaching files or images to reminders
// TODO: Implement a more robust notification system with multiple reminder options (email, SMS, push notifications)
// TODO: Create a dashboard with analytics on reminder completion rates and category usage
// TODO: Add natural language processing for quick reminder creation (e.g., "Remind me to call mom tomorrow at 5 PM")
// TODO: Implement tags for more flexible organization of reminders
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
