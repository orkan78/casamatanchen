import { useState } from "react";
import { Calendar } from "../components/ui/calendar";
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";

export default function Home() {
  const [reservas, setReservas] = useState([]);
  const [fechaInicio, setFechaInicio] = useState(null);
  const [fechaFin, setFechaFin] = useState(null);
  const [nombre, setNombre] = useState("");
  const [personas, setPersonas] = useState("");
  const [comentario, setComentario] = useState("");

  const agregarReserva = () => {
    if (!fechaInicio || !fechaFin || !nombre) return;
    setReservas([
      ...reservas,
      {
        id: Date.now(),
        nombre,
        personas,
        comentario,
        fechaInicio,
        fechaFin,
      },
    ]);
    setFechaInicio(null);
    setFechaFin(null);
    setNombre("");
    setPersonas("");
    setComentario("");
  };

  const eliminarReserva = (id) => {
    setReservas(reservas.filter((reserva) => reserva.id !== id));
  };

  return (
    <div className="grid gap-4 p-4 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold">Calendario de Reservas</h1>
      <div className="grid md:grid-cols-2 gap-4">
        <Card>
          <CardContent className="p-4 space-y-2">
            <h2 className="font-semibold">Seleccionar Fechas</h2>
            <Calendar
              mode="range"
              selected={{ from: fechaInicio, to: fechaFin }}
              onSelect={({ from, to }) => {
                setFechaInicio(from);
                setFechaFin(to);
              }}
              locale="es"
            />
            <Input placeholder="Nombre del huésped" value={nombre} onChange={(e) => setNombre(e.target.value)} />
            <Input placeholder="Número de personas" value={personas} onChange={(e) => setPersonas(e.target.value)} />
            <Textarea placeholder="Comentarios u observaciones" value={comentario} onChange={(e) => setComentario(e.target.value)} />
            <Button onClick={agregarReserva}>Agregar reserva</Button>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 space-y-2 overflow-auto max-h-[500px]">
            <h2 className="font-semibold">Reservas</h2>
            {reservas.length === 0 && <p>No hay reservas registradas.</p>}
            {reservas.map((r) => (
              <div key={r.id} className="border-b pb-2 mb-2">
                <p className="font-bold">{r.nombre}</p>
                <p>{String(r.fechaInicio)} - {String(r.fechaFin)}</p>
                <p>Personas: {r.personas}</p>
                <p className="text-sm text-muted-foreground">{r.comentario}</p>
                <Button variant="destructive" size="sm" onClick={() => eliminarReserva(r.id)}>Eliminar</Button>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
