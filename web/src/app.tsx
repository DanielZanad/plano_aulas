import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./pages/home";
import { ProtectedRoute } from "./pages/protected-route";
import { SignIn } from "./pages/sign-in";
import { SignUp } from "./pages/sign-up";
import { env } from "./env";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route
            index
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />

          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}
