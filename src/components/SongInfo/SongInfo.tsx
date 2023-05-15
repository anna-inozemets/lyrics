import React from 'react';
import { Song } from '../../types/Song';

type Props = {
  songData: Song,
};

export const SongInfo: React.FC<Props> = ({ songData }) => {
  if (songData.id === 0) {
    return (
      <p>
        No data
      </p>
    );
  }

  return (
    <ul>
      <li>{songData.id}</li>
      <li>{songData.title}</li>
      <li>{songData.url}</li>
      <li>{songData.lyrics}</li>
      <li>{songData.albumArt}</li>
    </ul>
  );
};
