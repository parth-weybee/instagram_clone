import {  PROFILE_BY_USERNAME } from "./constant";

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

        const data =  await response.json();
            console.log(data);
            return data;

      }

export default profileLoader;