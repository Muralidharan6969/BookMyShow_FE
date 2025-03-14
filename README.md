# ShowGo - Movie Ticket Booking Platform

## 📋 Overview

ShowGo is a comprehensive movie ticket booking platform inspired by BookMyShow, allowing users to browse movies, select theaters, book seats, and make payments. The platform features a robust backend with role-based access control and a streamlined frontend interface for end users.

[Live Application](https://showgo.muralidharan.me/) | [Backend Repository](https://github.com/Muralidharan6969/BookMyShow_BE)

## ⚙️ Architecture

ShowGo implements a modern client-server architecture:

- **Frontend**: React.js application with responsive design
- **Backend**: Java SpringBoot RESTful API with comprehensive security features
- **Payment Processing**: Stripe integration for secure transactions

## 👥 User Roles

The platform supports three distinct user types:

1. **User**: End customers who browse and book movie tickets
2. **Outlet**: Theater managers who can add venues, screens, and schedule shows
3. **Admin**: System administrators who approve outlets and manage platform data

> **Note**: Currently, the frontend UI is implemented only for Users. Admin and Outlet interfaces are fully supported in the backend API.

## 🔒 Backend Features

### Authentication & Security

- JWT token-based authentication system
- Role-Based Access Control (RBAC) with custom filters
- Proper CORS configuration to prevent cross-origin attacks
- Secure API endpoint protection based on user roles

### Booking System

- Sophisticated seat reservation system
- Race condition handling using database locks via Hibernate and Spring Boot
- Prevents double booking by synchronizing concurrent reservation attempts

### Integration & Management

- Stripe payment gateway integration (Test Mode)
- Admin management for cities and movies
- Outlet management for theaters (subject to admin approval)
- Screen and show management for approved theaters

## 🖥️ Frontend Features (User Interface)

### User Experience

- Intuitive and responsive movie browsing experience
- BookMyShow-inspired seat selection interface
- User profile management system
- Comprehensive booking history tracking

### Location & Theater Support

- Multi-city support with dedicated pages
- Multiple theater options for each city
- Detailed movie information and showtimes

### Payment Processing

- Seamless Stripe integration for payment processing
- Secure checkout experience

## ⚠️ Important Notes

1. **Stripe Test Mode**: The application uses Stripe in TEST MODE. [Learn about test cards](https://docs.stripe.com/testing?testing-method=card-numbers) that can be used for simulated payments.

2. **Security Notice**: While the site has SSL certificates from authorized issuers, data is not encrypted at rest. Please use dummy credentials when testing the application.

3. **Development Status**: The platform is continuously being improved. Your suggestions and feedback are welcome.

## 🚀 Getting Started

### Prerequisites

- Node.js and npm
- Java 11+
- Maven
- MySQL/PostgreSQL (database)

### Installation

1. Clone the frontend repository:

```bash
git clone https://github.com/Muralidharan6969/BookMyShow_FE.git
cd BookMyShow_FE
```

2. Install dependencies:

```bash
npm install
```

3. Configure environment variables:

```
VITE_BOOKMYSHOW_API_URL=your_backend_url
VITE_STRIPE_TEST_PUBLIC_KEY=your_stripe_test_key
```

4. Start the application:

```bash
npm run dev
```

## 🔧 Technical Implementation Highlights

### Backend

- SpringBoot REST API with JPA/Hibernate
- Transaction management for critical operations
- Comprehensive exception handling
- Database optimization for performance

### Frontend

- React with Redux for state management
- Responsive design with CSS/SCSS
- Efficient API integration with Axios
- Modern UI/UX principles

## 📝 Future Improvements

- Admin and Outlet user interfaces
- Performance optimizations
- Additional security enhancements

## 🤝 Contributions

Contributions, issues, and feature requests are welcome. Feel free to check the issues page if you want to contribute.

---

Developed with ❤️ by Muthiah Muralidharan
