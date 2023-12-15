import { FC } from "react";
import { Button } from "@mui/material";
import { useNavigate  } from "react-router-dom";
import "./App.css";

const App: FC<{}> = ({}) => {

  const navigator = useNavigate();

  const handleClick = () => {
    navigator('/room');
  }

  return (
    <div className="main">
      <Button onClick={handleClick} variant="contained">Create a Room</Button>
    </div>
  );
};

export default App;