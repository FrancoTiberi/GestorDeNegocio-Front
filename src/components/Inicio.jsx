

export default function Inicio() {
    return (
        <div className="container-fluid p-4">
            <h2 className="mb-4">Resumen del Día</h2>
            <div className="row g-4">
                <div className="col-12 col-md-4">
                    <div className="card border-0 shadow-sm">
                        <div className="card-body">
                            <h6 className="card-subtitle mb-2 text-muted">Ventas Totales</h6>
                            <h2 className="card-title fw-bold">$125.400</h2>
                            <span className="badge bg-success bg-opacity-10 text-success">↑ 12% vs ayer</span>
                        </div>
                    </div>
                </div>
                <div className="col-12 col-md-4">
                    <div className="card border-0 shadow-sm">
                        <div className="card-body">
                            <h6 className="card-subtitle mb-2 text-muted">Pedidos</h6>
                            <h2 className="card-title fw-bold">45</h2>
                        </div>
                    </div>
                </div>
                <div className="col-12 col-md-4">
                    <div className="card border-0 shadow-sm">
                        <div className="card-body">
                            <h6 className="card-subtitle mb-2 text-muted">Bajo Stock Producto 1</h6>
                            <h2 className="card-title fw-bold text-danger">3</h2>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
