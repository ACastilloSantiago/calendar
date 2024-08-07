import { render, screen } from '@testing-library/react';
import { FabDelete } from '../../../src/calendar/components/FabDelete';
import { Provider } from 'react-redux';
import { store } from '../../../src/store';

describe('Pruebas en el componente <FabDelete />', () => {
  test('Debe de mostrar el componente correctamente', () => {
    render(
      <Provider store={store}>
        <FabDelete />
      </Provider>
    );

    screen.debug();
  });
});
