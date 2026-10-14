export default function ProductoCard({ producto, onEditar, onEliminar }) { 
return ( 
<div style={{ border: '1px solid #ddd', padding: '1rem', marginBottom: '0.5rem', display: 'flex', justifyContent: 'space-between' }}> 
<div> 
<strong>{producto.nombre}</strong> 
<span> | Precio: ${producto.precio.toLocaleString()}</span> 
<span> | Stock: {producto.stock} unidades</span> 
</div> 
<div> 
<button onClick={onEditar} style={{ marginRight: '0.5rem' }}>Editar</button> 
<button onClick={onEliminar} style={{ color: 'red' }}>Eliminar</button> 
</div> 
</div> 
); 
}
