import { createRoot } from "react-dom/client"
import App from "./components/App"
import { ErrorBoundary } from "./providers/ErrorBoundary"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { LazyAbout } from "./pages/about/About.lazy"
import { Shop } from "@/pages/shop"
import { Suspense } from "react"
import { PageError } from "./providers/ErrorBoundary/ui/PageError"

const root = document.getElementById("root")

if (!root) {
  throw new Error("root not found")
}

const container = createRoot(root)

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <PageError />, // Для babel, без него нормально отрабатывает error boundary
    children: [
      {
        path: "/about",
        element: (
          <Suspense fallback={"Loading..."}>
            <LazyAbout />
          </Suspense>
        ),
      },
      {
        path: "/shop",
        element: (
          <Suspense fallback={"Loading..."}>
            <Shop />{" "}
          </Suspense>
        ),
      },
    ],
  },
])

container.render(
  <ErrorBoundary>
    <RouterProvider router={router} />
  </ErrorBoundary>
)
