import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Toaster } from "@/components/ui/sonner";

function NotFoundComponent() {
  return (
    <SiteLayout>
      <div className="flex min-h-[60vh] items-center justify-center px-4">
        <div className="max-w-md text-center">
          <h1 className="font-display text-7xl text-[var(--rose)]">404</h1>
          <h2 className="mt-4 font-display text-2xl">Page not found</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            The page you're looking for doesn't exist or has been moved.
          </p>
          <Link
            to="/"
            className="mt-6 inline-flex items-center justify-center rounded-full bg-[var(--rose)] px-6 py-2 text-sm font-semibold text-white"
          >
            Go home
          </Link>
        </div>
      </div>
    </SiteLayout>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <SiteLayout>
      <div className="flex min-h-[60vh] items-center justify-center px-4">
        <div className="max-w-md text-center">
          <h1 className="font-display text-2xl">Something went wrong</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Please try refreshing or head back home.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-2">
            <button
              onClick={() => {
                router.invalidate();
                reset();
              }}
              className="rounded-full bg-[var(--rose)] px-5 py-2 text-sm font-semibold text-white"
            >
              Try again
            </button>
            <a
              href="/"
              className="rounded-full border border-[var(--rose)]/30 px-5 py-2 text-sm font-semibold text-[var(--rose)]"
            >
              Go home
            </a>
          </div>
        </div>
      </div>
    </SiteLayout>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "The Wow Factor Unisex Salon — Premium Beauty Salon in Indore" },
      {
        name: "description",
        content:
          "Indore's premium unisex salon for hair, makeup, skin, nails & spa. 4.9★ rated by 1.4K+ happy clients. Book your appointment today.",
      },
      { property: "og:title", content: "The Wow Factor Unisex Salon — Premium Beauty Salon in Indore" },
      { property: "og:description", content: "Experience luxury beauty and grooming services at The Wow Factor Unisex Salon, Indore. Expert bridal makeup, hair styling, facials, skincare, nail services, spa" },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "The Wow Factor Unisex Salon" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "The Wow Factor Unisex Salon — Premium Beauty Salon in Indore" },
      { name: "description", content: "Experience luxury beauty and grooming services at The Wow Factor Unisex Salon, Indore. Expert bridal makeup, hair styling, facials, skincare, nail services, spa" },
      { name: "twitter:description", content: "Experience luxury beauty and grooming services at The Wow Factor Unisex Salon, Indore. Expert bridal makeup, hair styling, facials, skincare, nail services, spa" },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/81bb4450-c089-4152-96c4-b09612d09933/id-preview-951c54d7--8a9cba4c-bf96-4392-a003-e52df4165770.lovable.app-1781267583604.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/81bb4450-c089-4152-96c4-b09612d09933/id-preview-951c54d7--8a9cba4c-bf96-4392-a003-e52df4165770.lovable.app-1781267583604.png" },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500;600;700&family=Inter:wght@400;500;600&display=swap",
      },
      { rel: "stylesheet", href: appCss },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <SiteLayout>
        <Outlet />
      </SiteLayout>
      <Toaster position="top-center" richColors />
    </QueryClientProvider>
  );
}
