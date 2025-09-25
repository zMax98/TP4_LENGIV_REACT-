import { useEffect } from 'react'
import './Modal.css'

export default function Modal({ open, title, children, onClose }){
  useEffect(() => {
    function onEsc(e){ if(e.key === 'Escape') onClose?.() }
    if(open) document.addEventListener('keydown', onEsc)
    return () => document.removeEventListener('keydown', onEsc)
  }, [open, onClose])
  if(!open) return null

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-card" onClick={(e)=>e.stopPropagation()}>
        <h3 className="modal-title">{title}</h3>
        <div>{children}</div>
        <div className="modal-actions">
          <button onClick={onClose} className="btn">Cerrar</button>
        </div>
      </div>
    </div>
  )
}
