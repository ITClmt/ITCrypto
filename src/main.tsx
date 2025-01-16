import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./styles/index.css";
import HomePage from "./pages/HomePage.tsx";
import { createBrowserRouter, RouterProvider } from "react-router";
import CoinPage from "./pages/CoinPage.tsx";
import axios from "axios";

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
      },
    ],
  },
]);

const root = document.getElementById("root");

if (!root) {
  throw new Error("Erreur");
}

createRoot(root).render(<RouterProvider router={router} />);
