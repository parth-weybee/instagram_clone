import { AVATAR_IMG_URL } from "../utils/constant"

const UserAvatar = ({url}) => {
  return (
    <div className="flex items-center">
        <img
          className="w-12 h-12 rounded-full"
          src={url || AVATAR_IMG_URL}
          alt="AVATAR IMG"
        />
        <h1 className="text-xl text-white px-6">Parth Modhvadiya</h1>
    </div>
  )
}

export default UserAvatar