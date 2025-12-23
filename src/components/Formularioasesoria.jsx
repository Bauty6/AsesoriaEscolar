import React, { useState, useEffect } from 'react';
import {onNavigate as useNavigate} from 'react-router-dom';

// ==================== ESTILOS ====================
const styles = {
  container: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #005eff, #00a6ff)',
    fontFamily: "'Poppins', sans-serif",
    padding: '20px'
  },
  inicioContainer: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '20px'
  },
  titulo: {
    color: '#ffffff',
    fontSize: '32px',
    marginBottom: '30px',
    textAlign: 'center'
  },
  cardOpciones: {
    background: '#ffffff',
    padding: '30px',
    borderRadius: '20px',
    boxShadow: '0 0 20px rgba(0,0,0,0.18)',
    width: '100%',
    maxWidth: '400px',
    display: 'flex',
    flexDirection: 'column',
    gap: '20px'
  },
  boton: {
    padding: '14px',
    backgroundColor: '#005eff',
    color: '#fff',
    border: 'none',
    borderRadius: '10px',
    fontSize: '16px',
    cursor: 'pointer',
    fontWeight: 'bold',
    transition: '0.2s'
  },
  botonEliminar: {
    backgroundColor: '#d62828'
  },
  btnVolver: {
    background: 'white',
    color: '#005eff',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: 'bold',
    marginBottom: '20px'
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: '20px',
    maxWidth: '1200px',
    margin: '0 auto'
  },
  card: {
    background: 'white',
    padding: '20px',
    borderRadius: '12px',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
  },
  cardInfo: {
    marginBottom: '15px'
  },
  cardTitulo: {
    color: '#005eff',
    marginBottom: '10px'
  },
  cardTexto: {
    margin: '5px 0',
    color: '#666',
    fontSize: '14px'
  },
  acciones: {
    display: 'flex',
    gap: '10px',
    flexWrap: 'wrap'
  },
  btnAccion: {
    flex: 1,
    padding: '8px 12px',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: '500',
    fontSize: '14px',
    color: 'white'
  },
  btnVer: {
    backgroundColor: '#005eff'
  },
  btnEditar: {
    backgroundColor: '#ffa500'
  },
  btnEliminar: {
    backgroundColor: '#d62828'
  },
  mensajeVacio: {
    textAlign: 'center',
    color: 'white',
    fontSize: '18px',
    marginTop: '50px'
  },
  modalOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'rgba(0,0,0,0.7)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000
  },
  modalContent: {
    background: 'white',
    padding: '30px',
    borderRadius: '15px',
    maxWidth: '500px',
    width: '90%',
    maxHeight: '80vh',
    overflowY: 'auto'
  },
  detalleItem: {
    margin: '15px 0',
    padding: '10px',
    background: '#f5f5f5',
    borderRadius: '8px'
  },
  detalleLabel: {
    color: '#005eff',
    display: 'block',
    marginBottom: '5px',
    fontWeight: 'bold'
  },
  formularioBox: {
    background: 'white',
    maxWidth: '800px',
    margin: '0 auto',
    padding: '30px',
    borderRadius: '15px',
    boxShadow: '0 4px 15px rgba(0,0,0,0.2)'
  },
  formGroup: {
    marginBottom: '20px'
  },
  label: {
    display: 'block',
    marginBottom: '8px',
    fontWeight: '500',
    color: '#333'
  },
  input: {
    width: '100%',
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '8px',
    fontSize: '14px',
    boxSizing: 'border-box'
  },
  textarea: {
    width: '100%',
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '8px',
    fontSize: '14px',
    minHeight: '80px',
    resize: 'vertical',
    boxSizing: 'border-box'
  },
  formButtons: {
    display: 'flex',
    gap: '10px',
    marginTop: '25px'
  },
  btnSubmit: {
    flex: 1,
    padding: '12px',
    background: '#005eff',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: 'bold',
    fontSize: '16px'
  },
  btnCancelar: {
    flex: 1,
    padding: '12px',
    background: '#6c757d',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: 'bold',
    fontSize: '16px'
  },
  familiaSection: {
    marginTop: '20px',
    padding: '15px',
    background: '#f8f9fa',
    borderRadius: '8px'
  },
  familiaItem: {
    background: 'white',
    padding: '15px',
    margin: '10px 0',
    borderRadius: '8px',
    border: '1px solid #dee2e6'
  },
  btnAgregar: {
    background: '#28a745',
    color: 'white',
    border: 'none',
    padding: '8px 16px',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: '500',
    marginTop: '10px'
  },
  btnEliminarItem: {
    background: '#dc3545',
    color: 'white',
    border: 'none',
    padding: '6px 12px',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '12px',
    marginTop: '10px'
  }
};

// ==================== COMPONENTE INICIO ====================
const Inicio = ({ onNavigate }) => {
  return (
    <div style={styles.inicioContainer}>
      <h1 style={styles.titulo}>Formulario de Asesoría Escolar</h1>
      <div style={styles.cardOpciones}>
        <button style={styles.boton} onClick={() => onNavigate('crear')}>
          ➕ Crear formulario
        </button>
        <button style={styles.boton} onClick={() => onNavigate('ver')}>
          📋 Ver formularios
        </button>
        <button style={{...styles.boton, ...styles.botonEliminar}} onClick={() => onNavigate('eliminar')}>
          🗑️ Eliminar formularios
        </button>
      </div>
    </div>
  );
};

// ==================== COMPONENTE LISTA ====================
const ListaFormularios = ({ modo, onNavigate }) => {
  const [formularios, setFormularios] = useState([]);
  const [modalAbierto, setModalAbierto] = useState(false);
  const [formularioSeleccionado, setFormularioSeleccionado] = useState(null);

  useEffect(() => {
    cargarFormularios();
  }, []);

  const cargarFormularios = () => {
    const datos = localStorage.getItem('formularios');
    if (datos) {
      setFormularios(JSON.parse(datos));
    }
  };

  const verDetalle = (form) => {
    setFormularioSeleccionado(form);
    setModalAbierto(true);
  };

  const editarFormulario = (form) => {
    onNavigate('crear', { formulario: form, editar: true });
  };

  const eliminarFormulario = (id) => {
    if (window.confirm('¿Estás seguro de eliminar este formulario?')) {
      const nuevosFormularios = formularios.filter(f => f.id !== id);
      localStorage.setItem('formularios', JSON.stringify(nuevosFormularios));
      setFormularios(nuevosFormularios);
    }
  };

  const titulo = modo === 'eliminar' ? 'Eliminar Formularios' : 'Lista de Formularios';

  return (
    <div style={styles.container}>
      <div style={{textAlign: 'center', marginBottom: '30px'}}>
        <button style={styles.btnVolver} onClick={() => onNavigate('inicio')}>
          ← Volver al inicio
        </button>
        <h1 style={styles.titulo}>{titulo}</h1>
      </div>

      {formularios.length === 0 ? (
        <div style={styles.mensajeVacio}>
          <p>No hay formularios registrados</p>
        </div>
      ) : (
        <div style={styles.grid}>
          {formularios.map((form) => (
            <div key={form.id} style={styles.card}>
              <div style={styles.cardInfo}>
                <h3 style={styles.cardTitulo}>{form.nombre} {form.apellido}</h3>
                <p style={styles.cardTexto}><strong>DNI:</strong> {form.dni}</p>
                <p style={styles.cardTexto}><strong>Edad:</strong> {form.edad} años</p>
                <p style={styles.cardTexto}><strong>Teléfono:</strong> {form.telefono}</p>
                <p style={styles.cardTexto}><strong>Fecha:</strong> {form.fecha}</p>
              </div>
              <div style={styles.acciones}>
                {modo === 'eliminar' ? (
                  <button 
                    style={{...styles.btnAccion, ...styles.btnEliminar}}
                    onClick={() => eliminarFormulario(form.id)}
                  >
                    🗑️ Eliminar
                  </button>
                ) : (
                  <>
                    <button 
                      style={{...styles.btnAccion, ...styles.btnVer}}
                      onClick={() => verDetalle(form)}
                    >
                      👁️ Ver
                    </button>
                    <button 
                      style={{...styles.btnAccion, ...styles.btnEditar}}
                      onClick={() => editarFormulario(form)}
                    >
                      ✏️ Editar
                    </button>
                    <button 
                      style={{...styles.btnAccion, ...styles.btnEliminar}}
                      onClick={() => eliminarFormulario(form.id)}
                    >
                      🗑️ Eliminar
                    </button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {modalAbierto && formularioSeleccionado && (
        <div style={styles.modalOverlay} onClick={() => setModalAbierto(false)}>
          <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <h2 style={{color: '#005eff', marginBottom: '20px'}}>Detalles del Formulario</h2>
            
            <div style={styles.detalleItem}>
              <span style={styles.detalleLabel}>Nombre completo:</span>
              {formularioSeleccionado.nombre} {formularioSeleccionado.apellido}
            </div>
            
            <div style={styles.detalleItem}>
              <span style={styles.detalleLabel}>DNI:</span> {formularioSeleccionado.dni}
            </div>
            
            <div style={styles.detalleItem}>
              <span style={styles.detalleLabel}>Fecha de nacimiento:</span> {formularioSeleccionado.fechaNacimiento}
            </div>
            
            <div style={styles.detalleItem}>
              <span style={styles.detalleLabel}>Edad:</span> {formularioSeleccionado.edad} años
            </div>
            
            <div style={styles.detalleItem}>
              <span style={styles.detalleLabel}>Domicilio:</span> {formularioSeleccionado.domicilio}
            </div>
            
            <div style={styles.detalleItem}>
              <span style={styles.detalleLabel}>Barrio:</span> {formularioSeleccionado.barrio}
            </div>
            
            <div style={styles.detalleItem}>
              <span style={styles.detalleLabel}>Teléfono:</span> {formularioSeleccionado.telefono}
            </div>
            
            <div style={styles.detalleItem}>
              <span style={styles.detalleLabel}>Escuela de origen:</span> {formularioSeleccionado.escuelaOrigen}
            </div>
            
            {formularioSeleccionado.familiares && formularioSeleccionado.familiares.length > 0 && (
              <div style={styles.detalleItem}>
                <span style={styles.detalleLabel}>Grupo familiar:</span>
                {formularioSeleccionado.familiares.map((f, i) => (
                  <p key={i}>• {f.nombre} - {f.parentesco} ({f.edad} años)</p>
                ))}
              </div>
            )}
            
            <div style={{display: 'flex', gap: '10px', marginTop: '20px'}}>
              <button 
                style={{flex: 1, padding: '10px', background: '#6c757d', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold'}}
                onClick={() => setModalAbierto(false)}
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// ==================== COMPONENTE FORMULARIO ====================
const FormularioCrear = ({ onNavigate, datosIniciales }) => {
  const [formData, setFormData] = useState(datosIniciales || {
    id: Date.now(),
    fecha: new Date().toISOString().split('T')[0],
    asesor: '',
    nombre: '',
    apellido: '',
    escuelaOrigen: '',
    lugarNacimiento: '',
    fechaNacimiento: '',
    edad: '',
    dni: '',
    domicilio: '',
    barrio: '',
    telefono: '',
    familiares: [{ nombre: '', parentesco: '', edad: '', escolaridad: '', ocupacion: '', horario: '' }],
    contactos: [{ nombre: '', telefono: '' }]
  });

   const [seccionActiva, setSeccionActiva] = useState(1);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFamiliarChange = (index, campo, valor) => {
    const nuevosFamiliares = [...formData.familiares];
    nuevosFamiliares[index][campo] = valor;
    setFormData({ ...formData, familiares: nuevosFamiliares });
  };

  const agregarFamiliar = () => {
    setFormData({
      ...formData,
      familiares: [...formData.familiares, { nombre: '', parentesco: '', edad: '', escolaridad: '', ocupacion: '', horario: '' }]
    });
  };

  const eliminarFamiliar = (index) => {
    const nuevosFamiliares = formData.familiares.filter((_, i) => i !== index);
    setFormData({ ...formData, familiares: nuevosFamiliares });
  };

  const handleContactoChange = (index, campo, valor) => {
    const nuevosContactos = [...formData.contactos];
    nuevosContactos[index][campo] = valor;
    setFormData({ ...formData, contactos: nuevosContactos });
  };

  const agregarContacto = () => {
    setFormData({
      ...formData,
      contactos: [...formData.contactos, { nombre: '', telefono: '' }]
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const formularios = JSON.parse(localStorage.getItem('formularios') || '[]');
    
    if (datosIniciales && datosIniciales.editar) {
      const index = formularios.findIndex(f => f.id === formData.id);
      formularios[index] = formData;
    } else {
      formularios.push(formData);
    }
    
    localStorage.setItem('formularios', JSON.stringify(formularios));
    
    alert('✅ Formulario guardado correctamente');
    onNavigate('ver');
  };

  return (
    <div style={styles.container}>
      <div style={styles.formularioBox}>
        <button style={styles.btnVolver} onClick={() => onNavigate('inicio')}>
          ← Volver al inicio
        </button>
        
        <h2 style={{color: '#005eff', textAlign: 'center', marginBottom: '25px'}}>
          {datosIniciales && datosIniciales.editar ? 'Editar Formulario' : 'Crear Nuevo Formulario'}
        </h2>
        <form onSubmit={handleSubmit}>
         {seccionActiva === 1 && (
                  <div>
                    <h2>Datos Personales </h2>
                    <div style={styles.formGroup}>
                      <label style={styles.label}>Fecha:</label>
                      <input style={styles.input} type="date" name="fecha" value={formData.fecha} onChange={handleChange} required />
                    </div>

                    <div style={styles.formGroup}>
                      <label style={styles.label}>Asesor:</label>
                      <input style={styles.input} type="text" name="asesor" value={formData.asesor} onChange={handleChange} required />
                    </div>

                    <div style={styles.formGroup}>
                      <label style={styles.label}>Nombre:</label>
                      <input style={styles.input} type="text" name="nombre" value={formData.nombre} onChange={handleChange} required />
                    </div>

                    <div style={styles.formGroup}>
                      <label style={styles.label}>Apellido:</label>
                      <input style={styles.input} type="text" name="apellido" value={formData.apellido} onChange={handleChange} required />
                    </div>

                    <div style={styles.formGroup}>
                      <label style={styles.label}>Escuela de origen:</label>
                      <input style={styles.input} type="text" name="escuelaOrigen" value={formData.escuelaOrigen} onChange={handleChange} />
                    </div>

                    <div style={styles.formGroup}>
                      <label style={styles.label}>Lugar de nacimiento:</label>
                      <input style={styles.input} type="text" name="lugarNacimiento" value={formData.lugarNacimiento} onChange={handleChange} />
                    </div>

                    <div style={styles.formGroup}>
                      <label style={styles.label}>Fecha de nacimiento:</label>
                      <input style={styles.input} type="date" name="fechaNacimiento" value={formData.fechaNacimiento} onChange={handleChange} required />
                    </div>

                    <div style={styles.formGroup}>
                      <label style={styles.label}>Edad:</label>
                      <input style={styles.input} type="number" name="edad" value={formData.edad} onChange={handleChange} required />
                    </div>

                    <div style={styles.formGroup}>
                      <label style={styles.label}>DNI:</label>
                      <input style={styles.input} type="text" name="dni" value={formData.dni} onChange={handleChange} required />
                    </div>

                    <div style={styles.formGroup}>
                      <label style={styles.label}>Domicilio:</label>
                      <input style={styles.input} type="text" name="domicilio" value={formData.domicilio} onChange={handleChange} required />
                    </div>

                    <div style={styles.formGroup}>
                      <label style={styles.label}>Barrio:</label>
                      <input style={styles.input} type="text" name="barrio" value={formData.barrio} onChange={handleChange} />
                    </div>

                    <div style={styles.formGroup}>
                      <label style={styles.label}>Teléfono:</label>
                      <input style={styles.input} type="tel" name="telefono" value={formData.telefono} onChange={handleChange} required />
                    </div>

                    <div style={styles.familiaSection}>
                      <h3>Contactos de Emergencia</h3>
                      {formData.contactos.map((contacto, index) => (
                        <div key={index} style={styles.familiaItem}>
                          <div style={styles.formGroup}>
                            <label style={styles.label}>Nombre:</label>
                            <input 
                              style={styles.input}
                              type="text" 
                              value={contacto.nombre}
                              onChange={(e) => handleContactoChange(index, 'nombre', e.target.value)}
                            />
                          </div>
                          <div style={styles.formGroup}>
                            <label style={styles.label}>Teléfono:</label>
                            <input 
                              style={styles.input}
                              type="tel" 
                              value={contacto.telefono}
                              onChange={(e) => handleContactoChange(index, 'telefono', e.target.value)}
                            />
                          </div>
                        </div>
                      ))}
                      <button style={styles.btnAgregar} onClick={agregarContacto}>
                        + Agregar Contacto
                      </button>
                    </div>

                    <div style={styles.familiaSection}>
                      <h3>Grupo Familiar</h3>
                      {formData.familiares.map((familiar, index) => (
                        <div key={index} style={styles.familiaItem}>
                          <div style={styles.formGroup}>
                            <label style={styles.label}>Nombre:</label>
                            <input 
                              style={styles.input}
                              type="text" 
                              value={familiar.nombre}
                              onChange={(e) => handleFamiliarChange(index, 'nombre', e.target.value)}
                            />
                          </div>
                          <div style={styles.formGroup}>
                            <label style={styles.label}>Parentesco:</label>
                            <input 
                              style={styles.input}
                              type="text" 
                              value={familiar.parentesco}
                              onChange={(e) => handleFamiliarChange(index, 'parentesco', e.target.value)}
                            />
                          </div>
                          <div style={styles.formGroup}>
                            <label style={styles.label}>Edad:</label>
                            <input 
                              style={styles.input}
                              type="number" 
                              value={familiar.edad}
                              onChange={(e) => handleFamiliarChange(index, 'edad', e.target.value)}
                            />
                          </div>
                          <div style={styles.formGroup}>
                            <label style={styles.label}>Escolaridad:</label>
                            <input 
                              style={styles.input}
                              type="text" 
                              value={familiar.escolaridad}
                              onChange={(e) => handleFamiliarChange(index, 'escolaridad', e.target.value)}
                            />
                          </div>
                          <div style={styles.formGroup}>
                            <label style={styles.label}>Ocupación:</label>
                            <input 
                              style={styles.input}
                              type="text" 
                              value={familiar.ocupacion}
                              onChange={(e) => handleFamiliarChange(index, 'ocupacion', e.target.value)}
                            />
                          </div>
                          <div style={styles.formGroup}>
                            <label style={styles.label}>Horario Laboral:</label>
                            <input 
                              style={styles.input}
                              type="text" 
                              value={familiar.horario}
                              onChange={(e) => handleFamiliarChange(index, 'horario', e.target.value)}
                            />
                          </div>
                          {formData.familiares.length > 1 && (
                            <button 
                              style={styles.btnEliminarItem}
                              onClick={() => eliminarFamiliar(index)}
                            >
                              Eliminar
                            </button>
                          )}
                        </div>
                      ))}
                      <button style={styles.btnAgregar} onClick={agregarFamiliar}>
                        + Agregar Familiar
                      </button>
                    </div>
                    <div>
                      <button style=""></button>
                    </div>
                    <div className="flex justify-end mt-6">
                    <button
                      type="button"
                      onClick={() => setSeccionActiva(2)}
                    >
                      Siguiente
                    </button>
                  </div>
                
        
         
          
          
                <div style={styles.formButtons}>
                  <button style={styles.btnCancelar} onClick={() => onNavigate('inicio')}>
                    Cancelar
                  </button>
                  <button style={styles.btnSubmit} onClick={handleSubmit}>
                    Guardar Formulario
                  </button>
                </div>
              </div>
          )}
        </form>
      </div>
    </div>
  );
};

export { Inicio, ListaFormularios, FormularioCrear };