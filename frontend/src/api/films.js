const API_URL = "/api/afisha";

export async function getFilms() {
  const response = await fetch(`${API_URL}/films`);

  if (!response.ok) {
    throw new Error("Ошибка загрузки фильмов");
  }

  return response.json();
}
