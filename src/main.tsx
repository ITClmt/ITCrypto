import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./styles/index.css";
import HomePage from "./pages/HomePage.tsx";
import { createBrowserRouter, RouterProvider } from "react-router";
import CoinPage from "./pages/CoinPage.tsx";
import axios from "axios";
import ErrorPage from "./pages/ErrorPage.tsx";

const coinLoader = async ({ params }: { params: { id: string } }) => {
  const apiUrl = `https://api.coingecko.com/api/v3/coins/${params.id}`;
  const response = await axios.get(apiUrl);
  return response.data;
};

const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/coins/:id",
        element: <CoinPage />,
        loader: ({ params }) =>
          coinLoader({ params: params as { id: string } }),
        errorElement: (
          <section className="bg-neutral-900 p-4 rounded-lg text-white">
            <h1>Retry in few minutes...</h1>
            <p>
              Sorry for the inconvenience, but due to the limitations of the
              free plan API, you cannot request too much data at once. Please
              try again later.
            </p>
          </section>
        ),
      },
    ],
  },
]);

const root = document.getElementById("root");

if (!root) {
  throw new Error("Erreur");
}

createRoot(root).render(<RouterProvider router={router} />);
