import axios from "./Axios";

export async function showAllVenues() {
    const { data } = await axios.get("/api/all-venues");
    console.log("data.rows in axios all venues: ", data.rows);
    return {
        type: "SHOW_ALL_VENUES",
        allVenues: data.rows,
    };
}
