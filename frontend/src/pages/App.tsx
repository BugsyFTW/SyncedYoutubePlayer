import { FC } from "react";
import { useNavigate } from "react-router-dom";

import classNames from "classnames";
import styles from "./App.module.scss";

import { createRoom } from "@/services/api";
import { Button } from "@components/ui/button";

const App: FC = () => {

  const navigator = useNavigate();

  const navigateToRoom = async () => {
    const createdRoom = await createRoom();
    navigator(`/room/${createdRoom.uid}`);
  }

  return (
    <div className={classNames(styles.main)}>
      <Button className="h-24 px-36" onClick={navigateToRoom}>Create a Room</Button>
    </div>
  );
};

export default App;