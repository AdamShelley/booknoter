import { useState } from "react";
import Sidebar from "../components/home/pdf-reader";
import RSSFeed from "../components/home/rss-feed";

const HomePage = () => {
  const [blog, setBlog] = useState<string>("");

  const setBlogHandler = (blog: string) => {
    setBlog(blog);
  };

  return (
    <div className="flex w-full h-full justify-between gap-5">
      <Sidebar setBlog={setBlogHandler} />
      <RSSFeed selectedBlog={blog} />
    </div>
  );
};

export default HomePage;
