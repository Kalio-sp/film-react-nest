import styles from "./SelectSession.module.scss";
import clsx from "clsx";

export type ScheduleSession = {
  id: string;
  day: string;
  time: string;
};

export type SelectSessionProps = {
  sessions: ScheduleSession[];
  selected: string | null;
  onSelect: (session: string) => void;
};

export function SelectSession({
  sessions,
  selected,
  onSelect,
}: SelectSessionProps) {
  return (
    <div className={styles.schedule}>
      {sessions.map((session) => (
        <button
          key={session.id}
          className={clsx(styles.time, {
            [styles.active]: selected === session.id,
          })}
          onClick={() => onSelect(session.id)}
        >
          <span>{session.day}</span>
          <span>{session.time}</span>
        </button>
      ))}
    </div>
  );
}
