import React, { useState, useEffect } from 'react';

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
    fontWeight: 'bold'
  },
  formularioBox: {
    background: 'white',
    maxWidth: '900px',
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
    boxSizing: 'border-box'
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
  formButtons: {
    display: 'flex',
    gap: '10px',
    marginTop: '25px'
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
  }
};

export default function App() {
  const [pantalla, setPantalla] = useState('inicio');
  const [datosEdicion, setDatosEdicion] = useState(null);

  const onNavigate = (destino, datos) => {
    setPantalla(destino);
    setDatosEdicion(datos || null);
  };

  if (pantalla === 'inicio') {
    return <Inicio onNavigate={onNavigate} />;
  }
  if (pantalla === 'crear') {
    return <FormularioCrear onNavigate={onNavigate} datosIniciales={datosEdicion} />;
  }
  if (pantalla === 'ver') {
    return <ListaFormularios onNavigate={onNavigate} />;
  }
}

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
      </div>
    </div>
  );
};

const ListaFormularios = ({ onNavigate }) => {
  const [formularios, setFormularios] = useState([]);

  useEffect(() => {
    const datos = localStorage.getItem('formularios');
    if (datos) {
      setFormularios(JSON.parse(datos));
    }
  }, []);

  const eliminarFormulario = (id) => {
    const confirmacion = window.confirm('¿Estás seguro de eliminar este formulario?');
    if (confirmacion) {
      // Se ejecuta después de 2000 milisegundos (2 segundos)
      setTimeout(() => {
        const nuevos = formularios.filter((f) => f.id !== id);
        localStorage.setItem('formularios', JSON.stringify(nuevos));
        setFormularios(nuevos);
      }, 5000);
    }
  };

  const editarFormulario = (form) => {
    onNavigate('crear', { formulario: form, editar: true });
  };

  return (
    <div style={styles.container}>
      <div style={{ textAlign: 'center', marginBottom: '30px' }}>
        <button style={styles.btnVolver} onClick={() => onNavigate('inicio')}>
          ← Volver al inicio
        </button>
        <h1 style={styles.titulo}>Lista de Formularios</h1>
      </div>

      {formularios.length === 0 ? (
        <div style={{ textAlign: 'center', color: 'white', fontSize: '18px', marginTop: '50px' }}>
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
              </div>
              <div style={styles.acciones}>
                <button
                  style={{ ...styles.btnAccion, backgroundColor: '#ffa500' }}
                  onClick={() => editarFormulario(form)}
                >
                  ✏️ Editar
                </button>
                <button
                  style={{ ...styles.btnAccion, backgroundColor: '#d62828' }}
                  onClick={() => eliminarFormulario(form.id)}
                >
                  🗑️ Eliminar
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const FormularioCrear = ({ onNavigate, datosIniciales }) => {
  const [seccionActiva, setSeccionActiva] = useState(1);
  const [formData, setFormData] = useState(datosIniciales?.formulario || {
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
    contactos: [{ nombre: '', telefono: '' }],
    jardin: '',
    primaria: '',
    area_preferida: '',
    area_dificultosa: '',
    embarazo: '',
    parto: '',
    patologia_perinatal: '',
    eleccion_escuela: '',
    tratamientos: '',
    tratamientos_detalle: '',
    enfermedades: '',
    enfermedades_detalle: '',
    alergias: '',
    alergias_detalle: '',
    respiratorias: '',
    respiratorias_detalle: '',
    medicamentos: '',
    medicamentos_detalle: '',
    atenciones: '',
    atenciones_detalle: '',
    disminuciones: '',
    disminuciones_detalle: '',
    jucaid: '',
    jucaid_detalle: '',
    judicial: '',
    judicial_detalle: '',
    extraescolar: '',
    extraescolar_detalle: '',
    hermanos: '',
    hermanos_detalle: '',
    observaciones: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFamiliarChange = (index, campo, valor) => {
    const nuevos = [...formData.familiares];
    nuevos[index][campo] = valor;
    setFormData({ ...formData, familiares: nuevos });
  };

  const agregarFamiliar = () => {
    setFormData({
      ...formData,
      familiares: [...formData.familiares, { nombre: '', parentesco: '', edad: '', escolaridad: '', ocupacion: '', horario: '' }]
    });
  };

  const eliminarFamiliar = (index) => {
    const nuevos = formData.familiares.filter((_, i) => i !== index);
    setFormData({ ...formData, familiares: nuevos });
  };

  const handleContactoChange = (index, campo, valor) => {
    const nuevos = [...formData.contactos];
    nuevos[index][campo] = valor;
    setFormData({ ...formData, contactos: nuevos });
  };

  const agregarContacto = () => {
    setFormData({
      ...formData,
      contactos: [...formData.contactos, { nombre: '', telefono: '' }]
    });
  };

  const handleSubmit = () => {
    const formularios = JSON.parse(localStorage.getItem('formularios') || '[]');

    if (datosIniciales?.editar) {
      const index = formularios.findIndex(f => f.id === formData.id);
      formularios[index] = formData;
    } else {
      formularios.push(formData);
    }

    localStorage.setItem('formularios', JSON.stringify(formularios));
    alert('✅ Formulario guardado correctamente');
    onNavigate('ver');
  };

  const camposMedicos = [
    { name: "tratamientos", label: "Tratamientos", detalle: "tratamientos_detalle", detalleLabel: "¿Cuáles?" },
    { name: "enfermedades", label: "Enfermedades padecidas", detalle: "enfermedades_detalle", detalleLabel: "¿Cuáles?" },
    { name: "alergias", label: "Alergias", detalle: "alergias_detalle", detalleLabel: "¿Cuáles?" },
    { name: "respiratorias", label: "Patologías respiratorias", detalle: "respiratorias_detalle", detalleLabel: "¿Cuáles?" },
    { name: "medicamentos", label: "Toma medicamentos", detalle: "medicamentos_detalle", detalleLabel: "¿Cuáles?" },
    { name: "atenciones", label: "Atenciones (psicológica, fonoaudiológica, etc.)", detalle: "atenciones_detalle", detalleLabel: "¿Cuáles?" },
    { name: "disminuciones", label: "Disminuciones", detalle: "disminuciones_detalle", detalleLabel: "¿Cuáles?" },
    { name: "jucaid", label: "¿Posee certificado de JUCAID?", detalle: "jucaid_detalle", detalleLabel: "Ingrese credencial:" },
    { name: "judicial", label: "¿Se encuentra bajo situación judicial?", detalle: "judicial_detalle", detalleLabel: "Motivo / Caso:" },
    { name: "extraescolar", label: "¿Realiza actividad extraescolar?", detalle: "extraescolar_detalle", detalleLabel: "¿Cuál?" },
    { name: "hermanos", label: "¿Tiene hermanos dentro de la escuela?", detalle: "hermanos_detalle", detalleLabel: "Turno del hermano:" }
  ];

  return (
    <div style={styles.container}>
      <div style={styles.formularioBox}>
        <button style={styles.btnVolver} onClick={() => onNavigate('inicio')}>
          ← Volver al inicio
        </button>

        <h2 style={{ color: '#005eff', textAlign: 'center', marginBottom: '25px' }}>
          {datosIniciales?.editar ? 'Editar Formulario' : 'Crear Nuevo Formulario'}
        </h2>

        <div>
          {seccionActiva === 1 && (
            <div>
              <h3 style={{ color: '#005eff', marginBottom: '20px' }}>Datos Personales</h3>

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
                <button type="button" style={styles.btnAgregar} onClick={agregarContacto}>
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
                        type="button"
                        style={styles.btnEliminarItem}
                        onClick={() => eliminarFamiliar(index)}
                      >
                        Eliminar
                      </button>
                    )}
                  </div>
                ))}
                <button type="button" style={styles.btnAgregar} onClick={agregarFamiliar}>
                  + Agregar Familiar
                </button>
              </div>

              <div style={styles.formButtons}>
                <button type="button" style={styles.btnSubmit} onClick={() => setSeccionActiva(2)}>
                  Siguiente →
                </button>
              </div>
            </div>
          )}

          {seccionActiva === 2 && (
            <div>
              <h3 style={{ color: '#005eff', marginBottom: '20px' }}>Datos Escolares y Médicos</h3>

              <div style={styles.formGroup}>
                <label style={styles.label}>Jardín:</label>
                <textarea
                  style={styles.textarea}
                  name="jardin"
                  value={formData.jardin}
                  onChange={handleChange}
                  placeholder="Historia escolar en el jardín"
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Primaria:</label>
                <textarea
                  style={styles.textarea}
                  name="primaria"
                  value={formData.primaria}
                  onChange={handleChange}
                  placeholder="Historia escolar en primaria"
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Área preferida:</label>
                <input
                  style={styles.input}
                  type="text"
                  name="area_preferida"
                  value={formData.area_preferida}
                  onChange={handleChange}
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Áreas con dificultad:</label>
                <input
                  style={styles.input}
                  type="text"
                  name="area_dificultosa"
                  value={formData.area_dificultosa}
                  onChange={handleChange}
                />
              </div>

              <hr style={{ margin: '30px 0', border: 'none', borderTop: '2px solid #e0e0e0' }} />

              <h3 style={{ color: '#005eff', marginBottom: '20px' }}>Condiciones Médicas y Generales</h3>

              <div style={styles.formGroup}>
                <label style={styles.label}>Condiciones del embarazo:</label>
                <input
                  style={styles.input}
                  type="text"
                  name="embarazo"
                  value={formData.embarazo}
                  onChange={handleChange}
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Parto:</label>
                <input
                  style={styles.input}
                  type="text"
                  name="parto"
                  value={formData.parto}
                  onChange={handleChange}
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Patología perinatal:</label>
                <input
                  style={styles.input}
                  type="text"
                  name="patologia_perinatal"
                  value={formData.patologia_perinatal}
                  onChange={handleChange}
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Elección de la escuela:</label>
                <input
                  style={styles.input}
                  type="text"
                  name="eleccion_escuela"
                  value={formData.eleccion_escuela}
                  onChange={handleChange}
                />
              </div>

              {camposMedicos.map((campo) => (
                <div key={campo.name} style={styles.formGroup}>
                  <label style={styles.label}>{campo.label}</label>
                  <div style={{ display: 'flex', gap: '15px', marginBottom: '10px' }}>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                      <input
                        type="radio"
                        name={campo.name}
                        value="si"
                        checked={formData[campo.name] === "si"}
                        onChange={handleChange}
                      />
                      Sí
                    </label>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                      <input
                        type="radio"
                        name={campo.name}
                        value="no"
                        checked={formData[campo.name] === "no"}
                        onChange={handleChange}
                      />
                      No
                    </label>
                  </div>
                  {formData[campo.name] === "si" && (
                    <div>
                      <label style={styles.label}>{campo.detalleLabel}</label>
                      <input
                        style={styles.input}
                        type="text"
                        name={campo.detalle}
                        value={formData[campo.detalle]}
                        onChange={handleChange}
                      />
                    </div>
                  )}
                </div>
              ))}

              <div style={styles.formGroup}>
                <label style={styles.label}>Observaciones:</label>
                <textarea
                  style={styles.textarea}
                  name="observaciones"
                  rows="4"
                  value={formData.observaciones}
                  onChange={handleChange}
                />
              </div>

              <div style={styles.formButtons}>
                <button type="button" style={styles.btnCancelar} onClick={() => setSeccionActiva(1)}>
                  ← Anterior
                </button>
                <button type="button" style={styles.btnSubmit} onClick={handleSubmit}>
                  Guardar Formulario
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};


export { Inicio, ListaFormularios, FormularioCrear };