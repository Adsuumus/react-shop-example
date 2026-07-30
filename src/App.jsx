import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "./context/authContext";
import { ContextProvider } from "./context";
import { Router } from "./router/Router";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ContextProvider>
          <Router />
        </ContextProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
