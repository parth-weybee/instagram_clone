import { useDispatch, useSelector } from "react-redux";
import { setPostImages, togglePostContainer } from "../redux/createPostSlice";

const PostContainerHeader = ({ handlePostSubmit }) => {
  const postImages = useSelector((store) => store.CreatePost.postImages);
  const dispatch = useDispatch();
  const handleBackBtn = () => {
    if (postImages) {
      dispatch(setPostImages(null));
    } else {
      dispatch(togglePostContainer(false));
    }
  };
  return (
    <>
      <button
        className="absolute top-3 left-2 text-xl text-white"
        onClick={handleBackBtn}
      >
        <i className="fa-solid fa-left-long"></i>
      </button>
      <h1 className="font-bold text-xl mx-auto bg-black text-white py-2">
        Create new post
      </h1>
      {postImages && (
        <button
          className="absolute top-3 right-2 text-xl text-blue-500"
          onClick={handlePostSubmit}
        >
          Share
        </button>
      )}
    </>
  );
};

export default PostContainerHeader;
