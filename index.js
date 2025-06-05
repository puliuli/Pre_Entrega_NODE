console.log("todo OK");

const args = process.argv.slice(2);

/*
//FETCH
fetch("https://fakestoreapi.com/products")
.then ((response) => {
    return response.json();
})
.then((data) => {
    console.log(data, "data");
})
.catch ((error) => {
    console.log(error, "error");
})
.finally (() => {
   console.log("fin"); 
})
*/

//FUNCIONES

function menuPrincipal() {
    console.log("Comandos disponibles:");
    console.log("Seleccione 1: 'Todos los productos'");
    console.log("Seleccione 2: 'Producto especifico. Proporcione <id>'");
    console.log("Seleccione 3: 'Crear nuevo producto'");
    console.log("Seleccione 4: 'Eliminar producto. Proporcione <id>'");
};


async function mostrarTodos(){
try {
    const response = await fetch("https://fakestoreapi.com/products");
    const data = await response.json();
    console.log(data,"async data");
    } catch (error) {
        console.log(error, "async error");
    } finally {
        console.log("async fin");
        
    }
}

async function mostrarPorId(id) {
    if (!id) {
        console.log("Error: Debe proporcionar un ID");
        return;
    }

    try {
        const response = await fetch(`https://fakestoreapi.com/products/${id}`);
        const data = await response.json();
        console.log(data, "async data");
    } catch (error) {
        console.log(error, "Error. Ingrese un id válido");
    } finally {
        console.log("async fin");
    }
}

async function crearNuevo() {
    const producto = { 
        title: 'New Product',
         price: 29.99,
        description: 'producto nuevo',
        category: '',
        image:''
     };
    try {
        const response = await fetch(`https://fakestoreapi.com/products`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(producto)
    });
    const data = await response.json();
    console.log("\nProducto creado exitosamente:");
    console.log(data);
    } catch (error) {
        console.log(error, "Error. Ingrese un id válido");
    } finally {
        console.log("async fin");
    }
}


async function eliminarProd(id) {
    if (!id) {
        console.log("Error: Debe proporcionar un ID");
        return;
    }
    try {
        const response = await fetch(`https://fakestoreapi.com/products/${id}`,
        {method: 'DELETE'

        });
        const data = await response.json();
        console.log(data, "Producto eliminado");
    } catch (error) {
        console.log(error, "Error. Ingrese un id válido");
    } finally {
        console.log("async fin");
    }
}

// Manejo de comandos REST
if (args.length >= 2 && args[0].toUpperCase() === 'GET') {
    const route = args[1];
    
    if (route === 'products') {
        console.log('Obteniendo todos los productos...');
        mostrarTodos();
    } 
    else if (route.startsWith('products/')) {
        const productId = route.split('/')[1];
        console.log(`Obteniendo producto con ID: ${productId}...`);
        mostrarPorId(productId);
    }
    else {
        console.error('Ruta no reconocida. Uso: GET <products|products/id>');
        menuPrincipal();
    }

}

// SCRIPT - ARGUMENTOS / PROCESS
async function manejoMenu() {
        if (args.length === 0) {
        menuPrincipal();
    } else {
        switch (args[0]) {
            case '1':
                console.log("Mostrando todos los productos...");
                mostrarTodos();
                break;

            case '2':
                console.log("Buscando producto específico...");
                if (args[1]) {
                    mostrarPorId(args[1]);
                } else {
                    console.log("Error: Debe proporcionar un ID después del comando 2");
                }
                break;

            case '3':
                console.log("Creando nuevo producto...");
                crearNuevo();
                break;

            case '4':
                console.log("Eliminando producto...");
                if (args[1]) {
                    eliminarProd(args[1]);
                } else {
                    console.log("Error: Debe proporcionar un ID después del comando 4");
                }
                break;

            default:
                console.log("Comando no reconocido");
                menuPrincipal();
                break;
        }
    }    
}



      /** 
if (args.length === 0 ) {
    console.log("Comandos disponibles:");
    console.log("1 : 'Todos los productos'");
    console.log("2 : 'Producto especifico <id>'");
    console.log("3 : 'Crear nuevo producto'");
    console.log("4 : 'Eliminar producto'");
}
else if (args [0] === 'Todos' && args[1] === 'los' && args[2] === 'productos')
    {mostrarTodos();}
else if (args [0] === 'Producto' && args[1] === 'especifico')
    {if (args[2]) {
        mostrarPorId();
    } else { console.log ("Especifica ID");

    }}
else if (args [0] === 'Crear' && args [1] === 'nuevo' && args [2] === 'producto')
    { crearNuevo();}
else if (args [0] === 'Eliminar' && args [1] === 'producto')
    {if (args[2]) {
        eliminarProd(args[2]);
    } else {
        console.log("Especifica ID del producto a eliminar");
    }   
} else {
        console.log("Comando no reconocido");
    }

    */