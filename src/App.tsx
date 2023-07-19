import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import AppRoutes from "./routes/AppRoutes";
import GlobalStyles from "./styles/GlobalStyles";
import NotificationToaster from "./ui/Toaster";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <GlobalStyles />
      <AppRoutes />
      <NotificationToaster />
    </QueryClientProvider>
  );
}

export default App;
