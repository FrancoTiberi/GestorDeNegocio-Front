import React from 'react'

export const prueba = () => {

  // const agregarAlCarrito = (comida) => {
  //     if (comida.stock === 0) return;
  //     setCarrito((prev) => {
  //         const itemExistente = prev.find((item) => item._id === comida._id);
  //         if (itemExistente) {
  //             return prev.map((item) =>
  //                 item._id === comida._id
  //                     ? { ...item, cantidad: item.cantidad + 1 }
  //                     : item
  //             );
  //         }
  //         return [...prev, { ...comida, cantidad: 1 }];
  //     });
  //     setMostrarCarrito(true);
  // };

  const agregarAlCarrito = (comida) => {
    if (comida.stock === 0) return;
    const itemExistente = carrito.find((item) => item._id === comida._id);

    if (itemExistente && itemExistente.cantidad >= comida.stock) {
      alert(`Lo sentimos, solo hay ${comida.stock} unidades disponibles en stock.`);
      return;
    }

    setCarrito((prev) => {
      const itemPrev = prev.find((item) => item._id === comida._id);
      if (itemPrev) {
        return prev.map((item) =>
          item._id === comida._id
            ? { ...item, cantidad: item.cantidad + 1 }
            : item
        );
      }
      return [...prev, { ...comida, cantidad: 1 }];
    });
    setMostrarCarrito(true);
  };

  const disminuirCantidad = (id) => {
    setCarrito((prev) =>
      prev
        .map((item) =>
          item._id === id ? { ...item, cantidad: item.cantidad - 1 } : item
        )
        .filter((item) => item.cantidad > 0)
    );
  };

  const eliminarDelCarrito = (id) => {
    setCarrito((prev) => prev.filter((item) => item._id !== id));
  };

  const total = carrito.reduce(
    (acc, item) => acc + item.precio * item.cantidad, 0
  );

  const confirmarPedido = () => {
    if (!user) {
      alert("Debes iniciar sesión para confirmar el pedido.");
      setShowLoginModal(true);
      return;
    }
    navigate('/pago-tienda', {
      state: {
        carrito,
        total,
        esComida: true
      }
    });
  };

  return (
    <div>prueba</div>
  )
}
