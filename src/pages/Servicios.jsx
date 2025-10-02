import React from 'react'
import { rooms } from '../data/rooms.js'
import './Servicios.css' // Importa los estilos

export default function Servicios() {
  return (
    <section>
      <h2 className="section-title">Servicios / Habitaciones</h2>
      <div className="grid">
        {rooms.map(room => (
          <article className="card" key={room.id}>
            <img src={room.image} alt={room.name} />
            <h3>{room.name}</h3>
            <p className="card-desc">{room.description}</p>
            <div className="card-footer">
              <span className="badge">ARS {room.price.toLocaleString('es-AR')}</span>
              <button type="button" onClick={()=>alert(`Reservar: ${room.name}`)}>Reservar</button>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
