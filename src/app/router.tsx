import { createBrowserRouter, Navigate } from "react-router-dom";

import RootLayout from "@/layouts/RootLayout/RootLayout";
import DeckPage from "@/pages/DeckPage/DeckPage";
import DetailPage from "@/pages/DetailPage/DetailPage";
import NotFoundPage from "@/pages/NotFoundPage/NotFoundPage";
import RouteErrorPage from "@/pages/RouteErrorPage/RouteErrorPage";

export const router = createBrowserRouter([
  {
    element: <RootLayout />,
    errorElement: <RouteErrorPage />,
    children: [
      { path: "/", element: <Navigate to="/pokemons" replace /> },
      { path: "/pokemons", element: <DeckPage /> },
      { path: "/pokemons/:id", element: <DetailPage /> },
      { path: "*", element: <NotFoundPage /> },
    ],
  },
]);
