export const events = [
  {
    id: '1',
    start: new Date('2022-10-21 13:00:00'),
    end: Date('2022-10-21 13:00:00'),
    title: 'Cumpleaños Santiago',
    notes: 'Alguna nota',
  },
  {
    id: '2',
    start: new Date('2022-11-21 13:00:00'),
    end: Date('2022-11-21 13:00:00'),
    title: 'Cumpleaños Marto',
    notes: 'Alguna nota',
  },
];

export const initialState = {
  isLoadingEvents: true,
  events: [],
  activeEvent: null,
};

export const calendarWithEventsState = {
  isLoadingEvents: false,
  events: [...events],
  activeEvent: null,
};

export const calendarWithActiveEventState = {
  isLoadingEvents: false,
  events: [...events],
  activeEvent: { ...events[0] },
};
