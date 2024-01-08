import { FC } from "react";

import classNames from "classnames";
import styles from "./header.module.scss";

import { ModeToggle } from "@components/mode-toggle";
import { Label } from "@components/ui/label";

export const Header: FC = () => {



  return (
    <div className={classNames(styles.wrapper)}>
      <Label>YouTube Sync</Label>
      <Label className="text-xl font-bold">Watch videos with your friends</Label>
      <ModeToggle />
    </div>
  )
}