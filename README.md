# To-Do List Application v1

A modern, feature-rich task management application built with React. This application allows users to create, manage, and organize their tasks with priorities, categories, and archives.

## 📋 Project Overview

**To-Do List v1** is a full-stack web application designed to help users efficiently organize and manage their daily tasks. It provides a user-friendly interface for creating, editing, deleting, and tracking tasks with various features to enhance productivity.

### Key Features

- **User Authentication**: Secure login and registration with JWT token-based authentication
- **Task Management**: 
  - Create new tasks with title, description, due date, category, and priority level
  - Edit existing tasks
  - Delete tasks
  - Mark tasks as completed
  - Archive completed tasks
- **Task Categorization**: Organize tasks by custom categories
- **Priority Levels**: Set priority levels (HIGH, MEDIUM, LOW) for tasks
- **Task Archiving**: Archive completed tasks to keep the main list clean
- **Task Reports**: View comprehensive reports about your tasks
- **Multi-language Support**: Built with i18n support for internationalization
- **Responsive Design**: Mobile-friendly interface with Bootstrap styling
- **Google reCAPTCHA**: Security layer for login with CAPTCHA verification

## 🏗️ Technology Stack

### Frontend
- **React 18.3.1** - JavaScript library for building user interfaces
- **React Router DOM 6.28.1** - Client-side routing
- **Bootstrap 5.3.3** - CSS framework for responsive design
- **Material-UI (MUI) 5.16.13** - Component library for modern UI
- **Emotion** - CSS-in-JS library for styled components
- **Axios 1.7.9** - HTTP client for API requests
- **i18next 24.2.1** - Internationalization framework
- **React Google reCAPTCHA 3.1.0** - CAPTCHA integration for security

### Languages
- **JavaScript** - 75% of codebase
- **CSS** - 18.7% of codebase
- **HTML** - 6.3% of codebase

## 📁 Project Structure

```
to-do-list-v1/
├── public/                 # Static assets
│   ├── index.html         # Main HTML file
│   ├── locales/           # Translation files for i18n
│   └── ...                # Icons and assets
├── src/                   # Source code
│   ├── api/
│   │   └── axiosConfig.js # Axios configuration with JWT interceptor
│   ├── components/
│   │   └── Navbar.js      # Navigation component
│   ├── pages/
│   │   ├── login.js       # Login page with reCAPTCHA
│   │   ├── register.js    # User registration page
│   │   ├── TaskReport.js  # Task reports page
│   │   └── Authorized/
│   │       └── main.js    # Main task management page
│   ├── App.js             # Main app component with routing
│   ├── App.css            # Application styling
│   ├── index.js           # React entry point
│   ├── index.css          # Global styles
│   ├── i18n.js            # i18n configuration
│   └── ThemeProvider.jsx  # Theme configuration
├── package.json           # Project dependencies and scripts
└── README.md              # This file
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- Backend API running on `http://localhost:8080`

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Tendrun/to-do-list-v1.git
   cd to-do-list-v1
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```
   The application will open at `http://localhost:3000`

## 📖 Usage

### Authentication Flow
1. **Register**: Create a new account by filling in the registration form
2. **Login**: Sign in with your email and password (includes reCAPTCHA verification)
3. **Main Dashboard**: Access the task management interface after successful login

### Task Management
- **Add Task**: Fill in the task form with title, description, category, due date, and priority
- **Edit Task**: Click on a task to edit its details
- **Mark as Done**: Mark completed tasks
- **Archive Task**: Move finished tasks to archives
- **Delete Task**: Remove unwanted tasks
- **View Reports**: Check task statistics and reports

## 🔌 API Integration

The application connects to a backend API at `http://localhost:8080` with the following endpoints:

### Authentication
- `POST /api/v1/auth/authenticate` - Login
- `POST /api/v1/auth/logout` - Logout

### Tasks
- `GET /api/v1/GetTasks` - Fetch all active tasks
- `GET /api/v1/GetArchivedTasks` - Fetch archived tasks
- `POST /api/v1/AddTask` - Create a new task
- `PUT /api/v1/EditTask/{id}` - Update a task
- `DELETE /api/v1/DeleteTask/{id}` - Delete a task
- `POST /api/v1/MarkTaskAsDone/{id}` - Mark task as completed
- `POST /api/v1/ArchiveTask/{id}` - Archive a task

### Authentication
The application uses JWT tokens stored in `localStorage` for authentication. The Axios interceptor automatically includes the token in request headers.

## 🌍 Internationalization (i18n)

The application supports multiple languages through i18n. Translation files are stored in `public/locales/`. The language is automatically detected based on browser settings.

## 🔐 Security Features

- **JWT Authentication**: Secure token-based authentication
- **Google reCAPTCHA**: CAPTCHA verification on login
- **Token Storage**: Secure storage of JWT tokens in localStorage
- **CORS Support**: Configured for cross-origin requests

## 🛠️ Available Scripts

- `npm start` - Run the development server
- `npm build` - Build for production
- `npm test` - Run tests
- `npm eject` - Eject from Create React App (irreversible)

## 📦 Dependencies

Key dependencies include:
- React and React DOM for UI
- React Router for navigation
- Bootstrap and Material-UI for styling
- Axios for API calls
- i18next for internationalization
- React Google reCAPTCHA for security

## 🎨 Styling

The application uses a combination of:
- **Bootstrap 5** for responsive grid and components
- **Material-UI** for polished UI components
- **Emotion** for CSS-in-JS styling
- **Custom CSS** for application-specific styles

## 📝 Notes

- This is a v1 release of the application
- The backend API must be running on localhost:8080
- Ensure proper CORS configuration on the backend
- Update reCAPTCHA sitekey in login.js with your own

## 🤝 Contributing

Contributions are welcome! Please feel free to submit issues and pull requests.

## 📄 License

This project is open source and available under an open license.

## 📧 Contact

For questions or support, please contact the project owner: [Tendrun](https://github.com/Tendrun)

---

**Last Updated**: January 2025
**Version**: 1.0.0
