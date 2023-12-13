import {json} from "stream/consumers";

const fetchData = async () => {
  try {
    const response = await fetch("/api/item");

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const jsonData = await response.json(); // Corrected variable name

    // Extract 'stars' values into an array
    return jsonData;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

export default fetchData;
