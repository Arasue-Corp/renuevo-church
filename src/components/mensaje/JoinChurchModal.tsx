'use client';

import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'motion/react';
import { X, CheckCircle, Loader2 } from 'lucide-react';
import { submitConnectionCard, type ConnectionCardData } from '@/app/actions/submitConnectionCard';

interface JoinChurchModalProps {
  isEs: boolean;
}

export default function JoinChurchModal({ isEs }: JoinChurchModalProps) {
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const [formData, setFormData] = useState<ConnectionCardData>({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    maritalStatus: '',
    interests: [],
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;

    if (type === 'checkbox') {
      setFormData((prev) => {
        const interests = prev.interests;
        if (checked) {
          return { ...prev, interests: [...interests, value] };
        } else {
          return { ...prev, interests: interests.filter((i) => i !== value) };
        }
      });
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const result = await submitConnectionCard(formData);

    if (result.success) {
      setIsSuccess(true);
    } else {
      setError(result.error || (isEs ? 'Ocurrió un error.' : 'An error occurred.'));
    }
    
    setIsSubmitting(false);
  };

  const resetAndClose = () => {
    setIsOpen(false);
    setTimeout(() => {
      setIsSuccess(false);
      setError(null);
      setFormData({
        name: '', email: '', phone: '', address: '', city: '', state: '', zip: '', maritalStatus: '', interests: []
      });
    }, 500);
  };

  const checkboxes = [
    { value: 'visit', label: isEs ? 'Quiero visitar la iglesia' : 'I am planning a visit' },
    { value: 'new_in_town', label: isEs ? 'Soy nuevo en el vecindario' : 'I am new to the neighborhood' },
    { value: 'home_visit', label: isEs ? 'Desearía una visita a domicilio' : 'I would like a pastoral visit' },
    { value: 'membership', label: isEs ? 'Me gustaría pertenecer a la iglesia' : 'I am interested in becoming a member' },
  ];

  const radios = [
    { value: 'married', label: isEs ? 'Casado' : 'Married' },
    { value: 'single', label: isEs ? 'Soltero' : 'Single' },
  ];

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="inline-flex justify-center items-center px-10 py-5 bg-accent-gold text-primary-navy rounded-xl font-bold text-sm tracking-widest uppercase hover:bg-white transition-all shadow-xl hover:shadow-2xl"
      >
        {isEs ? 'Unirse a nuestra iglesia' : 'Join our family'}
      </button>

      {mounted ? createPortal(
        <AnimatePresence>
          {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4 py-8">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-primary-navy/80 backdrop-blur-sm"
              onClick={resetAndClose}
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden max-h-full flex flex-col"
            >
              <div className="bg-primary-sand p-6 border-b border-stone-200 flex justify-between items-center shrink-0">
                <h3 className="text-2xl font-serif font-bold text-primary-navy">
                  {isEs ? 'Tarjeta de Conexión' : 'Connection Card'}
                </h3>
                <button 
                  onClick={resetAndClose}
                  className="p-2 text-stone-500 hover:text-primary-navy hover:bg-stone-200/50 rounded-full transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="p-6 md:p-8 overflow-y-auto">
                {isSuccess ? (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center justify-center py-12 text-center"
                  >
                    <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6">
                      <CheckCircle size={40} />
                    </div>
                    <h4 className="text-2xl font-bold text-primary-navy mb-2">
                      {isEs ? '¡Mensaje Enviado!' : 'Message Sent!'}
                    </h4>
                    <p className="text-stone-600 mb-8 max-w-md">
                      {isEs 
                        ? 'Gracias por conectarte con nosotros. Hemos recibido tu información y nos pondremos en contacto contigo pronto.' 
                        : 'Thank you for connecting with us. We have received your information and will be in touch soon.'}
                    </p>
                    <button 
                      onClick={resetAndClose}
                      className="px-8 py-3 bg-primary-navy text-white font-bold rounded-lg hover:bg-stone-800 transition-colors"
                    >
                      {isEs ? 'Cerrar' : 'Close'}
                    </button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Basic Info */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="md:col-span-2">
                        <label className="block text-sm font-bold text-primary-navy mb-1">{isEs ? 'Nombre Completo *' : 'Full Name *'}</label>
                        <input required type="text" name="name" value={formData.name} onChange={handleChange} className="w-full px-4 py-3 rounded-lg border border-stone-300 focus:border-accent-gold focus:ring-2 focus:ring-accent-gold/20 outline-none transition-all" />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-bold text-primary-navy mb-1">{isEs ? 'Teléfono' : 'Phone'}</label>
                        <input type="tel" name="phone" value={formData.phone} onChange={handleChange} className="w-full px-4 py-3 rounded-lg border border-stone-300 focus:border-accent-gold focus:ring-2 focus:ring-accent-gold/20 outline-none transition-all" />
                      </div>

                      <div>
                        <label className="block text-sm font-bold text-primary-navy mb-1">{isEs ? 'Correo Electrónico' : 'Email'}</label>
                        <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full px-4 py-3 rounded-lg border border-stone-300 focus:border-accent-gold focus:ring-2 focus:ring-accent-gold/20 outline-none transition-all" />
                      </div>
                    </div>

                    {/* Address Info */}
                    <div className="space-y-4">
                      <h4 className="font-serif font-bold text-lg text-primary-navy border-b border-stone-200 pb-2">{isEs ? 'Dirección' : 'Address'}</h4>
                      
                      <div>
                        <label className="block text-sm font-bold text-primary-navy mb-1">{isEs ? 'Calle y Número' : 'Street Address'}</label>
                        <input type="text" name="address" value={formData.address} onChange={handleChange} className="w-full px-4 py-3 rounded-lg border border-stone-300 focus:border-accent-gold focus:ring-2 focus:ring-accent-gold/20 outline-none transition-all" />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <label className="block text-sm font-bold text-primary-navy mb-1">{isEs ? 'Ciudad' : 'City'}</label>
                          <input type="text" name="city" value={formData.city} onChange={handleChange} className="w-full px-4 py-3 rounded-lg border border-stone-300 focus:border-accent-gold focus:ring-2 focus:ring-accent-gold/20 outline-none transition-all" />
                        </div>
                        <div>
                          <label className="block text-sm font-bold text-primary-navy mb-1">{isEs ? 'Estado' : 'State'}</label>
                          <input type="text" name="state" value={formData.state} onChange={handleChange} className="w-full px-4 py-3 rounded-lg border border-stone-300 focus:border-accent-gold focus:ring-2 focus:ring-accent-gold/20 outline-none transition-all" />
                        </div>
                        <div>
                          <label className="block text-sm font-bold text-primary-navy mb-1">{isEs ? 'Código Postal' : 'Zip Code'}</label>
                          <input type="text" name="zip" value={formData.zip} onChange={handleChange} className="w-full px-4 py-3 rounded-lg border border-stone-300 focus:border-accent-gold focus:ring-2 focus:ring-accent-gold/20 outline-none transition-all" />
                        </div>
                      </div>
                    </div>

                    {/* Options */}
                    <div className="space-y-4">
                      <h4 className="font-serif font-bold text-lg text-primary-navy border-b border-stone-200 pb-2">{isEs ? 'Me gustaría...' : 'I am interested in...'}</h4>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {checkboxes.map((item) => (
                          <label key={item.value} className="flex items-center gap-3 cursor-pointer group">
                            <div className="relative flex items-center justify-center w-5 h-5 rounded border border-stone-300 bg-white group-hover:border-accent-gold transition-colors">
                              <input 
                                type="checkbox" 
                                name="interests" 
                                value={item.value}
                                checked={formData.interests.includes(item.value)}
                                onChange={handleChange}
                                className="peer opacity-0 absolute inset-0 cursor-pointer"
                              />
                              <div className="absolute inset-0 bg-accent-gold rounded opacity-0 peer-checked:opacity-100 transition-opacity flex items-center justify-center">
                                <CheckCircle size={14} className="text-white" />
                              </div>
                            </div>
                            <span className="text-stone-700 text-sm font-medium select-none">{item.label}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* Marital Status */}
                    <div className="space-y-4">
                      <h4 className="font-serif font-bold text-lg text-primary-navy border-b border-stone-200 pb-2">{isEs ? 'Estado Civil' : 'Marital Status'}</h4>
                      
                      <div className="flex gap-6">
                        {radios.map((item) => (
                          <label key={item.value} className="flex items-center gap-2 cursor-pointer group">
                            <div className="relative flex items-center justify-center w-5 h-5 rounded-full border border-stone-300 bg-white group-hover:border-accent-gold transition-colors">
                              <input 
                                type="radio" 
                                name="maritalStatus" 
                                value={item.value}
                                checked={formData.maritalStatus === item.value}
                                onChange={handleChange}
                                className="peer opacity-0 absolute inset-0 cursor-pointer"
                              />
                              <div className="w-2.5 h-2.5 rounded-full bg-accent-gold opacity-0 peer-checked:opacity-100 transition-opacity" />
                            </div>
                            <span className="text-stone-700 text-sm font-medium select-none">{item.label}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    {error && (
                      <div className="p-4 bg-red-50 text-red-600 rounded-lg text-sm font-medium">
                        {error}
                      </div>
                    )}

                    <div className="pt-4 mt-8 border-t border-stone-200">
                      <button 
                        type="submit" 
                        disabled={isSubmitting}
                        className="w-full flex justify-center items-center gap-2 px-8 py-4 bg-primary-navy text-white rounded-xl font-bold text-sm tracking-widest uppercase hover:bg-stone-800 transition-all shadow-lg hover:shadow-xl disabled:opacity-70 disabled:cursor-not-allowed"
                      >
                        {isSubmitting && <Loader2 size={18} className="animate-spin" />}
                        {isSubmitting 
                          ? (isEs ? 'Enviando...' : 'Sending...')
                          : (isEs ? 'Enviar Datos' : 'Submit Information')}
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        )}
        </AnimatePresence>,
        document.body
      ) : null}
    </>
  );
}
