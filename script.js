class Juego {
    constructor(id, foto, nombre, precio) {
        this.id = id;
        this.foto = foto;
        this.nombre  = nombre.toUpperCase();
        this.precio  = precio;
    }
    sumaIva() {
        this.precio = this.precio * 1.21;
    }
}
const juegos = [];
juegos.push(new Juego(1,"../imagenes/godofwar.png","God Of War Standar", 4900));
juegos.push(new Juego(2,"../imagenes/fifa23.png","Fifa 23 Standard", 23000));
juegos.push(new Juego(3,"../imagenes/gta-v.jpg","GTA V Premium Edition", 9000));
juegos.push(new Juego(4,"../imagenes/thelastofus.jpg","The Last of Us Remastered", 4700))
juegos.push(new Juego(5,"../imagenes/reddead2.jpg","Red Dead Redemption 2", 7400))
juegos.push(new Juego(6,"../imagenes/residentevil2.jpg","Resident Evil 2 Remake",7150))
for (const juego of juegos){
    juego.sumaIva();
}
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
let totalCarrito;
let finalizarCompra = document.getElementById("finalizar")
let contenedor = document.getElementById("misjuegos");
if(carrito.length != 0){
    console.log("Recuperando carro")
    dibujarTabla();
}

function dibujarTabla(){
    for(const juego of carrito){
        document.getElementById("tablabody").innerHTML += `
        <tr>
            <td>${juego.id}</td>
            <td>${juego.nombre}</td>
            <td>${juego.precio}</td>
        </tr>
    `;
    }
    totalCarrito = carrito.reduce((acumulador,juego)=> acumulador + juego.precio,0);
    let infoTotal = document.getElementById("total");
    infoTotal.innerText="Total a pagar $: "+totalCarrito;
}

function renderizarProds(){
    for(const juego of juegos){
        contenedor.innerHTML += `
            <div class="card col-sm-2" data-aos="zoom-in">
                <img src=${juego.foto} class="card-img-top foto" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${juego.id}</h5>
                    <p class="card-text">${juego.nombre}</p>
                    <p class="card-text">$ ${juego.precio}</p>
                    <button id="btn${juego.id}" class="btn btn-danger">Comprar</button>
                </div>
            </div>
        `;
    }

    juegos.forEach(juego => {
        document.getElementById(`btn${juego.id}`).addEventListener("click",function(){
            agregarAlCarrito(juego);
        });
    })
}

renderizarProds();

function agregarAlCarrito(juegoComprado){
    carrito.push(juegoComprado);
    Swal.fire({
        title: juegoComprado.nombre,
        text: 'Agregado al carrito',
        imageUrl: juegoComprado.foto,
        imageWidth: 400,
        imageHeight: 200,
        imageAlt: 'Custom image',
    })
    document.getElementById("tablabody").innerHTML += `
        <tr>
            <td>${juegoComprado.id}</td>
            <td>${juegoComprado.nombre}</td>
            <td>${juegoComprado.precio}</td>
        </tr>
    `;
    totalCarrito = carrito.reduce((acumulador,juego)=> acumulador + juego.precio,0);
    let infoTotal = document.getElementById("total");
    infoTotal.innerText="Total a pagar $: "+totalCarrito;
    localStorage.setItem("carrito",JSON.stringify(carrito));
}

finalizarCompra.onclick = () =>{
    document.getElementById("tablabody").innerHTML ="";
    let infoTotal = document.getElementById("total");
    infoTotal.innerText="Total a pagar $: ";
    const Toast = Swal.mixin({
        toast: true,
        position: 'top-right',
        iconColor: 'white',
        customClass: {
        popup: 'colored-toast'
        },
        showConfirmButton: false,
        timer: 1500,
        timerProgressBar: true
    })
    Toast.fire({
        icon: 'success',
        title: 'Success'
    })
    localStorage.removeItem("carrito");}
