'use client';

import { useState } from 'react';
import { useLocale } from 'next-intl';
import { motion } from 'framer-motion';
import { registerHombresDeAltar } from '@/app/actions/register';
import { Calendar, MapPin, CheckCircle2, ChevronRight, User, Hash, Church, Phone, Mail, Shirt } from 'lucide-react';
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
    <div className="min-h-screen bg-black text-stone-200">
      {/* Hero Background Elements */}
      <div className="absolute inset-0 z-0 h-[60vh] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary-navy/80 via-black to-black z-10" />
        <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-accent-gold/40 via-transparent to-transparent z-10" />
        {/* Abstract pattern or glow */}
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-accent-gold/20 blur-[120px] z-0" />
      </div>

      <div className="relative z-20 max-w-7xl mx-auto px-4 md:px-8 pt-32 md:pt-40 pb-24">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Info Section */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="lg:col-span-5 flex flex-col gap-6 lg:sticky lg:top-32"
          >
            <div className="inline-flex w-fit items-center gap-2 rounded-full border border-accent-gold/30 bg-accent-gold/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-accent-gold backdrop-blur-md">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-gold opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-accent-gold"></span>
              </span>
              {locale === 'es' ? 'Congreso de Varones' : "Men's Congress"}
            </div>
            
            <h1 className="font-serif text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white leading-[1.1]">
              Hombres <br className="hidden md:block" /> 
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-gold to-yellow-600">
                de Altar
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-stone-400 leading-relaxed max-w-lg font-light">
              {locale === 'es' 
                ? 'Un tiempo de transformación, propósito y hermandad. Diseñado para equipar a los hombres a vivir vidas guiadas por Dios en su hogar, iglesia y comunidad.'
                : 'A time of transformation, purpose, and brotherhood. Designed to equip men to live God-led lives in their home, church, and community.'}
            </p>

            <div className="flex flex-col gap-6 mt-8">
              <div className="flex items-center gap-5 p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm transition-colors hover:bg-white/10">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-accent-gold/20 text-accent-gold">
                  <Calendar className="h-7 w-7" />
                </div>
                <div>
                  <p className="font-bold text-lg text-white">{locale === 'es' ? '27 y 28 de Nov, 2026' : 'Nov 27 & 28, 2026'}</p>
                  <p className="text-sm text-stone-400 font-medium tracking-wide uppercase">{locale === 'es' ? 'Apunta la fecha' : 'Save the date'}</p>
                </div>
              </div>

              <div className="flex items-center gap-5 p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm transition-colors hover:bg-white/10">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-accent-gold/20 text-accent-gold">
                  <MapPin className="h-7 w-7" />
                </div>
                <div>
                  <p className="font-bold text-lg text-white">Renuevo Church</p>
                  <p className="text-sm text-stone-400 font-medium tracking-wide uppercase">{locale === 'es' ? 'Auditorio Principal' : 'Main Auditorium'}</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Form Section */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="lg:col-span-7"
          >
            <div className="relative bg-[#111] rounded-[2rem] shadow-2xl border border-stone-800 p-8 md:p-12 overflow-hidden">
              {/* Form Decorative Background */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-accent-gold/5 rounded-full blur-3xl" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary-navy/20 rounded-full blur-3xl" />

              <div className="relative z-10">
                {isSuccess ? (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center justify-center py-16 text-center"
                  >
                    <div className="relative">
                      <div className="absolute inset-0 bg-accent-gold/20 animate-ping rounded-full" />
                      <div className="relative h-24 w-24 bg-gradient-to-br from-accent-gold to-yellow-600 text-black rounded-full flex items-center justify-center mb-8 shadow-xl">
                        <CheckCircle2 className="h-12 w-12" />
                      </div>
                    </div>
                    <h3 className="text-4xl font-serif font-bold text-white mb-4">
                      {locale === 'es' ? '¡Registro Exitoso!' : 'Registration Successful!'}
                    </h3>
                    <p className="text-stone-400 mb-10 max-w-md text-lg">
                      {locale === 'es' 
                        ? 'Hemos recibido tus datos correctamente. ¡Prepárate para un tiempo increíble!' 
                        : 'We have received your details successfully. Get ready for an incredible time!'}
                    </p>
                    <button
                      onClick={() => setIsSuccess(false)}
                      className="group flex items-center gap-2 px-8 py-4 bg-white text-black font-bold tracking-widest text-sm rounded-full hover:bg-stone-200 transition-all duration-300"
                    >
                      {locale === 'es' ? 'REGISTRAR A ALGUIEN MÁS' : 'REGISTER SOMEONE ELSE'}
                      <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </motion.div>
                ) : (
                  <>
                    <div className="mb-10">
                      <h3 className="text-3xl font-serif font-bold text-white mb-3">
                        {locale === 'es' ? 'Asegura tu lugar' : 'Secure your spot'}
                      </h3>
                      <p className="text-stone-400">
                        {locale === 'es' ? 'Completa el formulario a continuación para confirmar tu asistencia al congreso.' : 'Fill out the form below to confirm your attendance to the congress.'}
                      </p>
                    </div>

                    {error && (
                      <div className="mb-8 p-5 bg-red-500/10 text-red-400 rounded-2xl border border-red-500/20 text-sm font-medium flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-red-500 shrink-0" />
                        {error}
                      </div>
                    )}

                    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {formFields.slice(0, 2).map((field) => (
                          <div key={field.name} className="flex flex-col gap-2">
                            <label htmlFor={field.name} className="text-xs font-bold uppercase tracking-wider text-stone-400 ml-1">
                              {field.label} {field.required && <span className="text-accent-gold">*</span>}
                              {field.optional && <span className="text-stone-600 lowercase ml-1">({locale === 'es' ? 'opcional' : 'optional'})</span>}
                            </label>
                            <div className="relative">
                              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <field.icon className="h-5 w-5 text-stone-500" />
                              </div>
                              <input
                                type={field.type}
                                id={field.name}
                                name={field.name}
                                required={field.required}
                                className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-stone-600 focus:outline-none focus:ring-2 focus:ring-accent-gold/50 focus:border-accent-gold focus:bg-white/10 transition-all"
                              />
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {formFields.slice(2, 4).map((field) => (
                          <div key={field.name} className="flex flex-col gap-2">
                            <label htmlFor={field.name} className="text-xs font-bold uppercase tracking-wider text-stone-400 ml-1">
                              {field.label} {field.required && <span className="text-accent-gold">*</span>}
                            </label>
                            <div className="relative">
                              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <field.icon className="h-5 w-5 text-stone-500" />
                              </div>
                              <input
                                type={field.type}
                                id={field.name}
                                name={field.name}
                                required={field.required}
                                className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-stone-600 focus:outline-none focus:ring-2 focus:ring-accent-gold/50 focus:border-accent-gold focus:bg-white/10 transition-all"
                              />
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {formFields.slice(4).map((field) => (
                          <div key={field.name} className="flex flex-col gap-2">
                            <label htmlFor={field.name} className="text-xs font-bold uppercase tracking-wider text-stone-400 ml-1">
                              {field.label} {field.required && <span className="text-accent-gold">*</span>}
                              {field.optional && <span className="text-stone-600 lowercase ml-1">({locale === 'es' ? 'opcional' : 'optional'})</span>}
                            </label>
                            <div className="relative">
                              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <field.icon className="h-5 w-5 text-stone-500" />
                              </div>
                              <input
                                type={field.type}
                                id={field.name}
                                name={field.name}
                                required={field.required}
                                className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-stone-600 focus:outline-none focus:ring-2 focus:ring-accent-gold/50 focus:border-accent-gold focus:bg-white/10 transition-all"
                              />
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="flex flex-col gap-2 mt-4 p-6 bg-accent-gold/5 rounded-2xl border border-accent-gold/20">
                        <label htmlFor="tallaCamiseta" className="text-xs font-bold uppercase tracking-wider text-accent-gold flex items-center gap-2">
                          <Shirt className="h-4 w-4" />
                          {locale === 'es' ? 'Talla de Camiseta' : 'T-Shirt Size'} <span className="text-accent-gold">*</span>
                        </label>
                        <p className="text-sm text-stone-400 mb-3 font-light leading-relaxed">
                          {locale === 'es' 
                            ? 'Durante el congreso habrá camisetas exclusivas a la venta. Nos encantaría saber tu talla para asegurar disponibilidad.' 
                            : 'There will be exclusive t-shirts for sale during the congress. We would love to know your size to ensure availability.'}
                        </p>
                        <div className="relative">
                          <select
                            id="tallaCamiseta"
                            name="tallaCamiseta"
                            required
                            className="w-full px-5 py-4 bg-black border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-accent-gold/50 focus:border-accent-gold transition-all appearance-none cursor-pointer font-bold"
                          >
                            <option value="" disabled selected>{locale === 'es' ? 'SELECCIONA TU TALLA' : 'SELECT YOUR SIZE'}</option>
                            <option value="XS">XS</option>
                            <option value="S">S</option>
                            <option value="M">M</option>
                            <option value="L">L</option>
                            <option value="XL">XL</option>
                            <option value="XXL">XXL</option>
                            <option value="3XL">3XL</option>
                            <option value="4XL">4XL</option>
                          </select>
                          <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                            <ChevronRight className="h-5 w-5 text-stone-500 rotate-90" />
                          </div>
                        </div>
                      </div>

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="group relative mt-6 w-full py-5 bg-gradient-to-r from-accent-gold to-yellow-600 text-black font-black tracking-[0.2em] uppercase rounded-2xl hover:from-yellow-400 hover:to-yellow-500 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-3 overflow-hidden shadow-[0_0_40px_rgba(212,175,55,0.3)]"
                      >
                        <span className="relative z-10">
                          {isSubmitting 
                            ? (locale === 'es' ? 'PROCESANDO...' : 'PROCESSING...') 
                            : (locale === 'es' ? 'COMPLETAR REGISTRO' : 'COMPLETE REGISTRATION')}
                        </span>
                        {!isSubmitting && <ChevronRight className="relative z-10 h-5 w-5 group-hover:translate-x-1 transition-transform" />}
                        <div className="absolute inset-0 -translate-x-full bg-white/30 transition-transform duration-700 ease-out group-hover:translate-x-0" />
                      </button>
                    </form>
                  </>
                )}
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
}
