'use server'

import { createClient } from 'next-sanity'
import { apiVersion, dataset, projectId } from '@/sanity/env'

const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  token: process.env.SANITY_API_WRITE_TOKEN,
})

export async function registerHombresDeAltar(formData: FormData) {
  try {
    const data = {
      _type: 'hombresDeAltarRegistration',
      nombre: formData.get('nombre'),
      apellido: formData.get('apellido'),
      edad: Number(formData.get('edad')),
      iglesia: formData.get('iglesia'),
      telefono: formData.get('telefono'),
      email: formData.get('email') || undefined,
      tallaCamiseta: formData.get('tallaCamiseta'),
    }

    await client.create(data)
    return { success: true }
  } catch (error) {
    console.error('Error creating registration:', error)
    return { success: false, error: 'Ocurrió un error al registrarse. Por favor intente de nuevo.' }
  }
}
