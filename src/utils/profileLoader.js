import { PROFILE_API, PROFILE_BY_USERNAME } from "./constant";

const profileLoader = async (e)=>
{
        const token = localStorage.getItem("accessToken");
            const response = await fetch(PROFILE_BY_USERNAME + e.params.id, {
              method: 'GET',
              headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token
              }
            })
        return  await response.json();
}

export default profileLoader;