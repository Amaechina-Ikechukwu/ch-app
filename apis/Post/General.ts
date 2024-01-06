import axios from "axios";
import { apiurl } from "../../api";

// Define the base URL for your API
const BASE_URL = apiurl; // Replace with your API URL

// Define the function to send a POST request with a bearer token using Axios
export const GeneralPost = async (
  endpoint: string,
  token: string | null | undefined,
  requestBody: any // Adjust the type of requestBody according to your payload structure
) => {
  try {
    const response = await axios.post(`${BASE_URL}/${endpoint}`, requestBody, {
      headers: {
        Authorization: `Bearer ${token}`,
        // Add any other headers if needed
      },
    });

    return response.data;
  } catch (error: any) {
    throw new Error(error);
  }
};
