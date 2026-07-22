'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, ChevronDown } from 'lucide-react';

export default function TaxForm({ locale }: { locale: string }) {
  const isEs = locale === 'es';
  const [method, setMethod] = useState<'zelle' | 'cheque' | 'online' | ''>('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const inputClasses = "w-full bg-stone-800/50 border-2 border-stone-700 text-white px-5 py-4 focus:outline-none focus:border-accent-gold transition-all placeholder:text-stone-500 font-medium rounded-xl";
  const labelClasses = "text-xs uppercase tracking-[0.15em] text-stone-400 font-bold mb-2 block";

  if (submitted) {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 10 }} 
        animate={{ opacity: 1, y: 0 }} 
        className="bg-primary-navy p-12 text-center rounded-2xl border-2 border-accent-gold shadow-2xl shadow-primary-navy/20"
      >
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }} 
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="mb-8 flex justify-center"
        >
          <CheckCircle2 strokeWidth={2} className="w-20 h-20 text-accent-gold" />
        </motion.div>
        
        <h3 className="text-3xl font-serif font-bold text-white mb-4">
          {isEs ? 'Recibo Solicitado' : 'Receipt Requested'}
        </h3>
        
        <p className="text-stone-300 text-base font-medium max-w-sm mx-auto leading-relaxed mb-10 text-balance">
          {isEs 
            ? 'Hemos registrado tu información. Al confirmar el depósito, emitiremos tu comprobante de deducción de impuestos oficial a tu correo electrónico.'
            : 'We have recorded your information. Upon confirming the deposit, we will issue your official tax deduction receipt to your email.'}
        </p>
        
        <button 
          onClick={() => setSubmitted(false)}
          className="text-sm uppercase tracking-widest font-bold text-accent-gold border-b-2 border-accent-gold pb-1 hover:text-white hover:border-white transition-colors"
        >
          {isEs ? 'Enviar otra declaración' : 'Submit another declaration'}
        </button>
      </motion.div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="bg-primary-navy p-10 md:p-12 rounded-2xl shadow-2xl shadow-primary-navy/20 border border-stone-800"
    >
      <div className="mb-12">
        <h3 className="text-3xl text-white font-serif font-bold mb-3">
          {isEs ? 'Comprobante Fiscal' : 'Tax Receipt'}
        </h3>
        <p className="text-stone-400 text-base font-medium">
          {isEs ? 'Solicita tu recibo deducible completando este formulario' : 'Request your deductible receipt by completing this form'}
        </p>
        <div className="w-12 h-1 bg-accent-gold mt-6" />
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <label className={labelClasses}>{isEs ? 'Nombre Completo' : 'Full Name'}</label>
            <input required type="text" className={inputClasses} placeholder={isEs ? 'Ej. Juan Pérez' : 'e.g. John Doe'} />
          </div>
          <div>
            <label className={labelClasses}>{isEs ? 'Correo Electrónico' : 'Email Address'}</label>
            <input required type="email" className={inputClasses} placeholder="email@ejemplo.com" />
          </div>
        </div>

        <div>
          <label className={labelClasses}>{isEs ? 'Dirección Postal' : 'Mailing Address'}</label>
          <input required type="text" className={inputClasses} placeholder={isEs ? 'Dirección, Ciudad, Estado, ZIP' : 'Address, City, State, ZIP'} />
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <label className={labelClasses}>{isEs ? 'Monto Donado ($)' : 'Donation Amount ($)'}</label>
            <input required type="number" min="1" step="any" className={inputClasses} placeholder="0.00" />
          </div>
          <div className="relative">
            <label className={labelClasses}>{isEs ? 'Método Utilizado' : 'Method Used'}</label>
            <div className="relative">
              <select 
                required 
                value={method} 
                onChange={(e) => setMethod(e.target.value as any)}
                className={`${inputClasses} appearance-none cursor-pointer pr-10`}
              >
                <option value="" disabled className="text-stone-500">{isEs ? 'Selecciona...' : 'Select...'}</option>
                <option value="zelle">Zelle</option>
                <option value="cheque">{isEs ? 'Cheque Físico' : 'Physical Check'}</option>
                <option value="online">{isEs ? 'Pago en Línea' : 'Online Payment'}</option>
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-accent-gold">
                <ChevronDown className="w-6 h-6 stroke-[3]" />
              </div>
            </div>
          </div>
        </div>

        <AnimatePresence>
          {method === 'zelle' && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden">
              <div className="pt-2">
                <label className={labelClasses}>{isEs ? 'Email o Teléfono usado en Zelle' : 'Zelle Email or Phone'}</label>
                <input required type="text" className={inputClasses} placeholder={isEs ? 'Dato para cotejar' : 'Detail for matching'} />
              </div>
            </motion.div>
          )}
          {method === 'cheque' && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden">
              <div className="pt-2">
                <label className={labelClasses}>{isEs ? 'Número de Cheque' : 'Check Number'}</label>
                <input required type="text" className={inputClasses} placeholder="#0000" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <button 
          type="submit"
          className="w-full mt-10 py-5 bg-accent-gold text-primary-navy font-bold text-sm tracking-widest uppercase hover:bg-white transition-colors rounded-xl shadow-lg shadow-accent-gold/20"
        >
          {isEs ? 'Enviar Declaración' : 'Submit Declaration'}
        </button>
      </form>
    </motion.div>
  );
}
