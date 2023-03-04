//Base de datos -- simulada mediante un array como documento tipo json
const baseDato = [
    {
        id: 1,
        nombre: 'Renova lápiz delineador para ojos Khol HD 1.1 g',
        precio: 16.00,
        img: 'Images/O1.png' 
    },
    {
        id: 2,
        nombre: 'Esika suero de ojos reduce ojeras y bolsas 15 ml',
        precio: 59.00,
        img: 'Images/O2.png'
      },
     {
        id: 3,
        nombre: 'Delineador de ojos color negro Mary Kay 4.5 ml',
         precio: 25.00,
         img: 'Images/O3.png'
    },
      {
        id: 4,
        nombre: 'Crema antiarrujas contorno para ojos Retinol y colágeno 60 ml',
          precio: 115.00,
          img: 'Images/O4.png'
    },
      {
        id: 5,
        nombre: 'LABEL set crema antiarrugas de ojos ácido hialurónico 30 ml',
          precio: 89.00,
          img: 'Images/O5.png'
    },
      {
        id: 6,
        nombre: 'Cosmic Glam paleta de sombras 20 colores glitter 10 g',
          precio: 169.00,
          img: 'Images/O6.png'
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