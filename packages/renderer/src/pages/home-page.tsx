import Sidebar from "../components/home/pdf-reader";
import RSSFeed from "../components/home/rss-feed";

const HomePage = () => {
  return (
    <div className="flex w-full h-full justify-betwee gap-5">
      <Sidebar />
      <RSSFeed />
    </div>
  );
};

export default HomePage;
