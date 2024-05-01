import { useState, useCallback, useEffect, useRef } from 'react'

const App = () => {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charactersAllowed, setCharactersAllowed] = useState(false);
  const [password, setPassword] = useState('');
  const passwordRef = useRef(null)


  const passwordGenerator = useCallback(() => {
    let pass = '';
    let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

    if (numberAllowed) str += '0123456789';
    if (charactersAllowed) str += '!@#$%^&*-=+_[]{}~`';

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }
    setPassword(pass);

  }, [length, numberAllowed, charactersAllowed, setPassword]);

  const copyPassToClipBoard = useCallback(() => {

    passwordRef.current?.select();

    // below code for select the range
    // passwordRef.current?.setSelectionRange(0, 3);

    navigator.clipboard.writeText(password);

    // .then(()=> alert("Copied to clipboard!"),
    // ()=>alert("Failed to copy"));
  }, [password]);

  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, charactersAllowed])

  return (
    <div className='flex items-center justify-center h-screen'>
      <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-6 text-orange-500 bg-gray-700'>
        <h1 className="text-white text-center mb-3 text-xl font-semibold">Password Generator</h1>
        <div className='flex shadow rounded-lg overflow-hidden mb-4'>
          <input
            type="text"
            value={password}
            className='outline-none w-full py-1 px-3'
            placeholder='password'
            onChange={(e) => setPassword(e.target.value)}
            ref={passwordRef}
            readOnly
          />

          <button
            className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0 hover:bg-orange-500 hover:text-black'
            title='click to copy'
            onClick={copyPassToClipBoard}
          >copy</button>
        </div>

        <div className='flex text-md gap-x-2'>
          <div className='flex items-center gap-x-1'>
            <input
              type="range"
              min={8}
              max={20}
              value={length}
              className='cursor-pointer'
              onChange={(e) => setLength(e.target.value)}
            />
            <label>Length: {length}</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input
              type="checkbox"
              defaultChecked={numberAllowed}
              id='numberInput'
              onChange={() => setNumberAllowed(prev => !prev)}
            />
            <label htmlFor="numberInput">Number</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input
              type="checkbox"
              defaultChecked={charactersAllowed}
              id='charactersInput'
              onChange={() => setCharactersAllowed(prev => !prev)}
            />
            <label htmlFor="charactersInput">Characters</label>
          </div>
        </div>

      </div>
    </div>
  )
}

export default App