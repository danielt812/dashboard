import fetchRetry from "./fetchRetry";

const fetchLocationByCoordinates = async (latitude: number, longitude: number) => {
  try {
    const url = new URL("https://nominatim.openstreetmap.org/reverse");
    url.searchParams.append("lat", latitude.toString());
    url.searchParams.append("lon", longitude.toString());
    url.searchParams.append("format", "json");

    const response = await fetchRetry(url, {}, 3, 1000);
    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Error fetching location:", error);
  }
};

export default fetchLocationByCoordinates;
