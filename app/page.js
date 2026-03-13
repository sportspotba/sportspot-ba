'use client';
import { useState, useMemo, useEffect, useCallback } from 'react';

// ═══════════════════════════════════════
// DATA
// ═══════════════════════════════════════
const CATS = [
  { id:"todos", n:"Todos", i:"⚡" },
  { id:"gimnasio", n:"Gimnasios", i:"🏋️" },
  { id:"futbol", n:"Fútbol", i:"⚽" },
  { id:"padel", n:"Pádel", i:"🏸" },
  { id:"crossfit", n:"CrossFit", i:"🔥" },
  { id:"pilates", n:"Pilates & Yoga", i:"🧘" },
  { id:"boxeo", n:"Boxeo & MMA", i:"🥊" },
  { id:"natacion", n:"Natación", i:"🏊" },
  { id:"tenis", n:"Tenis", i:"🎾" },
  { id:"running", n:"Running", i:"🏃" },
];

const ZONAS = ["Todas las zonas","── CABA ──","Palermo","Belgrano","Recoleta","Caballito","Almagro","San Telmo","Núñez","Villa Crespo","Villa Urquiza","Barracas","Puerto Madero","Flores","Boedo","Colegiales","Devoto","Saavedra","── GBA Norte ──","Vicente López","San Isidro","Tigre","Pilar","San Fernando","Olivos","Martínez","── GBA Oeste ──","Morón","Ramos Mejía","Ituzaingó","Caseros","Haedo","San Justo","── GBA Sur ──","Quilmes","Avellaneda","Lanús","Lomas de Zamora","Banfield","Adrogué","Temperley"];

const LOCALES = [
  {id:1,n:"Iron Temple Gym",c:"gimnasio",z:"Palermo",d:"Av. Santa Fe 3450",r:4.8,rv:342,p:"$$",h:"Lun-Sáb 6:00-23:00",t:"11-4567-8901",w:"5491145678901",dt:1,pr:1,a:["Musculación","Funcional","Nutricionista","Duchas","Estacionamiento"],ds:"Equipamiento de última generación con más de 1500m² y entrenadores certificados."},
  {id:2,n:"Studio Core Pilates",c:"pilates",z:"Recoleta",d:"Junín 1280",r:4.9,rv:189,p:"$$$",h:"Lun-Vie 7:00-21:00",t:"11-2345-6789",w:"5491123456789",dt:1,pr:1,a:["Reformer","Mat","Cadillac","Yoga","Meditación"],ds:"Estudio boutique con reformers Balanced Body y atención 100% personalizada."},
  {id:3,n:"La Canchita FC",c:"futbol",z:"Villa Crespo",d:"Av. Corrientes 5678",r:4.5,rv:567,p:"$",h:"Todos los días 8:00-00:00",t:"11-3456-7890",w:"5491134567890",dt:0,pr:0,a:["Fútbol 5","Fútbol 7","Césped sintético","Vestuarios","Bar"],ds:"6 canchas de césped sintético con iluminación LED y reservas online 24/7."},
  {id:4,n:"Pádel Zone Club",c:"padel",z:"Núñez",d:"Av. del Libertador 7890",r:4.7,rv:234,p:"$$",h:"Lun-Dom 7:00-23:00",t:"11-4567-1234",w:"5491145671234",dt:1,pr:1,a:["4 canchas panorámicas","Pro Shop","Clases","Torneos","Cafetería"],ds:"Club de pádel premium con canchas de cristal y torneos semanales."},
  {id:5,n:"Ring Side Boxing",c:"boxeo",z:"Almagro",d:"Av. Rivadavia 3456",r:4.6,rv:178,p:"$",h:"Lun-Sáb 9:00-22:00",t:"11-5678-2345",w:"5491156782345",dt:0,pr:1,a:["Ring profesional","Bolsas","Kickboxing","MMA","Sparring"],ds:"Club de boxeo con coaches profesionales y ambiente de comunidad auténtico."},
  {id:6,n:"Aqua Fitness Center",c:"natacion",z:"Belgrano",d:"Av. Cabildo 2340",r:4.8,rv:412,p:"$$$",h:"Lun-Sáb 6:00-22:00",t:"11-6789-3456",w:"5491167893456",dt:1,pr:1,a:["Pileta semiolímpica","Climatizada","Aquagym","Infantil","Clases"],ds:"Centro acuático con pileta climatizada todo el año para todas las edades."},
  {id:7,n:"CrossFit Porteño",c:"crossfit",z:"Barracas",d:"Av. Montes de Oca 1500",r:4.7,rv:298,p:"$$",h:"Lun-Sáb 6:30-21:30",t:"11-7890-4567",w:"5491178904567",dt:0,pr:1,a:["Box completo","Coaches L2","WOD diario","Open Gym","Nutrición"],ds:"Box con coaches Level 2 y comunidad activa de más de 200 atletas."},
  {id:8,n:"Shakti Yoga Studio",c:"pilates",z:"Palermo",d:"Honduras 4800",r:4.9,rv:156,p:"$$",h:"Lun-Sáb 7:00-21:00",t:"11-8901-5678",w:"5491189015678",dt:1,pr:1,a:["Vinyasa","Hatha","Ashtanga","Meditación","Retiros"],ds:"Espacios diseñados para la práctica consciente con profesores internacionales."},
  {id:9,n:"Mega Sport",c:"gimnasio",z:"Belgrano",d:"Av. Cabildo 1890",r:4.4,rv:534,p:"$",h:"Lun-Dom 6:00-23:30",t:"11-1234-9876",w:"5491112349876",dt:0,pr:0,a:["Musculación","Cardio","Spinning","Clases grupales","Sauna"],ds:"2000m² de instalaciones con más de 50 clases semanales y precios accesibles."},
  {id:10,n:"BA Running Team",c:"running",z:"Puerto Madero",d:"Dique 3, Local 45",r:4.8,rv:89,p:"$",h:"Lun-Sáb 6:00-20:00",t:"11-2345-8765",w:"5491123458765",dt:1,pr:1,a:["Grupos por nivel","Coach","Nutrición","Carreras","Comunidad"],ds:"Running en los espacios verdes de Puerto Madero con coaching profesional."},
  {id:11,n:"Tennis Park",c:"tenis",z:"Palermo",d:"Av. Infanta Isabel 410",r:4.6,rv:201,p:"$$$",h:"Lun-Dom 7:00-22:00",t:"11-3456-7654",w:"5491134567654",dt:0,pr:1,a:["6 canchas polvo","Clases","Torneos","Pro Shop","Cafetería"],ds:"Canchas de polvo de ladrillo con formación para todas las edades."},
  {id:12,n:"Power House Gym",c:"gimnasio",z:"Villa Urquiza",d:"Av. Triunvirato 4500",r:4.3,rv:267,p:"$",h:"Lun-Sáb 7:00-23:00",t:"11-4567-6543",w:"5491145676543",dt:0,pr:0,a:["Musculación","Funcional","Spinning","Personal Trainer"],ds:"Gimnasio barrial con equipamiento importado y planes accesibles."},
  {id:13,n:"Gol de Oro",c:"futbol",z:"San Telmo",d:"Defensa 1200",r:4.2,rv:389,p:"$",h:"Todos los días 9:00-01:00",t:"11-6789-4321",w:"5491167894321",dt:0,pr:0,a:["Fútbol 5","Fútbol 7","Torneos nocturnos","Asadores","Vestuarios"],ds:"Complejo deportivo con ambiente auténtico y torneos nocturnos."},
  {id:14,n:"Pádel Masters",c:"padel",z:"Vicente López",d:"Av. Maipú 2200",r:4.8,rv:176,p:"$$$",h:"Lun-Dom 8:00-23:00",t:"11-7890-3210",w:"5491178903210",dt:1,pr:1,a:["6 canchas","Ranking interno","Clases","Torneos","Cafetería premium"],ds:"El club de pádel más exclusivo de zona norte con canchas de última generación."},
  {id:15,n:"Fight Club BA",c:"boxeo",z:"San Telmo",d:"Balcarce 870",r:4.4,rv:210,p:"$",h:"Lun-Sáb 10:00-22:00",t:"11-8901-2109",w:"5491189012109",dt:0,pr:1,a:["Kickboxing","MMA","Boxeo","Funcional","Muay Thai"],ds:"Centro de combate con entrenamientos intensivos y comunidad única."},
  {id:16,n:"Zentra Yoga",c:"pilates",z:"Villa Crespo",d:"Thames 600",r:4.6,rv:98,p:"$$",h:"Lun-Sáb 7:30-21:00",t:"11-9012-1098",w:"5491190121098",dt:0,pr:1,a:["Ashtanga","Yin Yoga","Kundalini","Retiros","Meditación"],ds:"Yoga para todos los niveles con retiros mensuales."},
  {id:17,n:"CrossFit Sur",c:"crossfit",z:"Quilmes",d:"Av. Mitre 800",r:4.5,rv:145,p:"$",h:"Lun-Sáb 7:00-21:00",t:"11-3344-5566",w:"5491133445566",dt:0,pr:1,a:["Box equipado","Halterofilia","WOD","Comunidad","Nutrición"],ds:"Primer box de CrossFit en zona sur con +150 atletas."},
  {id:18,n:"Sport Center Morón",c:"gimnasio",z:"Morón",d:"Av. Rivadavia 17800",r:4.3,rv:312,p:"$",h:"Lun-Sáb 6:00-23:00",t:"11-5566-7788",w:"5491155667788",dt:0,pr:0,a:["Musculación","Funcional","Pilates","Spinning","Natación"],ds:"Centro deportivo integral con pileta y más de 40 clases semanales."},
  {id:19,n:"Pádel Point Pilar",c:"padel",z:"Pilar",d:"Ruta 8 km 54",r:4.6,rv:88,p:"$$",h:"Lun-Dom 8:00-22:00",t:"11-7788-9900",w:"5491177889900",dt:0,pr:1,a:["8 canchas","Escuela","Torneos","Pro Shop","Estacionamiento"],ds:"El complejo de pádel más grande del corredor norte con 8 canchas."},
  {id:20,n:"Megatlon Quilmes",c:"gimnasio",z:"Quilmes",d:"Av. Calchaquí 340",r:4.5,rv:423,p:"$$",h:"Lun-Dom 6:00-23:00",t:"11-9900-1122",w:"5491199001122",dt:1,pr:1,a:["Musculación","Pileta","Spinning","Funcional","Kids"],ds:"Cadena de gimnasios más grande de Argentina con todas las disciplinas."},
  {id:21,n:"Club San Isidro Tenis",c:"tenis",z:"San Isidro",d:"Blanco Encalada 55",r:4.7,rv:134,p:"$$$",h:"Lun-Dom 7:00-21:00",t:"11-2233-4455",w:"5491122334455",dt:0,pr:1,a:["4 canchas","Academia","Torneos zonales","Pileta"],ds:"Club tradicional con más de 50 años de historia."},
  {id:22,n:"Natatorio Municipal Lanús",c:"natacion",z:"Lanús",d:"Av. H. Yrigoyen 4400",r:4.1,rv:267,p:"$",h:"Lun-Sáb 8:00-20:00",t:"11-3344-6677",w:"",dt:0,pr:0,a:["Pileta olímpica","Clases","Natación infantil","Aquagym"],ds:"Natatorio municipal con pileta olímpica a precio accesible."},
  {id:23,n:"Running Avellaneda",c:"running",z:"Avellaneda",d:"Parque Alsina s/n",r:4.4,rv:56,p:"$",h:"Mar-Jue-Sáb 7:00-9:00",t:"11-5566-8899",w:"5491155668899",dt:0,pr:1,a:["Grupos","5k-10k-21k","Coach","Nutrición"],ds:"Running en el Parque Alsina para todas las distancias."},
  {id:24,n:"BIGG Funcional",c:"crossfit",z:"Palermo",d:"Av. Córdoba 5200",r:4.7,rv:189,p:"$$",h:"Lun-Sáb 7:00-22:00",t:"11-6677-8800",w:"5491166778800",dt:1,pr:1,a:["HYROX","Pilates","Upper Body","Funcional","Comunidad"],ds:"Bloques de entrenamiento funcional con comunidad activa."},
  {id:25,n:"Gym Lomas Fitness",c:"gimnasio",z:"Lomas de Zamora",d:"Av. H. Yrigoyen 9200",r:4.3,rv:198,p:"$",h:"Lun-Sáb 7:00-22:30",t:"11-2244-5566",w:"5491122445566",dt:0,pr:0,a:["Musculación","Funcional","Spinning","Aerobics"],ds:"Gimnasio completo en Lomas con más de 30 clases semanales."},
  {id:26,n:"Canchas El Gol",c:"futbol",z:"Morón",d:"Av. Rivadavia 18500",r:4.3,rv:456,p:"$",h:"Todos los días 10:00-00:00",t:"11-3355-7799",w:"5491133557799",dt:0,pr:0,a:["Fútbol 5","Fútbol 8","Vestuarios","Parrilla","Estacionamiento"],ds:"Complejo con 8 canchas de césped sintético y parrilla."},
  {id:27,n:"Olivos Pádel Club",c:"padel",z:"Olivos",d:"Av. Maipú 3100",r:4.6,rv:112,p:"$$",h:"Lun-Dom 8:00-23:00",t:"11-4466-8800",w:"5491144668800",dt:0,pr:1,a:["5 canchas","Clases","Torneos","Cafetería","Estacionamiento"],ds:"Club de pádel en Olivos con 5 canchas y torneos mensuales."},
  {id:28,n:"Box Banfield CF",c:"crossfit",z:"Banfield",d:"Av. Alsina 1200",r:4.4,rv:87,p:"$",h:"Lun-Sáb 7:00-21:00",t:"11-5577-9911",w:"5491155779911",dt:0,pr:1,a:["Box completo","WOD","Halterofilia","Comunidad"],ds:"Box de CrossFit en zona sur con coaches certificados."},
  {id:29,n:"Natatorio San Fernando",c:"natacion",z:"San Fernando",d:"Av. Libertador 2400",r:4.5,rv:178,p:"$$",h:"Lun-Sáb 6:30-21:00",t:"11-6688-0022",w:"5491166880022",dt:0,pr:1,a:["Pileta climatizada","Natación infantil","Aquagym","Clases"],ds:"Natatorio con pileta climatizada en zona norte."},
  {id:30,n:"FlexBody Pilates",c:"pilates",z:"Caballito",d:"Av. Rivadavia 5400",r:4.7,rv:132,p:"$$",h:"Lun-Sáb 8:00-21:00",t:"11-7799-1133",w:"5491177991133",dt:0,pr:1,a:["Reformer","Cadillac","Mat","Rehabilitación","Stretching"],ds:"Pilates con enfoque terapéutico y rehabilitación postural."},
  {id:31,n:"Fútbol Park Tigre",c:"futbol",z:"Tigre",d:"Av. Cazón 1800",r:4.4,rv:234,p:"$",h:"Todos los días 9:00-00:00",t:"11-8800-2244",w:"5491188002244",dt:0,pr:0,a:["Fútbol 5","Fútbol 7","Fútbol 11","Vestuarios","Bar"],ds:"El complejo de fútbol más grande de zona norte."},
  {id:32,n:"Dojo Bushido",c:"boxeo",z:"Caballito",d:"Av. Acoyte 567",r:4.5,rv:123,p:"$",h:"Lun-Sáb 10:00-22:00",t:"11-9012-6789",w:"5491190126789",dt:0,pr:1,a:["Karate","Judo","Taekwondo","Defensa personal","Infantil"],ds:"Centro de artes marciales con 20 años de trayectoria."},
  {id:33,n:"Running Bosques",c:"running",z:"Lomas de Zamora",d:"Parque Municipal s/n",r:4.3,rv:42,p:"$",h:"Lun-Mié-Vie 7:00-8:30",t:"11-9911-3355",w:"5491199113355",dt:0,pr:1,a:["Grupos","Coach","5k-10k","Comunidad"],ds:"Running en el parque municipal para principiantes y avanzados."},
  {id:34,n:"Martínez Gym",c:"gimnasio",z:"Martínez",d:"Av. Santa Fe 1900",r:4.5,rv:201,p:"$$",h:"Lun-Sáb 6:30-22:30",t:"11-0022-4466",w:"5491100224466",dt:0,pr:1,a:["Musculación","Funcional","Yoga","Spinning","Nutrición"],ds:"Gimnasio premium en zona norte con todas las disciplinas."},
  {id:35,n:"Tenis Club Adrogué",c:"tenis",z:"Adrogué",d:"Macías 450",r:4.6,rv:89,p:"$$",h:"Lun-Dom 8:00-21:00",t:"11-1133-5577",w:"5491111335577",dt:0,pr:1,a:["3 canchas","Clases","Torneos locales","Estacionamiento"],ds:"Club de tenis tradicional con academia para chicos y adultos."},
];

const EVENTOS = [
  {t:"Maratón Buenos Aires 42K",f:"12 Oct 2026",l:"Puerto Madero",c:"Running",d:"La carrera más importante de Sudamérica con más de 30.000 corredores."},
  {t:"Torneo Apertura Pádel BA",f:"5 Abr 2026",l:"Núñez",c:"Pádel",d:"Torneo abierto por categorías con premios."},
  {t:"SouthFit Games 2026",f:"28 Jun 2026",l:"La Rural",c:"CrossFit",d:"La competencia de CrossFit más grande de Argentina."},
  {t:"Copa Fútbol 5 Nocturno",f:"Todos los viernes",l:"San Telmo",c:"Fútbol",d:"Liga amateur de fútbol 5 con equipos de todos los barrios."},
  {t:"Torneo de Tenis Zona Norte",f:"15 May 2026",l:"San Isidro",c:"Tenis",d:"Torneo amateur por categorías en clubes de zona norte."},
  {t:"Desafío Funcional GBA",f:"20 Sep 2026",l:"Quilmes",c:"CrossFit",d:"Competencia funcional abierta con categorías escaladas y RX."},
];

const TUTORIALES = [
  {t:"Cómo elegir el gimnasio ideal",m:"5 min",c:"Guía",i:"🎯",body:"Elegir el gimnasio correcto depende de tus objetivos. Si buscás ganar masa muscular, priorizá gimnasios con buena sala de musculación. Si tu meta es bajar de peso, buscá uno con clases grupales.\n\nFactores clave: Ubicación (menos de 15 min), Horarios que se adapten a tu rutina, Equipamiento en buen estado, Precio vs valor (qué incluye), y siempre pedí clase de prueba."},
  {t:"Pádel para principiantes",m:"7 min",c:"Tutorial",i:"🏸",body:"El pádel es el deporte de mayor crecimiento en Argentina. Se juega en parejas en cancha cerrada con paredes de cristal.\n\nReglas: siempre en parejas, saque por debajo de la cintura en diagonal, la pelota puede rebotar en paredes. Equipamiento: paleta redonda y liviana para empezar, zapatillas de pádel con suela espiga. Tomá al menos 3-4 clases antes de jugar partidos."},
  {t:"CrossFit: qué es y cómo empezar",m:"6 min",c:"Tutorial",i:"🔥",body:"CrossFit combina halterofilia, gimnasia y cardio. Se practica en boxes con un WOD diferente cada día.\n\nBeneficios: mejora fuerza, resistencia y flexibilidad. Las clases duran 60 min. Todo se puede escalar a tu nivel. No necesitás estar en forma para empezar. Llevá agua, toalla y buena actitud a tu primera clase."},
  {t:"Yoga vs Pilates: cuál elegir",m:"4 min",c:"Comparativa",i:"🧘",body:"Yoga: origen en India, combina posturas, respiración y meditación. Ideal para reducir estrés y mejorar flexibilidad.\n\nPilates: enfocado en core, postura y control. Se practica en mat o con Reformer. Ideal para fortalecer espalda y rehabilitación.\n\n¿Cuál elegir? Relajación mental → Yoga. Fortalecer core → Pilates. Mejor aún: ¡hacé los dos!"},
  {t:"Canchas de fútbol 5 por zona",m:"5 min",c:"Guía",i:"⚽",body:"CABA: Palermo y Villa Crespo tienen gran concentración de canchas. San Telmo tiene opciones económicas con torneos nocturnos.\n\nGBA Norte: Vicente López y San Isidro tienen complejos grandes. GBA Sur: Quilmes y Lanús ofrecen las opciones más accesibles. GBA Oeste: Morón tiene complejos con parrilla incluida.\n\nTip: reservá con 2 días de anticipación para horarios nocturnos."},
  {t:"Running en BA: rutas y grupos",m:"6 min",c:"Guía",i:"🏃",body:"Mejores rutas: Bosques de Palermo (4km clásico), Costanera Sur (5km con vista al río), Parque Centenario (1.2km para series), Costanera Norte (6km plano).\n\nLos running teams entrenan 3-4 veces por semana e incluyen coach y plan de entrenamiento. Precios: $8.000-20.000/mes. Empezá con 3 salidas semanales de 30 min alternando caminata y trote."},
  {t:"Mejores gimnasios Palermo 2026",m:"5 min",c:"Ranking",i:"🏋️",body:"Palermo tiene la mayor densidad de gimnasios de Buenos Aires. Los mejores se diferencian por equipamiento importado, coaches certificados y variedad de clases.\n\nPrecios: económicos desde $15.000/mes, medios $25.000-35.000, premium +$50.000. Muchos ofrecen descuento por pago trimestral. Explorá todos en el directorio de SportSpot."},
  {t:"Pádel en zona norte: dónde jugar",m:"4 min",c:"Guía",i:"🎾",body:"Vicente López/Olivos: canchas panorámicas, precios medio-altos. San Isidro/Martínez: clubes con academia y torneos. Tigre/San Fernando: precios accesibles y buena disponibilidad. Pilar: complejos de 6-8 canchas profesionales.\n\nPrecios: alquiler $8.000-15.000/hora. Clases particulares $10.000-18.000. Torneos desde $5.000 por equipo."},
];

const TESTIMONIOS = [
  {n:"Martín G.",t:"Encontré mi gimnasio ideal en 5 minutos. Antes perdía horas buscando en Google.",z:"Palermo"},
  {n:"Lucía P.",t:"Descubrí un estudio de pilates increíble a 3 cuadras de mi casa que no conocía.",z:"Recoleta"},
  {n:"Diego F.",t:"Armé un grupo de pádel con amigos gracias a las recomendaciones. Jugamos todos los jueves.",z:"Vicente López"},
  {n:"Camila R.",t:"Como dueña de un gym, el perfil me trajo más de 40 consultas en el primer mes. Y es gratis.",z:"Quilmes"},
  {n:"Tomás A.",t:"Lo mejor es el filtro por zona. Vivo en Morón y encontré 3 canchas que no aparecían en Google Maps.",z:"Morón"},
  {n:"Florencia M.",t:"Empecé CrossFit gracias a SportSpot. Reservé la clase de prueba directo desde la ficha.",z:"Banfield"},
];

// ═══════════════════════════════════════
// HELPERS
// ═══════════════════════════════════════
const Stars = ({r,s=13}) => (
  <span style={{display:'inline-flex',gap:1}}>
    {[1,2,3,4,5].map(i=><span key={i} style={{color:i<=Math.round(r)?'#c8f542':'rgba(255,255,255,.12)',fontSize:s}}>★</span>)}
  </span>
);

const Tag = ({children,cls='tl'}) => <span className={`tg ${cls}`}>{children}</span>;

const scrollTo = id => document.getElementById(id)?.scrollIntoView({behavior:'smooth'});

// ═══════════════════════════════════════
// MAIN PAGE
// ═══════════════════════════════════════
export default function Home() {
  const [cat,setCat] = useState('todos');
  const [zona,setZona] = useState('Todas las zonas');
  const [q,setQ] = useState('');
  const [modal,setModal] = useState(null); // {type:'local'|'tutorial', data:...}
  const [mobileMenu,setMobileMenu] = useState(false);

  const filtered = useMemo(() => LOCALES.filter(l => {
    const mc = cat === 'todos' || l.c === cat;
    const mz = zona === 'Todas las zonas' || l.z === zona;
    const mq = !q || l.n.toLowerCase().includes(q.toLowerCase()) || l.z.toLowerCase().includes(q.toLowerCase()) || l.c.includes(q.toLowerCase());
    return mc && mz && mq;
  }), [cat, zona, q]);

  useEffect(() => {
    if (modal) { document.body.style.overflow = 'hidden'; }
    else { document.body.style.overflow = ''; }
  }, [modal]);

  useEffect(() => {
    const handler = e => { if (e.key === 'Escape') setModal(null); };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, []);

  const catName = CATS.find(c => c.id === cat)?.n;
  const precioLabel = p => p === '$' ? 'Económico' : p === '$$' ? 'Medio' : 'Premium';

  return (
    <>
      <style>{`
        .tg{display:inline-flex;align-items:center;gap:3px;padding:3px 9px;border-radius:6px;font-size:11px;font-weight:600;font-family:var(--m);letter-spacing:.2px}
        .tl{background:rgba(200,245,66,.08);color:var(--lime);border:1px solid rgba(200,245,66,.15)}
        .tm{background:rgba(66,245,167,.08);color:var(--mint);border:1px solid rgba(66,245,167,.15)}
        .ts{background:rgba(66,197,245,.08);color:var(--sky);border:1px solid rgba(66,197,245,.15)}
        .cb{flex-shrink:0;display:flex;align-items:center;gap:5px;padding:9px 14px;border-radius:9px;font-size:12px;font-weight:500;cursor:pointer;transition:.2s;font-family:var(--b);white-space:nowrap;border:1px solid rgba(255,255,255,.05);background:rgba(255,255,255,.02);color:rgba(255,255,255,.45)}
        .cb.on{border:none;background:var(--lime);color:var(--bg);font-weight:700}
        .card{background:rgba(255,255,255,.02);border:1px solid rgba(255,255,255,.05);border-radius:14px;cursor:pointer;position:relative;overflow:hidden;transition:all .3s cubic-bezier(.22,1,.36,1)}
        .card:hover{background:rgba(255,255,255,.05);border-color:rgba(200,245,66,.2);transform:translateY(-3px);box-shadow:0 12px 40px rgba(0,0,0,.25)}
        .ic{background:rgba(255,255,255,.02);border:1px solid rgba(255,255,255,.04);border-radius:14px;padding:22px;transition:.2s;cursor:pointer}
        .ic:hover{border-color:rgba(255,255,255,.08)}
        .b1{display:inline-flex;align-items:center;gap:7px;background:var(--lime);color:var(--bg);border:none;padding:13px 26px;border-radius:11px;font-size:14px;font-weight:700;font-family:var(--h);cursor:pointer;transition:all .3s cubic-bezier(.22,1,.36,1);letter-spacing:.2px;text-decoration:none}
        .b1:hover{transform:translateY(-2px);box-shadow:0 8px 24px rgba(200,245,66,.2)}
        .b2{display:inline-flex;align-items:center;gap:7px;background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.08);color:rgba(255,255,255,.6);padding:13px 26px;border-radius:11px;font-size:14px;font-weight:600;font-family:var(--b);cursor:pointer;transition:.2s;text-decoration:none}
        .b2:hover{border-color:rgba(200,245,66,.25);color:var(--lime)}
        .si{background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.06);color:var(--tx);padding:13px 15px 13px 40px;border-radius:11px;font-size:14px;font-family:var(--b);width:100%;outline:none;transition:.2s}
        .si:focus{border-color:rgba(200,245,66,.3)}.si::placeholder{color:rgba(255,255,255,.2)}
        .sel{appearance:none;background:rgba(255,255,255,.03) url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6'%3E%3Cpath fill='rgba(255,255,255,0.35)' d='M5 6L0 0h10z'/%3E%3C/svg%3E") no-repeat right 13px center;border:1px solid rgba(255,255,255,.06);color:rgba(255,255,255,.6);padding:13px 34px 13px 13px;border-radius:11px;font-size:14px;font-family:var(--b);cursor:pointer;outline:none;min-width:170px}
        .sel:focus{border-color:rgba(200,245,66,.3)}.sel option{background:#101014;color:var(--tx)}
        .nl{font-family:var(--b);font-size:13px;font-weight:500;color:rgba(255,255,255,.45);background:none;border:none;padding:8px 14px;border-radius:7px;cursor:pointer;transition:.2s;text-decoration:none}
        .nl:hover{color:rgba(255,255,255,.85);background:rgba(255,255,255,.04)}
        .am{background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.05);color:rgba(255,255,255,.4);font-size:10px;padding:3px 7px;border-radius:4px;font-family:var(--b)}
        .aml{background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.06);color:rgba(255,255,255,.55);font-size:12px;padding:5px 10px;border-radius:6px;font-family:var(--b)}
        .dl{display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}
        .fc h4{font-family:var(--m);font-size:9px;font-weight:700;color:rgba(255,255,255,.4);letter-spacing:2px;text-transform:uppercase;margin-bottom:10px}
        .fc p{font-family:var(--b);font-size:12px;color:rgba(255,255,255,.3);margin:0 0 5px;cursor:pointer}
        @media(max-width:768px){
          .desk{display:none!important}.mob-btn{display:flex!important}
          .hero-content{width:100%!important;padding:32px 24px!important}
          .hero-title{font-size:40px!important}
          .hero-photo{display:none!important}
          .strip-cats{display:none!important}
          .strip-div{display:none!important}
        }
      `}</style>

      {/* NAV */}
      <nav style={{position:'fixed',top:0,left:0,right:0,zIndex:100,background:'rgba(10,10,14,.9)',backdropFilter:'blur(20px)',borderBottom:'1px solid rgba(255,255,255,.03)'}}>
        <div style={{maxWidth:1200,margin:'0 auto',padding:'0 24px',height:60,display:'flex',alignItems:'center',justifyContent:'space-between'}}>
          <a style={{display:'flex',alignItems:'center',gap:6,cursor:'pointer'}} onClick={()=>window.scrollTo({top:0,behavior:'smooth'})}>
            <span style={{fontFamily:'var(--h)',fontSize:19,fontWeight:900,letterSpacing:'-0.02em'}}><span style={{color:'#f5f5f0'}}>SPORT</span><span style={{color:'#c8f542'}}>SPOT</span></span>
            <span style={{fontFamily:'var(--m)',fontSize:8,fontWeight:600,color:'rgba(255,255,255,.2)',border:'1px solid rgba(255,255,255,.07)',padding:'2px 5px',borderRadius:3}}>BA</span>
          </a>
          <div className="desk" style={{display:'flex',alignItems:'center',gap:2}}>
            <a className="nl" href="#directorio">Explorar</a>
            <a className="nl" href="#eventos">Eventos</a>
            <a className="nl" href="#tutoriales">Tutoriales</a>
            <a className="nl" href="#negocios">Para negocios</a>
            <a className="b1" href="#negocios" style={{padding:'9px 18px',fontSize:12,marginLeft:8}}>Registrá tu local</a>
          </div>
          <button className="mob-btn" style={{display:'none',alignItems:'center',justifyContent:'center',background:'none',border:'none',color:'#f5f5f0',width:38,height:38,cursor:'pointer',fontSize:18}} onClick={()=>setMobileMenu(!mobileMenu)}>{mobileMenu?'✕':'☰'}</button>
        </div>
        {mobileMenu && (
          <div style={{padding:'8px 24px 20px',borderTop:'1px solid rgba(255,255,255,.03)',display:'flex',flexDirection:'column',gap:4}}>
            {[['Explorar','directorio'],['Eventos','eventos'],['Tutoriales','tutoriales'],['Para negocios','negocios']].map(([n,id])=>(
              <a key={id} className="nl" href={`#${id}`} style={{textAlign:'left',padding:'12px 14px'}} onClick={()=>setMobileMenu(false)}>{n}</a>
            ))}
          </div>
        )}
      </nav>

      {/* HERO */}
      <section style={{position:'relative',minHeight:620,overflow:'hidden',paddingTop:60}}>
        <div style={{position:'absolute',inset:0,background:'radial-gradient(ellipse 60% 80% at 75% 50%,rgba(200,245,66,.07) 0%,transparent 60%),radial-gradient(ellipse 40% 60% at 15% 80%,rgba(66,197,245,.04) 0%,transparent 50%)',zIndex:1}} />
        {['🏋️','⚽','🥊','🎾','🏊','🏃'].map((icon,i)=>(
          <div key={i} style={{position:'absolute',right:`${[16,26,9,34,13,30][i]}%`,top:i<4?`${[18,52,38,24][i]}%`:undefined,bottom:i>=4?`${[22,18][i-4]}%`:undefined,fontSize:[42,36,50,30,38,44][i],opacity:.06,zIndex:4,animation:`fl 8s ease-in-out ${i*1.5}s infinite`}}>{icon}</div>
        ))}
        <div className="hero-photo" style={{position:'absolute',right:0,top:0,bottom:0,width:'48%',zIndex:6,background:'linear-gradient(90deg,#0a0a0e 0%,transparent 30%)',display:'flex',alignItems:'center',justifyContent:'center'}}>
          <div style={{position:'relative',width:220,height:370,display:'flex',alignItems:'flex-end',justifyContent:'center'}}>
            <div style={{width:160,height:330,background:'linear-gradient(180deg,rgba(200,245,66,.1) 0%,rgba(200,245,66,.05) 30%,rgba(66,245,167,.03) 60%,transparent 100%)',borderRadius:'80px 80px 50px 50px',filter:'blur(1px)'}} />
            <div style={{position:'absolute',bottom:0,left:'50%',transform:'translateX(-50%)',width:180,height:70,background:'radial-gradient(ellipse,rgba(200,245,66,.08) 0%,transparent 70%)',borderRadius:'50%'}} />
          </div>
        </div>
        <div className="hero-content" style={{position:'relative',zIndex:10,width:'55%',padding:'80px 24px 40px 48px',maxWidth:1200,margin:0}}>
          <div style={{maxWidth:600}}>
            <div style={{display:'inline-flex',alignItems:'center',gap:7,background:'rgba(200,245,66,.05)',border:'1px solid rgba(200,245,66,.1)',padding:'6px 14px',borderRadius:8,marginBottom:24}}>
              <span style={{width:6,height:6,borderRadius:'50%',background:'#42f5a7',animation:'pu 2s infinite'}} />
              <span style={{fontFamily:'var(--m)',fontSize:10,fontWeight:600,color:'#c8f542',letterSpacing:1.5}}>CABA + GBA · 35+ LOCALES</span>
            </div>
            <h1 className="hero-title" style={{fontFamily:'var(--h)',fontSize:58,fontWeight:900,lineHeight:.92,letterSpacing:'-0.03em',margin:'0 0 18px'}}>
              <span style={{color:'#f5f5f0'}}>Tu lugar<br/>para </span>
              <span style={{background:'linear-gradient(135deg,#c8f542,#42f5a7,#42c5f5)',backgroundSize:'200% 200%',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',animation:'gr 5s ease infinite'}}>entrenar</span>
            </h1>
            <p style={{fontFamily:'var(--b)',fontSize:17,color:'rgba(255,255,255,.45)',lineHeight:1.6,margin:'0 0 30px',maxWidth:440}}>El directorio más completo de centros deportivos en Buenos Aires y Gran Buenos Aires. Gimnasios, canchas, estudios y más — con info verificada.</p>
            <div style={{display:'flex',gap:12,flexWrap:'wrap',marginBottom:40}}>
              <a className="b1" href="#directorio" style={{padding:'16px 32px',fontSize:15,boxShadow:'0 4px 20px rgba(200,245,66,.15)'}}>Explorar directorio →</a>
              <a className="b2" href="#negocios" style={{padding:'16px 32px',fontSize:15}}>Soy dueño de un local</a>
            </div>
            <div style={{display:'flex',gap:28}}>
              {[{n:'35+',l:'Locales'},{n:'30+',l:'Zonas'},{n:'9',l:'Deportes'},{n:'4.6★',l:'Promedio'}].map((s,i)=>(
                <div key={s.l} style={{display:'flex',alignItems:'center',gap:i<3?28:0}}>
                  <div>
                    <div style={{fontFamily:'var(--m)',fontSize:22,fontWeight:700,color:'#c8f542'}}>{s.n}</div>
                    <div style={{fontFamily:'var(--b)',fontSize:11,color:'rgba(255,255,255,.3)',marginTop:2}}>{s.l}</div>
                  </div>
                  {i<3 && <div style={{width:1,height:32,background:'rgba(255,255,255,.06)',marginLeft:28}} />}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* DIRECTORIO */}
      <section id="directorio" style={{padding:'60px 0 80px'}}>
        <div style={{maxWidth:1200,margin:'0 auto',padding:'0 24px'}}>
          <span style={{fontFamily:'var(--m)',fontSize:10,fontWeight:600,color:'#c8f542',letterSpacing:3,textTransform:'uppercase',display:'block',marginBottom:10}}>DIRECTORIO</span>
          <h2 style={{fontFamily:'var(--h)',fontSize:'clamp(28px,4.5vw,42px)',fontWeight:800,color:'#f5f5f0',lineHeight:1.05,letterSpacing:'-0.02em',margin:'0 0 6px'}}>Explorá todos los locales</h2>
          <p style={{fontFamily:'var(--b)',fontSize:15,color:'rgba(255,255,255,.4)',margin:'0 0 28px',maxWidth:500}}>Filtrá por deporte, zona o nombre. CABA y todo el Gran Buenos Aires.</p>

          <div style={{display:'flex',gap:7,overflowX:'auto',paddingBottom:4,marginBottom:18}} className="ns">
            {CATS.map(c=>(
              <button key={c.id} className={`cb ${cat===c.id?'on':''}`} onClick={()=>setCat(c.id)}>
                <span style={{fontSize:14}}>{c.i}</span>{c.n}
              </button>
            ))}
          </div>

          <div style={{display:'flex',gap:10,marginBottom:28,flexWrap:'wrap'}}>
            <div style={{flex:'1 1 260px',position:'relative'}}>
              <span style={{position:'absolute',left:13,top:'50%',transform:'translateY(-50%)',fontSize:15,pointerEvents:'none',opacity:.35}}>⌕</span>
              <input className="si" placeholder="Buscar por nombre, zona o deporte..." value={q} onChange={e=>setQ(e.target.value)} />
            </div>
            <select className="sel" value={zona} onChange={e=>setZona(e.target.value)}>
              {ZONAS.map(z=><option key={z} value={z} disabled={z.startsWith('──')}>{z}</option>)}
            </select>
          </div>

          <p style={{fontFamily:'var(--b)',fontSize:13,color:'rgba(255,255,255,.35)',marginBottom:20}}>
            <span style={{fontFamily:'var(--m)',color:'#c8f542',fontWeight:700}}>{filtered.length}</span> resultados
            {cat!=='todos' && <> en <strong style={{color:'rgba(255,255,255,.55)'}}>{catName}</strong></>}
            {zona!=='Todas las zonas' && <> en <strong style={{color:'rgba(255,255,255,.55)'}}>{zona}</strong></>}
          </p>

          {filtered.length===0 ? (
            <div style={{textAlign:'center',padding:'70px 20px'}}>
              <div style={{fontSize:44,marginBottom:14,opacity:.3}}>🔍</div>
              <p style={{fontFamily:'var(--h)',fontSize:18,fontWeight:700,color:'rgba(255,255,255,.5)',marginBottom:6}}>Sin resultados</p>
              <p style={{fontFamily:'var(--b)',fontSize:13,color:'rgba(255,255,255,.25)'}}>Probá con otros filtros.</p>
            </div>
          ) : (
            <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(330px,1fr))',gap:14}}>
              {filtered.map((l,i)=>{
                const ct = CATS.find(x=>x.id===l.c);
                return (
                  <article key={l.id} className="card" onClick={()=>setModal({type:'local',data:l})} style={{animation:`rv .45s ease-out ${i*40}ms both`}}>
                    {l.dt ? <div style={{position:'absolute',top:0,left:0,right:0,height:2,background:'linear-gradient(90deg,#c8f542,#42f5a7,#42c5f5)'}} /> : null}
                    <div style={{padding:'22px 20px'}}>
                      <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:10}}>
                        <div style={{flex:1}}>
                          <div style={{display:'flex',gap:6,flexWrap:'wrap',marginBottom:8}}>
                            {l.dt ? <Tag>★ DESTACADO</Tag> : null}
                            {l.pr ? <Tag cls="tm">CLASE GRATIS</Tag> : null}
                          </div>
                          <h3 style={{fontFamily:'var(--h)',fontSize:19,fontWeight:700,color:'#f5f5f0',margin:'0 0 3px',lineHeight:1.2}}>{l.n}</h3>
                          <p style={{fontFamily:'var(--b)',fontSize:12,color:'rgba(255,255,255,.35)',margin:0}}>📍 {l.d}, {l.z}</p>
                        </div>
                        <span style={{fontSize:28,opacity:.5}}>{ct?.i}</span>
                      </div>
                      <p className="dl" style={{fontFamily:'var(--b)',fontSize:13,color:'rgba(255,255,255,.45)',margin:'0 0 14px',lineHeight:1.5}}>{l.ds}</p>
                      <div style={{display:'flex',flexWrap:'wrap',gap:5,marginBottom:14}}>
                        {l.a.slice(0,3).map(a=><span key={a} className="am">{a}</span>)}
                        {l.a.length>3 && <span style={{color:'rgba(255,255,255,.2)',fontSize:10,padding:'3px 4px'}}>+{l.a.length-3}</span>}
                      </div>
                      <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',borderTop:'1px solid rgba(255,255,255,.04)',paddingTop:10}}>
                        <div style={{display:'flex',alignItems:'center',gap:6}}>
                          <Stars r={l.r} />
                          <span style={{fontFamily:'var(--m)',fontSize:13,fontWeight:700,color:'#c8f542'}}>{l.r}</span>
                          <span style={{fontFamily:'var(--b)',fontSize:10,color:'rgba(255,255,255,.25)'}}>({l.rv})</span>
                        </div>
                        <div style={{display:'flex',alignItems:'center',gap:10}}>
                          <span style={{fontFamily:'var(--m)',fontSize:12,color:'rgba(255,255,255,.35)'}}>{l.p}</span>
                          <span style={{fontFamily:'var(--b)',fontSize:11,color:'rgba(255,255,255,.25)'}}>🕐 {l.h.split(' ').pop()}</span>
                        </div>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* EVENTOS */}
      <section id="eventos" style={{padding:'70px 0',borderTop:'1px solid rgba(255,255,255,.03)',background:'linear-gradient(180deg,rgba(66,197,245,.015) 0%,transparent 100%)'}}>
        <div style={{maxWidth:1200,margin:'0 auto',padding:'0 24px'}}>
          <span style={{fontFamily:'var(--m)',fontSize:10,fontWeight:600,color:'#42c5f5',letterSpacing:3,textTransform:'uppercase',display:'block',marginBottom:10}}>EVENTOS</span>
          <h2 style={{fontFamily:'var(--h)',fontSize:'clamp(28px,4.5vw,42px)',fontWeight:800,color:'#f5f5f0',lineHeight:1.05,letterSpacing:'-0.02em',margin:'0 0 6px'}}>Próximos eventos deportivos</h2>
          <p style={{fontFamily:'var(--b)',fontSize:15,color:'rgba(255,255,255,.4)',margin:'0 0 32px',maxWidth:460}}>Torneos, maratones y competencias en Buenos Aires y GBA.</p>
          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(270px,1fr))',gap:14}}>
            {EVENTOS.map((e,i)=>(
              <div key={i} className="ic">
                <div style={{display:'flex',alignItems:'center',gap:7,marginBottom:12}}>
                  <Tag cls="ts">{e.c}</Tag>
                  <span style={{fontFamily:'var(--m)',fontSize:11,color:'rgba(255,255,255,.3)'}}>{e.f}</span>
                </div>
                <h3 style={{fontFamily:'var(--h)',fontSize:17,fontWeight:700,color:'#f5f5f0',margin:'0 0 6px',lineHeight:1.25}}>{e.t}</h3>
                <p style={{fontFamily:'var(--b)',fontSize:13,color:'rgba(255,255,255,.4)',margin:'0 0 10px',lineHeight:1.5}}>{e.d}</p>
                <p style={{fontFamily:'var(--b)',fontSize:12,color:'rgba(255,255,255,.25)',margin:0}}>📍 {e.l}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TUTORIALES */}
      <section id="tutoriales" style={{padding:'70px 0'}}>
        <div style={{maxWidth:1200,margin:'0 auto',padding:'0 24px'}}>
          <span style={{fontFamily:'var(--m)',fontSize:10,fontWeight:600,color:'#42f5a7',letterSpacing:3,textTransform:'uppercase',display:'block',marginBottom:10}}>TUTORIALES & GUÍAS</span>
          <h2 style={{fontFamily:'var(--h)',fontSize:'clamp(28px,4.5vw,42px)',fontWeight:800,color:'#f5f5f0',lineHeight:1.05,letterSpacing:'-0.02em',margin:'0 0 6px'}}>Aprendé y elegí mejor</h2>
          <p style={{fontFamily:'var(--b)',fontSize:15,color:'rgba(255,255,255,.4)',margin:'0 0 32px',maxWidth:460}}>Guías prácticas para elegir dónde entrenar y mejorar tu técnica.</p>
          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(260px,1fr))',gap:14}}>
            {TUTORIALES.map((t,i)=>(
              <article key={i} className="ic" onClick={()=>setModal({type:'tutorial',data:t})}>
                <div style={{fontSize:28,marginBottom:10}}>{t.i}</div>
                <div style={{display:'flex',alignItems:'center',gap:7,marginBottom:10}}>
                  <Tag cls="tm">{t.c}</Tag>
                  <span style={{fontFamily:'var(--m)',fontSize:10,color:'rgba(255,255,255,.2)'}}>{t.m}</span>
                </div>
                <h3 style={{fontFamily:'var(--h)',fontSize:16,fontWeight:700,color:'#f5f5f0',margin:'0 0 10px',lineHeight:1.3}}>{t.t}</h3>
                <span style={{fontFamily:'var(--b)',fontSize:12,color:'rgba(200,245,66,.6)',fontWeight:500}}>Leer artículo →</span>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CÓMO FUNCIONA */}
      <section style={{padding:'70px 0',borderTop:'1px solid rgba(255,255,255,.03)',background:'linear-gradient(180deg,rgba(200,245,66,.012) 0%,transparent 100%)'}}>
        <div style={{maxWidth:1200,margin:'0 auto',padding:'0 24px',textAlign:'center'}}>
          <span style={{fontFamily:'var(--m)',fontSize:10,fontWeight:600,color:'#c8f542',letterSpacing:3,textTransform:'uppercase',display:'block',marginBottom:10}}>CÓMO FUNCIONA</span>
          <h2 style={{fontFamily:'var(--h)',fontSize:'clamp(28px,4.5vw,42px)',fontWeight:800,color:'#f5f5f0',lineHeight:1.05,letterSpacing:'-0.02em',marginBottom:36,textAlign:'center'}}>Empezá a entrenar en 3 pasos</h2>
          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(240px,1fr))',gap:20}}>
            {[{s:'01',i:'🔍',t:'Buscá',d:'Filtrá por deporte, zona o nombre. Encontrá locales en CABA y GBA.'},{s:'02',i:'📋',t:'Compará',d:'Revisá horarios, precios, servicios y reseñas de otros usuarios.'},{s:'03',i:'💬',t:'Contactá',d:'Escribí por WhatsApp, reservá tu clase de prueba y empezá.'}].map(x=>(
              <div key={x.s} className="ic" style={{textAlign:'left',cursor:'default'}}>
                <span style={{fontFamily:'var(--m)',fontSize:10,fontWeight:700,color:'#c8f542',letterSpacing:1,display:'block',marginBottom:14}}>PASO {x.s}</span>
                <div style={{fontSize:30,marginBottom:10}}>{x.i}</div>
                <h3 style={{fontFamily:'var(--h)',fontSize:20,fontWeight:700,color:'#f5f5f0',margin:'0 0 6px'}}>{x.t}</h3>
                <p style={{fontFamily:'var(--b)',fontSize:13,color:'rgba(255,255,255,.4)',lineHeight:1.5,margin:0}}>{x.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIOS */}
      <section style={{padding:'70px 0'}}>
        <div style={{maxWidth:1200,margin:'0 auto',padding:'0 24px'}}>
          <div style={{textAlign:'center',marginBottom:36}}>
            <span style={{fontFamily:'var(--m)',fontSize:10,fontWeight:600,color:'#c8f542',letterSpacing:3,textTransform:'uppercase',display:'block',marginBottom:10}}>TESTIMONIOS</span>
            <h2 style={{fontFamily:'var(--h)',fontSize:'clamp(28px,4.5vw,42px)',fontWeight:800,color:'#f5f5f0',lineHeight:1.05,letterSpacing:'-0.02em',textAlign:'center'}}>Lo que dicen nuestros usuarios</h2>
          </div>
          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(260px,1fr))',gap:14}}>
            {TESTIMONIOS.map((t,i)=>(
              <div key={i} className="ic" style={{cursor:'default'}}>
                <Stars r={5} />
                <p style={{fontFamily:'var(--b)',fontSize:14,color:'rgba(255,255,255,.55)',lineHeight:1.6,margin:'10px 0 14px',fontStyle:'italic'}}>"{t.t}"</p>
                <div style={{display:'flex',alignItems:'center',gap:8}}>
                  <div style={{width:30,height:30,borderRadius:8,background:'linear-gradient(135deg,rgba(200,245,66,.2),rgba(66,245,167,.2))',display:'flex',alignItems:'center',justifyContent:'center',fontFamily:'var(--h)',fontSize:13,fontWeight:700,color:'#c8f542'}}>{t.n[0]}</div>
                  <div>
                    <p style={{fontFamily:'var(--h)',fontSize:13,fontWeight:600,color:'#f5f5f0',margin:0}}>{t.n}</p>
                    <p style={{fontFamily:'var(--b)',fontSize:10,color:'rgba(255,255,255,.25)',margin:0}}>{t.z}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* NEGOCIOS B2B */}
      <section id="negocios" style={{padding:'70px 0',borderTop:'1px solid rgba(255,255,255,.03)',background:'linear-gradient(180deg,transparent,rgba(200,245,66,.02))'}}>
        <div style={{maxWidth:1200,margin:'0 auto',padding:'0 24px'}}>
          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(300px,1fr))',gap:40,alignItems:'center'}}>
            <div>
              <span style={{fontFamily:'var(--m)',fontSize:10,fontWeight:600,color:'#c8f542',letterSpacing:3,textTransform:'uppercase',display:'block',marginBottom:10}}>PARA DUEÑOS DE LOCALES</span>
              <h2 style={{fontFamily:'var(--h)',fontSize:'clamp(28px,4.5vw,42px)',fontWeight:800,color:'#f5f5f0',lineHeight:1.05,letterSpacing:'-0.02em',marginBottom:12}}>Hacé crecer tu negocio deportivo</h2>
              <p style={{fontFamily:'var(--b)',fontSize:15,color:'rgba(255,255,255,.45)',lineHeight:1.6,margin:'0 0 22px'}}>Registrá tu local gratis en SportSpot y llegá a miles de deportistas en Buenos Aires y GBA.</p>
              <div style={{display:'flex',flexDirection:'column',gap:10,marginBottom:28}}>
                {[['📍','Perfil completo con fotos, horarios y servicios'],['📊','Dashboard con estadísticas de visitas y contactos'],['⭐','Sistema de reseñas de usuarios reales'],['📱','Botón de WhatsApp directo'],['🆓','Plan básico 100% gratuito, siempre']].map(([icon,text])=>(
                  <div key={text} style={{display:'flex',alignItems:'flex-start',gap:9}}>
                    <span style={{fontSize:15}}>{icon}</span>
                    <span style={{fontFamily:'var(--b)',fontSize:13,color:'rgba(255,255,255,.5)',lineHeight:1.4}}>{text}</span>
                  </div>
                ))}
              </div>
              <div style={{display:'flex',gap:10,flexWrap:'wrap'}}>
                <button className="b1">Registrar mi local gratis →</button>
                <button className="b2">Ver planes premium</button>
              </div>
            </div>
            <div style={{display:'flex',flexDirection:'column',gap:10}}>
              {[{n:'Gratuito',p:'$0',f:['Perfil básico','WhatsApp directo','3 fotos','Horarios y servicios'],d:false},{n:'Premium',p:'$14.990/mes',f:['Todo lo gratuito +','Badge destacado','Fotos ilimitadas','Estadísticas avanzadas','Posicionamiento top','Clase de prueba'],d:true},{n:'Elite',p:'$29.990/mes',f:['Todo Premium +','Página propia','Integración reservas','Campañas email','Soporte dedicado'],d:false}].map(plan=>(
                <div key={plan.n} style={{background:plan.d?'rgba(200,245,66,.03)':'rgba(255,255,255,.02)',border:`1px solid ${plan.d?'rgba(200,245,66,.12)':'rgba(255,255,255,.04)'}`,borderRadius:14,padding:20,position:'relative'}}>
                  {plan.d && <div style={{position:'absolute',top:0,left:0,right:0,height:2,background:'linear-gradient(90deg,#c8f542,#42f5a7)',borderRadius:'14px 14px 0 0'}} />}
                  <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:10}}>
                    <div style={{display:'flex',alignItems:'center',gap:7}}>
                      <h4 style={{fontFamily:'var(--h)',fontSize:17,fontWeight:700,color:'#f5f5f0',margin:0}}>{plan.n}</h4>
                      {plan.d && <Tag>POPULAR</Tag>}
                    </div>
                    <span style={{fontFamily:'var(--m)',fontSize:14,fontWeight:700,color:'#c8f542'}}>{plan.p}</span>
                  </div>
                  <div style={{display:'flex',flexWrap:'wrap',gap:5}}>
                    {plan.f.map(f=><span key={f} style={{fontFamily:'var(--b)',fontSize:11,color:'rgba(255,255,255,.4)',background:'rgba(255,255,255,.02)',padding:'3px 7px',borderRadius:4}}>✓ {f}</span>)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* STRIP CTA */}
      <section style={{padding:'40px 24px 0'}}>
        <div style={{maxWidth:1200,margin:'0 auto',borderRadius:14,overflow:'hidden',position:'relative',height:170,background:'linear-gradient(135deg,#0c0c12,#0f1015,#0a0a0e)',border:'1px solid rgba(255,255,255,.04)'}}>
          <div style={{position:'absolute',inset:0,background:'radial-gradient(ellipse 60% 100% at 100% 50%,rgba(200,245,66,.05) 0%,transparent 60%)',zIndex:1}} />
          <div style={{position:'relative',zIndex:10,height:'100%',display:'flex',alignItems:'center',justifyContent:'space-between',padding:'0 44px'}}>
            <div style={{display:'flex',alignItems:'center',gap:20}}>
              <span style={{fontFamily:'var(--h)',fontSize:26,fontWeight:900,letterSpacing:'-0.02em'}}><span style={{color:'#f5f5f0'}}>SPORT</span><span style={{color:'#c8f542'}}>SPOT</span></span>
              <div className="strip-div" style={{width:1,height:44,background:'rgba(255,255,255,.06)'}} />
              <div style={{maxWidth:340}}>
                <h3 style={{fontFamily:'var(--h)',fontSize:20,fontWeight:800,color:'#f5f5f0',letterSpacing:'-0.02em',margin:'0 0 4px'}}>¿Listo para entrenar?</h3>
                <p style={{fontFamily:'var(--b)',fontSize:13,color:'rgba(255,255,255,.35)',lineHeight:1.4,margin:0}}>El directorio más completo de centros deportivos en Buenos Aires y GBA.</p>
              </div>
            </div>
            <div style={{display:'flex',alignItems:'center',gap:16}}>
              <div className="strip-cats" style={{display:'flex',gap:8}}>
                {['🏋️','⚽','🏸','🔥','🧘','🥊','🏊','🎾','🏃'].map(icon=>(
                  <span key={icon} style={{fontSize:22,opacity:.5,cursor:'pointer'}}>{icon}</span>
                ))}
              </div>
              <a className="b1" href="#directorio" style={{padding:'12px 22px',fontSize:13}}>Explorar →</a>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{borderTop:'1px solid rgba(255,255,255,.03)',padding:'40px 24px 28px',marginTop:40}}>
        <div style={{maxWidth:1200,margin:'0 auto'}}>
          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(160px,1fr))',gap:28,marginBottom:32}}>
            <div>
              <span style={{fontFamily:'var(--h)',fontSize:17,fontWeight:900}}><span style={{color:'#f5f5f0'}}>SPORT</span><span style={{color:'#c8f542'}}>SPOT</span></span>
              <p style={{fontFamily:'var(--b)',fontSize:12,color:'rgba(255,255,255,.25)',lineHeight:1.5,marginTop:8}}>El directorio más completo de centros deportivos en Buenos Aires y GBA.</p>
            </div>
            <div className="fc"><h4>DEPORTES</h4>{CATS.filter(c=>c.id!=='todos').map(c=><p key={c.id}>{c.n}</p>)}</div>
            <div className="fc"><h4>ZONAS POPULARES</h4>{['Palermo','Belgrano','Recoleta','Quilmes','Vicente López','San Isidro','Morón','Lomas de Zamora'].map(z=><p key={z}>{z}</p>)}</div>
            <div className="fc"><h4>SPORTSPOT</h4>{['Sobre nosotros','Para negocios','Eventos','Tutoriales','Contacto','Términos','Privacidad'].map(l=><p key={l}>{l}</p>)}</div>
          </div>
          <div style={{borderTop:'1px solid rgba(255,255,255,.03)',paddingTop:20,display:'flex',alignItems:'center',justifyContent:'space-between',flexWrap:'wrap',gap:10}}>
            <p style={{fontFamily:'var(--m)',fontSize:10,color:'rgba(255,255,255,.15)'}}>© 2026 SportSpot BA — Buenos Aires, Argentina</p>
            <p style={{fontFamily:'var(--m)',fontSize:10,color:'rgba(255,255,255,.1)'}}>Hecho con 💛 para la comunidad deportiva</p>
          </div>
        </div>
      </footer>

      {/* MODAL */}
      {modal && (
        <div style={{position:'fixed',inset:0,background:'rgba(0,0,0,.8)',backdropFilter:'blur(12px)',display:'flex',alignItems:'center',justifyContent:'center',zIndex:1000,padding:20,animation:'fi .2s ease-out'}} onClick={()=>setModal(null)}>
          <div style={{background:'#101014',border:'1px solid rgba(255,255,255,.07)',borderRadius:18,maxWidth:540,width:'100%',maxHeight:'90vh',overflowY:'auto',animation:'mi .3s cubic-bezier(.22,1,.36,1)'}} onClick={e=>e.stopPropagation()}>
            {modal.type === 'local' && (() => {
              const l = modal.data;
              const ct = CATS.find(x=>x.id===l.c);
              return (
                <>
                  <div style={{padding:'28px 24px 20px',borderBottom:'1px solid rgba(255,255,255,.05)',position:'relative'}}>
                    <button onClick={()=>setModal(null)} style={{position:'absolute',top:14,right:14,background:'rgba(255,255,255,.05)',border:'1px solid rgba(255,255,255,.08)',color:'rgba(255,255,255,.4)',width:34,height:34,borderRadius:9,cursor:'pointer',fontSize:15,display:'flex',alignItems:'center',justifyContent:'center'}}>✕</button>
                    <div style={{display:'flex',gap:6,flexWrap:'wrap',marginBottom:14}}>
                      <Tag>{ct?.i} {ct?.n}</Tag>
                      {l.dt ? <Tag>★ DESTACADO</Tag> : null}
                      {l.pr ? <Tag cls="tm">CLASE GRATIS</Tag> : null}
                    </div>
                    <h2 style={{fontFamily:'var(--h)',fontSize:26,fontWeight:800,color:'#f5f5f0',margin:'0 0 6px'}}>{l.n}</h2>
                    <div style={{display:'flex',alignItems:'center',gap:8}}>
                      <Stars r={l.r} s={15} />
                      <span style={{fontFamily:'var(--m)',fontSize:14,fontWeight:700,color:'#c8f542'}}>{l.r}</span>
                      <span style={{fontFamily:'var(--b)',fontSize:12,color:'rgba(255,255,255,.35)'}}>({l.rv} reseñas)</span>
                      <span style={{fontFamily:'var(--m)',fontSize:14,color:'rgba(255,255,255,.4)',marginLeft:'auto'}}>{l.p}</span>
                    </div>
                  </div>
                  <div style={{padding:'20px 24px 24px'}}>
                    <p style={{fontFamily:'var(--b)',fontSize:14,color:'rgba(255,255,255,.55)',lineHeight:1.6,margin:'0 0 20px'}}>{l.ds}</p>
                    <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:14,marginBottom:20}}>
                      {[{i:'📍',lb:'Dirección',v:`${l.d}, ${l.z}`},{i:'🕐',lb:'Horario',v:l.h},{i:'📞',lb:'Teléfono',v:l.t},{i:'💰',lb:'Precio',v:precioLabel(l.p)}].map(x=>(
                        <div key={x.lb}>
                          <p style={{fontFamily:'var(--m)',fontSize:9,color:'rgba(255,255,255,.25)',margin:'0 0 3px',textTransform:'uppercase',letterSpacing:1}}>{x.i} {x.lb}</p>
                          <p style={{fontFamily:'var(--b)',fontSize:13,color:'rgba(255,255,255,.75)',margin:0,fontWeight:500}}>{x.v}</p>
                        </div>
                      ))}
                    </div>
                    <div style={{marginBottom:20}}>
                      <p style={{fontFamily:'var(--m)',fontSize:9,color:'rgba(255,255,255,.25)',margin:'0 0 8px',textTransform:'uppercase',letterSpacing:1}}>SERVICIOS</p>
                      <div style={{display:'flex',gap:5,flexWrap:'wrap'}}>{l.a.map(a=><span key={a} className="aml">{a}</span>)}</div>
                    </div>
                    <div style={{display:'flex',gap:8,flexWrap:'wrap'}}>
                      {l.w && <button className="b1" style={{flex:'1 1 200px',justifyContent:'center'}} onClick={()=>window.open(`https://wa.me/${l.w}`,'_blank')}>💬 WhatsApp</button>}
                      <button className="b2" style={{flex:'1 1 120px',justifyContent:'center'}}>📞 Llamar</button>
                    </div>
                    {l.pr ? <button style={{width:'100%',marginTop:8,background:'rgba(66,245,167,.06)',border:'1px solid rgba(66,245,167,.12)',color:'#42f5a7',padding:13,borderRadius:11,fontSize:13,fontWeight:600,cursor:'pointer',fontFamily:'var(--b)'}}>🎯 Reservar clase de prueba gratuita</button> : null}
                    <button style={{width:'100%',marginTop:8,background:'none',border:'1px solid rgba(255,255,255,.05)',color:'rgba(255,255,255,.3)',padding:11,borderRadius:11,fontSize:12,cursor:'pointer',fontFamily:'var(--b)'}}>¿Sos el dueño? Reclamá este perfil →</button>
                  </div>
                </>
              );
            })()}
            {modal.type === 'tutorial' && (() => {
              const t = modal.data;
              return (
                <>
                  <div style={{padding:'28px 24px 20px',borderBottom:'1px solid rgba(255,255,255,.05)',position:'relative'}}>
                    <button onClick={()=>setModal(null)} style={{position:'absolute',top:14,right:14,background:'rgba(255,255,255,.05)',border:'1px solid rgba(255,255,255,.08)',color:'rgba(255,255,255,.4)',width:34,height:34,borderRadius:9,cursor:'pointer',fontSize:15,display:'flex',alignItems:'center',justifyContent:'center'}}>✕</button>
                    <div style={{display:'flex',gap:6,flexWrap:'wrap',marginBottom:14}}>
                      <Tag cls="tm">{t.c}</Tag>
                      <span style={{fontFamily:'var(--m)',fontSize:11,color:'rgba(255,255,255,.3)'}}>{t.m} de lectura</span>
                    </div>
                    <div style={{fontSize:40,marginBottom:12}}>{t.i}</div>
                    <h2 style={{fontFamily:'var(--h)',fontSize:24,fontWeight:800,color:'#f5f5f0',margin:0,lineHeight:1.2,paddingRight:40}}>{t.t}</h2>
                  </div>
                  <div style={{padding:24,fontFamily:'var(--b)',fontSize:14,color:'rgba(255,255,255,.6)',lineHeight:1.7,whiteSpace:'pre-line'}}>{t.body}</div>
                  <div style={{padding:'0 24px 24px'}}>
                    <div style={{borderTop:'1px solid rgba(255,255,255,.05)',paddingTop:16,textAlign:'center'}}>
                      <p style={{fontFamily:'var(--b)',fontSize:13,color:'rgba(255,255,255,.3)',margin:'0 0 12px'}}>¿Te sirvió? Explorá el directorio para encontrar tu lugar.</p>
                      <a className="b1" href="#directorio" style={{fontSize:13,padding:'11px 22px'}} onClick={()=>setModal(null)}>Explorar directorio →</a>
                    </div>
                  </div>
                </>
              );
            })()}
          </div>
        </div>
      )}
    </>
  );
}
