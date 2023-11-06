const SingleImage = ({
  img,
  handleDragEnd,
  handleDragStart,
  handleDragEnter,
  index,
  dragging,
  dragOverIndex,
  dragItemIndex,
  toggleImageSelection,
}) => {
  return (
    <div
      className={`group relative before:absolute before:h-full before:w-full before:rounded-lg before:transition-colors before:cursor-move ${
        index === 0 ? "col-span-2 row-span-2" : "col-span-1"
      } ${
        dragging &&
        dragOverIndex === index &&
        "border-2 border-dashed border-slate-300" // drag over image section added dotted border
      } ${img.selected ? "" : "hover:before:bg-black/50"}`}
      draggable
      onDragStart={(e) => handleDragStart(e, index)}
      onDragEnter={(e) => handleDragEnter(e, index)}
      onDragEnd={handleDragEnd}
      onDragOver={(e) => e.preventDefault()}
    >
      <img
        alt={img.id}
        loading="lazy"
        decoding="async"
        data-nimg="1"
        className={`h-full w-full max-w-full rounded-lg object-cover border-2 duration-500 ${
          img.selected ? "opacity-50" : "opacity-100"
        } ${dragging && dragOverIndex === index ? "hidden" : "block"}`} //drag Over image is hidden
        src={img.url}
      />
      <input
        type="checkbox"
        name={img.id}
        id={img.id}
        className={`absolute top-4 left-4 h-5 w-5 accent-blue-500 group-hover:opacity-100 transition-opacity delay-100 duration-100 ease-linear cursor-pointer ${
          img.selected ? "opacity-100" : "opacity-0"
        } ${dragging && dragItemIndex === index ? "hidden" : "block"}`} // dragged image checked input field is hidden  while dragging
        onChange={() => toggleImageSelection(img.id)}
        checked={img.selected}
      />
    </div>
  );
};

export default SingleImage;
