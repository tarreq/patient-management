# Patient Management System

A modern React-based patient management application built with TypeScript, Vite, and Material-UI. This application provides a comprehensive solution for managing patient records, appointments, and healthcare data.

## 🚀 Quick Start

### Prerequisites

Before you begin, ensure you have the following installed on your machine:

- [Node.js](https://nodejs.org/) (version 18 or higher)
- [Yarn](https://yarnpkg.com/) (recommended) or [npm](https://www.npmjs.com/)
- [Git](https://git-scm.com/)

### Clone the Repository

1. **Clone the repository to your local machine:**

   ```bash
   git clone https://github.com/tarreq/patient-management.git
   ```

2. **Navigate to the project directory:**

   ```bash
   cd patient-management
   ```

3. **Install dependencies:**

   ```bash
   yarn install
   # or if using npm:
   # npm install
   ```

4. **Start the development server:**

   ```bash
   yarn start
   # or if using npm:
   # npm start
   ```

5. **Open your browser and navigate to:**
   ```
   http://localhost:5173
   ```

## 🛠️ Available Scripts

- **`yarn start`** - Start the development server
- **`yarn build`** - Build the application for production
- **`yarn preview`** - Preview the production build locally
- **`yarn lint`** - Run ESLint to check code quality
- **`yarn lint:fix`** - Automatically fix ESLint issues

## 🏗️ Project Structure

```
patient-management/
├── public/                 # Static assets
├── src/
│   ├── assets/            # Images and SVG files
│   ├── core/              # Core application components
│   │   ├── components/    # Reusable UI components
│   │   ├── hooks/         # Custom React hooks
│   │   ├── providers/     # Context providers
│   │   ├── router/        # Routing configuration
│   │   └── theme/         # Material-UI theme
│   ├── features/          # Feature-based modules
│   │   ├── auth/          # Authentication views
│   │   ├── home/          # Home page views
│   │   └── patients/      # Patient management views
│   └── main.tsx           # Application entry point
├── package.json            # Dependencies and scripts
└── README.md              # This file
```

## 🧰 Tech Stack

- **Frontend Framework:** React 19 with TypeScript
- **Build Tool:** Vite
- **UI Library:** Material-UI (MUI)
- **Backend:** Supabase
- **Form Handling:** Formik + Yup validation
- **Routing:** React Router DOM
- **Styling:** Emotion (CSS-in-JS)
- **Code Quality:** ESLint + Prettier

## 🔧 Development

### Code Quality

This project uses ESLint and Prettier for code quality and formatting:

```bash
# Check for linting issues
yarn lint

# Automatically fix linting issues
yarn lint:fix
```

### TypeScript Configuration

The project includes TypeScript configuration files:

- `tsconfig.json` - Base TypeScript configuration
- `tsconfig.app.json` - Application-specific configuration
- `tsconfig.node.json` - Node.js environment configuration

## 📱 Features

- **Authentication System** - Secure login and registration
- **Patient Management** - Add, edit, and view patient records
- **Responsive Design** - Mobile-friendly interface
- **Modern UI/UX** - Clean and intuitive user interface

## 🚀 Deployment

### Building for Production

```bash
yarn build
```

The built files will be available in the `dist/` directory.

### Preview Production Build

```bash
yarn preview
```

This will serve the production build locally for testing.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
