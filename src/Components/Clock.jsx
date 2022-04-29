import moment from "moment";
import { useEffect, useState } from "react";
import style from "./Clock.module.css";

const Clock = () => {
  const now = () => moment().format("LTS");
  const [time, setTime] = useState(now());

  useEffect(() => {
    setInterval(() => setTime(now()), 500);
  }, [time]);

  return <div className={style.clock}>{time}</div>;
};

export default Clock;
