import { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import classNames from "classnames";
import styles from "./Room.module.scss";

import { PLAYER_ID, TIME_CHANGE_EVENT, SocketEvent } from '@config/constants';
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

  // Setting the Room ID & socket connection
  useEffect(() => {
    const { id } = params;
    getRoom(id).then((room) => {
      setRoomId(room.uid);

      socket.connect();
      socket.on(SocketEvent.CONNECTION, () => socket.emit(SocketEvent.USER_CONNECTED, id));
      socket.on(SocketEvent.CONNECTION_ERROR, (error) => console.error(error));
    }).catch((error) => {
      console.error("Failed to connect! ", error);
    });
  }, [params.id]);

  // Setting the player & socket events
  useEffect(() => {
    if (roomId !== null) {
      loadYouTubePlayer().then((player) => {
        setPlayer(player);

        const handleVideoLoading = (videoId: string) => {
          player.loadVideoById(videoId);
        };

        // PLAYING = 1,    PAUSED = 2,
        const handleStateChange = (state: string) => {
          const msg = JSON.parse(state);

          switch (msg.state) {
            case "1":
              //player.seekTo(msg.seek, true);
              player.playVideo();
              break;
            case "2":
              player.seekTo(msg.seek, true);
              player.pauseVideo();
              break;
          }
        };

        // Set up the event listener for ON_VIDEO_CHANGED after the player is loaded
        if (player) {
          socket.on(SocketEvent.LOADING_VIDEO, handleVideoLoading);
          socket.on(SocketEvent.STATE_CHANGE, handleStateChange);
        }
      });
    }
  }, [roomId]);

  const loadYouTubePlayer = async (): Promise<YT.Player> => {
    const loadedPlayer = await YouTubePlayer(PLAYER_ID, {
      height: 480,
      width: 853,
      playerVars: {
        'mute': 1,
      },
      events: {
        onStateChange: (event) => onPlayerStateChange(event, loadedPlayer),
      }
    });
    // Add an event listener for the custom 'timeChange' event
    window.addEventListener(TIME_CHANGE_EVENT, onPlayerTimeChange);

    return loadedPlayer;

    /*return YouTubePlayer(PLAYER_ID, {
      height: 480,
      width: 853,
      playerVars: {
        'mute': 1,
      },
      events: {
        onStateChange: onPlayerStateChange,
      }
    }).then((player) => {
      // Add an event listener for the custom 'timeChange' event
      window.addEventListener(TIME_CHANGE_EVENT, onPlayerTimeChange);

      return player;
    }).catch((error) => {
      console.error('Error loading YouTube player: ', error);
      throw error;
    }); */
  };

  const onPlayerTimeChange = (event) => {
    console.log(event.detail.currentTime);
  }

  /* const findMe = (value: number) => {
    return Object.keys(YT.PlayerState)[Object.values(YT.PlayerState).indexOf(value)];
  } */

  const onPlayerStateChange = (event, player: YT.Player) => {
    const statesToEmit = [YT.PlayerState.PLAYING, YT.PlayerState.PAUSED];
    if (statesToEmit.includes(event.data)) {
      const msg = JSON.stringify({ seek: player.getCurrentTime(), state: event.data.toString() });
      emit(SocketEvent.STATE_CHANGE, { roomId, msg });
    }
  };

  const emit = (event: SocketEvent, data: SocketMessage): void => {
    socket.emit(event, data);
  };

  const handleUrlChange = (event) => {
    setUrl(event.target.value);
  }

  const handleKeyPress = async (event) => {
    if (event.keyCode == 13 && url.length > 0) {
      const id = getIdFromUrl(url);
      emit(SocketEvent.LOAD_VIDEO, { roomId, msg: id });
      player.loadVideoById(id);
    }
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