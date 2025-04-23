import fetchRetry from "./fetchRetry";

const fetchLocationByName = async (name: string) => {
  try {
    const url = new URL("https://nominatim.openstreetmap.org/search");
    url.searchParams.append("q", name);
    url.searchParams.append("format", "json");
    url.searchParams.append("addressdetails", "1");
    url.searchParams.append("limit", "1");

    const response = await fetchRetry(url, {}, 3, 1000);
    const data = await response.json();

    return data?.[0];
  } catch (error) {
    console.error("Error fetching location by name:", error);
  }
};

export default fetchLocationByName;
