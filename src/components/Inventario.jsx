import { useState, useEffect } from 'react';
import { obtenerProductos, crearProducto, eliminarProducto } from '../helpers/productoApi';

export default function Inventario() {
    const [showModalAgregarBtn, setShowModalAgregarBtn] = useState(false);
    const [showModalEditBtn, setShowModalEditBtn] = useState(false);
    const [productosDB, setProductosDB] = useState([]);
    const [datos, setDatos] = useState({
        nombre: '',
        categoria: '',
        precio: '',
        stock: ''
    });

    const eliminarProductobtn = async (id) => {
        await eliminarProducto(id);
        setProductosDB(productosDB.filter((producto) => producto._id !== id));
    }

    const handleInputChange = (e) => {
        setDatos({
            ...datos,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const producto = await crearProducto(datos);
        setProductosDB([...productosDB, producto]);
        setShowModalAgregarBtn(false);
        setDatos({
            nombre: '',
            categoria: '',
            precio: '',
            stock: ''
        });
    };

    useEffect(() => {
        const cargarProductos = async () => {
            const { productos } = await obtenerProductos();
            setProductosDB(productos);
        };
        cargarProductos();
    }, []);

    return (
        <div className="container-fluid p-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2>Inventario</h2>
                <button className="btn btn-dark btn-sm" onClick={() => setShowModalAgregarBtn(true)}>Agregar Producto</button>
            </div>
            <div className="card border-0 shadow-sm">
                <div className="card-body p-0">
                    <div className="table-responsive">
                        <table className="table table-hover mb-0 align-middle">
                            <thead className="table-light">
                                <tr>
                                    <th>Producto</th>
                                    <th>Categoría</th>
                                    <th>Stock</th>
                                    <th>Precio</th>
                                    <th>Estado</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {productosDB.map((producto) => (
                                    <tr key={producto._id}>
                                        <td>{producto.nombre}</td>
                                        <td>{producto.categoria}</td>
                                        <td>{producto.stock}</td>
                                        <td>${producto.precio}</td>
                                        <td>{producto.estado ? 'Activo' : 'Inactivo'}</td>
                                        <td>
                                            <button type="button" className='btn btn-sm bg-primary text-white' onClick={() => setShowModalEditBtn(true)}>Editar</button>
                                            <button type="button" className='btn btn-sm bg-danger text-white ms-2' onClick={() => eliminarProductobtn(producto._id)}>Eliminar</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {showModalAgregarBtn && (
                <div className="modal d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content border-0 shadow">
                            <div className="modal-header border-bottom">
                                <h5 className="modal-title fw-bold">Nuevo Producto</h5>
                                <button type="button" className="btn-close" onClick={() => setShowModalAgregarBtn(false)}></button>
                            </div>
                            <form onSubmit={handleSubmit}>
                                <div className="modal-body p-4">
                                    <div className="mb-3">
                                        <label className="form-label text-muted small fw-bold">Nombre del Producto</label>
                                        <input type="text" className="form-control" name="nombre" value={datos.nombre} onChange={handleInputChange} placeholder="Ej. Coca Cola 1.5L" />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label text-muted small fw-bold">Categoría</label>
                                        <select className="form-select" name="categoria" value={datos.categoria} onChange={handleInputChange}>
                                            <option value="">Seleccione...</option>
                                            <option>Bebidas</option>
                                            <option>Alimentos</option>
                                            <option>Limpieza</option>
                                            <option>Otros</option>
                                        </select>
                                    </div>
                                    <div className="row g-3">
                                        <div className="col-md-6">
                                            <label className="form-label text-muted small fw-bold">Precio</label>
                                            <div className="input-group">
                                                <span className="input-group-text bg-light border-end-0">$</span>
                                                <input type="number" className="form-control border-start-0" name="precio" value={datos.precio} onChange={handleInputChange} placeholder="0.00" />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <label className="form-label text-muted small fw-bold">Stock Inicial</label>
                                            <input type="number" className="form-control" name="stock" value={datos.stock} onChange={handleInputChange} placeholder="0" />
                                        </div>
                                    </div>
                                </div>
                                <div className="modal-footer border-top-0 pt-0 p-4">
                                    <button type="button" className="btn btn-light" onClick={() => setShowModalAgregarBtn(false)}>Cancelar</button>
                                    <button type="submit" className="btn btn-primary px-4">Guardar</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}

            {showModalEditBtn && (
                <div className="modal d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content border-0 shadow">
                            <div className="modal-header border-bottom">
                                <h5 className="modal-title fw-bold">Editar Producto</h5>
                                <button type="button" className="btn-close" onClick={() => setShowModalEditBtn(false)}></button>
                            </div>
                            <form onSubmit={handleSubmit}>
                                <div className="modal-body p-4">
                                    <div className="mb-3">
                                        <label className="form-label text-muted small fw-bold">Nombre del Producto</label>
                                        <input type="text" className="form-control" name='nombre' value={datos.nombre} onChange={handleInputChange} />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label text-muted small fw-bold">Categoría</label>
                                        <select className="form-select" name='categoria' value={datos.categoria} onChange={handleInputChange}>
                                            <option>Bebidas</option>
                                            <option>Alimentos</option>
                                            <option>Limpieza</option>
                                            <option>Otros</option>
                                        </select>
                                    </div>
                                    <div className="row g-3">
                                        <div className="col-md-6">
                                            <label className="form-label text-muted small fw-bold">Precio</label>
                                            <div className="input-group">
                                                <span className="input-group-text bg-light border-end-0">$</span>
                                                <input type="number" className="form-control border-start-0" name='precio' value={datos.precio} onChange={handleInputChange} />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <label className="form-label text-muted small fw-bold">Stock</label>
                                            <input type="number" className="form-control" name='stock' value={datos.stock} onChange={handleInputChange} />
                                        </div>
                                    </div>
                                </div>
                                <div className="modal-footer border-top-0 pt-0 p-4">
                                    <button type="button" className="btn btn-light" onClick={() => setShowModalEditBtn(false)}>Cancelar</button>
                                    <button type="submit" className="btn btn-primary px-4">Guardar</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
