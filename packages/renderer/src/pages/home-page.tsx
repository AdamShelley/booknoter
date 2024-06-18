import { useState } from "react";
import Sidebar from "../components/home/pdf-reader";
import RSSFeed from "../components/home/rss-feed";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "../components/ui/resizable";

const HomePage = () => {
  const [blog, setBlog] = useState<string>("");

  const setBlogHandler = (blog: string) => {
    console.log(blog, "new blog");
    setBlog(blog);
  };

  return (
    <div className="flex w-full h-full justify-between gap-5 overflow-hidden">
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel className="w-64 max-w-[250px] z-[100] border-r border-slate-700">
          <Sidebar setBlog={setBlogHandler} />
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel className="flex-1">
          <RSSFeed selectedBlog={blog} />
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};

export default HomePage;
