import { Link, useNavigate } from "react-router-dom"
import { AVATAR_IMG_URL } from "../utils/constant"

const UserAvatar = ({url,fullName,username}) => {
  const navigate = useNavigate();
  return (
    <Link to={"/profile/" + username}>
    <div className="flex items-center cursor-pointer">
        <img
          className="w-12 h-12 rounded-full"
          src={url || AVATAR_IMG_URL}
          alt="AVATAR IMG"
        />
        <h1 className="text-xl text-white px-6">{fullName}</h1>
    </div>
    </Link>
  )
}

export default UserAvatar