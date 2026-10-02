import { Fragment } from 'react';

// Keeps hyphenated words ("End-of-Life", "24-Hour") from splitting across lines.
export default function NoBreak({ text }) {
  const words = text.split(' ');
  return words.map((w, i) => {
    const space = i < words.length - 1 ? ' ' : '';
    return (
      <Fragment key={i}>
        {w.includes('-') ? <span className="nowrap">{w}</span> : w}
        {space}
      </Fragment>
    );
  });
}
