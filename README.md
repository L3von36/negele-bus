# Negele Easy Ride - Bus Booking System

A modern Ethiopian bus booking platform built with Vue 3, Vite, and Tailwind CSS v4. This application provides a seamless experience for passengers to book bus tickets, track trips, and manage reservations.

## 🚀 Features

### Passenger Features
- **Quick Booking**: Search and book bus tickets without creating an account
- **Route Selection**: Browse popular routes between cities in Ethiopia
- **Seat Selection**: Interactive seat map with VIP and regular options
- **QR Code Tickets**: Digital tickets with QR codes for easy boarding
- **Ethiopian Calendar Support**: Date selection using the Ethiopian calendar system
- **Mobile Responsive**: Optimized for mobile devices with PWA capabilities

### Admin Dashboard
- **Analytics Overview**: Real-time statistics on bookings, revenue, and occupancy
- **Trip Management**: Create, edit, and cancel bus trips
- **Bus Fleet Management**: Manage buses, seating configurations, and VIP sections
- **Driver Assignment**: Assign drivers to trips and track their schedules
- **Booking Management**: View and manage all passenger bookings

### Driver Dashboard
- **Trip Schedule**: View assigned trips and departure times
- **Passenger Manifest**: Access passenger lists with QR code scanning
- **QR Scanner**: Built-in scanner to validate passenger tickets
- **Trip Status Updates**: Mark trips as departed, arrived, or in progress

## 🛠️ Tech Stack

- **Frontend Framework**: [Vue 3](https://vuejs.org/) with Composition API
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **State Management**: Pinia (Vue's official state management)
- **Routing**: Vue Router
- **Backend**: Supabase (Database, Authentication, Real-time)
- **PWA**: Workbox for offline support
- **Icons**: Custom SVG icons
- **Analytics**: Plausible Analytics integration

## 📦 Project Structure

```
src/
├── assets/          # Static assets (images, fonts)
├── components/      # Reusable Vue components
│   ├── BusCard.vue
│   ├── Header.vue
│   ├── Hero.vue
│   ├── SearchCard.vue
│   └── PopularRoutes.vue
├── lib/             # Utility functions and helpers
├── router/          # Vue Router configuration
├── views/           # Page components
│   ├── HomeView.vue
│   ├── BookingView.vue
│   ├── AdminDashboard.vue
│   └── DriverDashboard.vue
├── App.vue          # Root component
├── main.js          # Application entry point
└── store.js         # Pinia store configuration
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Supabase account (for backend services)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd negele-easy-ride
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables:
Create a `.env` file in the root directory:
```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_PLAUSIBLE_DOMAIN=your_domain
```

4. Start the development server:
```bash
npm run dev
```

5. Build for production:
```bash
npm run build
```

6. Preview production build:
```bash
npm run preview
```

## 📱 PWA Features

This application is a Progressive Web App with:
- Offline support for cached pages
- Add to home screen functionality
- Push notifications (optional)
- Fast loading with service workers

## 🌍 Localization

The application supports:
- English
- Amharic (አማርኛ)
- Oromo (Afaan Oromoo)

Date formats follow the Ethiopian calendar system.

## 📊 Database Schema

The Supabase database includes tables for:
- `buses`: Bus information and seating configuration
- `trips`: Scheduled trips with routes and times
- `bookings`: Passenger reservations
- `passengers`: Passenger information
- `drivers`: Driver profiles
- `routes`: Available routes between cities

## 🔧 Development

### Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |
| `npm test` | Run tests (when configured) |

### Code Style

This project uses ESLint with Vue 3 recommended rules. Please ensure your code follows the style guide before submitting PRs.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👥 Team

Built by the Negele Borena Transport Authority digital team.

## 📞 Support

For support, email support@negeleborana.et or join our Slack channel.
