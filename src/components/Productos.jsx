import { Search } from "lucide-react"
import { useEffect, useState } from "react"
import { obtenerProductos } from "../helpers/productoApi"

export default function Productos() {
    const [productosDB, setProductosDB] = useState([]);
    const [carrito, setCarrito] = useState([]);

    function agregarAlCarrito(producto) {
        const existe = carrito.find((p) => p._id === producto._id);
        if (existe) {
            setCarrito(carrito.map((p) =>
                p._id === producto._id ? { ...p, cantidad: p.cantidad + 1 } : p
            )
            );
        } else {
            setCarrito([...carrito, { ...producto, cantidad: 1 }]);
        }
    }

    function eliminarDelCarrito(id) {
        const item = carrito.find((p) => p._id === id);
        if (!item) return;
        if (item.cantidad > 1) {
            setCarrito(
                carrito.map((p) =>
                    p._id === id ? { ...p, cantidad: p.cantidad - 1 } : p
                )
            );
        } else {
            setCarrito(carrito.filter((p) => p._id !== id));
        }
    }

    useEffect(() => {
        const cargarProductos = async () => {
            const data = await obtenerProductos()
            setProductosDB(data.productos)
        }
        cargarProductos()
    }, [])

    return (
        <div className="container-fluid p-3 h-100">
            <div className="row h-100 g-3">
                <div className="col-12 col-md-8 h-100">
                    <div className="card border-0 shadow-sm h-100">
                        <div className="card-header border-bottom-0 pt-3">
                            <div className="input-group">
                                <span className="input-group-text bg-light border-end-0">
                                    <Search size={18} />
                                </span>
                                <input type="text" className="form-control bg-light border-start-0" placeholder="Buscar producto..." />
                            </div>
                        </div>
                        <div className="card-body overflow-auto">
                            <div className="row g-3">
                                {productosDB.map((producto) => (
                                    <div key={producto._id} className="col-4 col-lg-3" onClick={() => agregarAlCarrito(producto)}>
                                        <div className="card h-100 cursor-pointer hover-shadow border">
                                            <div className="card-body text-center p-2">
                                                <div className="bg-light rounded mb-2" style={{ height: '80px' }}></div>
                                                <h6 className="card-title font-size-sm mb-1">{producto.nombre}</h6>
                                                <p className="card-text text-primary fw-bold">${producto.precio}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-12 col-md-4 h-100">
                    <div className="card border-0 shadow-sm h-100 d-flex flex-column">
                        <div className="card-header bg-white font-weight-bold">
                            <h5 className="mb-0">Carrito</h5>
                        </div>
                        <div>
                            {carrito.map((producto) => (
                                <div key={producto._id} className="d-flex align-items-center mb-2 p-2 bg-light rounded border">
                                    <span className="mb-0 text-truncate flex-grow-1 me-2" title={producto.nombre}>
                                        {producto.nombre}
                                    </span>
                                    {producto.cantidad > 1 && (
                                        <span className="badge bg-secondary me-2 flex-shrink-0">x{producto.cantidad}</span>
                                    )}
                                    <p className="mb-0 fw-semibold text-end me-3 flex-shrink-0" style={{ minWidth: '70px' }}>
                                        ${producto.precio * producto.cantidad}
                                    </p>
                                    <button className="btn btn-danger btn-sm flex-shrink-0" onClick={() => eliminarDelCarrito(producto._id)}>Eliminar</button>
                                </div>
                            ))}
                            {console.log(carrito)}
                        </div>
                        <div className="card-footer bg-white border-top-0 p-3">
                            <div className="d-flex justify-content-between mb-3">
                                <span className="h4">Total:</span>
                                <span className="h4 fw-bold">{carrito.reduce((total, producto) => total + (producto.precio * producto.cantidad), 0)}</span>
                            </div>
                            <button className="btn btn-primary w-100 py-2 fw-bold">COBRAR</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
