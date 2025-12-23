import React, { useState } from 'react';
import { Inicio, ListaFormularios, FormularioCrear } from './components/Formularioasesoria';

function App() {
  const [vista, setVista] = useState('inicio');
  const [datosEditar, setDatosEditar] = useState(null);

  const onNavigate = (nuevaVista, data = null) => {
    if (data?.editar) {
      setDatosEditar(data.formulario);
    } else {
      setDatosEditar(null);
    }
    setVista(nuevaVista);
  };

  if (vista === 'inicio') return <Inicio onNavigate={onNavigate} />;

  if (vista === 'ver') return <ListaFormularios modo="ver" onNavigate={onNavigate} />;

  if (vista === 'eliminar') return <ListaFormularios modo="eliminar" onNavigate={onNavigate} />;

  if (vista === 'crear')
    return <FormularioCrear 
             onNavigate={onNavigate} 
             datosIniciales={datosEditar} 
           />;

  return null;
}

export default App;
