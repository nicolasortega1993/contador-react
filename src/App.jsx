import { useState, useEffect } from "react";
import "./App.css";

function App() {
  // Estado del contador, historial, modal y dark mode
  const [contador, setContador] = useState(0);
  const [historial, setHistorial] = useState([]);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [mensajeModal, setMensajeModal] = useState("");
  const [animar, setAnimar] = useState(false);
  const [darkMode, setDarkMode] = useState(true);

  // Función para registrar acciones en historial
  const registrarAccion = (accion) => {
    const fecha = new Date().toLocaleTimeString();
    setHistorial((prev) => [`${fecha} - ${accion}`, ...prev]);
  };

  // Funciones para manejar los botones
  const aumentar = () => {
    if (contador < 10) {
      setContador(contador + 1);
      registrarAccion("Aumentaste en +1");
    } else {
      setMensajeModal("No puedes superar el valor máximo de 10.");
      setMostrarModal(true);
    }
  };

  const restar = () => {
    if (contador > 0) {
      setContador(contador - 1);
      registrarAccion("Restaste en -1");
    } else {
      setMensajeModal("No puedes bajar del valor mínimo de 0.");
      setMostrarModal(true);
    }
  };

  const resetear = () => {
    setContador(0);
    registrarAccion("Reseteaste el contador");
  };

  // Efecto para animar cuando cambia el contador
  useEffect(() => {
    if (contador >= 0) {
      setAnimar(true);
      const timer = setTimeout(() => setAnimar(false), 300);
      return () => clearTimeout(timer);
    }
  }, [contador]);

  // Estilos dinámicos según tema
  const estilosPagina = {
    textAlign: "center",
    marginTop: "50px",
    fontFamily: "Arial, sans-serif",
    backgroundColor: darkMode ? "#121212" : "#f9f9f9",
    color: darkMode ? "#f9f9f9" : "#121212",
    minHeight: "100vh",
    transition: "all 0.3s",
  };

  return (
    <div style={estilosPagina}>
      {/* Botón de modo oscuro */}
      <button
        onClick={() => setDarkMode(!darkMode)}
        style={{
          position: "absolute",
          top: "20px",
          right: "20px",
          padding: "8px 16px",
          cursor: "pointer",
          borderRadius: "8px",
          border: "none",
          backgroundColor: darkMode ? "#f1c40f" : "#333",
          color: darkMode ? "#333" : "#fff",
        }}
      >
        {darkMode ? "☀️ Modo Claro" : "🌙 Modo Oscuro"}
      </button>

      <h1 style={{ fontSize: "2.5rem" }}>Contador</h1>

      {/* Número con animación */}
      <p
        style={{
          fontSize: "2rem",
          fontWeight: "bold",
          marginBottom: "30px",
          transition: "transform 0.3s, color 0.3s",
          transform: animar ? "scale(1.3)" : "scale(1)",
          color: animar ? "#4CAF50" : darkMode ? "#f9f9f9" : "#333",
        }}
      >
        Valor actual: {contador}
      </p>

      {/* Botones */}
      <div style={{ display: "flex", justifyContent: "center", gap: "15px" }}>
        <button
          onClick={aumentar}
          style={{
            padding: "12px 24px",
            fontSize: "16px",
            cursor: "pointer",
            backgroundColor: "#4CAF50",
            color: "white",
            border: "none",
            borderRadius: "8px",
          }}
        >
          Aumentar
        </button>

        <button
          onClick={restar}
          style={{
            padding: "12px 24px",
            fontSize: "16px",
            cursor: "pointer",
            backgroundColor: "#2196F3",
            color: "white",
            border: "none",
            borderRadius: "8px",
          }}
        >
          Restar
        </button>

        <button
          onClick={resetear}
          style={{
            padding: "12px 24px",
            fontSize: "16px",
            cursor: "pointer",
            backgroundColor: "#f44336",
            color: "white",
            border: "none",
            borderRadius: "8px",
          }}
        >
          Reset
        </button>
      </div>

      {/* Historial */}
      <div
        style={{
          marginTop: "40px",
          textAlign: "left",
          width: "300px",
          marginInline: "auto",
        }}
      >
        <h2 style={{ fontSize: "1.2rem", borderBottom: "1px solid #ccc" }}>
          📜 Historial 
        </h2>
        <ul style={{ listStyle: "none", padding: 0 }}>
          {historial.length === 0 && <li>No hay acciones registradas.</li>}
          {historial.map((accion, index) => (
            <li key={index} style={{ margin: "5px 0" }}>
              {accion}
            </li>
          ))}
        </ul>
      </div>

      {/* Modal */}
      {mostrarModal && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0,0,0,0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              background: "white",
              padding: "30px",
              borderRadius: "12px",
              boxShadow: "0px 6px 10px rgba(0,0,0,0.3)",
              textAlign: "center",
              maxWidth: "400px",
              color: "#333",
            }}
          >
            <h2 style={{ marginBottom: "15px" }}>🚨 Aviso</h2>
            <p style={{ marginBottom: "20px", fontSize: "18px" }}>
              {mensajeModal}
            </p>
            <button
              onClick={() => setMostrarModal(false)}
              style={{
                padding: "10px 20px",
                backgroundColor: "#2196F3",
                color: "white",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
              }}
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
