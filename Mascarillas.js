//Base de datos -- simulada mediante un array como documento tipo json
const baseDato = [
    {
        id: 1,
        nombre: 'MABREM máscara antienvejecimiento hidrata y suaviza piel acción antiarrugas 35 g',
        precio: 101.00,
        img: 'Images/M1.png' 
    },
    {
        id: 2,
        nombre: 'Freeman mascarilla facial de pepino renovadora 175 ml',
        precio: 99.00,
        img: 'Images/M2.png'
      },
     {
        id: 3,
        nombre: 'Acala Skin mascarilla de arcilla con vitamina E desintoxica y purifica la piel ingredientes naturales 120 g',
         precio: 139.00,
         img: 'Images/M3.jpg'
    },
      {
        id: 4,
        nombre: 'Quotidien mascarilla facial refrescante e hidratante kaolín y bentonita 50 g',
          precio: 97.00,
          img: 'Images/M4.png'
    },
      {
        id: 5,
        nombre: 'Garnier Fresh-Mix C Shot mascarilla con vitamina C 33 g',
          precio: 25.00,
          img: 'Images/M5.jpg'
    },
      {
        id: 6,
        nombre: 'Mascarilla facial Detox Árbol Verde con propiedades antioxidantes aloe vera y manzanilla 50 ml',
          precio: 169.00,
          img: 'Images/M6.jpg'
    }
]

let carrito = []
const domItems = document.querySelector('#item')
const domCarrito = document.querySelector('#carrito')
const domTotal = document.getElementById('total')
const domBotonVaciar = document.getElementById('botonVaciar')

function renderizarProductos() {
    baseDato.forEach((info) => {
        //Creamos la estructura del main 
        //creamos la card que es un div con class card
        const cardProducto = document.createElement('div')
        cardProducto.classList.add('card', 'col-sm-4')

        //Creamos el body de la card
        const cardBody = document.createElement('div')
        cardBody.classList.add('card-body')

        //Creamos el title de la card
        const cardTitle = document.createElement('h5')
        cardTitle.classList.add('card-title')
        cardTitle.textContent = info.nombre

        //Creamos la imagen de la card
        const cardImages = document.createElement('img')
        cardImages.classList.add('img-fluid')
        cardImages.setAttribute('src', `${info.img}`) 

        //Precio el elemento para el precio del producto
        const cardPrecio = document.createElement('p')
        cardPrecio.textContent = `$${info.precio}`

        // Crear el botón 
        const btnAgregar = document.createElement('button')
        btnAgregar.textContent = "+"
        btnAgregar.classList.add('btn', 'btn-primary')
        btnAgregar.addEventListener('click', agregarProductoAlCarrito)
        btnAgregar.setAttribute('marcador', info.id)

        //Agregamos los elementos al contenedor mail con appendChild
        cardBody.appendChild(cardTitle)
        cardBody.appendChild(cardImages)
        cardBody.appendChild(cardPrecio)
        cardBody.appendChild(btnAgregar)
        cardProducto.appendChild(cardBody)
        domItems.appendChild(cardProducto)
    })
}

/*
//Creamos la estructura del main 
*/

//crear función para añadir producto desde un Array por medio del id de producto
function agregarProductoAlCarrito(evento) {
    carrito.push(evento.target.getAttribute('marcador'))
    renderizarCarrito()
}

//Crear funciones para dar funcionalidad a los botones de agregar y vaciar
function renderizarCarrito() {
    //vaciar carrito aunque no tenga nada
    domCarrito.textContent = ''
    //AQUI VA HABER MAS LINEAS DE CODIGO PARA USO DE BASE DE DATOS ******
    const carritoNoDuplicados = [... new Set(carrito)]

    carritoNoDuplicados.forEach((item) =>{
        const miItem = baseDato.filter((itemBaseDatos) => {
            return itemBaseDatos.id === parseInt(item);
        })
        const numeroUnidadesItem = carrito.reduce((total, itemId) => {
            return itemId === item ? total += 1 : total 
        },0)

        //Crea un li
        const nuevoNodo = document.createElement('li')
        //Agregamos estilo 
        nuevoNodo.classList.add('list-group-item', 'text-end')
        //Agregamos contenido
        nuevoNodo.textContent = `${miItem[0].nombre} x ${numeroUnidadesItem} - $${miItem[0].precio}`

        //Agregar boton para eliminar producto del carrito
        const btnEliminar = document.createElement('button')
        //Agregamos estilo al boton (rojo)
        btnEliminar.classList.add('btn', 'btn-danger')
        btnEliminar.textContent = 'X'
        btnEliminar.dataset.item = item
        //NOTA-- QUITAR ESTO CUANDO FUNCIONE CON LA BASE DE DATOS
        btnEliminar.addEventListener('click', eliminarProductoCarrito)

        //Hacemos appendChild de los elementos
        nuevoNodo.appendChild(btnEliminar)
        domCarrito.appendChild(nuevoNodo)
    })
    domTotal.textContent = calcularTotales()
}

//crear función para vaciar el carrito
function vaciarCarrito() {
    //Esto unicamente limpia el contenido de la UL
    domCarrito.textContent = ''
    //Vaciar el array carrito o lo limpiamos
    carrito = []
    renderizarCarrito()
}

//Crear función para eliminar producto del carrito (no del contador)
function eliminarProductoCarrito(evento) {
    const id = evento.target.dataset.item
//eliminamos el producto del array
    carrito = carrito.filter((carritoId) => {
        return carritoId != id
    })
    renderizarCarrito() 
}
//función para calcular el total a pagar por todos los productos agregados al carrito
function calcularTotales() {
//recorrer el carrito
    return carrito.reduce((total, item) => {
        const NewItem = baseDato.filter((itemBaseDato) => {
            return itemBaseDato.id === parseInt(item)            
        })
        return total + NewItem[0].precio  
    },0)
} 


domBotonVaciar.addEventListener('click', vaciarCarrito)

renderizarProductos()