type SideBarProps = {
  setBlog: (url: string) => void;
};

const Sidebar = ({ setBlog }: SideBarProps) => {
  const blogList = [
    {
      name: "Zen Habits",
      url: "https://feeds.feedburner.com/zenhabits",
    },
    {
      name: "Raptitude",
      url: "https://www.raptitude.com/feed/",
    },
    {
      name: "Monevator",
      url: "http://feeds2.feedburner.com/Monevatorcom",
    },
    {
      name: "Mark Manson",
      url: "https://markmanson.net/feed",
    },
  ];

  return (
    <div className="w-64 h-full p-4  ">
      {/* <h2 className="text-xl font-bold py-4 text-gray-300">Lists</h2> */}
      <ul className="mt-10">
        {blogList.map(blog => (
          <li
            key={blog.name}
            onClick={() => setBlog(blog.url)}
            className="py-1 px-1  hover:bg-slate-800 rounded-md cursor-pointer transition-colors duration-200 ease-in-out text-sm"
          >
            {blog.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
