import { useState } from 'react';
import { img } from '../content.js';

// Arched portrait. Falls back to the logo until the photo file is added.
export default function TeamPhoto({ person }) {
  const [missing, setMissing] = useState(!person.photo);
  return (
    <div className="frame frame--arch frame--portrait team-photo">
      <div className="frame__img">
        {missing ? (
          <div className="team-photo__placeholder">
            <img src="/images/logo-mark.png" width="456" height="480" alt="" />
          </div>
        ) : (
          <img
            src={img(person.photo.src)}
            width="800"
            height="1000"
            alt={`${person.name}, ${person.role}`}
            loading="lazy"
            onError={() => setMissing(true)}
          />
        )}
      </div>
    </div>
  );
}
