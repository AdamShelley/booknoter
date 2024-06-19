import React, { useEffect, useState } from "react";
import { XMLParser } from "fast-xml-parser";
import { Button } from "../ui/button";

type FeedProps = {
  selectedBlog: string;
};

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

const RSSFeed: React.FC<FeedProps> = ({ selectedBlog }) => {
  const [feedTitle, setFeedTitle] = useState<string>("");
  const [feedItems, setFeedItems] = useState<RSSFeedItem[]>([]);
  const [selectedItem, setSelectedItem] = useState<RSSFeedItem | null>(null);
  const [error, setError] = useState<string | null>(null);
  const CORS_PROXY = "https://corsproxy.io/?";

  const fetchLink = async () => {
    try {
      const response = await fetch(CORS_PROXY + selectedBlog);
      console.log(response);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const text = await response.text();
      const parser = new XMLParser();
      const parsed = parser.parse(text);

      console.log(parsed);

      let feedTitle, items;
      // Handle Atom format
      if (parsed.feed) {
        feedTitle = parsed.feed.title;
        items = parsed.feed.entry.map((item: any) => ({
          title: item.title,
          link: item.link.href, // Atom links are usually objects
          content: item.content || item.summary,
        }));
      }
      // Handle RSS 2.0 format
      else if (parsed.rss && parsed.rss.channel) {
        feedTitle = parsed.rss.channel.title;
        items = parsed.rss.channel.item.map((item: any) => ({
          title: item.title,
          link: item.link,
          content: item.description,
        }));
      }
      // Additional checks can be added here for other types like RSS 1.0
      else {
        throw new Error("Unsupported feed format");
      }

      setFeedTitle(feedTitle);
      setFeedItems(items);
      setError(null);
    } catch (err) {
      setError("Failed to fetch the RSS feed. Please check the URL and try again.");
      console.error(err);
    }
  };

  const handleItemClick = (item: RSSFeedItem) => {
    // Assuming the images in the original feed are relative to the domain 'https://dynomight.net'
    const modifiedContent = item.content.replace(/<img src="\//g, `<img src=${item.link}`);

    setSelectedItem({ ...item, content: modifiedContent });
  };

  const handleUnselect = () => {
    setSelectedItem(null);
  };

  // Use effect if new blog selected
  useEffect(() => {
    setSelectedItem(null);
    if (selectedBlog) {
      fetchLink();
    }
  }, [selectedBlog]);

  useEffect(() => {
    const handleLinkClick = (event: Event) => {
      const target = event.target as HTMLAnchorElement;
      if (target.tagName === "A" && target.href) {
        event.preventDefault();
      }
    };

    const contentDiv = document.getElementById("content");
    if (contentDiv) {
      contentDiv.addEventListener("click", handleLinkClick);
    }

    return () => {
      if (contentDiv) {
        contentDiv.removeEventListener("click", handleLinkClick);
      }
    };
  }, [selectedItem]);

  return (
    <div className="flex-1 rounded-sm p-10 max-h-screen overflow-y-auto">
      {error && <p className="text-red-500 mt-4">{error}</p>}
      {feedTitle && !error && <h2 className="text-lg font-semibold mt-4">{feedTitle}</h2>}
      <ul className="list-none list-inside mt-2">
        {!selectedItem &&
          !error &&
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
      {selectedItem && !error && (
        <div className="mt-4 rounded-md max-w-screen">
          <Button
            onClick={handleUnselect}
            className="my-4 px-0"
            variant="link"
          >
            Go Back
          </Button>
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
