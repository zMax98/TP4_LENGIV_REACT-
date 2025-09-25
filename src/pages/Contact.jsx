import { useState } from 'react'
import { sendContactEmail } from '../lib/email.js'
import Modal from '../components/Modal.jsx'
import './Contact.css'

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export default function Contact(){
  const [form, setForm] = useState({ name:'', email:'', message:'' })
  const [errors, setErrors] = useState({})
  const [sending, setSending] = useState(false)
  const [okOpen, setOkOpen] = useState(false)
  const [errOpen, setErrOpen] = useState(false)
  const [errMsg, setErrMsg] = useState('')

  function validate(){
    const e = {}
    if(!form.name.trim()) e.name = 'El nombre es obligatorio.'
    if(!form.email.trim()) e.email = 'El correo es obligatorio.'
    else if(!emailRegex.test(form.email)) e.email = 'Formato de correo inválido.'
    if(!form.message.trim()) e.message = 'El mensaje no puede estar vacío.'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  async function onSubmit(ev){
    ev.preventDefault()
    if(!validate()) return
    setSending(true)
    try{
      await sendContactEmail({
        from_name: form.name,
        from_email: form.email,
        message: form.message,
      })
      setOkOpen(true)
      setForm({ name:'', email:'', message:'' })
    }catch(err){
      console.error(err)
      setErrMsg(err?.message || 'No se pudo enviar el correo.')
      setErrOpen(true)
    }finally{
      setSending(false)
    }
  }

  function onChange(ev){
    setForm(f => ({ ...f, [ev.target.name]: ev.target.value }))
  }

  return (
    <div className="container contact">
      <h1 className="title">Contacto</h1>
      <p className="subtitle">Completá el formulario y te respondemos por correo.</p>

      <form onSubmit={onSubmit} noValidate className="form">
        <div className="field">
          <label>Nombre</label>
          <input
            name="name" value={form.name} onChange={onChange}
            placeholder="Tu nombre" required className="input"
          />
          {errors.name && <small className="error">{errors.name}</small>}
        </div>

        <div className="field">
          <label>Dirección de Correo</label>
          <input
            name="email" type="email" value={form.email} onChange={onChange}
            placeholder="nombre@dominio.com" required className="input"
          />
          {errors.email && <small className="error">{errors.email}</small>}
        </div>

        <div className="field">
          <label>Mensaje</label>
          <textarea
            name="message" value={form.message} onChange={onChange}
            placeholder="Escribe tu mensaje..." required rows={6} className="textarea"
          />
          {errors.message && <small className="error">{errors.message}</small>}
        </div>

        <button disabled={sending} className="btn primary">
          {sending ? 'Enviando...' : 'Enviar'}
        </button>
      </form>

      <Modal open={okOpen} title="¡Correo enviado!" onClose={()=>setOkOpen(false)}>
        <p>Tu mensaje fue enviado correctamente. Gracias por contactarte.</p>
      </Modal>

      <Modal open={errOpen} title="Error" onClose={()=>setErrOpen(false)}>
        <p>{errMsg}</p>
      </Modal>
    </div>
  )
}
