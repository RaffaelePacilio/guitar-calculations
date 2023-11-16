import React from 'react';
import './MyComponent.css';

interface MyComponentProps {
  initialNote: string;
  accidental: 'diesis' | 'bemolle';
  highlightNotes?: string[];
}

const MyComponent: React.FC<MyComponentProps> = ({ initialNote, accidental, highlightNotes }) => {
  const myArr = [
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

  // Trova l'indice della tupla contenente initialNote
  const initialIndex = myArr.findIndex((row) => row.includes(initialNote));

  if (initialIndex === -1) {
    console.error(`Note "${initialNote}" non trovata nell'array.`);
    return null;
  }

  // Crea l'array ripetuto in base all'indice iniziale
  const repeatedArr = new Array(24).fill(null).map((_, index) => {
    const row = myArr[(initialIndex + index) % myArr.length];
    return row.length === 1 ? row[0] : accidental === 'diesis' ? row[0] : row[1];
  });

  return (
    <div className="keyboard">
      {repeatedArr.map((value, index) => (
        <div key={index} className={index === 0 ? 'first-key' : index === 1 ? 'first-fret' : 'other-key'}>
          {highlightNotes && highlightNotes.includes(value) ? (
            <span style={{ color: 'red' }}>{value}</span>
          ) : (
            value
          )}
        </div>
      ))}
    </div>
  );
};

export default MyComponent;