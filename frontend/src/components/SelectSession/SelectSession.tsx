import styles from "./SelectSession.module.scss";
import clsx from "clsx";

export type ScheduleSession = {
  id: string;
  daytime: string;
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
          <span>
            {new Date(session.daytime).toLocaleString("ru-RU", {
              day: "2-digit",
              month: "2-digit",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>
        </button>
      ))}
    </div>
  );
}
