import { apiurl } from "../../api";

// Define the base URL for your API
const BASE_URL = apiurl; // Replace with your API URL

// Define the function to send a POST request with a bearer token using fetch
export const GeneralPost = async (
  endpoint: string,
  token: string | null | undefined,
  requestBody: any // Adjust the type of requestBody according to your payload structure
) => {
  try {
    const response = await fetch(`${BASE_URL}/${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        // Add any other headers if needed
      },
      body: JSON.stringify(requestBody),
    });
    console.log({ response }, "from POST");
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    return await response.json();
  } catch (error: any) {
    throw new Error(error.message);
  }
};
