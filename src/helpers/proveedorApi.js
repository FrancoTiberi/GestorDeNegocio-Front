const url = "http://localhost:4000/api/proveedores"

export const obtenerProveedores = async () => {
    try {
        const resp = await fetch(url, {
            method: 'GET',
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

export const crearProveedor = async (proveedor) => {
    try {
        const resp = await fetch(url, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(proveedor)
        });

        const data = await resp.json();

        return data;
    } catch (error) {
        console.log(error)
        throw new Error("No se puedo conectar con el backend");
    }
}

export const eliminarProveedor = async (id) => {
    try {
        const resp = await fetch(url + '/' + id, {
            method: 'DELETE',
            headers: {
                'content-type': 'application/json'
            },

        });

        const data = resp.json();

        return data;
    } catch (error) {
        console.log(error)
        throw new Error("No se puedo conectar con el backend");
    }
}
