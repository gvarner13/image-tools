import { useState } from "react";
import "./App.css";
import { removeBackground } from "@imgly/background-removal";
// import gsap from "https://cdn.skypack.dev/gsap@3.12.0";
import ExifReader from "exifreader";
import ParalaxCard from "./components/ParalaxCard";

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

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = noBgBlob;
    link.download = "nobg-test";
    link.click();
  };

  return (
    <>
      <h1>👻 Image Tools</h1>
      <div>
        <div data-split aria-hidden="true">
          I built a simple paralax react component that I saw on one of the many
          cool css examples that @Jhey has produced.
        </div>
        <div className="cardshuffle">
          <div>
            <ParalaxCard
              bgImage="https://assets.codepen.io/605876/do-not-copy-osaka-sky.jpeg"
              fgImage="https://assets.codepen.io/605876/do-not-copy-osaka-tower.png"
              title="Osaka"
            />
            <ParalaxCard
              bgImage="https://assets.codepen.io/605876/do-not-copy-osaka-sky.jpeg"
              fgImage="https://assets.codepen.io/605876/do-not-copy-osaka-tower.png"
              title="Osaka"
            />
          </div>
          <div>
            <ParalaxCard
              bgImage="https://assets.codepen.io/605876/do-not-copy-osaka-sky.jpeg"
              fgImage="https://assets.codepen.io/605876/do-not-copy-osaka-tower.png"
              title="Osaka"
            />
          </div>
          <div>
            <ParalaxCard
              bgImage="https://assets.codepen.io/605876/do-not-copy-osaka-sky.jpeg"
              fgImage="https://assets.codepen.io/605876/do-not-copy-osaka-tower.png"
              title="Osaka"
            />
          </div>
        </div>
      </div>
      <div style={{ display: "flex" }} onPointerMove={handlePointerMove}>
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
      </div>
      <div>
        <button onClick={handleDownload}>Download Image</button>
      </div>
    </>
  );
}

export default App;
