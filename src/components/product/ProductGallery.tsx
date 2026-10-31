import { useState } from "react";

interface ProductGalleryProps {
  images: string[];
  title: string;
}
//images: string[] means it's array of strings, image link list, coz product can have several photos 
//title is just string which is needed for alt txt for search and screen readers


//function ProductGallery({ images, title }: ProductGalleryProps) -> by that we say that received props object 
//must follow ProductGalleryProps rules (so component that will use this func (product page here) it must send images as array and title)
export function ProductGallery({ images, title }: ProductGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  //so first photo opens on 0 index. images[0] images[1] images[2]
  //setSelectedIndex remembers which photo user clicked (setSelectedIndex(2). by onClick setSelectedIndex changes selectedIndex

  return (
    <div className="flex flex-col gap-3">
      <img
        src={images[selectedIndex]}
        alt={title}
        className="w-full h-96 object-contain bg-gray-50 rounded-lg border border-gray-100 p-4"
      />
      {
        /**
          so images[selectedIndex] images are all array of images and selectedIndex the one that was clicked by index changed, shows big photo
         */
      }

      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-2">
          {images.map((image, index) => (
            <button
              key={image}
              type="button"
              aria-label={`Show image ${index + 1}`}
              onClick={() => setSelectedIndex(index)}
              className={`rounded border p-1 transition-all ${
                index === selectedIndex
                  ? "border-gray-900 ring-1 ring-gray-900"
                  : "border-gray-200 hover:border-gray-300"
              }`}
            >
              <img
                src={image}
                alt=""
                className="h-16 w-16 object-contain bg-gray-50 rounded"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

/*
so map runs on every image array separately takes 2 thigs image URL, and index - image's index number in array.
since every image link is unique we use it as a key.
onClick={() => setSelectedIndex(index)} when user click on small pic, and it writes in state that image index.
index === selectedIndex -> this compares small image's index to current image that is chosen if they are equal
that means user opened it on bigger photo so it will have darker border, if not lighter.
last part is for smaller photo styles. so map creates as many times as necesasary button with image.<btn><img></btn> 
*/
