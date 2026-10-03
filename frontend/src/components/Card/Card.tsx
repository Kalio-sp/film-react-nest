import styles from "./Card.module.scss";
import clsx from "clsx";

export type CardProps = {
  id: string;
  title: string;
  image?: string;
  posterImage?: string;
  className?: string;
  onClick?: () => void;
};

export function Card({
  title,
  image,
  posterImage,
  className,
  onClick,
}: CardProps) {
  const imageUrl = image || posterImage || "";

  return (
    <article className={clsx(styles.card, className)} onClick={onClick}>
      <img src={imageUrl} alt={title} className={styles.image} />

      <p className={styles.title}>{title}</p>
    </article>
  );
}
