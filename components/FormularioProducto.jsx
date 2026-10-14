'use client'; 
import { useState } from 'react'; // ya no necesitas useEffect 
import axios from 'axios'; 
// Componente interno: recibe los datos directamente en el estado inicial 
function FormularioInner({ productoEditar, onGuardar, onCancelar }) { 
const [form, setForm] = useState({ 
nombre: productoEditar?.nombre ?? '', 
precio: productoEditar?.precio ? String(productoEditar.precio) : '', 
stock: productoEditar?.stock ? String(productoEditar.stock) : '', 
}); 
function handleChange(e) { 
const { name, value } = e.target; 
setForm(prev => ({ ...prev, [name]: value })); 
} 
async function manejarEnvio(e) { 
e.preventDefault(); 
const datos = { 
nombre: form.nombre, 
precio: Number(form.precio), 
stock: Number(form.stock), 
}; 
 
if (productoEditar) { 
await axios.put('/API/Productos/' + productoEditar.id, datos); 
} else { 
await axios.post('/API/Productos', datos); 
} 
onGuardar(); 
} 
 
return ( 
<form onSubmit={manejarEnvio} style={{ border: '1px solid #ccc', padding: '1rem', marginBottom: '2rem' }}> 
<h2>{productoEditar ? 'Editar Producto' : 'Agregar Producto'}</h2>
<div> 
<label>Nombre: 
<input name='nombre' value={form.nombre} onChange={handleChange} required /> 
</label> 
</div> 
<div> 
<label>Precio: 
<input name='precio' type='number' value={form.precio} onChange={handleChange} required /> 
</label> 
</div> 
<div> 
<label>Stock: 
<input name='stock' type='number' value={form.stock} onChange={handleChange} /> 
</label> 
</div> 
<button type='submit'> 
{productoEditar ? 'Guardar cambios' : 'Agregar'} 
</button> 
{productoEditar && ( 
<button type='button' onClick={onCancelar}>Cancelar</button> 
)} 
</form> 
); 
} 
// Wrapper: la prop 'key' hace que React destruya y recree 
// FormularioInner cada vez que cambia el ID del producto. 
// Cuando key cambia -> desmonta el componente -> nuevo estado limpio. 
export default function FormularioProducto(props) { 
return ( 
<FormularioInner 
key={props.productoEditar?.id ?? 'nuevo'} 
{...props} 
/> 
); 
}
