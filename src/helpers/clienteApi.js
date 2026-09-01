const url = "http://localhost:4000/api/clientes"

export const obtenerClientes = async () => {
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
        console.log(error);
        throw new Error("No se pudo conectar con el backend");
    }
}

export const crearCliente = async (cliente) => {
    try {
        const resp = await fetch(url, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(cliente)
        });

        const data = await resp.json();

        return data;
    } catch (error) {
        console.log(error);
        throw new Error("No se pudo conectar con el backend");
    }
}
