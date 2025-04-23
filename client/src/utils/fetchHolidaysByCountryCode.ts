import fetchRetry from "./fetchRetry";

const fetchHolidaysByCountryCode = async (year: string, countryCode: string) => {
  try {
    const url = new URL(`https://date.nager.at/Api/v3/PublicHolidays/${year}/${countryCode}`);
    const response = await fetchRetry(url, {}, 3, 1000);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching holidays: ", error);
  }
}

export default fetchHolidaysByCountryCode;
