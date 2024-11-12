// src/VideoPlayer.js
import { useRef, useEffect } from "react";
import videojs from "video.js";
import "video.js/dist/video-js.css";
import axios from "axios";

const VideoPlayer = () => {
  const videoRef = useRef(null);
  const playerRef = useRef(null);

  useEffect(() => {
    // Set up the video.js player with the live stream URL
    const hlsUrl = "http://localhost:10000/api/cameras/fb31535a-fb34-4a3e-a16d-25dd2418e1a1/live"; // Update to your server URL

    const fetchHlsUrl = async () => {
        const response = await axios.get(hlsUrl, {
            withCredentials: true
        });

        const liveStreamUrl = response.request.responseURL;
        console.log(liveStreamUrl);

        playerRef.current = videojs(videoRef.current, {
          controls: true,
          autoplay: false,
          preload: "auto",
          sources: [
            {
              src: hlsUrl,
              type: "application/vnd.apple.mpegurl",
            },
          ],
        });
    };

    fetchHlsUrl();


    return () => {
      if (playerRef.current) {
        playerRef.current.dispose();
      }
    };
  }, []);

  return (
    <div>
      <div data-vjs-player>
        <video ref={videoRef} className="video-js vjs-big-play-centered" />
      </div>
    </div>
  );
};

export default VideoPlayer;

