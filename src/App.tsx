import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { removeBackground } from "@imgly/background-removal";

function App() {
  const [count, setCount] = useState(0);
  const [blob, setBlob] = useState("");

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
        <input
          type="file"
          name="file"
          id="file"
          onChange={(e) => {
            // setLoading(true);
            const [file]: any = e.target.files;
            setBlob(URL.createObjectURL(file));
            removeBackground(file).then((blob: Blob) => {
              setBlob(URL.createObjectURL(blob));
              setTimeout(() => {
                // setLoading(false);
                console.log("done");
              }, 1000);
            });
          }}
        />
        {blob && <img src={blob} width={300} height={300} />}
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
