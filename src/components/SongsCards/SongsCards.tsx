import React from 'react';
import './SongsCards.scss';
import { PartSongInfo } from '../../types/PartSongInfo';
import { SongCard } from '../SongCard';

type Props = {
  songsData: PartSongInfo[],
};

export const SongsCards: React.FC<Props> = ({
  songsData,
}) => {
  return (
    <div className="songs__cards">
      {songsData.map(songData => (
        <SongCard key={songData.id} songData={songData} />
      ))}
    </div>
  );
};
