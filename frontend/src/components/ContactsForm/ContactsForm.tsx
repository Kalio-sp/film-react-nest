import React from "react";
import styles from "./ContactsForm.module.scss";

export type Contacts = {
  email: string;
  phone: string;
};

export type ContactsFormProps = {
  value: Contacts;
  onChange: (value: Contacts) => void;
};

export function ContactsForm({ value, onChange }: ContactsFormProps) {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    onChange(value);
  };

  return (
    <form className={styles.form} name="order" onSubmit={handleSubmit}>
      <label className={styles.label}>
        <input
          value={value.email}
          onChange={(event) =>
            onChange({
              ...value,
              email: event.target.value,
            })
          }
          className={styles.input}
          name="email"
          type="email"
          required
          placeholder="Почта"
        />
      </label>

      <label className={styles.label}>
        <input
          value={value.phone}
          onChange={(event) =>
            onChange({
              ...value,
              phone: event.target.value,
            })
          }
          className={styles.input}
          name="phone"
          type="tel"
          required
          placeholder="Телефон"
          pattern="^[0-9\+\-\(\)\s]{11,25}$"
        />
      </label>
    </form>
  );
}
