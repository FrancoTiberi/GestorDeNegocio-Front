import { useState, useEffect } from 'react';
import { obtenerClientes, crearCliente } from '../helpers/clienteApi';

export default function Clientes() {
    const [showModal, setShowModal] = useState(false);
    const [clientesDB, setClientesDB] = useState([]);
    const [datos, setDatos] = useState({
        nombre: '',
        telefono: '',
        email: '',
        comprasTotales: '',
        deuda: ''
    });

    const handleInputChange = (e) => {
        setDatos({
            ...datos,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const nuevoCliente = await crearCliente({
                ...datos,
                comprasTotales: Number(datos.comprasTotales) || 0,
                deuda: Number(datos.deuda) || 0
            });
            setClientesDB([...clientesDB, nuevoCliente]);
            setShowModal(false);
            setDatos({ nombre: '', telefono: '', email: '', comprasTotales: '', deuda: '' });
        } catch (error) {
            console.error("Error al guardar cliente:", error);
            alert("No se pudo guardar el cliente. Verifica la conexión con el servidor.");
        }
    };

    useEffect(() => {
        const cargarClientes = async () => {
            try {
                const { clientes } = await obtenerClientes();
                setClientesDB(clientes || []);
            } catch (error) {
                console.error("Error al cargar clientes:", error);
            }
        };
        cargarClientes();
    }, []);

    return (
        <div className="container-fluid p-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2>Clientes</h2>
                <button className="btn btn-dark btn-sm" onClick={() => setShowModal(true)}>Añadir Cliente</button>
            </div>

            <div className="card border-0 shadow-sm">
                <div className="card-body p-0">
                    <div className="table-responsive">
                        <table className="table table-hover mb-0 align-middle">
                            <thead className="table-light">
                                <tr>
                                    <th>Cliente</th>
                                    <th>Teléfono</th>
                                    <th>Email</th>
                                    <th>Compras Totales</th>
                                    <th>Saldo / Deuda</th>
                                </tr>
                            </thead>
                            <tbody>
                                {clientesDB.length === 0 ? (
                                    <tr>
                                        <td colSpan="5" className="text-center py-4 text-muted">
                                            No hay clientes registrados aún.
                                        </td>
                                    </tr>
                                ) : (
                                    clientesDB.map((item) => (
                                        <tr key={item._id}>
                                            <td className="fw-bold">{item.nombre}</td>
                                            <td>{item.telefono || '-'}</td>
                                            <td className="text-muted">{item.email || '-'}</td>
                                            <td>${item.comprasTotales}</td>
                                            <td>
                                                <span className={`badge ${item.deuda > 0 ? 'bg-danger' : 'bg-success'}`}>
                                                    ${item.deuda}
                                                </span>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Modal para Añadir Cliente */}
            {showModal && (
                <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content border-0 shadow">
                            <div className="modal-header">
                                <h5 className="modal-title">Nuevo Cliente</h5>
                                <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
                            </div>
                            <form onSubmit={handleSubmit}>
                                <div className="modal-body">
                                    <div className="mb-3">
                                        <label className="form-label">Nombre o Razón Social</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="nombre"
                                            value={datos.nombre}
                                            onChange={handleInputChange}
                                            required
                                            placeholder="Ej: Juan Pérez / Kiosco El Sol"
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Teléfono / WhatsApp</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="telefono"
                                            value={datos.telefono}
                                            onChange={handleInputChange}
                                            placeholder="Ej: 1122334455"
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Email</label>
                                        <input
                                            type="email"
                                            className="form-control"
                                            name="email"
                                            value={datos.email}
                                            onChange={handleInputChange}
                                            placeholder="Ej: cliente@correo.com"
                                        />
                                    </div>
                                    <div className="row">
                                        <div className="col-6 mb-3">
                                            <label className="form-label">Compras Totales ($)</label>
                                            <input
                                                type="number"
                                                className="form-control"
                                                name="comprasTotales"
                                                value={datos.comprasTotales}
                                                onChange={handleInputChange}
                                                placeholder="0"
                                            />
                                        </div>
                                        <div className="col-6 mb-3">
                                            <label className="form-label">Saldo Pendiente / Deuda ($)</label>
                                            <input
                                                type="number"
                                                className="form-control"
                                                name="deuda"
                                                value={datos.deuda}
                                                onChange={handleInputChange}
                                                placeholder="0"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary btn-sm" onClick={() => setShowModal(false)}>Cancelar</button>
                                    <button type="submit" className="btn btn-primary btn-sm">Guardar Cliente</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
