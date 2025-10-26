# Next.js 16 Full Stack Project

A modern full-stack Next.js 16 application with TypeScript, Tailwind CSS, Prisma, and more.

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript (Strict Mode)
- **Styling:** Tailwind CSS v4 with dark mode support
- **Database:** Prisma with MongoDB
- **UI Components:** Lucide React icons, class-variance-authority
- **Validation:** Zod
- **Email:** @react-email/components
- **Theme:** next-themes for dark mode
- **Code Quality:** ESLint, Prettier, Husky, lint-staged

## Getting Started

### Prerequisites

- Node.js 18.17 or later
- npm, yarn, pnpm, or bun
- MongoDB database (local or cloud instance)

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd <project-directory>
```

2. Install dependencies:

```bash
npm install
```

3. Set up environment variables:

Copy the `.env.local.example` file to `.env` and update with your actual values:

```bash
cp .env.local.example .env
```

Required environment variables:

- `DATABASE_URL`: MongoDB connection string
  - Format: `mongodb+srv://username:password@cluster.mongodb.net/database?retryWrites=true&w=majority`
  - Get your connection string from MongoDB Atlas or your MongoDB instance

### Database Setup

1. Configure your MongoDB connection string in the `.env` file

2. Generate Prisma Client:

```bash
npx prisma generate
```

3. Push your schema to the database (for development):

```bash
npx prisma db push
```

For production, use migrations:

```bash
npx prisma migrate dev --name init
```

### Development

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Run ESLint with auto-fix
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check code formatting
- `npm run type-check` - Run TypeScript type checking

## Project Structure

```
├── prisma/
│   └── schema.prisma       # Database schema
├── public/                 # Static assets
├── src/
│   ├── app/                # Next.js App Router pages
│   │   ├── globals.css     # Global styles with Tailwind
│   │   ├── layout.tsx      # Root layout
│   │   └── page.tsx        # Home page
│   └── lib/
│       └── utils.ts        # Utility functions (cn helper)
├── .env                    # Environment variables (not in git)
├── .env.local.example      # Environment variables template
├── .prettierrc.json        # Prettier configuration
├── eslint.config.mjs       # ESLint configuration
├── next.config.ts          # Next.js configuration
├── postcss.config.mjs      # PostCSS configuration
├── tailwind.config.ts      # Tailwind CSS configuration
└── tsconfig.json           # TypeScript configuration
```

## Features

### TypeScript

- Strict mode enabled
- Path aliases configured (`@/*` for `src/*`)
- Full type safety across the project

### Tailwind CSS

- Tailwind CSS v4 with PostCSS
- Dark mode using class strategy
- CSS reset included
- Utility classes for consistent styling

### Code Quality

- ESLint with Next.js, TypeScript, and Prettier configurations
- Prettier with Tailwind CSS plugin for class sorting
- Husky for git hooks
- lint-staged for pre-commit checks

### Database

- Prisma ORM with MongoDB
- Type-safe database access
- Schema-first development

### Dark Mode

Dark mode is configured with class strategy. To implement it in your components:

1. Wrap your app with `ThemeProvider` from `next-themes`
2. Toggle dark mode by adding/removing the `dark` class on the `<html>` element

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
# Database
DATABASE_URL="mongodb+srv://username:password@cluster.mongodb.net/database?retryWrites=true&w=majority"

# Add other environment variables as needed
```

See `.env.local.example` for a complete template.

## Contributing

1. Create a feature branch
2. Make your changes
3. Ensure all tests and linting pass
4. Submit a pull request

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)

## License

[Your License Here]
