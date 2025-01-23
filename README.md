# E-Commerce Application

A responsive, full-stack e-commerce platform built with modern web technologies, designed to provide a seamless shopping experience.  

## Features

- **Product Management**: Search, filter, and sort products with ease.
- **User Reviews**: Users can add ratings and reviews for products.
- **Authentication**: OAuth integration for secure user authentication.
- **Shopping Cart**: Add, remove, and manage products in the cart.
- **Payments**: Integrated with Stripe for secure and efficient payment processing.
- **Database**: PostgreSQL database with Drizzle ORM for queries and migrations.
- **Modern UI**: Built using Radix UI and styled with TailwindCSS for a clean and accessible design.

---

## Tech Stack

- **Frontend**: [Next.js](https://nextjs.org/), [React](https://reactjs.org/), [TypeScript](https://www.typescriptlang.org/)
- **Backend**: Next.js API routes, [PostgreSQL](https://www.postgresql.org/), [Drizzle ORM](https://github.com/drizzle-team/drizzle-orm)
- **Authentication**: OAuth via [NextAuth.js](https://next-auth.js.org/)
- **Payments**: [Stripe](https://stripe.com/)
- **Styling**: [TailwindCSS](https://tailwindcss.com/), [ShadCN](https://ui.shadcn.com/)
- **Other**: Zod for schema validation, React Hook Form for form management

---

## Setup Instructions

### Prerequisites

Ensure you have the following:

- Neon Database (PostgreSQL)
- Stripe account for payment configuration
- OAuth credentials from Google and GitHub
- Resend key for email

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/JamieYau/e-commerce.git
   cd e-commerce
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables:
   Create a `.env` file in the root of your project and add the following:
   ```env
    NEON_DATABASE_URL=postgres://postgres:password@localhost:5432/e-commerce
    AUTH_SECRET=oauth_secret
    AUTH_GOOGLE_ID=google_oauth_id
    AUTH_GOOGLE_SECRET=google_oauth_secret
    AUTH_GITHUB_ID=github_oauth_id
    AUTH_GITHUB_SECRET=github_oauth_secret
    AUTH_RESEND_KEY=resend_key
    NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=stripe_publishable_key
    STRIPE_SECRET_KEY=stripe_secret_key
    STRIPE_WEBHOOK_SECRET=stripe_webhook_secret
   ```

4. Run database migrations and seed data:
   ```bash
   npm run db:migrate
   npm run db:seed
   ```

5. Start the development server:
   ```bash
   npm run dev
   ```

---

## Scripts

- `npm run dev`: Start the development server.
- `npm run build`: Build the production-ready application.
- `npm run start`: Start the production server.
- `npm run lint`: Run ESLint for code quality checks.
- `npm run db:generate`: Generate Drizzle ORM schema.
- `npm run db:migrate`: Apply database migrations.
- `npm run db:seed`: Seed the database with initial data.

---

## Folder Structure

```
e-commerce/
├── db/                # Database migration and seed scripts
├── public/            # Static assets
├── app/               # Next.js pages, layouts, and components
├── components/        # Reusable UI components
├── styles/            # TailwindCSS styles
├── types/             # TypeScript types
├── utils/             # Helper functions
├── package.json       # Project dependencies and scripts
└── README.md          # Project documentation
```

---

## Future Improvements

- Add wishlist functionality.
- Implement email notifications for orders.
- Enhance the admin dashboard for better product management.

---

## License

This project is open source and available under the MIT License
