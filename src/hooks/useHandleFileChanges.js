import { useDispatch, useSelector } from "react-redux";
import { setProfile } from "../redux/profileSlice";
import { PROFILE_API, PROFILE_AVATAR_API } from "../utils/constant";
import { useRef, useState } from "react";

const useHandleFileChanges = (setIsEdit) => {
  const profile = useSelector((store) => store.Profile?.userProfile);
  const dispatch = useDispatch();
  const [error, setError] = useState([]);
  const firstName = useRef(profile?.firstName);
  const fileRef = useRef(null);
  const lastName = useRef(profile?.lastName);
  const location = useRef(profile?.location);
  const bio = useRef(profile?.bio);
  const dataOfBirth = useRef(profile?.dob);
  const phoneNumber = useRef(profile?.phoneNumber);
  const countryCode = useRef(profile?.countryCode);
  // Avatar Update
  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("coverImage", file);
    const token = localStorage.getItem("accessToken");
    const res = await fetch(PROFILE_AVATAR_API, {
      method: "PATCH",
      headers: {
        Authorization: "Bearer " + token,
      },
      body: formData,
    });
    const data = await res.json();
    if (data?.statusCode === 200) {
      dispatch(setProfile(data?.data));
    } else {
      setError(data?.errors);
    }
  };
  // Edit Save
  const handleSaveChanges = async () => {
    const token = localStorage.getItem("accessToken");
    const response = await fetch(PROFILE_API, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({
        firstName: firstName?.current?.value,
        lastName: lastName?.current?.value && profile.lastName,
        location: location?.current?.value,
        bio: bio?.current?.value,
        dob: dataOfBirth?.current?.value,
        phoneNumber: phoneNumber?.current?.value,
        countryCode: countryCode?.current?.value,
      }),
    });
    const data = await response.json();
    if (data?.statusCode === 200) {
      dispatch(setProfile(data?.data));
      setIsEdit(false);
    } else {
      setError(data?.errors);
    }
  };
  return { error,firstName,lastName,profile,location,bio,dataOfBirth,phoneNumber,countryCode,fileRef, handleFileChange, handleSaveChanges };
};

export default useHandleFileChanges;
