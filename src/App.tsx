import React, { FC, useState } from 'react';
import './App.css';
import MyComponent from './MyComponent';

interface AppProps {}

type NoteTuple = readonly [string] | readonly [string, string];

const App: FC<AppProps> = () => {
  const [selectedAccidental, setSelectedAccidental] = useState<'diesis' | 'bemolle'>('bemolle');
  const [myNum, setMyNum] = useState<string>('2,2,1,2,2,2,1');
  const [startStr, setStartStr] = useState<string>('G');
  const [result, setResult] = useState<string[]>([]);

  const handleChangeAccidental = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedAccidental(event.target.value as 'diesis' | 'bemolle');
  };

  const handleMyNumChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMyNum(event.target.value);
  };

  const handleStartStrChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setStartStr(event.target.value);
  };

  const handleRecalculate = () => {
    const myNumArray = myNum.split(',').map((num) => parseInt(num, 10));
    const myArr: NoteTuple[] = [
      ['C'],
      ['C#', 'Db'],
      ['D'],
      ['D#', 'Eb'],
      ['E'],
      ['F'],
      ['F#', 'Gb'],
      ['G'],
      ['G#', 'Ab'],
      ['A'],
      ['A#', 'Bb'],
      ['B'],
    ];

    const calculatedResult = extractStrings(myArr, myNumArray, startStr);
    setResult(calculatedResult);
    console.log(calculatedResult);
  };

  function extractStrings(myArr: NoteTuple[], myNum: number[], startStr: string) {
    let result: string[] = [];

    if (!startStr) {
      console.error('Il valore di startStr è undefined o vuoto.');
      return result;
    }

    let startIndex = myArr.findIndex((tuple) => tuple.includes(startStr[0]));

    if (startIndex === -1) {
      console.error(`Note "${startStr}" non trovata nell'array.`);
      return result;
    }

    let currentIndex = startIndex;

    for (let num of myNum) {
      if (currentIndex < 0) {
        currentIndex += myArr.length;
      }

      result.push(myArr[currentIndex][0]);
      currentIndex = (currentIndex + num) % myArr.length;
    }

    return result;
  }

  const noteOptions = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

  return (
    <>
      <div>
        {result.length > 0 && (
          <div>
            <h2>Scala:</h2>
            <p>{result.join(', ')}</p>
          </div>
        )}
        <MyComponent accidental={selectedAccidental} initialNote="E" highlightNotes={result} />
        <MyComponent accidental={selectedAccidental} initialNote="B" highlightNotes={result} />
        <MyComponent accidental={selectedAccidental} initialNote="G" highlightNotes={result} />
        <MyComponent accidental={selectedAccidental} initialNote="D" highlightNotes={result} />
        <MyComponent accidental={selectedAccidental} initialNote="A" highlightNotes={result} />
        <MyComponent accidental={selectedAccidental} initialNote="E" highlightNotes={result} />
      </div>
      <div>
        <label htmlFor="accidental">Seleziona l'accidentale:</label>
        <select
          id="accidental"
          value={selectedAccidental}
          onChange={handleChangeAccidental}
        >
          <option value="diesis">Diesis</option>
          <option value="bemolle">Bemolle</option>
        </select>
        <div>
          <label htmlFor="myNum">Inserisci l'array myNum:</label>
          <input
            type="text"
            id="myNum"
            value={myNum}
            onChange={handleMyNumChange}
          />
        </div>
        <div>
          <label htmlFor="startStr">Seleziona il valore di startStr:</label>
          <select
            id="startStr"
            value={startStr}
            onChange={handleStartStrChange}
          >
            {noteOptions.map((note) => (
              <option key={note} value={note}>
                {note}
              </option>
            ))}
          </select>
        </div>
        <div>
          <button onClick={handleRecalculate}>Ricalcola</button>
        </div>
      </div>
    </>
  );
};

export default App;