const { default: calendarApi } = require('../../src/api/calendarApi');

describe('Purebas en calendarApi', () => {
  test('Debe de tener la configuración por defecto', () => {
    expect(calendarApi.defaults.baseURL).toBe(process.env.VITE_API_URL);
  });

  test('Debe de tener el x-token en el header de todas las peticiones', async () => {
    const token = 'ABC-123-XYZ';
    localStorage.setItem('token', token);
    try {
      await calendarApi.get('/auth');

      // console.log(res)
    } catch (error) {
      expect(error.config.headers['x-token']).toBe(token);
    }
  });
});
