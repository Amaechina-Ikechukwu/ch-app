import axios from "axios";
import { apiurl } from "../../api";
// Define the base URL for your API
// Define the base URL for your API
const BASE_URL = apiurl; // Replace with your API URL

// Define the function to fetch data with a bearer token using fetch
export const GeneralGet = async (
  endpoint: string,
  token: string | null | undefined
) => {
  try {
    const response = await fetch(`${BASE_URL}/${endpoint}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        // Add any other headers if needed
      },
    });
    console.log({ response }, "from GET");
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    // Handle error appropriately, e.g., logging or throwing
    console.error("Error fetching data:", error);
    throw error;
  }
};
