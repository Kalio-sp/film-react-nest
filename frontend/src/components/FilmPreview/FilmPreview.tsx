import styles from "./FilmPreview.module.scss";
import { FilmInfo, FilmInfoProps } from "../FilmInfo/FilmInfo.tsx";
import { Button } from "../Button/Button.tsx";

export type FilmPreviewProps = FilmInfoProps & {
  cover: string;
  onClick?: () => void;
};

export function FilmPreview({ onClick, cover, ...props }: FilmPreviewProps) {
  const imageUrl = cover.startsWith("http") ? cover : cover;

  return (
    <main className={styles.hero}>
      <img src={imageUrl} alt={props.title} className={styles.background} />

      <div className={styles.content}>
        <FilmInfo {...props} />

        <Button
          label="Купить билет"
          className={styles.action}
          onClick={onClick}
        />
      </div>
    </main>
  );
}
