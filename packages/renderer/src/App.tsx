import React from "react";
import { Button } from "./components/shadcn/Button";
import { cn } from "./utils/cn";

const App = () => {
  const [clicked, setClicked] = React.useState(false);
  const test = () => {
    setClicked(prev => !prev);
  };

  return (
    <main className="flex items-center justify-center w-full h-full">
      <p className={cn("font-bold", { "text-red-500": clicked })}>Test</p>

      <Button
        onClick={test}
        className="mt-[250px]"
      >
        {" "}
        Click me{" "}
      </Button>
    </main>
  );
};

export default App;
