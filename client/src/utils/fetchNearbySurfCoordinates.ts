import fetchRetry from "./fetchRetry";

const fetchNearbySurfCoordinates = async (latitude: number, longitude: number) => {
  try {
    const url = new URL("https://overpass-api.de/api/interpreter");
    url.searchParams.append(
      "data",
      `[out:json];node(around:5000,${latitude},${longitude})["natural"]["natural"="reef"];out;`
    );

    const response = await fetchRetry(url, {}, 3, 1000);
    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Error fetching surf coordinates:", error);
  }
};

export default fetchNearbySurfCoordinates;
