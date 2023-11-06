const AddImage = ({ handleAddImage }) => {
  const handleImageChange = (e) => {
    const file = e.target.files[0]; // get the single image file
    if (handleAddImage) {
      handleAddImage(file); // pass the image to the handleImageChange
    }
  };

  return (
    <div className="relative border-2 border-dashed border-slate-300 rounded-lg p-4">
      <input
        type="file"
        name="images"
        id="images"
        accept="image/*" // accept only the image
        className="absolute top-0 left-0 h-full w-full opacity-0 cursor-pointer"
        title="Try to upload photos..."
        onChange={handleImageChange}
      />
      <div className="h-full w-full flex flex-col justify-center items-center gap-y-1">
        <img alt="placeholder" src="/images/download.png" />
        {/* <div className="w-max">Add Images</div> */}
      </div>
    </div>
  );
};

export default AddImage;
