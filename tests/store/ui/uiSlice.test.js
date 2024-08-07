import { onCloseDateModal, onOpenDateModal, uiSlice } from '../../../src/store/ui/uiSlice';

describe('Pruebas en uiSlice', () => {
  test('Debe de regresar el estado por defecto', () => {
    //*  { isDateModalOpen: false } -> estado Inicical. Entonces nosotros verificamos que esa prop se inicie así
    expect(uiSlice.getInitialState().isDateModalOpen).toBeFalsy();
  });

  test('Debe de cambiar el isDateModalOpen correctamente', () => {
    
    //* Creamos el estado inicial
    let state = uiSlice.getInitialState();
    //* Con el reducer le enviamos el estado inicial y le pasamos el reducer a utilizar.
    state = uiSlice.reducer(state, onOpenDateModal());
    //* Esperamos que el estado haya cambiado y este en true.
    expect(state.isDateModalOpen).toBeTruthy();
    
    state = uiSlice.reducer(state, onCloseDateModal());
    //* Esperamos que el estado haya cambiado y este en false.
    expect(state.isDateModalOpen).toBeFalsy();
      
    
  });
});
