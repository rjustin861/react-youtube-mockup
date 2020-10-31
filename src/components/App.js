import React, { useState, useEffect } from 'react';
import SearchBar from './SearchBar';
import VideoDetail from './VideoDetail';
import VideoList from './VideoList';
import youtube from '../apis/youtube';

const App = () => {
  const [videos, setVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);

  useEffect(() => {
    onTermSubmit('cat');
  }, []);

  const onTermSubmit = async (term) => {
    console.log(term);
    try {
      const { data } = await youtube.get('/search', { params: { q: term } });
      console.log(data);
      setVideos(data.items);
      setSelectedVideo(data.items[0]);
    } catch (error) {
      console.log(error);
    }
  };

  const onVideoSelect = (video) => {
    console.log(video);
    setSelectedVideo(video);
  };

  return (
    <div className='ui container'>
      <SearchBar onTermSubmit={onTermSubmit} />
      <div className='ui grid'>
        <div className='row'>
          <div className='eleven wide column'>
            <VideoDetail video={selectedVideo} />
          </div>
          <div className='five wide column'>
            <VideoList videos={videos} onVideoSelect={onVideoSelect} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
