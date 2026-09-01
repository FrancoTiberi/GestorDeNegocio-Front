const url = "http://localhost:4000/api/productos"

export const obtenerProductos = async (limite = 0, desde = 0) => {
    try {
        const resp = await fetch(url + '?limite=' + limite + '&desde=' + desde, {
            method: 'GET',
            headers: {
                'content-type': 'application/json'
            }
        });

        const data = await resp.json();

        return data;
    } catch (error) {
        console.log(error)
        return { productos: [], msg: "No se puedo conectar con el backend" }
    }
}

export const obtenerProducto = async (id) => {
    try {
        const resp = await fetch(url + '/' + id, {
            method: 'GET',
            headers: {
                'content-type': 'application/json'
            }
        });

        const data = await resp.json();

        return data;
    } catch (error) {
        console.log(error)
        return { producto: {}, msg: "No se puedo conectar con el backend" }
    }
}

export const crearProducto = async (producto) => {
    try {
        const resp = await fetch(url, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(producto)
        });

        const data = await resp.json();

        return data;
    } catch (error) {
        console.log(error)
        throw new Error("No se puedo conectar con el backend");
    }
}

export const actualizarProducto = async (id, producto) => {
    try {
        const resp = await fetch(url + '/' + id, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(producto)
        });

        const data = await resp.json();

        return data;
    } catch (error) {
        console.log(error)
        throw new Error("No se puedo conectar con el backend");
    }
}

export const eliminarProducto = async (id) => {
    try {
        const resp = await fetch(url + '/' + id, {
            method: 'DELETE',
            headers: {
                'content-type': 'application/json'
            }
        });

        const data = await resp.json();

        return data;
    } catch (error) {
        console.log(error)
        throw new Error("No se puedo conectar con el backend");
    }
}

