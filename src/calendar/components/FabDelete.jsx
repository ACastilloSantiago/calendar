import { useCalendarStore } from '../../hooks';

export const FabDelete = () => {
  const { startDeletingEvent, hasEventSelected } = useCalendarStore();

  const handleDelete = () => {
    startDeletingEvent();
  };

  return (
    <button
      style={{ display: hasEventSelected ? '' : 'none' }}
      className="btn btn-danger fab-danger"
      onClick={handleDelete}
      aria-label='btn-delete'
    >
      <i className="fas fa-trash-alt"></i>
    </button>
  );
};
