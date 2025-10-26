import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js"; // Poprawny import klienta
import "./App.css";

function App() {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Inicjalizacja Supabase w komponencie
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
  const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
  const supabase =
    supabaseUrl && supabaseAnonKey
      ? createClient(supabaseUrl, supabaseAnonKey)
      : null;

  useEffect(() => {
    if (!supabase) {
      setError("Brak konfiguracji Supabase – sprawdź .env.local");
      setLoading(false);
      return;
    }

    async function fetchGames() {
      try {
        const { data, error: fetchError } = await supabase
          .from("games")
          .select("*");
        if (fetchError) {
          setError(`Błąd pobierania: ${fetchError.message}`);
        } else {
          setGames(data || []);
          console.log("Dane z Supabase (games):", data); // Sprawdź w konsoli
        }
      } catch (err) {
        setError(`Błąd połączenia: ${err.message}`);
      } finally {
        setLoading(false);
      }
    }

    fetchGames();
  }, [supabase]);

  if (loading) return <div>Ładowanie danych z Supabase...</div>;
  if (error) return <div>Błąd: {error}</div>;

  return (
    <div className="App">
      <h1>Lista gier z Supabase (tabela: games)</h1>
      {games.length === 0 ? (
        <p>Brak gier w bazie lub tabela pusta.</p>
      ) : (
        <ul>
          {games.map((game) => (
            <li key={game.id}>
              <strong>{game.name || "Brak nazwy"}</strong> – Data:{" "}
              {game.date || "Brak daty"} | ID: {game.id}
            </li>
          ))}
        </ul>
      )}
      <p>Liczba gier: {games.length}</p>
    </div>
  );
}

export default App;
