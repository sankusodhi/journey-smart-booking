import { Toaster } from "@/components/ui/toaster"; // If you're using 'sonner', this can be removed
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Pages
import Index from "./pages/Index";
import SearchResults from "./pages/SearchResults";
import SeatSelection from "./pages/SeatSelection";
import PassengerDetails from "./pages/PassengerDetails";
import BusTracking from "./pages/BusTracking";
import NotFound from "./pages/NotFound";
import Test from './pages/Test';

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        {/* Notifications */}
        <Toaster />
        <Sonner />

        {/* Routing */}
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/search-results" element={<SearchResults />} />
            <Route path="/select-seats/:busId" element={<SeatSelection />} />
            <Route path="/passenger-details/:busId" element={<PassengerDetails />} />
            <Route path="/tracking" element={<BusTracking />} />
            <Route path="*" element={<NotFound />} />
            <Route path="/test" element={<Test />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
