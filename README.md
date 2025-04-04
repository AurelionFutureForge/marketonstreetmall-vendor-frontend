
# MarketOnStreetMall Vendor Dashboard

A modern, scalable vendor dashboard built with **Next.js 14**, **Tailwind CSS**, **TypeScript**, and **Zustand**. This dashboard enables vendors to manage products, view orders, track reports, and interact with StreetMall’s admin system. It offers a clean UI, role-based access, and smooth performance.

---

## Features

- **Vendor Product Management**: Add, edit, and track products with approval flow.
- **Responsive UI**: Optimized for desktop and mobile devices.
- **Role-Based Access**: Admin and Product Admin access control using `CASL`.
- **Type-Safe Development**: Full TypeScript support throughout.
- **Optimistic Updates**: Powered by `TanStack Query`.
- **Form Handling & Validation**: Built with `React Hook Form` and `Zod`.

---

## Tech/Framework Used

- **Next.js 15**: Core framework for React applications
- **TypeScript**: Programming language for type safety
- **Tailwind CSS**: Utility-first CSS framework
- **ShadCN**: Components library
- **Zustand**: State management library
- **NextAuth**: Authentication solution
- **TanStack Query**: Data fetching and caching library
- **React Hook Form**: Form state management and validation
- **Zod**: Schema validation library
- **CASL**: Authorization library

---

## Starting the Project Locally

Follow these steps to get the project running on your local machine:

1. **Clone the Repository**

   ```bash
   git clone https://github.com/YOUR_ORG/marketonstreetmall-vendor-frontend.git
   ```

2. **Navigate to the Project Directory**

   ```bash
   cd marketonstreetmall-vendor-frontend
   ```

3. **Install Dependencies**

   ```bash
   npm install
   ```

4. **Run the Development Server**

   ```bash
   npm run dev
   ```

   The application will be available at [http://localhost:3000](http://localhost:3000).

---

## Folder Structure

Below is a simplified folder structure of the project:

```
marketonstreetmall-vendor-frontend/
├── public/                 # Static assets
├── src/
│   ├── app/                # App router pages and layouts
│   │   └── [page]/         # Route-specific directories
│   │       └── _components/ # Page-specific components
│   ├── components/         # Shared reusable components
│   ├── data/               # Static data files and constants
│   ├── hooks/              # Custom React hooks
│   ├── lib/                # Utility functions, providers, and helpers
│   ├── schema/             # Form schemas and validation
│   ├── services/           # API and data fetching services
│   │   ├── api/            # API endpoint configurations
│   │   ├── mutations/      # TanStack Query mutations
│   │   ├── queries/        # TanStack Query queries
│   │   └── types/          # API-related type definitions
│   ├── utils/              # Helper functions and utilities
│   ├── auth.ts             # Authentication configuration
│   └── middleware.ts       # Next.js middleware
├── .env.local              # Environment variables (not in repo)
├── .env.example            # Example environment variables
├── next.config.js          # Next.js configuration
├── package.json            # Dependencies and scripts
├── tsconfig.json           # TypeScript configuration
└── tailwind.config.js      # Tailwind CSS configuration (if used)
```

---

### Usage Example for Next.js

Here’s an example of setting up a layout and a page using the dashboard:

```tsx
// layout.tsx
import VendorLayout from "@/components/dashboard/vendor-layout";

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <VendorLayout>{children}</VendorLayout>;
}

// page.tsx
import { ContentLayout } from "@/components/dashboard/content-layout";

export default function Page() {
  return (
    <ContentLayout title="Orders">
      <div>All orders will be shown here.</div>
    </ContentLayout>
  );
}
```

---

## Contributing

We welcome contributions! To contribute:

1. Fork the repository.
2. Create a new branch for your feature or bugfix:
   ```bash
   git checkout -b my-feature-branch
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add new feature"
   ```
4. Push to your fork:
   ```bash
   git push origin my-feature-branch
   ```
5. Submit a pull request.

---

## License

This project is licensed under the **MIT License**. See the [LICENSE](LICENSE) file for more details.

---

## Contact

For any questions, issues, or feedback, feel free to reach out:

- **Email**: support@marketonstreetmall.com
- **GitHub**: [MarketOnStreetMall Vendor Frontend](https://github.com/AurelionFutureForge/marketonstreetmall-vendor-frontend)
