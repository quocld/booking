# Heros - Appointment Booking System

A modern, performant appointment booking system built with Next.js 15, TypeScript, and Tailwind CSS.

## 🚀 Features

- **Multi-step Appointment Booking**: Intuitive 3-step booking process
- **Contact Management**: Add and manage customer contacts
- **Vehicle Information**: Comprehensive vehicle details tracking
- **Performance Optimized**: Memoized components and optimized rendering
- **Type Safe**: Full TypeScript coverage
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Real-time Validation**: Form validation with React Hook Form
- **State Management**: Zustand for efficient state management

## 🛠 Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **State Management**: Zustand
- **Forms**: React Hook Form + Zod validation
- **UI Components**: Headless UI
- **Testing**: Jest + React Testing Library + Playwright
- **Code Quality**: ESLint + Prettier + Husky
- **Documentation**: Storybook
- **Containerization**: Docker + Docker Compose

## 📋 Prerequisites

- Node.js 18+ 
- npm 9+ or yarn or pnpm
- Git

## 🚀 Quick Start

### Development

```bash
# Clone the repository
git clone <repository-url>
cd heros

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

### Docker Development

```bash
# Build and run with Docker Compose
docker-compose up --build

# Or build and run individual container
docker build -t heros-app .
docker run -p 3000:3000 heros-app
```

## 📜 Available Scripts

### Development
- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run clean` - Clean build artifacts

### Code Quality
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint issues
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check code formatting
- `npm run type-check` - Run TypeScript type checking

### Testing
- `npm run test` - Run unit tests
- `npm run test:watch` - Run tests in watch mode
- `npm run test:coverage` - Generate test coverage report
- `npm run test:e2e` - Run E2E tests with Playwright
- `npm run test:e2e:ui` - Run E2E tests with UI

### Documentation
- `npm run storybook` - Start Storybook development server
- `npm run build-storybook` - Build Storybook for production

### Analysis
- `npm run analyze` - Analyze bundle size

## 🏗 Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── appointment/        # Appointment booking pages
│   │   ├── step-1/        # Client information step
│   │   ├── step-2/        # Services selection step
│   │   ├── step-3/        # Review & confirmation step
│   │   ├── layout.tsx     # Appointment layout
│   │   └── bookingStore.ts # Zustand store
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # Reusable components
│   ├── SearchableDropdown.tsx
│   ├── SidebarNav.tsx
│   └── TopbarContent.tsx
├── lib/                   # Utility libraries
├── types/                 # TypeScript type definitions
├── utils/                 # Utility functions
├── hooks/                 # Custom React hooks
├── constants/             # Application constants
└── styles/                # Additional styles
```

## 🧪 Testing Strategy

### Unit Tests
- **Framework**: Jest + React Testing Library
- **Coverage**: Minimum 70% coverage required
- **Location**: `__tests__` folders or `.test.tsx` files

### E2E Tests
- **Framework**: Playwright
- **Location**: `tests/e2e/`
- **Browsers**: Chrome, Firefox, Safari, Mobile

### Component Testing
- **Framework**: Storybook
- **Location**: `.stories.tsx` files

## 🔧 Configuration Files

- `next.config.ts` - Next.js configuration
- `tailwind.config.js` - Tailwind CSS configuration
- `tsconfig.json` - TypeScript configuration
- `eslint.config.mjs` - ESLint rules
- `.prettierrc` - Prettier formatting rules
- `jest.config.js` - Jest testing configuration
- `playwright.config.ts` - Playwright E2E testing
- `.storybook/` - Storybook configuration
- `Dockerfile` - Docker containerization
- `docker-compose.yml` - Docker development environment

## 🚀 Deployment

### Vercel (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Docker Production
```bash
# Build production image
docker build -t heros-app .

# Run production container
docker run -p 3000:3000 heros-app
```

## 📊 Performance Optimizations

- **Component Memoization**: React.memo() for all components
- **Callback Optimization**: useCallback for event handlers
- **Memoized Calculations**: useMemo for expensive operations
- **Code Splitting**: Automatic with Next.js
- **Bundle Analysis**: Built-in bundle analyzer
- **Image Optimization**: Next.js Image component
- **Static Generation**: SSG for static pages

## 🔒 Security

- **Security Headers**: X-Frame-Options, X-Content-Type-Options
- **Input Validation**: Zod schema validation
- **Type Safety**: Full TypeScript coverage
- **Dependency Scanning**: Regular security audits

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Workflow
```bash
# Create feature branch
git checkout -b feature/new-feature

# Make changes and commit
git add .
git commit -m "feat: add new feature"

# Push and create PR
git push origin feature/new-feature
```

## 📝 Code Style

- **ESLint**: Strict linting rules
- **Prettier**: Consistent code formatting
- **TypeScript**: Strict type checking
- **Conventional Commits**: Standardized commit messages

## 🐛 Troubleshooting

### Common Issues

1. **Port 3000 already in use**
   ```bash
   # Kill process on port 3000
   lsof -ti:3000 | xargs kill -9
   ```

2. **TypeScript errors**
   ```bash
   # Run type checking
   npm run type-check
   ```

3. **Test failures**
   ```bash
   # Clear Jest cache
   npm run test -- --clearCache
   ```

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- Vercel for hosting and deployment
- Tailwind CSS for the utility-first CSS framework
- The React community for excellent tooling
