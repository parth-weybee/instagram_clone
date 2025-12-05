
 export const useCreatePost = async () => {
    const blobs = await Promise.all(
      imageList.map((imgUrl) => fetch(imgUrl).then((res) => res.blob()))
    );
    const files = blobs?.map(
      (blob, index) =>
        new File([blob], "image" + index + ".png", { type: blob.type })
    );
    
    const formData = new FormData();
    files.map((file)=>
    {
      formData.append("images",file);
    })
    formData.append("content", caption.current.value);
    tags.current.value.split(", ").map((tag, ind) => {
      formData.append(`tags[${ind}]`, tag);
    });
    const token =  localStorage.getItem("accessToken");
    const res = await fetch(CREATE_POST, {
      method: "POST",
      headers: {
        "Authorization": "Bearer " + token
      },
      body: formData
    });
    const data = await res.json();
    if(data?.statusCode)
    {
      dispatch(setPostImages(null));
      dispatch(setPostDetails(null));
      dispatch(togglePostContainer(false));
    }
  };