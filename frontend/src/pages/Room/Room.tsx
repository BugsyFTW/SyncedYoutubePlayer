import { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import classNames from "classnames";
import styles from "./Room.module.scss";

import { PLAYER_ID, ID_REGEX, ON_USER_CONNECTION, ON_VIDEO_CHANGED, ON_OWNER_VIDEO_CHANGED } from '@config/constants';
import YouTubePlayer from "@/lib/player";

import { Label } from "@components/ui/label";
import { Input } from "@components/ui/input";
import { getRoom } from "@/services/api";
import socket from "@lib/socket";

import { SocketMessage } from "types/index";

export const Room: FC = () => {

  const params = useParams();

  const [roomId, setRoomId] = useState(null);
  const [player, setPlayer] = useState<YT.Player>(null);
  const [url, setUrl] = useState('');

  useEffect(() => {
    const { id } = params;

    const fetchData = async () => {
      try {
        await getRoom(id);
        await loadYouTubePlayer();
        setRoomId(id);
        socket.connect();
        socket.on('connect', () => socket.emit(ON_USER_CONNECTION, id));
        socket.on('connect_error', (error) => console.error(error));
      } catch (error) {
        console.error("Failed to connect! ", error);
      }
    };
    fetchData();
  }, [params.id]);

  useEffect(() => {
    const handleVideoChanged = (videoId: string) => {
      console.log(player);
      player.loadVideoById(videoId);
      player.playVideo();
    };

    // Set up the event listener for ON_VIDEO_CHANGED after the player is loaded
    if (player) {
      socket.on(ON_VIDEO_CHANGED, handleVideoChanged);
    }

    // Clean up the event listener when the component unmounts
    return () => {
      if (player) {
        socket.off(ON_VIDEO_CHANGED, handleVideoChanged);
      }
    };
  }, [player]);

  const handleUrlChange = (event) => {
    setUrl(event.target.value);
  }

  const handleKeyPress = async (event) => {
    if (event.keyCode == 13 && url.length > 0) {
      const id = getIdFromUrl(url);
      console.log(player);
      player.loadVideoById(id);
      emitVideoChange({ roomId, msg: id });
    }
  }

  const loadYouTubePlayer = async () => {
    setPlayer(await YouTubePlayer(PLAYER_ID, {
      height: 480,
      width: 853,
      playerVars: {
        'autoplay': 1,
        'mute': 1
      }
    }));
  };

  const emitVideoChange = (data: SocketMessage) => {
    socket.emit(ON_OWNER_VIDEO_CHANGED, data);
  }

  const getIdFromUrl = (url: string): string => {
    const match = url.match(ID_REGEX);
    const id_size = 11; // YouTube ID sizes are 11 digits long.
    if (match && match[2].length == id_size) {
      return match[2];
    }
    return null;
  }

  return (
    <>
      <div className={classNames(styles.input_wrapper)}>
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label>Insert YouTube URL</Label>
          <Input
            type="text"
            value={url}
            onChange={handleUrlChange}
            onKeyDown={handleKeyPress}
          />
        </div>
      </div>
      <div className={classNames(styles.player_wrapper)}>
        <div id={PLAYER_ID} />
      </div>
    </>
  );
};
