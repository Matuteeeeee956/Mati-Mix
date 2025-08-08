export interface Event {
  name: string;
  date: string; // ISO string
  location: string;
  description: string;
}

// In a real application, you would fetch this from a database.
// For now, we use a mock in-memory store.
const upcomingEventsData: Event[] = [
  {
    name: 'Noche de Vinilos',
    date: '2024-09-28T22:00:00',
    location: 'Club Subterráneo, Cordoba Capital',
    description:
      'Una noche especial dedicada al sonido clásico del vinilo combinado con House Music. Desde clásicos del house hasta joyas olvidadas del disco.',
  },
  {
    name: 'Warehouse Rave',
    date: '2024-10-12T23:00:00',
    location: 'Palermo Soho, Buenos Aires',
    description:
      'Techno industrial y acid en un auténtico almacén. Prepárate para una noche intensa y sin concesiones.',
  },
  {
    name: 'Tropical Beach Bash',
    date: '2025-01-18T22:00:00',
    location: 'Playa Paraíso, Mar del Plata',
    description:
      'Reggaetón, afrobeat y ritmos tropicales en la arena. Una noche para bailar descalzo bajo las olas y las estrellas.',
  },
  {
    name: 'Forest Mountain Fest',
    date: '2025-04-12T18:00:00',
    location: 'Refugio Alto Bosque, Sierra Verde',
    description:
      'Música indie y electrónica en medio de la naturaleza. Entre árboles y cumbres, vive una experiencia mágica bajo el cielo estrellado.',
  }
];

const pastEventsData: Event[] = [
  {
    name: 'Sunset Rooftop Party',
    date: '2024-08-15T18:00:00',
    location: 'Terraza del Sol, Hotel Vista',
    description:
      'Despedimos el verano con una sesión de house y disco mientras el sol se pone sobre la ciudad.',
  },
  {
    name: 'Beach Vibes Night',
    date: '2025-02-22T20:00:00',
    location: 'Playa Brisa Marina, Costa Azul',
    description:
      'Una noche mágica junto al mar con música en vivo, DJ sets y cócteles tropicales bajo las estrellas.',
  },
  {
    name: 'Full Moon Beach Party',
    date: '2025-03-15T21:00:00',
    location: 'Playa Arena Dorada, Punta Sol',
    description:
      'Celebra la luna llena con ritmos electrónicos, fogatas y un ambiente único junto al mar.',
  }
];


// This is a mock implementation. In a real app, you'd use a database.
const getUpcomingEvents = async (): Promise<Event[]> => {
  return Promise.resolve(upcomingEventsData);
};

const getPastEvents = async (): Promise<Event[]> => {
  return Promise.resolve(pastEventsData);
};

const addEvent = async (event: Event): Promise<void> => {
  upcomingEventsData.unshift(event);
  return Promise.resolve();
};

export const eventsService = {
  getUpcomingEvents,
  getPastEvents,
  addEvent,
};
