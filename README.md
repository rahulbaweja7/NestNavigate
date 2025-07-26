# 🏠 NestNavigate - Home Buying Learning Platform

A comprehensive, interactive learning platform designed to guide first-time homebuyers through the complex process of purchasing their first home. Built with modern web technologies and focused on user engagement through gamification and progress tracking.

## 📋 Project Description

NestNavigate transforms the overwhelming home buying journey into an accessible, step-by-step learning experience. The platform features:

- **Interactive Learning Modules**: Structured lessons covering essential home buying topics
- **Progress Tracking**: Persistent progress storage with localStorage
- **Gamification**: Coin-based reward system for completed lessons
- **Responsive Design**: Optimized for desktop and mobile devices
- **Modern UI/UX**: Clean, intuitive interface with smooth animations

### Key Features

- ✅ **Persistent Progress**: User progress automatically saved and restored
- ✅ **Interactive Lessons**: Engaging content with quizzes and interactive elements
- ✅ **Progress Visualization**: Real-time progress bars and completion tracking
- ✅ **Responsive Navigation**: Seamless lesson navigation with proper state management
- ✅ **Reset Functionality**: Option to reset progress and start fresh

## 🚀 Setup Instructions

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd NestNavigate
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the development server**

   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` to view the application

### Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint for code quality

## 🛠 Technology Stack

### Frontend Framework

- **React 18** - Modern React with hooks and functional components
- **TypeScript** - Type-safe development with enhanced IDE support

### Build Tools

- **Vite** - Fast build tool and development server
- **ESLint** - Code linting and quality enforcement

### Styling

- **CSS3** - Custom CSS with modern features (Grid, Flexbox, CSS Variables)
- **Responsive Design** - Mobile-first approach with breakpoints

### State Management

- **React Hooks** - useState, useEffect for local state management
- **localStorage** - Browser-based persistent storage
- **Custom Hooks** - Reusable logic (useLocalStorage)

### Routing

- **React Router v6** - Client-side routing with nested routes

## 🎯 Design Decisions & Architecture

### 1. **Component Structure**

- **Modular Design**: Each feature is a separate, reusable component
- **Single Responsibility**: Components have focused, specific purposes
- **Props Interface**: TypeScript interfaces for all component props

### 2. **State Management Strategy**

- **Local State**: Component-level state for UI interactions
- **Persistent Storage**: localStorage for user progress and preferences
- **Custom Hooks**: Encapsulated logic for reusability (useLocalStorage)

### 3. **User Experience Decisions**

- **Progressive Disclosure**: Information revealed gradually through lessons
- **Visual Feedback**: Immediate feedback for user actions
- **Gamification**: Coin system to encourage completion
- **Responsive Design**: Works seamlessly across all device sizes

### 4. **Performance Considerations**

- **Lazy Loading**: Components loaded as needed
- **Optimized Assets**: Efficient image and resource loading
- **Minimal Dependencies**: Only essential packages included

### 5. **Data Persistence**

- **localStorage Strategy**: Browser-based storage for offline capability
- **Error Handling**: Graceful fallbacks if storage is unavailable
- **Data Validation**: Type-safe data handling with TypeScript

## ⏱ Time Spent on Project

**Total Development Time**: ~8 hours
