import { Toaster } from "./components/ui/sonner";
import HomePage from "./pages/home-page";
import { ThemeProvider } from "./providers/theme-provider";

const App = () => {
  return (
    <main className="flex items-start justify-center w-screen h-[calc(100vh-20px)]">
      <ThemeProvider
        defaultTheme="dark"
        storageKey="vite-ui-theme"
      >
        <div className="absolute top-0 z-[-2] h-screen w-screen bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(60,59,99,0.8),rgba(120,119,198,0.1))]"></div>

        <HomePage />
      </ThemeProvider>
      <Toaster />
    </main>
  );
};

export default App;
