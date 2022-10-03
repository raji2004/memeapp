import { useState, useEffect, useRef } from "react";
import { toPng } from "dom-to-image";
import Draggable from "react-draggable";
export default function Meme() {
  const [meme, setMeme] = useState({
    topText: "",
    bottomText: "",
    randomImage: "http://i.imgflip.com/1bij.jpg",
  });
  const [selectedImage, setSelectedImage] = useState(null);
  const [Error, setError] = useState("");
  const [allMemes, setAllMemes] = useState([]);
  //"image/jpeg" or "image/png"
  const [size, setsize] = useState("");
  const [color, setcolor] = useState("");
  function colorchange(e) {
    setcolor(e.target.value);
  }

  function Drag(event) {
    console.log(event.target);
  }
  function Textsize(event) {
    setsize(event.target.value + "px");
  }
  useEffect(() => {
    fetch("https://api.imgflip.com/get_memes")
      .then((res) => res.json())
      .then((data) => setAllMemes(data.data.memes));
  }, []);

  function getMemeImage() {
    const randomNumber = Math.floor(Math.random() * allMemes.length);
    const url = allMemes[randomNumber].url;
    setMeme((prevMeme) => ({
      ...prevMeme,
      randomImage: url,
    }));
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setMeme((prevMeme) => ({
      ...prevMeme,
      [name]: value,
    }));
  }
  // dowload image functionalities
  const domEl = useRef(null);
  const downloadImage = async () => {
    const dataUrl = await toPng(domEl.current);
    // download image
    const link = document.createElement("a");
    link.download = `${meme.topText}.png`;
    link.href = dataUrl;
    link.click();
  };

  return (
    <main>
      <div className="form">
        <input
          type="text"
          placeholder="Top text"
          className="form--input"
          name="topText"
          value={meme.topText}
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="Bottom text"
          className="form--input"
          name="bottomText"
          value={meme.bottomText}
          onChange={handleChange}
        />
        {Error ? <div className="error">{Error}</div> : null}
        <button className="form--buton" onClick={downloadImage}>
          Download image
        </button>
        <input
          type="number"
          name="size"
          className="form--buon"
          placeholder="textsize"
          onChange={Textsize}
        />
        <input
          type="color"
          name="color"
          className="form--buon"
          onChange={colorchange}
        />
        <input
          id="me"
          type="file"
          name="myImage"
          className="form--buton"
          onChange={(event) => {
            console.log(event.target.files[0]);
            // img checker
            if (
              event.target.files[0].type === "image/jpeg" ||
              event.target.files[0].type === "image/png"
            ) {
              setSelectedImage(event.target.files[0]);
              setError("");
            } else {
              console.log("true");

              setError(
                "Error!!! you didnt upload an image!!!!! pls reload and try again"
              );
            }
          }}
        />
        <button className="form--button" onClick={getMemeImage}>
          Get a new meme image
        </button>
      </div>
      <div className="meme" ref={domEl}>
        <img
          src={
            selectedImage
              ? URL.createObjectURL(selectedImage)
              : meme.randomImage
          }
          alt="p"
          className="meme--image"
        />
        <Draggable>
          <h2
            className="meme--text top"
            onDragMove={Drag}
            style={{
              fontSize: size ? size : "",
              color: color ? color : "",
              position: "absolute",
              top: "0",
            }}
          >
            {meme.topText}
          </h2>
        </Draggable>
        <Draggable>
          <h2
            className="meme--text bottom"
            style={{ fontSize: size ? size : "" }}
          >
            {meme.bottomText}
          </h2>
        </Draggable>
      </div>
    </main>
  );
}
