export const CalendarEvent = ({ event = { title: '', user: '' } }) => {
  const { title, user } = event;
  //   console.log(event);
  return (
    <>
      <strong>{title || ''}</strong>
      <span> - {user.name}</span>
    </>
  );
};
