import { useState, useEffect } from 'react';
import { obtenerProveedores, crearProveedor, eliminarProveedor } from '../helpers/proveedorApi';

export default function Proveedores() {
    const [showModal, setShowModal] = useState(false);
    const [showModalEditBtn, setShowModalEditBtn] = useState(false);
    const [proveedoresDB, setProveedoresDB] = useState([]);
    const [datos, setDatos] = useState({
        proveedor: '',
        producto: '',
        categoria: '',
        cantidad: '',
        total: ''
    });

    const eliminarProveedorbtn = async (id) => {
        await eliminarProveedor(id);
        setProveedoresDB(proveedoresDB.filter((proveedor) => proveedor._id !== id));
    }

    function handleInputChange(e) {
        setDatos({
            ...datos,
            [e.target.name]: e.target.value
        });
    };

    async function handleSubmit(e) {
        e.preventDefault();
        const nuevoProveedor = await crearProveedor(datos);
        setProveedoresDB([...proveedoresDB, nuevoProveedor]);
        setShowModal(false);
        setDatos({ proveedor: '', producto: '', categoria: '', cantidad: '', total: '' });
    };

    useEffect(() => {
        const cargarProveedores = async () => {
            const { proveedores } = await obtenerProveedores();
            setProveedoresDB(proveedores || []);
        };
        cargarProveedores();
    }, []);

    return (
        <div className="container-fluid p-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2>Proveedores</h2>
                <button className="btn btn-dark btn-sm" onClick={() => setShowModal(true)}>Añadir Proveedor</button>
            </div>

            <div className="card border-0 shadow-sm">
                <div className="card-body p-0">
                    <div className="table-responsive">
                        <table className="table table-hover mb-0 align-middle">
                            <thead className="table-light">
                                <tr>
                                    <th>Proveedor</th>
                                    <th>Producto</th>
                                    <th>Categoría</th>
                                    <th>Cantidad Comprada</th>
                                    <th>Total Pagado</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {proveedoresDB.map((item) => (
                                    <tr key={item._id}>
                                        <td className="fw-bold">{item.proveedor}</td>
                                        <td>{item.producto}</td>
                                        <td className="text-muted">{item.categoria}</td>
                                        <td>{item.cantidad}</td>
                                        <td>${item.total}</td>
                                        <td>
                                            <button className="btn btn-sm bg-primary text-white" onClick={() => setShowModalEditBtn(true)}>Editar</button>
                                            <button className="btn btn-sm bg-danger text-white ms-2" onClick={() => eliminarProveedorbtn(item._id)}>Eliminar</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {showModal && (
                <div className="modal d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content border-0 shadow">
                            <div className="modal-header border-bottom">
                                <h5 className="modal-title fw-bold">Añadir Info de Proveedor</h5>
                                <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
                            </div>
                            <form onSubmit={handleSubmit}>
                                <div className="modal-body p-4">
                                    <div className="mb-3">
                                        <label className="form-label text-muted small fw-bold">Proveedor</label>
                                        <input type="text" className="form-control" name="proveedor" value={datos.proveedor} onChange={handleInputChange} placeholder="Ej. Distribuidora Sur" />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label text-muted small fw-bold">Nombre del Producto</label>
                                        <input type="text" className="form-control" name="producto" value={datos.producto} onChange={handleInputChange} placeholder="Ej. Coca Cola 1.5L" />
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
                                            <label className="form-label text-muted small fw-bold">Cantidad Comprada</label>
                                            <input type="number" className="form-control" name="cantidad" value={datos.cantidad} onChange={handleInputChange} placeholder="0" />
                                        </div>
                                        <div className="col-md-6">
                                            <label className="form-label text-muted small fw-bold">Total Pagado</label>
                                            <div className="input-group">
                                                <span className="input-group-text bg-light border-end-0">$</span>
                                                <input type="number" className="form-control border-start-0" name="total" value={datos.total} onChange={handleInputChange} placeholder="0.00" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="modal-footer border-top-0 pt-0 p-4">
                                    <button type="button" className="btn btn-light" onClick={() => setShowModal(false)}>Cancelar</button>
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
                                <h5 className="modal-title fw-bold">Editar Proveedor</h5>
                                <button type="button" className="btn-close" onClick={() => setShowModalEditBtn(false)}></button>
                            </div>
                            <form onSubmit={handleSubmit}>
                                <div className="modal-body p-4">
                                    <div className="mb-3">
                                        <label className="form-label text-muted small fw-bold">Proveedor</label>
                                        <input type="text" className="form-control" name='proveedor' value={datos.proveedor} onChange={handleInputChange} />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label text-muted small fw-bold">Nombre del Producto</label>
                                        <input type="text" className="form-control" name='producto' value={datos.producto} onChange={handleInputChange} />
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
                                            <label className="form-label text-muted small fw-bold">Cantidad Comprada</label>
                                            <div className="input-group">
                                                <input type="number" className="form-control" name='cantidad' value={datos.cantidad} onChange={handleInputChange} />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <label className="form-label text-muted small fw-bold">Total Pagado</label>
                                            <div className="input-group">
                                                <span className="input-group-text bg-light border-end-0">$</span>
                                                <input type="number" className="form-control border-start-0" name='total' value={datos.total} onChange={handleInputChange} />
                                            </div>
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
    );
}
