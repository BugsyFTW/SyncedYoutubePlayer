import { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import classNames from "classnames";
import styles from "./Room.module.scss";

import { PLAYER_ID, SocketEvent } from '@config/constants';
import { getIdFromUrl } from "@lib/utils";
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
        setRoomId(id);
        await loadYouTubePlayer();

        socket.connect();
        socket.on(SocketEvent.CONNECTION, () => socket.emit(SocketEvent.USER_CONNECTED, id));
        socket.on(SocketEvent.CONNECTION_ERROR, (error) => console.error(error));
      } catch (error) {
        console.error("Failed to connect! ", error);
      }
    };
    fetchData();
  }, [params.id]);

  useEffect(() => {
    const handleVideoLoading = (videoId: string) => {
      player.loadVideoById(videoId);
    };

    // Set up the event listener for ON_VIDEO_CHANGED after the player is loaded
    if (player) {
      socket.on(SocketEvent.LOADING_VIDEO, handleVideoLoading);

      //socket.on(SocketEvent.PLAY_VIDEO, handleVideoPlay);
      //socket.on(SocketEvent.PAUSE_VIDEO, handleVideoPause);
    }

    // Clean up the event listener when the component unmounts
    return () => {
      if (player) {
        socket.off(SocketEvent.LOADING_VIDEO, handleVideoLoading);
      }
    };
  }, [player, roomId]);

  const handleUrlChange = (event) => {
    setUrl(event.target.value);
  }

  const handleKeyPress = async (event) => {
    if (event.keyCode == 13 && url.length > 0) {
      const id = getIdFromUrl(url);
      emitVideoLoad({ roomId, msg: id });
      player.loadVideoById(id);
    }
  }

  const loadYouTubePlayer = async () => {
    setPlayer(await YouTubePlayer(PLAYER_ID, {
      height: 480,
      width: 853,
      playerVars: {
        'autoplay': 1,
        'mute': 1,
      },
      events: {
        onStateChange: onPlayerStateChange,
        onReady: onPlayerReady
      }
    }));
    // Add an event listener for the custom 'timeChange' event
    window.addEventListener('timeChange', onPlayerTimeChange);
  };

  const onPlayerTimeChange = (event) => {
    console.log(event.detail.currentTime);
  }

  const findMe = (value: number) => {
    return Object.keys(YT.PlayerState)[Object.values(YT.PlayerState).indexOf(value)];
  }

  const onPlayerStateChange: YT.PlayerEventHandler<YT.OnStateChangeEvent> = (event) => {
    //console.log(findMe(event.data))
    //console.log("Data: ", event.data);
    //console.log();
    /*switch (event.data) {
      case YT.PlayerState.PAUSED:
        console.log(player.getCurrentTime());
        emitPauseVideo({ roomId: roomID, msg: event.data });
        break;
      case YT.PlayerState.PLAYING:
        emitPlayVideo({ roomId: roomID, msg: event.data });
        console.log("Playing");
        break;
    }*/
  };

  const onPlayerReady: YT.PlayerEventHandler<YT.PlayerEvent> = (evnt) => {
    evnt.target.playVideo();
  }

  const emitVideoLoad = (data: SocketMessage) => {
    socket.emit(SocketEvent.LOAD_VIDEO, data);
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
