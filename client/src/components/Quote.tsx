import { useState, useEffect } from "react";

import fetchRetry from "../utils/fetchRetry";

interface Quote {
  quote: string;
  author: string;
  html: string;
}

const Quotes = () => {
  const [quote, setQuote] = useState<string>("");
  const [author, setAuthor] = useState<string>("");
  useEffect(() => {
    const fetchQuote = async () => {
      try {
        const url = new URL("https://corsproxy.io");
        url.searchParams.append("url", "https://zenquotes.io/api/random");

        const response = await fetchRetry(url, {}, 3, 1000);
        const data = await response.json();

        const quote: Quote = { quote: data[0].q, author: data[0].a, html: data[0].h };

        setQuote(quote.quote);
        setAuthor(quote.author);

        console.log(data);
      } catch (error) {
        console.error("Error fetching quotes:", error);
      }
    };

    fetchQuote();
  }, []);
  return (
    <div className="flex flex-col justify-center mt-2 gap-2 select-none">
      <div className='flex justify-center text-2xl text-bordered'>{`"${quote}"`}</div>
      <div className='flex justify-center text-xl text-bordered'>- {author}</div>
    </div>
  );
};

export default Quotes;
