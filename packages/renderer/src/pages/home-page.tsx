import { useState } from "react";
import Sidebar from "../components/home/pdf-reader";
import RSSFeed from "../components/home/rss-feed";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "../components/ui/resizable";
import OptionsPage from "./options";

const HomePage = () => {
  const [blog, setBlog] = useState<string>("");
  const [settings, showSettings] = useState<boolean>(false);

  const setBlogHandler = (blog: string) => {
    console.log(blog, "new blog");
    showSettings(false);
    setBlog(blog);
  };

  const setShowSettings = () => {
    setBlog("");
    showSettings(true);
  };

  return (
    <div className="flex w-full h-full justify-between gap-5 overflow-hidden">
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel className="w-64 max-w-[250px] z-[100] border-r border-slate-700">
          <Sidebar
            setBlog={setBlogHandler}
            setShowSettings={setShowSettings}
          />
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel className="flex-1">
          {!settings && <RSSFeed selectedBlog={blog} />}
          {settings && <OptionsPage />}
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};

export default HomePage;
