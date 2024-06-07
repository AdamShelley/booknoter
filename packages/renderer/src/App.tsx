import { toast } from "sonner";
import { Button } from "./components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./components/ui/card";
import { Toaster } from "./components/ui/sonner";

const App = () => {
  const sendToast = () => {
    toast.success("It works!");
  };

  return (
    <main className="flex items-center justify-center w-full h-full">
      <div className="absolute inset-0 -z-10 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]"></div>
      <Card className="bg-slate-200 w-1/2 flex flex-col items-center justify-center shadow-md mt-10">
        <CardHeader>
          <CardTitle>Electron + Tailwind + Shadcn</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center">
          <p>This boilerplate is working!</p>
          <Button
            className="mt-5"
            onClick={sendToast}
          >
            Click me!
          </Button>
        </CardContent>
      </Card>
      <Toaster />
    </main>
  );
};

export default App;
