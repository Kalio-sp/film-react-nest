const API_URL = "http://localhost:3000/api/afisha";

export async function getFilms() {
  const response = await fetch(`${API_URL}/films`);

  if (!response.ok) {
    throw new Error("Ошибка загрузки фильмов");
  }

  return response.json();
}
