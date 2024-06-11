import { Toaster } from "./components/ui/sonner";
import HomePage from "./pages/home-page";
import { ThemeProvider } from "./providers/theme-provider";

const App = () => {
  return (
    <main className="flex items-start justify-center w-screen h-screen p-3">
      <ThemeProvider
        defaultTheme="dark"
        storageKey="vite-ui-theme"
      >
        <div className="hidden dark:absolute inset-0 -z-10 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]"></div>

        <HomePage />
      </ThemeProvider>
      <Toaster />
    </main>
  );
};

export default App;
