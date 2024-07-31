import { Calendar } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';

import {
  NavBar,
  CalendarEvent,
  CalendarModal,
  FabAddNew,
  FabDelete,
} from '../';
import { getMessagesES, localizer } from '../../helpers/';
import { useState } from 'react';
import { useUiStore } from '../../hooks';
import { useCalendarStore } from '../../hooks';

export const CalendarPage = () => {
  const { openDateModal } = useUiStore();
  const { events, setActiveEvent } = useCalendarStore();
  const [lastView, setLastView] = useState(
    localStorage.getItem('lastView') || 'week'
  );

  const eventStyleGetter = (event, start, end, isSelected) => {
    const style = {
      backgroundColor: '#347CF7',
      borderRadius: '0px',
      opacity: '0.8',
      color: 'white',
    };

    return {
      style,
    };
  };

  const onDoubleClick = (event) => {
    openDateModal();
    console.log({ doubleClick: event });
  };
  const onSelect = (event) => {
    console.log({ click: event });
    setActiveEvent(event);
  };
  const onViewChange = (event) => {
    localStorage.setItem('lastView', event);
    console.log({ viewChange: event });
  };

  return (
    <>
      <NavBar />
      <Calendar
        messages={getMessagesES()}
        culture="es"
        defaultView={lastView}
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 'calc(100vh - 80px)' }}
        eventPropGetter={eventStyleGetter}
        components={{
          event: CalendarEvent,
        }}
        onDoubleClickEvent={onDoubleClick}
        onSelectEvent={onSelect}
        onView={onViewChange}
      />
      <CalendarModal />
      <FabAddNew />
      <FabDelete />
    </>
  );
};
