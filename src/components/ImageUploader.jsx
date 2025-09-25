import { useState } from "react";

export default function ImageUploader() {
  const [preview, setPreview] = useState(null);
  const [error, setError] = useState("");

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    // Validar si es imagen con la API File
    if (!file.type.startsWith("image/")) {
      setError("El archivo seleccionado no es una imagen.");
      setPreview(null);
      return;
    }

    setError("");
    setPreview(URL.createObjectURL(file));
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h2>Subir Imagen</h2>
      <input type="file" onChange={handleFileChange} accept="image/*" />
      {error && <p style={{ color: "red" }}>{error}</p>}
      {preview && (
        <div>
          <p>Vista previa:</p>
          <img src={preview} alt="preview" style={{ maxWidth: "300px" }} />
        </div>
      )}
    </div>
  );
}