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
    location: 'Club Subterráneo, Ciudad Capital',
    description:
      'Una noche especial dedicada al sonido clásico del vinilo. Desde clásicos del house hasta joyas olvidadas del disco.',
  },
  {
    name: 'Warehouse Rave',
    date: '2024-10-12T23:00:00',
    location: 'Bodega Industrial 7, Distrito Industrial',
    description:
      'Techno industrial y acid en un auténtico almacén. Prepárate para una noche intensa y sin concesiones.',
  },
];

const pastEventsData: Event[] = [
  {
    name: 'Sunset Rooftop Party',
    date: '2024-08-15T18:00:00',
    location: 'Terraza del Sol, Hotel Vista',
    description:
      'Despedimos el verano con una sesión de house y disco mientras el sol se pone sobre la ciudad.',
  },
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
