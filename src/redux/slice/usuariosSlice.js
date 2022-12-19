import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  nombre: null,
  apellido1: null,
  apellido2: null,
  estado_membresia: false,
};

const usuarioSlice = createSlice({
  name: 'usuarios',
  initialState,
  reducers: {
    GET_USUARIO_MEMBRESIA(state, action) {
      const { usuarios } = action.payload;
      const array = [];
      usuarios.map((usuario) => {
        const membresia = usuario.membresia;
        return array.push(membresia);
      });
    },
  },
});

export const { GET_USUARIO_MEMBRESIA } = usuarioSlice.actions;

export const selectUsuario = (state) => state.usuario.nombre;
export const selectApellido1 = (state) => state.usuario.apellido1;
export const selectApellido2 = (state) => state.usuario.apellido2;
export const selectMembresia = (state) => state.usuario.estado_membresia;

export default usuarioSlice.reducer;
