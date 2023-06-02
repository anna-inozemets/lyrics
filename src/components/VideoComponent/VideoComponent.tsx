import React, { useEffect } from 'react';
import YouTube from 'react-youtube';
import './VideoComponent.scss';

type Props = {
  videoUrl: string,
  setIsUkranianVideo: (value: boolean) => void;
};

export const VideoComponent: React.FC<Props> = ({ videoUrl, setIsUkranianVideo }) => {
  const videoId = videoUrl === ''
    ? 'jRIooapZy1w'
    : videoUrl.split('v=')[1];

  useEffect(() => {
    if (videoId === 'jRIooapZy1w') {
      setIsUkranianVideo(true);
    }
  }, []);

  return (
    <div className="video__wrapper">
      <YouTube videoId={videoId} />
    </div>
  );
};
