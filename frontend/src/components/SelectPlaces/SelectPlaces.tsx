import styles from "./SelectPlaces.module.scss";
import clsx from "clsx";

export type SelectedPlace = {
  row: number;
  seat: number;
};

export type HallSize = {
  rows: number;
  seats: number;
};

export type SelectPlacesProps = {
  hall: HallSize;
  taken: string[];
  selected: SelectedPlace[];
  onSelect: (place: string) => void;
};

const getSeatKey = (row: number, seat: number) => `${row}:${seat}`;

const createArray = (length: number, start = 1) =>
  Array.from({ length }, (_, i) => i + start);

export function SelectPlaces({
  hall,
  taken,
  selected,
  onSelect,
}: SelectPlacesProps) {
  const selectedSeats = new Set(
    selected.map((place) => getSeatKey(place.row, place.seat)),
  );

  return (
    <div className={styles.places}>
      <div className={styles.screen}>ЭКРАН</div>

      {createArray(hall.rows).map((row) => (
        <div className={styles.row} key={row}>
          <div className={styles.label}>Ряд {row}</div>

          <div className={styles.seats}>
            {createArray(hall.seats).map((seat) => {
              const key = getSeatKey(row, seat);

              return (
                <button
                  type="button"
                  key={key}
                  className={clsx(styles.seat, {
                    [styles.active]: selectedSeats.has(key),
                  })}
                  disabled={taken.includes(key)}
                  onClick={() => onSelect(key)}
                >
                  {seat}
                </button>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
