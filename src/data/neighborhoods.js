const neighborhoods = {
  Coahuila: {
    Torreón: [
      'Campestre La Rosita', 'Centro', 'Jardines de California', 'La Amistad', 'La Fuente',
      'La Joya', 'La Merced', 'La Paz', 'La Perla', 'Las Etnias', 'Las Fuentes',
      'Nueva Los Ángeles', 'Residencial Campestre', 'Residencial El Fresno',
      'Residencial del Norte', 'Residencial Senderos', 'Rincón La Merced', 'Roma', 'San Isidro'
    ].sort(),
    Saltillo: [
      'Centro', 'La Aurora', 'La Fuente', 'La Herradura', 'La Joya', 'La Paz',
      'La Perla', 'La Rosita', 'Lomas de Lourdes', 'Los Olivos', 'Los Pinos',
      'Los Reales', 'Los Rodríguez', 'San Patricio', 'Valle Real', 'Valle de las Flores'
    ].sort(),
    Monclova: [
      'Centro', 'El Pueblo', 'Estancias de Santa Ana', 'Guadalupe', 'La Fuente',
      'La Joya', 'La Loma','La Paz', 'La Perla', 'La Rosita', 'La Victoria', 'Las Palmas',
      'Privada del Este', 'Privada del Norte', 'Privada del Oeste', 'Privada del Sur', 'San Miguel'
    ].sort()
  },
  'Nuevo León': {
    Monterrey: [
      'Centro', 'Contry', 'Cumbres', 'Del Valle', 'La Alianza', 'La Aurora',
      'La Estanzuela', 'La Fama', 'La Herradura', 'La Joya', 'La Paz',
      'Mitras Centro', 'Mitras Norte', 'Mitras Sur', 'Obispado', 'San Jerónimo', 'Vista Hermosa'
    ].sort(),
    Guadalupe: [
      'Contry', 'Jardines de Guadalupe', 'La Alianza', 'La Aurora', 'La Estanzuela',
      'La Fama', 'La Herradura', 'La Joya', 'La Paz', 'La Pastora', 'La Perla',
      'La Purísima', 'Linda Vista', 'Las Quintas', 'Rincón de la Sierra', 'Valle Soleado', 'La Silla'
    ].sort(),
    'San Pedro': [
      'Centro', 'Del Valle', 'San Agustín', 'Valle Oriente', 'Santa Engracia', 'La Fátima',
      'La Leona', 'La Joya', 'La Herradura', 'La Cima', 'La Loma', 'La Muralla', 'La Cañada',
      'La Alianza', 'La Aurora', 'La Estanzuela', 'La Fama', 'La Paz', 'La Pastora', 'La Perla'
    ].sort()
  },
  Durango: {
    Durango: [
      'Benito Juárez', 'Centro', 'Francisco Villa', 'Guadalupe Victoria', 'Jardines',
      'La Alianza', 'La Aurora', 'La Estanzuela', 'La Fama', 'La Herradura',
      'La Joya', 'La Paz', 'Las Alamedas', 'Lomas de San Juan', 'Lomas del Parque', 'Lomas del Valle'
    ].sort(),
    Lerdo: [
      'César Guillermo', 'Centro', 'La Alianza', 'La Aurora', 'La Estanzuela',
      'La Fama', 'La Herradura', 'La Joya', 'La Paz', 'San Antonio', 'San Fernando',
      'San Isidro', 'San José', 'San Juan', 'San Miguel', 'San Pedro', 'Villa Jardín'
    ].sort()
  },
  Jalisco: {
    Guadalajara: [
      'Centro', 'Americana', 'Chapultepec', 'Providencia', 'Tlaquepaque', 'Zapopan',
      'Colonia Moderna', 'Ladrón de Guevara', 'Jardines del Bosque', 'Arcos Vallarta',
      'Santa Tere', 'Santa Fe', 'La Perla', 'Oblatos', 'La Estancia'
    ].sort(),
    'Puerto Vallarta': [
      'Centro', 'Zona Hotelera', 'Marina Vallarta', 'Fluvial Vallarta', 'Las Glorias',
      'Versalles', 'Las Aralias', 'Los Tules', 'Díaz Ordaz', 'El Pitillal'
    ].sort()
  },
  'Ciudad de México': {
    'Ciudad de México': [
      'Centro Histórico', 'Coyoacán', 'Polanco', 'Roma', 'Condesa', 'Del Valle',
      'Santa Fe', 'Pedregal', 'San Ángel', 'Nápoles', 'Tlalpan', 'Xochimilco', 'Churubusco'
    ].sort(),
    Iztapalapa: [
      'San Lázaro', 'Santa María Aztahuacán', 'El Trapiche', 'Los Cipreses', 'Cerro de la Estrella',
      'La Joya', 'Zapata', 'Revolución', 'Los Pinos', 'Las Peñitas', 'El Molino'
    ].sort(),
    'Benito Juárez': [
      'Centro', 'Del Valle', 'Nápoles', 'Portero de Mixcoac', 'Letrán Valle', 'Colonia Roma'
    ].sort()
  },
  Yucatán: {
    Mérida: [
      'Centro', 'Altabrisa', 'Francisco de Montejo', 'Paseos de Miraflores', 'Itzimná',
      'Los Héroes', 'Las Américas', 'Chuburná', 'Villa Magna', 'Caucel', 'Temozón Norte'
    ].sort(),
    Progreso: [
      'Centro', 'Chuburná', 'Chelem', 'Telchac', 'Flamboyanes', 'Las Palmas'
    ].sort()
  },
  Veracruz: {
    Veracruz: [
      'Centro', 'Playas del Conchal', 'Alvarado', 'Framboyanes', 'Puerto de Veracruz',
      'Nanchital', 'Los Volcanes', 'Santa Rosa', 'El Tejar', 'Boca del Río'
    ].sort(),
    Xalapa: [
      'Centro', 'Las Ánimas', 'El Castillo', 'Coatepec', 'La Hacienda', 'Lomas de Chapultepec'
    ].sort()
  },
  Puebla: {
    Puebla: [
      'Centro', 'Angelópolis', 'La Paz', 'La Cañada', 'Lomas de Angelópolis', 'San Andrés Cholula',
      'Atoyac', 'Atlixco', 'La Margarita', 'Teziutlán', 'Huejotzingo', 'San Martín Texmelucan'
    ].sort(),
    Tehuacán: [
      'Centro', 'Las Margaritas', 'Paseos', 'El Cerrito', 'Tehuacán Norte', 'Tehuacán Sur'
    ].sort()
  },
  Sonora: {
    Hermosillo: [
      'Centro', 'La Cholla', 'Villas del Sol', 'Pueblo de la Mesa', 'Las Lomas', 
      'San Benito', 'Los Jardines', 'Paseo de las Lomas', 'Las Palmas', 'Campestre'
    ].sort(),
    Nogales: [
      'Centro', 'Colonia Modelo', 'Las Torres', 'Anáhuac', 'Villaflor', 'El Sahuaro'
    ].sort()
  },
  Chihuahua: {
    Chihuahua: [
      'Centro', 'Amanecer', 'Cumbres', 'Chihuahua 2000', 'Infonavit Norte', 'Sierra Vista', 
      'San Felipe', 'Paseos del Sol', 'Los Angeles', 'La Noria'
    ].sort(),
   ' Ciudad Juárez': [
      'Centro', 'Chamizal', 'Las Misiones', 'Pradera Dorada', 'Bocoyna', 'Infonavit Juárez',
      'El Paso', 'Campo Bello', 'Zona Dorada', 'Santa Rosa'
    ].sort()
  },
  'Quintana Roo': {
    Cancún: [
      'Centro', 'Zona Hotelera', 'Aldea Zama', 'Arenas', 'Puerto Juárez', 'El Crucero',
      'Región 100', 'Región 200', 'La Isla', 'Playacar'
    ].sort(),
    'Playa del Carmen': [
      'Centro', 'Playacar', 'Playacar Fase I', 'Playacar Fase II', 'Boca Paila', 
      'Zazil-Ha', 'Pueblito del Carmen'
    ].sort()
  },
  Oaxaca: {
    Oaxaca: [
      'Centro', 'Jalatlaco', 'La Cascada', 'Reforma', 'Bajo', 'San Felipe', 'El Tule',
      'Condesa', 'Santa María del Tule', 'Villa de Mitla'
    ].sort(),
    'Puerto Escondido': [
      'Centro', 'Bacocho', 'Zicatela', 'Carrizalillo', 'El Tomatal', 'La Barra'
    ].sort()
  }
};

export default neighborhoods;