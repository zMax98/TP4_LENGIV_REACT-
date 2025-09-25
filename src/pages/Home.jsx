import './Home.css'
import ImageUploader from "../components/ImageUploader";

export default function Home(){
  return (
    <div className="container">
      <h1 className="title">Inicio</h1>
      <p className="lead">Contenido del TP2 aquí</p>
      <div className="grid">
        <div className="card">
          <ImageUploader />
        </div>
      </div>
    </div>
  )
}
