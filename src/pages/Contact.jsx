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

<div style={{position:'relative', paddingBottom:'56.25%', height:0, overflow:'hidden', borderRadius:12}}>
  <iframe
    title="Ubicación"
    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3560.768028688003!2d-65.410!3d-26.824!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9422434b7f5f3f4f%3A0xbad0cafe!2sSalta!5e0!3m2!1ses!2sar!4v1699999999999"
    width="600"
    height="450"
    style={{border:0, position:'absolute', top:0, left:0, width:'100%', height:'100%'}}
    allowFullScreen=""
    loading="lazy"
    referrerPolicy="no-referrer-when-downgrade">
  </iframe>
</div>


      <Modal open={okOpen} title="¡Correo enviado!" onClose={()=>setOkOpen(false)}>
        <p>Tu mensaje fue enviado correctamente. Gracias por contactarte.</p>
      </Modal>

      <Modal open={errOpen} title="Error" onClose={()=>setErrOpen(false)}>
        <p>{errMsg}</p>
      </Modal>
    </div>
  )
}
