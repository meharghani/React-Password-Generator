import { useCallback, useEffect, useRef, useState } from "react";
import "./App.css";

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrsuvwxyz";

    if (numberAllowed) str += "0123456789";
    if (charAllowed) str += " !#$%&'()*+,-./:;<=>?@[]^_`{|}~";

    for (let i = 0; i < length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);

      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [length, numberAllowed, charAllowed, setPassword]);

  const passwordRef = useRef(null);

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select()
    window.navigator.clipboard.writeText(password);
  }, [password]);

  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, charAllowed, passwordGenerator]);

  return (
    <>
      <div
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1471981172431-b1c4155be4b1?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)",
        }}
        className="w-full h-screen flex flex-col justify-center items-center bg-cover bg-no-repeat"
      >
        <div className="w-[600px] text-center bg-white/70 rounded-lg shadow-md p-4">
          <h1 className="text-xl font-bold mb-3">Password Generator</h1>
          <div>
            <input
              type="text"
              className="w-[80%] rounded-l-lg text-md p-3 border border-white outline-none"
              value={password}
              readOnly
              ref={passwordRef}
            />
            <button
              className="px-5 py-3 w-[20%] cursor-pointer text-md rounded-r-lg font-bold bg-blue-600 text-white outline-none"
              onClick={copyPasswordToClipboard}
            >
              Copy
            </button>
          </div>
          <div className="w-full flex justify-evenly m-2">
            <div>
              <input
                id="length"
                type="range"
                className="mr-2"
                min={6}
                max={40}
                value={length}
                onChange={(e) => {
                  setLength(e.target.value);
                }}
              />
              <label htmlFor="lenght" className="inline-block">Length: ({length})</label>
            </div>
            <div>
              <input
                id="numberInput"
                type="checkbox"
                className="mr-2"
                defaultChecked={numberAllowed}
                onChange={() => {
                  setNumberAllowed((prev) => !prev);
                }}
              />
              <label htmlFor="numberInput" className="inline-block">Numbers</label>
            </div>
            <div>
              <input
                id="charInput"
                type="checkbox"
                className="mr-2"
                defaultChecked={charAllowed}
                onChange={() => {
                  setCharAllowed((prev) => !prev);
                }}
              />
              <label htmlFor="charInput" className="inline-block">Charactors</label>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
