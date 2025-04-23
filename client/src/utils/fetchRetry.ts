export const fetchRetry = async (
  url: string | URL,
  options: RequestInit = {},
  retries: number = 3,
  delay: number = 1000
): Promise<any> => {
  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      const response = await fetch(url, options);
      if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);
      return response;
    } catch (error) {
      if (attempt < retries) {
        console.warn(`Retrying... Attempt ${attempt + 1} of ${retries}`);
        await new Promise((resolve) => setTimeout(resolve, delay));
      } else {
        console.error("Max retries reached");
        throw error;
      }
    }
  }
  throw new Error("Fetch failed after retries");
};

export default fetchRetry
