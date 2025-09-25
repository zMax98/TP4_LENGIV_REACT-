import { init, send } from '@emailjs/browser'

const PUBLIC_KEY  = import.meta.env.VITE_EMAILJS_PUBLIC_KEY
const SERVICE_ID  = import.meta.env.VITE_EMAILJS_SERVICE_ID
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID

export function initEmail(){
  if(!PUBLIC_KEY){
    console.warn('Falta VITE_EMAILJS_PUBLIC_KEY en .env')
    return
  }
  init(PUBLIC_KEY)
}

export async function sendContactEmail(params){
  if(!SERVICE_ID || !TEMPLATE_ID){
    throw new Error('Faltan SERVICE_ID o TEMPLATE_ID en .env')
  }
  return await send(SERVICE_ID, TEMPLATE_ID, params)
}
