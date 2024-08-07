import {
  calendarSlice,
  onAddNewEvent,
  onDeleteEvent,
  onLoadEvents,
  onLogoutCalendar,
  onSetActiveEvent,
  onUpdateEvent,
} from '../../../src/store/calendar/calendarSlice';
import {
  calendarWithActiveEventState,
  calendarWithEventsState,
  events,
  initialState,
} from '../../fixtures/calendarStates';

describe('Pruebas en calendarSlice', () => {
  test('Debe de regresar el estado por defecto', () => {
    const state = calendarSlice.getInitialState();

    expect(state).toEqual(initialState);
  });

  test('onSetActiveEvent Debe de activar el evento', () => {
    const state = calendarSlice.reducer(
      calendarWithEventsState,
      onSetActiveEvent(events[0])
    );

    expect(state).toEqual(calendarWithActiveEventState);
    expect(state.activeEvent).toEqual(events[0]);
  });

  test('onAddNewEvent  Debe de agregar el evento', () => {
    const newEvent = {
      id: '3',
      start: new Date('2022-08-21 13:00:00'),
      end: Date('2022-08-21 13:00:00'),
      title: 'Cumpleaños Santiago',
      notes: 'Alguna nota',
    };

    const state = calendarSlice.reducer(
      calendarWithEventsState,
      onAddNewEvent(newEvent)
    );

    expect(state.events).toEqual([...events, newEvent]);
    expect(state).toEqual({
      ...calendarWithEventsState,
      events: [...calendarWithEventsState.events, newEvent],
    });
    // expect(state.activeEvent).toEqual(events[0]);
  });

  test('onUpdateEvent debe de actualizar el evento', () => {
    const newEvent = {
      id: '1',
      start: new Date('2022-08-21 13:00:00'),
      end: Date('2022-08-21 13:00:00'),
      title: 'Cumpleaños Sattog',
      notes: 'Alguna notax',
    };

    const state = calendarSlice.reducer(
      calendarWithEventsState,
      onUpdateEvent(newEvent)
    );

    expect(state.events[0]).toEqual(newEvent);
  });

  test('onDeleteEvent debe de borrar el evento', () => {
    const state = calendarSlice.reducer(
      calendarWithActiveEventState,
      onDeleteEvent()
    );

    expect(state.activeEvent).toBe(null);
    expect(state.events).not.toContain(events[0]);
  });

  test('onLoadEvents debe de establecer los eventos', () => {
    const state = calendarSlice.reducer(initialState, onLoadEvents(events));

    expect(state.events).toEqual(events);
    expect(state.isLoadingEvents).toBeFalsy();
  });
  test('onLogoutCalendar debe de limpiar el estado', () => {
    const state = calendarSlice.reducer(
      calendarWithActiveEventState,
      onLogoutCalendar
    );

    expect(state).toEqual(initialState);
  });
});
