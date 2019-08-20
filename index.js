import Bound from "bounds.js";

const boundary = Bound({
  margins: {
    top: 100
  }
});

const main3 = document.querySelector(".main3");
const image = document.querySelectorAll("img");

const whenImageEnters = (image) => {
  return () => {
    console.log(image.dataset.src);
    image.src = image.dataset.src;
    boundary.unWatch(image);
    console.log("show Image");
  };
};

boundary.watch(
  main3,
  () => {
    main3.classList.add("reveal");
    console.log("show");
  },
  main3.classList.remove("reveal")
);

image.forEach(img => {
  boundary.watch(img, whenImageEnters(img));
});
