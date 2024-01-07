import { FC } from "react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

import classNames from "classnames";
import styles from "./App.module.scss";

import { createRoom } from "@/services/api";

const App: FC = () => {

  const navigator = useNavigate();

  const navigateToRoom = async () => {
    const createdRoom = await createRoom();
    navigator(`/room/${createdRoom.uid}`);
  }

  return (
    <div className={classNames(styles.main)}>
      <Button onClick={navigateToRoom} variant="contained">Create a Room</Button>
    </div>
  );
};

export default App;