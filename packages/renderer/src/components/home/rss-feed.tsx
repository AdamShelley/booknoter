import React, { useState } from "react";
import { XMLParser } from "fast-xml-parser";
import { Button } from "../ui/button";

type RSSFeedItem = {
  pubDate: Date;
  content: string;
  title: string;
  link: string;
};

type RSSFeedProps = {
  title: string;
  items: RSSFeedItem[];
};

const RSSFeed: React.FC = () => {
  const [feedTitle, setFeedTitle] = useState<string>("");
  const [feedItems, setFeedItems] = useState<RSSFeedItem[]>([]);
  const [selectedItem, setSelectedItem] = useState<RSSFeedItem | null>(null);
  const [error, setError] = useState<string | null>(null);
  const CORS_PROXY = "https://corsproxy.io/?";

  const fetchLink = async () => {
    try {
      const response = await fetch(CORS_PROXY + "https://dynomight.net/feed.xml");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const text = await response.text();
      const parser = new XMLParser();
      const parsed = parser.parse(text);

      // Extract feed title and items
      console.log(parsed);
      const title: string = parsed.feed.title;
      const items: RSSFeedItem[] = parsed.feed.entry.map((item: RSSFeedItem) => ({
        title: item.title,
        link: item.link,
        content: item.content,
      }));

      setFeedTitle(title);
      setFeedItems(items);
      setError(null);
    } catch (err) {
      setError("Failed to fetch the RSS feed. Please check the URL and try again.");
      console.error(err);
    }
  };

  const handleItemClick = (item: RSSFeedItem) => {
    setSelectedItem(item);
  };

  return (
    <div className="border border-gray-500 flex-1 rounded-sm p-3 shadow-md">
      <h1 className="text-xl font-bold mb-4">RSS Feed</h1>
      <Button
        variant="ghost"
        onClick={fetchLink}
      >
        Fetch Link
      </Button>
      {error && <p className="text-red-500 mt-4">{error}</p>}
      {feedTitle && <h2 className="text-lg font-semibold mt-4">{feedTitle}</h2>}
      <ul className="list-disc list-inside mt-2">
        {!selectedItem &&
          feedItems.map((item, index) => {
            if (index > 10) return;
            return (
              <li
                key={index}
                className="mb-2"
              >
                <a
                  href="#"
                  onClick={e => {
                    e.preventDefault();
                    handleItemClick(item);
                  }}
                  className="text-blue-500 hover:underline"
                >
                  {item.title}
                </a>
              </li>
            );
          })}
      </ul>
      {selectedItem && (
        <div className="mt-4 p-4 border border-gray-300 rounded-md">
          <h3 className="text-lg font-semibold">{selectedItem.title}</h3>
          <div
            className="w-[85vw] lg:w-[50vw] xl:w-[45vw] 2xl:w-[30vw] prose dark:prose-invert 
            prose-headings:mt-8 prose-headings:font-semibold prose-headings:text-black prose-h1:text-base
            prose-h2:text-base prose-h3:text-sm prose-h4:text-sm prose-h5:text-xs prose-h6:text-xs 
            dark:prose-headings:text-white prose-img:rounded-md   prose-p:leading-2 prose-li:text-md
            prose-img:flex prose-img:mx-auto prose-img:max-h-[800px] mb-10"
            dangerouslySetInnerHTML={{ __html: selectedItem.content }}
          />
        </div>
      )}
    </div>
  );
};

export default RSSFeed;
