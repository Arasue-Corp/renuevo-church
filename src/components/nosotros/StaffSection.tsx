'use client';

import { useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { Phone, Mail, Quote } from 'lucide-react';

interface StaffMember {
  id: string;
  name: string;
  roleEs: string;
  roleEn: string;
  historyEs: string;
  historyEn: string;
  messageEs: string;
  messageEn: string;
  phone: string;
  email: string;
  image: string;
}

const staff: StaffMember[] = [
  {
    id: 'rody',
    name: 'Rodimiro Romero',
    roleEs: 'Pastor Principal',
    roleEn: 'Lead Pastor',
    historyEs: 'Con más de 20 años de ministerio, el Pastor Rody ha dedicado su vida a enseñar la palabra de Dios con pasión y a formar líderes en la comunidad.',
    historyEn: 'With over 20 years of ministry, Pastor Rody has dedicated his life to passionately teaching God\'s word and raising leaders in the community.',
    messageEs: '"Mi mayor anhelo es que cada persona encuentre su propósito en Cristo y experimente el amor transformador del Padre."',
    messageEn: '"My greatest desire is for every person to find their purpose in Christ and experience the Father\'s transforming love."',
    phone: '480-555-0101',
    email: 'rody@renuevo.cc',
    image: '/staff-photos/perfil-rody.png'
  },
  {
    id: 'sonia',
    name: 'Sonia Romero',
    roleEs: 'Pastora',
    roleEn: 'Pastor',
    historyEs: 'Sonia ha sido un pilar fundamental en el desarrollo espiritual de las familias. Su corazón compasivo la impulsa a servir incansablemente a los más necesitados.',
    historyEn: 'Sonia has been a fundamental pillar in the spiritual development of families. Her compassionate heart drives her to tirelessly serve those in need.',
    messageEs: '"Creemos en una iglesia donde todos tienen un lugar en la mesa; una verdadera familia unida por la gracia de Dios."',
    messageEn: '"We believe in a church where everyone has a seat at the table; a true family united by God\'s grace."',
    phone: '480-555-0102',
    email: 'sonia@renuevo.cc',
    image: '/staff-photos/perfil-sonia.png'
  }
];

const StaffCard = ({ member, isEs, index }: { member: StaffMember, isEs: boolean, index: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { margin: "-20% 0px -20% 0px", once: false });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.7, delay: index * 0.1 }}
      className="group bg-white rounded-3xl shadow-xl shadow-stone-200/50 overflow-hidden flex flex-col md:flex-row border border-stone-100"
    >
      {/* Image Container */}
      <div className="w-full md:w-2/5 h-80 md:h-auto relative overflow-hidden bg-stone-100 shrink-0">
        <div className="absolute inset-0 bg-primary-navy/10 z-10 mix-blend-overlay pointer-events-none" />
        <img 
          src={member.image} 
          alt={member.name} 
          className={`w-full h-full object-cover object-top transition-all duration-1000 ease-out transform group-hover:scale-105
            ${isInView ? 'grayscale-0' : 'grayscale'} 
            lg:grayscale lg:group-hover:grayscale-0
          `}
        />
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/60 to-transparent z-10" />
        <div className="absolute bottom-4 left-6 z-20">
          <h3 className="text-2xl font-bold text-white font-serif tracking-wide">{member.name}</h3>
          <p className="text-accent-gold font-medium tracking-widest uppercase text-xs mt-1">
            {isEs ? member.roleEs : member.roleEn}
          </p>
        </div>
      </div>

      {/* Content Container */}
      <div className="w-full md:w-3/5 p-8 md:p-10 flex flex-col justify-between">
        <div>
          <div className="relative mb-6">
            <Quote className="absolute -top-3 -left-3 w-10 h-10 text-stone-100 rotate-180 z-0" />
            <p className="relative z-10 text-xl font-serif italic text-primary-navy font-bold leading-snug">
              {isEs ? member.messageEs : member.messageEn}
            </p>
          </div>
          <p className="text-stone-600 leading-relaxed font-medium">
            {isEs ? member.historyEs : member.historyEn}
          </p>
        </div>

        <div className="mt-8 pt-6 border-t border-stone-100 flex flex-col sm:flex-row gap-4">
          <a 
            href={`tel:${member.phone.replace(/\D/g, '')}`} 
            className="flex items-center gap-2 text-stone-500 hover:text-accent-gold transition-colors text-sm font-bold"
          >
            <div className="w-8 h-8 rounded-full bg-stone-50 flex items-center justify-center group-hover:bg-accent-gold/10">
              <Phone size={14} />
            </div>
            {member.phone}
          </a>
          <a 
            href={`mailto:${member.email}`} 
            className="flex items-center gap-2 text-stone-500 hover:text-accent-gold transition-colors text-sm font-bold"
          >
            <div className="w-8 h-8 rounded-full bg-stone-50 flex items-center justify-center group-hover:bg-accent-gold/10">
              <Mail size={14} />
            </div>
            {member.email}
          </a>
        </div>
      </div>
    </motion.div>
  );
};

export default function StaffSection({ isEs }: { isEs: boolean }) {
  return (
    <section className="py-24 md:py-32 relative bg-white">
      <div className="container mx-auto px-6 max-w-6xl relative z-10">
        <div className="text-center mb-16 md:mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold mb-6 text-primary-navy tracking-tight font-serif"
          >
            {isEs ? 'La Familia Renuevo' : 'The Renuevo Family'}
          </motion.h2>
          <motion.div 
            initial={{ opacity: 0, scaleX: 0 }}
            whileInView={{ opacity: 1, scaleX: 1 }}
            viewport={{ once: true }}
            className="w-16 h-1 bg-accent-gold mx-auto" 
          />
        </div>

        <div className="flex flex-col gap-12">
          {staff.map((member, idx) => (
            <StaffCard key={member.id} member={member} isEs={isEs} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}
