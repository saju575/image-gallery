import { useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { dummeyImageData } from "../../dummeyImage";
import AddImage from "../addImage/AddImage";
import SingleImage from "./SingleImage";

const ImageGallery = () => {
  /* 
    load the dummy image data and set the selected false by default
  */
  const initialDataWithSelection = dummeyImageData.map((image) => ({
    ...image,
    selected: false,
  }));

  /* 
    store the image data into a state
  */
  const [imageData, setImageData] = useState(initialDataWithSelection);

  /* 
    declear the 3 state
    -> dragging  
    -> dragged image index 
    -> dragged over image
  */
  const [dragging, setDragging] = useState(false);
  const [dragItemIndex, setDragItemIndex] = useState(null);
  const [dragOverIndex, setDragOverIndex] = useState(null);

  /* 
    handler for toggling the selected image
  */
  const toggleImageSelection = (id) => {
    const updatedImageData = imageData.map((image) =>
      image.id === id ? { ...image, selected: !image.selected } : image
    );
    setImageData(updatedImageData);
  };

  /* 
    handler for deleting the selected images
  */
  const deleteSelectedItems = () => {
    const updatedImageData = imageData.filter((image) => !image.selected);
    setImageData(updatedImageData);
  };

  /* 
    handler for de selecting the selected images
  */
  const deselectAllImages = () => {
    const updatedImageData = imageData.map((image) => ({
      ...image,
      selected: false,
    }));
    setImageData(updatedImageData);
  };

  /* 
    set the header title based on the selected images
  */
  const numSelectedImages = imageData.filter((image) => image.selected).length;
  const title =
    numSelectedImages > 0 ? (
      <h1 className="text-2xl font-bold">
        <label htmlFor="seleted" className="flex items-center gap-4">
          <input
            type="checkbox"
            id="seleted"
            checked
            className="h-5 w-5 text-blue-700 cursor-pointer"
            onChange={deselectAllImages}
          />
          <span>{numSelectedImages} Files Selected</span>
        </label>
      </h1>
    ) : (
      <h1 className="text-2xl font-bold">Gallery</h1>
    );

  /* 
      references the draged image and drag over image
  */
  const dragItem = useRef(null);
  const dragOverItem = useRef(null);

  /* 
      handler for onDragStart event listeners
  */
  const handleDragStart = (e, index) => {
    e.dataTransfer.setData("text/plain", index);
    dragItem.current = index;
    setDragging(true);
    setDragItemIndex(index); // set the dragged image index to the state
  };

  /* 
    handler for onDragOver event listeners
  */
  const handleDragEnter = (e, index) => {
    e.preventDefault();
    dragOverItem.current = index; // set the dragged over image index to the state
    setDragOverIndex(index);
  };

  /* 
    handler for onDragEnd event listeners
    -> That sort the images By LTR  
  */
  const handleDragEnd = () => {
    let _items = [...imageData];
    const draggedItemContent = _items.splice(dragItem.current, 1)[0]; // remove the dragged image

    _items.splice(dragOverItem.current, 0, draggedItemContent); //sort the images By LTR

    dragItem.current = null; // set the reference null
    dragOverItem.current = null;

    // set the dragging state and drag index to null
    setDragging(false);
    setDragOverIndex(null);
    setDragItemIndex(null);

    setImageData([..._items]); // set the sort image data to state
  };

  /* 
    handler to add new images
  */
  const handleAddImage = (imageFile) => {
    // Create a new image component using the selected image file
    const newImageComponent = {
      id: uuidv4(), // create a new unique id
      url: URL.createObjectURL(imageFile), // Use a temporary URL for the selected image

      isChecked: false, // Initialize isChecked as false
    };

    // Update the imageComponents state by adding the new image component
    setImageData([...imageData, newImageComponent]);
  };

  return (
    <section className="md:w-1/2  container mx-auto bg-white rounded-lg shadow">
      <div className="flex flex-col gap-y-2">
        {/* 
          nav section
        */}
        <nav className="py-4 px-6">
          <article className="flex flex-row justify-between items-center">
            <>{title}</>
            {numSelectedImages > 0 && (
              <button
                className="text-red-500 font-medium"
                onClick={deleteSelectedItems}
              >
                Delete files
              </button>
            )}
          </article>
        </nav>
        <hr />

        {/* 
          gellery section
        */}
        <section className="h-full w-full p-6">
          <div className="grid lg:grid-cols-5 md:grid-cols-4 grid-cols-3 gap-6">
            {imageData.map((img, index) => (
              <SingleImage
                key={index}
                index={index}
                dragItemIndex={dragItemIndex}
                dragOverIndex={dragOverIndex}
                dragging={dragging}
                img={img}
                toggleImageSelection={toggleImageSelection}
                handleDragStart={handleDragStart}
                handleDragEnter={handleDragEnter}
                handleDragEnd={handleDragEnd}
              />
            ))}

            <AddImage handleAddImage={handleAddImage} />
          </div>
        </section>
      </div>
    </section>
  );
};

export default ImageGallery;
