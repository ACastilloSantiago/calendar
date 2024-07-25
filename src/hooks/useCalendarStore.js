import { useDispatch, useSelector } from 'react-redux';
import {
  onAddNewEvent,
  onDeleteEvent,
  onSetActiveEvent,
  onUpdateEvent,
} from '../store';

export const useCalendarStore = () => {
  const { events, activeEvent } = useSelector((state) => state.calendar);

  const dispatch = useDispatch();

  const setActiveEvent = (calendarEvent) => {
    console.log(calendarEvent);
    dispatch(onSetActiveEvent(calendarEvent));
  };

  const startSavingEvent = async (calendarEvent) => {
    // Todo: Backend

    if (calendarEvent._id) {
      // Actualizando
      dispatch(onUpdateEvent({ ...calendarEvent }));
    } else {
      // Creando
      dispatch(onAddNewEvent({ ...calendarEvent, _id: new Date().getTime() }));
    }
  };
  const startDeletingEvent = () => {
    //  console.log(calendarEvent);
    dispatch(onDeleteEvent());
  };

  return {
    // * Propiedades
    events,
    activeEvent,
    hasEventSelected: !!activeEvent,

    // * Metodos
    startDeletingEvent,
    setActiveEvent,
    startSavingEvent,
  };
};
