import axios from "axios";

const BASE = process.env.MY_REACT_APP_API_URL;

export async function getActivities() {
  try {
    const { data } = await axios.get(`${BASE}/activities`);
    console.log(data);
    return data;
  } catch (error) {
    throw error;
  }
}
