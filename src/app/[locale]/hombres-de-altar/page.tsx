'use client';

import { useState } from 'react';
import { useLocale } from 'next-intl';
import { motion } from 'framer-motion';
import { registerHombresDeAltar } from '@/app/actions/register';
import { Calendar, MapPin, CheckCircle2, User, Hash, Church, Phone, Mail, Shirt } from 'lucide-react';
import Image from 'next/image';


export default function HombresDeAltarPage() {
  const locale = useLocale();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    
    const formData = new FormData(e.currentTarget);
    const result = await registerHombresDeAltar(formData);
    
    if (result.success) {
      setIsSuccess(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setError(result.error || (locale === 'es' ? 'Ocurrió un error. Por favor intenta de nuevo.' : 'An error occurred. Please try again.'));
    }
    
    setIsSubmitting(false);
  };

  const formFields = [
    { name: 'nombre', label: locale === 'es' ? 'Nombre' : 'First Name', type: 'text', required: true, icon: User },
    { name: 'apellido', label: locale === 'es' ? 'Apellido' : 'Last Name', type: 'text', required: true, icon: User },
    { name: 'edad', label: locale === 'es' ? 'Edad' : 'Age', type: 'number', required: true, icon: Hash },
    { name: 'iglesia', label: locale === 'es' ? 'Iglesia a la que asiste' : 'Home Church', type: 'text', required: true, icon: Church },
    { name: 'telefono', label: locale === 'es' ? 'Teléfono' : 'Phone', type: 'tel', required: true, icon: Phone },
    { name: 'email', label: locale === 'es' ? 'Correo electrónico' : 'Email', type: 'email', required: false, icon: Mail, optional: true },
  ];

  return (
    <div className="min-h-screen bg-stone-50 pt-32 pb-24 text-stone-900">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-start">
          
          {/* Info Section */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col gap-6 lg:sticky lg:top-32"
          >
            <div className="inline-flex w-fit items-center gap-2 rounded-full border border-accent-gold/30 bg-accent-gold/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-primary-navy">
              {locale === 'es' ? 'Próximo Evento' : "Upcoming Event"}
            </div>
            
            <div className="relative w-72 md:w-96 drop-shadow-md">
              <Image 
                src="/hombres-altar/logo-negro.png" 
                alt="Congreso de varones Hombres de Altar" 
                width={800}
                height={800}
                className="w-full h-auto object-contain"
                priority
              />
              <h1 className="sr-only">
                {locale === 'es' ? 'Congreso de varones' : "Men's Congress"}
              </h1>
            </div>
            
            <p className="text-lg text-stone-600 leading-relaxed max-w-lg">
              {locale === 'es' 
                ? 'Un tiempo de transformación, propósito y hermandad. Diseñado para equipar a los hombres a vivir vidas guiadas por Dios en su hogar, iglesia y comunidad.'
                : 'A time of transformation, purpose, and brotherhood. Designed to equip men to live God-led lives in their home, church, and community.'}
            </p>

            <div className="flex flex-col gap-4 mt-4">
              <div className="flex items-center gap-4 text-stone-700">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary-navy/5 text-primary-navy">
                  <Calendar className="h-6 w-6" />
                </div>
                <div>
                  <p className="font-bold">{locale === 'es' ? '27 y 28 de Noviembre, 2026' : 'November 27 & 28, 2026'}</p>
                  <p className="text-sm text-stone-500">{locale === 'es' ? 'Apunta la fecha' : 'Save the date'}</p>
                </div>
              </div>
              <div className="flex items-center gap-4 text-stone-700">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary-navy/5 text-primary-navy">
                  <MapPin className="h-6 w-6" />
                </div>
                <div>
                  <p className="font-bold">Renuevo Church</p>
                  <p className="text-sm text-stone-500">{locale === 'es' ? 'Templo' : 'Sanctuary'}</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Form Section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white rounded-3xl shadow-xl border border-stone-100 p-6 md:p-10"
          >
            {isSuccess ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="h-20 w-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6">
                  <CheckCircle2 className="h-10 w-10" />
                </div>
                <h3 className="text-3xl font-serif font-bold text-primary-navy mb-4">
                  {locale === 'es' ? '¡Registro Exitoso!' : 'Registration Successful!'}
                </h3>
                <p className="text-stone-600 mb-8 max-w-md">
                  {locale === 'es' 
                    ? 'Hemos recibido tu registro correctamente. Prepárate para un tiempo de transformación y hermandad en la presencia de Dios. ¡Dios te bendiga!' 
                    : 'We have successfully received your registration. Get ready for a time of transformation and brotherhood in God\'s presence. God bless you!'}
                </p>
                <button
                  onClick={() => setIsSuccess(false)}
                  className="px-8 py-4 bg-primary-navy text-accent-gold font-bold tracking-widest text-sm rounded-full hover:bg-primary-navy/90 transition-colors"
                >
                  {locale === 'es' ? 'REGISTRAR A ALGUIEN MÁS' : 'REGISTER SOMEONE ELSE'}
                </button>
              </div>
            ) : (
              <>
                <h3 className="text-2xl font-serif font-bold text-primary-navy mb-2">
                  {locale === 'es' ? 'Formulario de Registro' : 'Registration Form'}
                </h3>
                <p className="text-stone-500 mb-8">
                  {locale === 'es' ? 'Completa tus datos para asegurar tu lugar.' : 'Fill in your details to secure your spot.'}
                </p>

                {error && (
                  <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-xl text-sm border border-red-100">
                    {error}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {formFields.slice(0, 2).map((field) => (
                      <div key={field.name} className="flex flex-col gap-2">
                        <label htmlFor={field.name} className="text-sm font-semibold text-stone-700">
                          {field.label} {field.required && <span className="text-red-500">*</span>}
                          {field.optional && <span className="text-stone-400 font-normal ml-1">({locale === 'es' ? 'opcional' : 'optional'})</span>}
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <field.icon className="h-4 w-4 text-stone-400" />
                          </div>
                          <input
                            type={field.type}
                            id={field.name}
                            name={field.name}
                            required={field.required}
                            className="w-full pl-11 pr-4 py-3 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent-gold/50 focus:border-accent-gold transition-all"
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                  {formFields.slice(2).map((field) => (
                    <div key={field.name} className="flex flex-col gap-2">
                      <label htmlFor={field.name} className="text-sm font-semibold text-stone-700">
                        {field.label} {field.required && <span className="text-red-500">*</span>}
                        {field.optional && <span className="text-stone-400 font-normal ml-1">({locale === 'es' ? 'opcional' : 'optional'})</span>}
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                          <field.icon className="h-4 w-4 text-stone-400" />
                        </div>
                        <input
                          type={field.type}
                          id={field.name}
                          name={field.name}
                          required={field.required}
                          className="w-full pl-11 pr-4 py-3 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent-gold/50 focus:border-accent-gold transition-all"
                        />
                      </div>
                    </div>
                  ))}

                  <div className="flex flex-col gap-2 mt-2">
                    <label htmlFor="tallaCamiseta" className="text-sm font-semibold text-stone-700 flex items-center gap-2">
                      <Shirt className="h-4 w-4 text-stone-500" />
                      {locale === 'es' ? 'Talla de Camiseta' : 'T-Shirt Size'} <span className="text-red-500">*</span>
                    </label>
                    <p className="text-xs text-stone-500 mb-1">
                      {locale === 'es' 
                        ? 'Durante el congreso habrá camisetas a la venta. Nos encantaría saber tu talla para tenerlas disponibles.' 
                        : 'There will be t-shirts for sale during the congress. We would love to know your size to have them available.'}
                    </p>
                    <select
                      id="tallaCamiseta"
                      name="tallaCamiseta"
                      required
                      className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent-gold/50 focus:border-accent-gold transition-all appearance-none cursor-pointer"
                    >
                      <option value="" disabled selected>{locale === 'es' ? 'Selecciona una talla' : 'Select a size'}</option>
                      <option value="XS">XS</option>
                      <option value="S">S</option>
                      <option value="M">M</option>
                      <option value="L">L</option>
                      <option value="XL">XL</option>
                      <option value="XXL">XXL</option>
                      <option value="3XL">3XL</option>
                      <option value="4XL">4XL</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="mt-4 w-full py-4 bg-primary-navy text-accent-gold font-bold tracking-widest uppercase rounded-xl hover:bg-primary-navy/90 transition-colors disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg"
                  >
                    {isSubmitting 
                      ? (locale === 'es' ? 'ENVIANDO...' : 'SUBMITTING...') 
                      : (locale === 'es' ? 'COMPLETAR REGISTRO' : 'COMPLETE REGISTRATION')}
                  </button>
                </form>
              </>
            )}
          </motion.div>

        </div>
      </div>
    </div>
  );
}
