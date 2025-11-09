import { useState, useEffect } from "react";
import { apiClient } from "./services/api";
import "./App.css";

function App() {
  const [connectionStatus, setConnectionStatus] = useState({
    loading: true,
    connected: false,
    message: "",
    error: null,
    data: null,
  });

  useEffect(() => {
    async function checkConnection() {
      try {
        const result = await apiClient.testConnection();
        setConnectionStatus({
          loading: false,
          connected: true,
          message: "Połączenie z API działa!",
          error: null,
          data: result,
        });
      } catch (error) {
        setConnectionStatus({
          loading: false,
          connected: false,
          message: "Błąd połączenia z API",
          error: error.message,
          data: null,
        });
      }
    }

    checkConnection();
  }, []);

  const retryConnection = () => {
    setConnectionStatus((prev) => ({ ...prev, loading: true }));
    setTimeout(() => {
      window.location.reload();
    }, 500);
  };

  if (connectionStatus.loading) {
    return (
      <div className="App">
        <h1>Sprawdzanie połączenia...</h1>
        <div className="spinner">⏳</div>
      </div>
    );
  }

  return (
    <div className="App">
      <h1>Status połączenia z API</h1>

      <div
        className={`status-box ${
          connectionStatus.connected ? "success" : "error"
        }`}
      >
        <h2>{connectionStatus.connected ? "✅ Połączono" : "❌ Błąd"}</h2>
        <p>{connectionStatus.message}</p>

        {connectionStatus.error && (
          <div className="error-details">
            <strong>Szczegóły błędu:</strong>
            <pre>{connectionStatus.error}</pre>
          </div>
        )}

        {connectionStatus.data && (
          <div className="api-response">
            <strong>Odpowiedź z API:</strong>
            <pre>{JSON.stringify(connectionStatus.data, null, 2)}</pre>
          </div>
        )}

        {!connectionStatus.connected && (
          <button onClick={retryConnection} className="retry-button">
            🔄 Spróbuj ponownie
          </button>
        )}
      </div>

      {connectionStatus.connected && (
        <div className="next-steps">
          <h3>🎉 Wszystko działa!</h3>
          <p>Możesz teraz dodawać kolejne endpointy do API.</p>
        </div>
      )}
    </div>
  );
}

export default App;
