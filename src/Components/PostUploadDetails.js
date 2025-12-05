

const PostUploadDetails = ({caption,tags}) => {
  return (
    <form>
        <textarea ref={caption} className="w-full outline-none text-white  bg-transparent p-2 resize-none border-b" rows="8" placeholder="Add Caption"></textarea>
        <textarea ref={tags} className="w-full outline-none text-white  bg-transparent p-2 resize-none border-b" rows="3" placeholder="Add tags"></textarea>
    </form>
  )
}

export default PostUploadDetails