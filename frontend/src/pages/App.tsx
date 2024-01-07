import { FC } from "react";
import { useNavigate } from "react-router-dom";

import classNames from "classnames";
import styles from "./App.module.scss";

import { createRoom } from "@/services/api";
import { ModeToggle } from "@components/mode-toggle";

const App: FC = () => {

  const navigator = useNavigate();

  const navigateToRoom = async () => {
    const createdRoom = await createRoom();
    navigator(`/room/${createdRoom.uid}`);
  }

  return (
    <>
      <ModeToggle />
      <div className={classNames(styles.main)}>
        <button onClick={navigateToRoom}>Create a Room</button>
      </div>
    </>
  );
};

export default App;