import { useState } from "react";
import "./App.css";
import { removeBackground } from "@imgly/background-removal";
// import gsap from "https://cdn.skypack.dev/gsap@3.12.0";
import ExifReader from "exifreader";
import ParalaxCard from "./components/ParalaxCard";
import * as Slider from "@radix-ui/react-slider";
import { CopyBlock, dracula } from "react-code-blocks";

const testText = `type AppProps = {
  title: string;
  bgImage: string;
  fgImage: string;
};

const ParalaxCard = ({ title, bgImage, fgImage }: AppProps) => {
  return (
    <article>
      <img src={bgImage} alt="" />
      <h3>{title}</h3>
      <img src={fgImage} alt="" />
    </article>
  );
};

export default ParalaxCard;`;

const SliderDemo = ({ setXLocation, xLocation }) => (
  <form>
    <Slider.Root
      className="SliderRoot"
      value={[xLocation]}
      max={50}
      min={-50}
      step={1}
      onValueChange={(value) => setXLocation(value)}
    >
      <Slider.Track className="SliderTrack">
        <Slider.Range className="SliderRange" />
      </Slider.Track>
      <Slider.Thumb className="SliderThumb" aria-label="Volume" />
    </Slider.Root>
  </form>
);

function App() {
  const [blob, setBlob] = useState("");
  const [noBgBlob, setNoBgBlob] = useState("");
  const [loading, setLoading] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [bgText, setBgText] = useState("");
  const [textXLocation, setTextXLocation] = useState(0);
  const [textYLocation, setTextYLocation] = useState(0);

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
      <div className="hero">
        <h1>👻 Image Tools</h1>
        <div>
          <div data-split aria-hidden="true">
            I built a simple paralax react component that I saw on one of the
            many cool css examples that @Jhey has produced.
          </div>
          <div className="cardshuffle">
            <ParalaxCard
              bgImage="https://bg-removal-french-test.s3.us-east-1.amazonaws.com/DSC00005.JPG"
              fgImage="https://bg-removal-french-test.s3.us-east-1.amazonaws.com/french-nobg.png"
              title="French"
            />
          </div>
        </div>
      </div>
      <div className="codeblock">
        <h2>Code Example</h2>
        <CopyBlock
          text={testText}
          language="html"
          codeBlock
          showLineNumbers={false}
          theme={dracula}
        />
      </div>
      <div style={{ display: "flex" }} onPointerMove={handlePointerMove}>
        <h2>Code 🧪</h2>
        <div style={{ width: "600px" }}>
          <article
            style={{ "--xtest": textXLocation, "--ytest": textYLocation }}
          >
            {blob && (
              <>
                <img
                  src={blob}
                  alt=""
                  // style={{ filter: "saturate(200%) grayscale(1)" }}
                />
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
          <SliderDemo
            setXLocation={setTextXLocation}
            xLocation={textXLocation}
          />
          <SliderDemo
            setXLocation={setTextYLocation}
            xLocation={textYLocation}
          />
          <button onClick={handleDownload}>Download Image</button>
        </div>
      </div>
      <div style={{ marginBottom: "4rem" }}></div>
    </>
  );
}

export default App;
