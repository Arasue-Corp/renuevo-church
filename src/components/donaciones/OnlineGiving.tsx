import { CreditCard } from 'lucide-react';

export default function OnlineGiving({ isEs }: { isEs: boolean }) {
  return (
    <div className="group bg-primary-navy p-8 md:p-10 rounded-2xl shadow-2xl shadow-primary-navy/20 border-2 border-transparent hover:border-accent-gold transition-all">
      <div className="flex flex-col sm:flex-row items-start gap-6">
        <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center shrink-0 text-accent-gold group-hover:bg-accent-gold group-hover:text-primary-navy transition-colors">
          <CreditCard className="w-8 h-8 stroke-[2]" />
        </div>
        <div className="flex-1">
          <h3 className="text-2xl font-serif font-bold text-white mb-3 tracking-tight">
            {isEs ? 'Donación en Línea' : 'Online Giving'}
          </h3>
          <p className="text-stone-300 mb-8 font-medium text-base leading-relaxed">
            {isEs ? 'Utiliza tu tarjeta de crédito, débito o billetera digital a través de nuestra pasarela segura.' : 'Give securely using your credit card, debit card, or digital wallet.'}
          </p>
          <a href="#" className="inline-flex justify-center items-center w-full sm:w-auto px-8 py-4 bg-accent-gold text-primary-navy hover:bg-white transition-colors text-sm font-bold tracking-widest uppercase rounded-xl">
            {isEs ? 'Donar Ahora' : 'Give Now'}
          </a>
        </div>
      </div>
    </div>
  );
}
