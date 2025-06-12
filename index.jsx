import { useState } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { es } from "date-fns/locale";

export default function CalendarioReservas() {
  const [range, setRange] = useState({ from: undefined, to: undefined });
  const [nombre, setNombre] = useState("");
  const [personas, setPersonas] = useState("");
  const [comentario, setComentario] = useState("");
  const [reservas, setReservas] = useState([]);

  const agregarReserva = () => {
    if (!range.from || !range.to || !nombre.trim()) {
      alert("Por favor, completa fecha inicio, fecha fin y nombre.");
      return;
    }
    setReservas([
      ...reservas,
      {
        id: Date.now(),
        nombre,
        personas,
        comentario,
        fechaInicio: range.from,
        fechaFin: range.to,
      },
    ]);
    // Limpiar formulario
    setRange({ from: undefined, to: undefined });
    setNombre("");
    setPersonas("");
    setComentario("");
  };

  const eliminarReserva = (id) => {
    setReservas(reservas.filter((r) => r.id !== id));
  };

  // Formato de fecha sencilla
  const formatoFecha = (date) =>
    date?.toLocaleDateString("es-ES", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

  return (
    <div style={{ maxWidth: 700, margin: "2rem auto", fontFamily: "Arial, sans-serif" }}>
      <h1 style={{ textAlign: "center" }}>Casa Matanchen - Calendario de Reservas</h1>
      <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", marginTop: "1rem" }}>
        <section style={{ flex: 1, minWidth: 280 }}>
          <h2>Selecciona rango de fechas</h2>
          <DayPicker
            mode="range"
            locale={es}
            selected={range}
            onSelect={setRange}
            numberOfMonths={2}
            pagedNavigation
          />
          <p>
            Desde: <b>{formatoFecha(range.from) || "--"}</b> hasta: <b>{formatoFecha(range.to) || "--"}</b>
          </p>
          <input
            type="text"
            placeholder="Nombre del huésped *"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            style={{ width: "100%", padding: "0.5rem", marginBottom: "0.5rem" }}
          />
          <input
            type="number"
            placeholder="Número de personas"
            value={personas}
            onChange={(e) => setPersonas(e.target.value)}
            style={{ width: "100%", padding: "0.5rem", marginBottom: "0.5rem" }}
            min={1}
          />
          <textarea
            placeholder="Comentarios u observaciones"
            value={comentario}
            onChange={(e) => setComentario(e.target.value)}
            rows={3}
            style={{ width: "100%", padding: "0.5rem", marginBottom: "0.5rem" }}
          />
          <button
            onClick={agregarReserva}
            style={{
              width: "100%",
              padding: "0.7rem",
              backgroundColor: "#0070f3",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              fontSize: "1rem",
            }}
          >
            Agregar reserva
          </button>
        </section>

        <section style={{ flex: 1, minWidth: 280, maxHeight: 450, overflowY: "auto" }}>
          <h2>Reservas</h2>
          {reservas.length === 0 && <p>No hay reservas registradas.</p>}
          {reservas.map((r) => (
            <div
              key={r.id}
              style={{
                border: "1px solid #ccc",
                borderRadius: 6,
                padding: "0.5rem 1rem",
                marginBottom: "0.7rem",
                position: "relative",
              }}
            >
              <strong>{r.nombre}</strong>
              <p>
                {formatoFecha(r.fechaInicio)} - {formatoFecha(r.fechaFin)}
              </p>
              <p>Personas: {r.personas || "N/A"}</p>
              <p style={{ fontStyle: "italic", fontSize: "0.9rem" }}>{r.comentario || "-"}</p>
              <button
                onClick={() => eliminarReserva(r.id)}
                style={{
                  position: "absolute",
                  top: 6,
                  right: 6,
                  backgroundColor: "#e00",
                  color: "white",
                  border: "none",
                  borderRadius: "3px",
                  padding: "0.2rem 0.5rem",
                  cursor: "pointer",
                  fontSize: "0.8rem",
                }}
                aria-label={`Eliminar reserva de ${r.nombre}`}
              >
                X
              </button>
            </div>
          ))}
        </section>
      </div>
    </div>
  );
}
