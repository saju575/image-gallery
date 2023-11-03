// import { useState } from "react";
// import { dummeyImageData } from "../../dummeyImage";

// const ImageGallery = () => {

//     // Create a copy of the initial data and add the "selected" property
//   const initialDataWithSelection = dummeyImageData.map((image) => ({
//     ...image,
//     selected: false,
//   }));

//   const [imageData, setImageData] = useState(initialDataWithSelection);

//   return (
//     <section className="lg:w-1/2 md:w-3/4 w-full bg-white rounded-lg shadow">
//       <div className="flex flex-col gap-y-2">
//         <nav className="py-4 px-6">
//           <article className="flex flex-row justify-between items-center">
//             <h1 className="text-2xl font-bold">Gallery</h1>
//             <button className="text-red-500 font-medium">Delete files</button>
//           </article>
//         </nav>
//         <hr />
//         <section className="h-full w-full p-6">
//           <div className="grid lg:grid-cols-5 md:grid-cols-3 grid-cols-1 gap-6">
//             {imageData.map((img) => {
//               if (img.id === 1) {
//                 return (
//                   <div
//                     key={img.id}
//                     className="group relative before:absolute before:h-full before:w-full before:rounded-lg before:transition-colors before:cursor-move md:col-span-2 md:row-span-2 hover:before:bg-black/50"
//                     draggable="true"
//                   >
//                     <img
//                       alt="1"
//                       loading="lazy"
//                       decoding="async"
//                       data-nimg="1"
//                       className="h-full w-full max-w-full rounded-lg object-contain border-2 "
//                       src={img.url}
//                     />
//                     <input
//                       type="checkbox"
//                       name="1"
//                       id="1"
//                       className="absolute top-4 left-4 h-5 w-5 accent-blue-500 group-hover:opacity-100 transition-opacity delay-100 duration-100 ease-linear cursor-pointer opacity-0 "
//                     />
//                   </div>
//                 );
//               } else {
//                 return (
//                   <div
//                     key={img.id}
//                     className="group relative  before:absolute before:h-full before:w-full before:rounded-lg before:transition-colors before:cursor-move col-span-1 hover:before:bg-black/50"
//                     draggable="true"
//                   >
//                     <img
//                       alt="2"
//                       loading="lazy"
//                       decoding="async"
//                       data-nimg="1"
//                       className="h-full w-full max-w-full rounded-lg object-contain border-2 undefined"
//                       src={img.url}
//                     />
//                     <input
//                       type="checkbox"
//                       name="2"
//                       id="2"
//                       className="absolute top-4 left-4 h-5 w-5 accent-blue-500 group-hover:opacity-100 transition-opacity delay-100 duration-100 ease-linear cursor-pointer opacity-0"
//                     />
//                   </div>
//                 );
//               }
//             })}
//           </div>
//         </section>
//       </div>
//     </section>
//   );
// };

// export default ImageGallery;

import { useRef, useState } from "react";
import { dummeyImageData } from "../../dummeyImage";

const ImageGallery = () => {
  const initialDataWithSelection = dummeyImageData.map((image) => ({
    ...image,
    selected: false,
  }));

  const [imageData, setImageData] = useState(initialDataWithSelection);

  //   const [allSelecedImages, setAllSelecedImages] = useState(true);

  const toggleImageSelection = (id) => {
    const updatedImageData = imageData.map((image) =>
      image.id === id ? { ...image, selected: !image.selected } : image
    );
    setImageData(updatedImageData);
  };

  const deleteSelectedItems = () => {
    const updatedImageData = imageData.filter((image) => !image.selected);
    setImageData(updatedImageData);
  };

  const deselectAllImages = () => {
    const updatedImageData = imageData.map((image) => ({
      ...image,
      selected: false,
    }));
    setImageData(updatedImageData);
  };

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

  const dragItem = useRef(null);
  const dragOverItem = useRef(null);

  const handleSort = () => {
    let _items = [...imageData];
    const draggedItemContent = _items.splice(dragItem.current, 1)[0];

    _items.splice(dragOverItem.current, 0, draggedItemContent);

    dragItem.current = null;
    dragOverItem.current = null;

    setImageData([..._items]);
  };

  return (
    <section className="md:w-1/2  container mx-auto bg-white rounded-lg shadow">
      <div className="flex flex-col gap-y-2">
        <nav className="py-4 px-6">
          <article className="flex flex-row justify-between items-center">
            <>{title}</>
            <button
              className="text-red-500 font-medium cursor-pointer"
              onClick={deleteSelectedItems}
            >
              Delete files
            </button>
          </article>
        </nav>
        <hr />
        <section className="h-full w-full p-6">
          <div className="grid lg:grid-cols-5 md:grid-cols-4 grid-cols-3 gap-6">
            {imageData.map((img, index) => (
              <div
                key={img.id}
                className={`group relative ${
                  index === 0
                    ? "before:absolute before:h-full before:w-full before:rounded-lg before:transition-colors before:cursor-move col-span-2 row-span-2"
                    : "before:absolute before:h-full before:w-full before:rounded-lg before:transition-colors before:cursor-move col-span-1"
                } hover:before:bg-black/50`}
                draggable
                onDragStart={() => (dragItem.current = index)}
                onDragEnter={() => (dragOverItem.current = index)}
                onDragEnd={handleSort}
                onDragOver={(e) => e.preventDefault()}
              >
                <img
                  alt={img.id}
                  loading="lazy"
                  decoding="async"
                  data-nimg="1"
                  className={`h-full w-full max-w-full rounded-lg object-contain border-2 ${
                    img.selected ? "opacity-50" : "opacity-100"
                  }`}
                  src={img.url}
                />
                <input
                  type="checkbox"
                  name={img.id}
                  id={img.id}
                  className={`absolute top-4 left-4 h-5 w-5 accent-blue-500 group-hover:opacity-100 transition-opacity delay-100 duration-100 ease-linear cursor-pointer ${
                    img.selected ? "opacity-100" : "opacity-0"
                  }`}
                  onChange={() => toggleImageSelection(img.id)}
                  checked={img.selected}
                />
              </div>
            ))}
          </div>
        </section>
      </div>
    </section>
  );
};

export default ImageGallery;
