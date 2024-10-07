import { useState } from "react";
import "./App.css";
import { removeBackground } from "@imgly/background-removal";
// import gsap from "https://cdn.skypack.dev/gsap@3.12.0";
import ExifReader from "exifreader";

function App() {
  const [blob, setBlob] = useState("");
  const [noBgBlob, setNoBgBlob] = useState("");
  const [loading, setLoading] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [bgText, setBgText] = useState("");

  const handlePointerMove = (event) => {
    setPosition({ x: event.clientX, y: event.clientY });
    // console.log(position);
    // gsap.set(document.documentElement, {
    //   "--x": gsap.utils.mapRange(0, window.innerWidth, -1, 1, event.clientX),
    //   "--y": gsap.utils.mapRange(0, window.innerHeight, -1, 1, event.clientY),
    // });
  };

  return (
    <>
      <h1>👻 Image Tools</h1>
      <div style={{ display: "flex" }} onPointerMove={handlePointerMove}>
        <div>
          <article>
            <img
              src="https://assets.codepen.io/605876/do-not-copy-osaka-sky.jpeg"
              alt=""
            />
            <h3>Osaka</h3>
            <img
              src="https://assets.codepen.io/605876/do-not-copy-osaka-tower.png"
              alt=""
            />
            <div className="blur">
              <img
                src="https://assets.codepen.io/605876/do-not-copy-osaka.jpeg"
                alt=""
              />
              <div></div>
            </div>
            <div className="content">
              <p>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-6 h-6"
                >
                  <path d="M15.75 8.25a.75.75 0 0 1 .75.75c0 1.12-.492 2.126-1.27 2.812a.75.75 0 1 1-.992-1.124A2.243 2.243 0 0 0 15 9a.75.75 0 0 1 .75-.75Z" />
                  <path
                    fill-rule="evenodd"
                    d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM4.575 15.6a8.25 8.25 0 0 0 9.348 4.425 1.966 1.966 0 0 0-1.84-1.275.983.983 0 0 1-.97-.822l-.073-.437c-.094-.565.25-1.11.8-1.267l.99-.282c.427-.123.783-.418.982-.816l.036-.073a1.453 1.453 0 0 1 2.328-.377L16.5 15h.628a2.25 2.25 0 0 1 1.983 1.186 8.25 8.25 0 0 0-6.345-12.4c.044.262.18.503.389.676l1.068.89c.442.369.535 1.01.216 1.49l-.51.766a2.25 2.25 0 0 1-1.161.886l-.143.048a1.107 1.107 0 0 0-.57 1.664c.369.555.169 1.307-.427 1.605L9 13.125l.423 1.059a.956.956 0 0 1-1.652.928l-.679-.906a1.125 1.125 0 0 0-1.906.172L4.575 15.6Z"
                    clip-rule="evenodd"
                  />
                </svg>
                <span>Osaka Castle</span>
              </p>
              <p>Osaka, Japan</p>
            </div>
          </article>
        </div>
        <div style={{ width: "600px" }}>
          <article>
            {blob && (
              <>
                <img src={blob} alt="" />
                <h3>{bgText}</h3>
                <img src={noBgBlob} alt="" />
              </>
            )}
            {loading && <div className="loading">Loading ...</div>}
            {/* <div className="blur">
              <img
                src="https://assets.codepen.io/605876/do-not-copy-osaka.jpeg"
                alt=""
              />
              <div></div>
            </div> */}
          </article>
        </div>
      </div>
      <div className="card">
        <input
          type="file"
          name="file"
          id="file"
          onChange={async (e) => {
            setLoading(true);
            const [file]: any = e.target.files;
            setBlob(URL.createObjectURL(file));
            const tags = await ExifReader.load(file);
            console.log({ tags });
            removeBackground(file).then((blob: Blob) => {
              setNoBgBlob(URL.createObjectURL(blob));
              setTimeout(() => {
                setLoading(false);
                console.log("done");
              }, 1000);
            });
          }}
        />
        <input
          name="myInput"
          value={bgText}
          onChange={(e) => setBgText(e.target.value)}
        />
        {/* {blob && <img src={blob} width={600} height={400} />} */}
      </div>
    </>
  );
}

export default App;
