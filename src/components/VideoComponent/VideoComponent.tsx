import React from 'react';
import YouTube from 'react-youtube';
import './VideoComponent.scss';

type Props = {
  videoUrl: string,
};

export const VideoComponent: React.FC<Props> = ({ videoUrl }) => {
  const videoId = videoUrl.split('v=')[1];

  return (
    <div className="video__wrapper">
      <YouTube videoId={videoId} />
    </div>
  );
};
