import { FC, useState } from "react";
import { Typography, TextField } from "@mui/material";
import { useParams } from "react-router-dom";

import player from "@player/index";

const Room: FC<{}> = ({ }) => {

  const params = useParams();
  const [url, setUrl] = useState('');
  const [ytPlayer, setytPlayer] = useState(null);

  const handleUrlChange = (event) => {
    setUrl(event.target.value);
  }

  const handleKeyPress = async (event) => {
    if (event.keyCode == 13) { // TK2EKx0UtzE
      if (ytPlayer == null) { // mt6d1yjnpuo
        setytPlayer(await player('youtube-player', {
          videoId: url,
          playerVars: {
            'controls': 1,
          }
        }));
        console.log(ytPlayer);
      } else {
        console.log(ytPlayer);
        ytPlayer.loadVideoById(url);
      }
    }
  }

  return (
    <div className="input-wrapper">
      <Typography>Insert YouTube URL</Typography>
      <TextField
        type="text"
        value={url}
        onChange={handleUrlChange}
        onKeyDown={handleKeyPress}
        />
      <div className="youtube-player" id="youtube-player"></div>
    </div>
  );
};

export default Room;