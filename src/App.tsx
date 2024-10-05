import { useState } from "react";
import "./App.css";
import { removeBackground } from "@imgly/background-removal";

function App() {
  const [blob, setBlob] = useState("");

  return (
    <>
      <h1>Vite + React</h1>
      <div className="card">
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
        {blob && <img src={blob} width={600} height={400} />}
      </div>
    </>
  );
}

export default App;
