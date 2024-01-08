import { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import classNames from "classnames";
import styles from "./Room.module.scss";

import { PLAYER_ID, ID_REGEX } from '@config/constants';
import player from "@/lib/player";

import { Label } from "@components/ui/label";
import { Input } from "@components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";

export const Room: FC = () => {

  const params = useParams();
  const [url, setUrl] = useState('');
  const [ytPlayer, setytPlayer] = useState<YT.Player>(null);

  useEffect(() => {

    console.log(params);

  }, []);

  const handleUrlChange = (event) => {
    setUrl(event.target.value);
  }

  const handleKeyPress = async (event) => {
    if (event.keyCode == 13 && url.length > 0) {
      const id = getIdFromUrl(url);
      if (ytPlayer == null) {
        setytPlayer(await player(PLAYER_ID, {
          videoId: id,
          height: 270,
          width: 480,
          playerVars: {
            'controls': 1,
          }
        }));
      } else {
        ytPlayer.loadVideoById(id);
      }
    }
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
