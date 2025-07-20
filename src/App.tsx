import { useEffect } from "react";
import "./App.css";

function App() {
  useEffect(() => {
    (async function () {
      const response = await fetch(
        "https://musicfun.it-incubator.app/api/1.0/playlists",
        {
          headers: {
            "api-key": import.meta.env.VITE_API_KEY,
          },
        }
      );
      const data = await response.json();
      console.log(data);
    })();
  }, []);

  return <></>;
}

export default App;
