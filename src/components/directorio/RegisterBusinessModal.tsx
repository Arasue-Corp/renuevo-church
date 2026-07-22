'use client';

import { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'motion/react';
import { X, CheckCircle, Loader2, Upload, Briefcase } from 'lucide-react';
import { submitBusiness } from '@/app/actions/submitBusiness';

interface RegisterBusinessModalProps {
  isEs: boolean;
}

export default function RegisterBusinessModal({ isEs }: RegisterBusinessModalProps) {
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    website: '',
    description: '',
  });

  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [otherCategory, setOtherCategory] = useState('');

  const predefinedCategories = isEs ? [
    'Restaurantes y Comida', 'Salud y Bienestar', 'Servicios Profesionales', 
    'Tecnología', 'Seguros', 'Bienes Raíces', 'Construcción', 
    'Educación', 'Belleza y Estética', 'Servicios Legales', 
    'Automotriz', 'Productos Retail', 'Finanzas', 'Arte y Entretenimiento'
  ] : [
    'Restaurants & Food', 'Health & Wellness', 'Professional Services',
    'Technology', 'Insurance', 'Real Estate', 'Construction',
    'Education', 'Beauty & Spa', 'Legal Services',
    'Automotive', 'Retail Products', 'Finance', 'Arts & Entertainment'
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const toggleCategory = (category: string) => {
    setSelectedCategories(prev => 
      prev.includes(category) 
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setError(isEs ? 'El logo debe ser menor a 5MB' : 'Logo must be under 5MB');
        return;
      }
      setSelectedFile(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const finalCategories = [...selectedCategories];
    if (otherCategory.trim()) {
      finalCategories.push(otherCategory.trim());
    }

    if (finalCategories.length === 0) {
      setError(isEs ? 'Por favor selecciona al menos una industria' : 'Please select at least one industry');
      return;
    }

    setIsSubmitting(true);

    const data = new FormData();
    data.append('name', formData.name);
    data.append('phone', formData.phone);
    data.append('email', formData.email);
    data.append('website', formData.website);
    data.append('description', formData.description);
    data.append('categories', JSON.stringify(finalCategories));
    
    if (selectedFile) {
      data.append('logo', selectedFile);
    }

    const result = await submitBusiness(data);

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
      setFormData({ name: '', phone: '', email: '', website: '', description: '' });
      setSelectedCategories([]);
      setOtherCategory('');
      setSelectedFile(null);
      setPreviewUrl(null);
    }, 500);
  };

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="relative inline-flex justify-center items-center gap-3 px-10 py-5 bg-accent-gold text-white rounded-xl font-bold text-sm tracking-widest uppercase hover:bg-white hover:text-primary-navy transition-all overflow-hidden group-hover:shadow-[0_0_20px_rgba(212,175,55,0.4)]"
      >
        <span className="relative z-10">{isEs ? 'Registrar mi negocio' : 'Register my business'}</span>
      </button>

      {mounted && createPortal(
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
              className="relative w-full max-w-3xl bg-white rounded-2xl shadow-2xl overflow-hidden max-h-full flex flex-col"
            >
              <div className="bg-primary-sand p-6 border-b border-stone-200 flex justify-between items-center shrink-0">
                <h3 className="text-2xl font-serif font-bold text-primary-navy">
                  {isEs ? 'Registro de Negocio' : 'Business Registration'}
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
                      {isEs ? '¡Solicitud Enviada!' : 'Request Sent!'}
                    </h4>
                    <p className="text-stone-600 mb-8 max-w-md">
                      {isEs 
                        ? 'Gracias por registrar tu negocio. Revisaremos la información y lo aprobaremos pronto para que aparezca en el directorio.' 
                        : 'Thank you for registering your business. We will review the information and approve it soon so it appears in the directory.'}
                    </p>
                    <button 
                      onClick={resetAndClose}
                      className="px-8 py-3 bg-primary-navy text-white font-bold rounded-lg hover:bg-stone-800 transition-colors"
                    >
                      {isEs ? 'Cerrar' : 'Close'}
                    </button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-8">
                    {/* General Info */}
                    <div className="space-y-4">
                      <h4 className="font-serif font-bold text-lg text-primary-navy border-b border-stone-200 pb-2">{isEs ? 'Información General' : 'General Info'}</h4>
                      <div className="grid grid-cols-1 gap-4">
                        <div>
                          <label className="block text-sm font-bold text-primary-navy mb-1">{isEs ? 'Nombre del Negocio *' : 'Business Name *'}</label>
                          <input required type="text" name="name" value={formData.name} onChange={handleChange} className="w-full px-4 py-3 rounded-lg border border-stone-300 focus:border-accent-gold focus:ring-2 focus:ring-accent-gold/20 outline-none transition-all" />
                        </div>
                        <div>
                          <label className="block text-sm font-bold text-primary-navy mb-1">{isEs ? 'Descripción *' : 'Description *'}</label>
                          <textarea required name="description" value={formData.description} onChange={handleChange} rows={3} placeholder={isEs ? 'Breve descripción de los productos o servicios que ofreces' : 'Short description of the products or services you offer'} className="w-full px-4 py-3 rounded-lg border border-stone-300 focus:border-accent-gold focus:ring-2 focus:ring-accent-gold/20 outline-none transition-all resize-none" />
                        </div>
                      </div>
                    </div>

                    {/* Contact Info */}
                    <div className="space-y-4">
                      <h4 className="font-serif font-bold text-lg text-primary-navy border-b border-stone-200 pb-2">{isEs ? 'Datos de Contacto' : 'Contact Details'}</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-bold text-primary-navy mb-1">{isEs ? 'Teléfono *' : 'Phone *'}</label>
                          <input required type="tel" name="phone" value={formData.phone} onChange={handleChange} className="w-full px-4 py-3 rounded-lg border border-stone-300 focus:border-accent-gold focus:ring-2 focus:ring-accent-gold/20 outline-none transition-all" />
                        </div>
                        <div>
                          <label className="block text-sm font-bold text-primary-navy mb-1">{isEs ? 'Correo Electrónico (Opcional)' : 'Email (Optional)'}</label>
                          <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full px-4 py-3 rounded-lg border border-stone-300 focus:border-accent-gold focus:ring-2 focus:ring-accent-gold/20 outline-none transition-all" />
                        </div>
                        <div className="md:col-span-2">
                          <label className="block text-sm font-bold text-primary-navy mb-1">{isEs ? 'Sitio Web (Opcional)' : 'Website (Optional)'}</label>
                          <input type="url" name="website" value={formData.website} onChange={handleChange} placeholder="https://..." className="w-full px-4 py-3 rounded-lg border border-stone-300 focus:border-accent-gold focus:ring-2 focus:ring-accent-gold/20 outline-none transition-all" />
                        </div>
                      </div>
                    </div>

                    {/* Logo Upload */}
                    <div className="space-y-4">
                      <h4 className="font-serif font-bold text-lg text-primary-navy border-b border-stone-200 pb-2">{isEs ? 'Logo del Negocio (Opcional)' : 'Business Logo (Optional)'}</h4>
                      <div className="flex items-center gap-6">
                        <div className="w-24 h-24 rounded-2xl border-2 border-dashed border-stone-300 flex items-center justify-center overflow-hidden bg-stone-50 shrink-0">
                          {previewUrl ? (
                            <img src={previewUrl} alt="Preview" className="w-full h-full object-contain" />
                          ) : (
                            <Briefcase className="text-stone-300 w-8 h-8" />
                          )}
                        </div>
                        <div className="flex-1">
                          <input 
                            type="file" 
                            accept="image/*" 
                            className="hidden" 
                            ref={fileInputRef} 
                            onChange={handleFileChange} 
                          />
                          <button 
                            type="button" 
                            onClick={() => fileInputRef.current?.click()}
                            className="flex items-center gap-2 px-6 py-2 bg-stone-100 hover:bg-stone-200 text-primary-navy font-bold rounded-lg transition-colors border border-stone-200 text-sm"
                          >
                            <Upload size={16} />
                            {isEs ? 'Subir Imagen' : 'Upload Image'}
                          </button>
                          <p className="text-xs text-stone-500 mt-2">
                            {isEs ? 'PNG, JPG o WEBP (Máximo 5MB)' : 'PNG, JPG, or WEBP (Max 5MB)'}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Categories */}
                    <div className="space-y-4">
                      <h4 className="font-serif font-bold text-lg text-primary-navy border-b border-stone-200 pb-2">{isEs ? 'Industria o Categoría * (Puedes elegir varias)' : 'Industry or Category * (Select multiple)'}</h4>
                      
                      <div className="flex flex-wrap gap-2">
                        {predefinedCategories.map((cat) => (
                          <button
                            key={cat}
                            type="button"
                            onClick={() => toggleCategory(cat)}
                            className={`px-4 py-2 rounded-full text-sm font-bold border transition-colors ${
                              selectedCategories.includes(cat)
                                ? 'bg-primary-navy text-white border-primary-navy'
                                : 'bg-white text-stone-600 border-stone-200 hover:border-primary-navy'
                            }`}
                          >
                            {cat}
                          </button>
                        ))}
                      </div>

                      <div className="mt-4">
                        <label className="block text-sm font-bold text-primary-navy mb-1">{isEs ? 'Otra categoría:' : 'Other category:'}</label>
                        <input 
                          type="text" 
                          value={otherCategory} 
                          onChange={(e) => setOtherCategory(e.target.value)} 
                          placeholder={isEs ? 'Escribe tu industria' : 'Type your industry'} 
                          className="w-full md:w-1/2 px-4 py-3 rounded-lg border border-stone-300 focus:border-accent-gold focus:ring-2 focus:ring-accent-gold/20 outline-none transition-all" 
                        />
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
                          : (isEs ? 'Enviar Solicitud' : 'Submit Request')}
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
      )}
    </>
  );
}
