import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AnimationOrchestratorProvider } from "@/components/animations/AnimationOrchestrator";
import PerformanceMonitor from "@/components/animations/PerformanceMonitor";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AnimationOrchestratorProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <PerformanceMonitor
          showDebugPanel={process.env.NODE_ENV === 'development'}
          autoOptimize={true}
        />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AnimationOrchestratorProvider>
  </QueryClientProvider>
);

export default App;
