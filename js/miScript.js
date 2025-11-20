let movimientos=JSON.parse(localStorage.getItem("movimientos")) || [];

document.getElementById('btnAhorro').addEventListener("click", registrarAhorro);
document.getElementById('btnRetiro').addEventListener("click", registrarRetiro);

function registrarAhorro(e){
    e.preventDefault();

    const seleccion = document.querySelector('input[name="monto"]:checked');
    const cantidad =parseInt(seleccion.value);

    if(!seleccion){
        alert("Selecciona una cantidad para ahorrar");
        return;
    }

    movimientos.push({
        tipo:"Ahorro",
        cantidad: cantidad
    });

    mostrarMovimientos();
    guardarDatos();

    //Deselecciona el radio, para que vuelva a su inicio y maque una opcion nueva
    seleccion.checked=false;
}

function registrarRetiro(e){
    e.preventDefault();

    const input =document.getElementById('cantidadRetirada').value.trim();
    const cantidad =parseInt(input);

    if(!input || !cantidad || cantidad<=0){
        alert("Ingresa una cantidad válida para retirar dinero")
        return;
    }

    const saldo=calcularTotal();

    if(cantidad > saldo){
        alert("Saldo insuficiente. No puedes retirar más dinero del que tienes")
        return;
    }

    movimientos.push({
        tipo:"Retiro",
        cantidad: cantidad
    });

    mostrarMovimientos();
    guardarDatos();

    //Para limpiar el campo
    document.getElementById("cantidadRetirada").value="";
}

function mostrarMovimientos(){
    const contador =document.getElementById('listadeMovimientos');
    const totalDatos =document.getElementById("totalRegistrado");

    if(movimientos.length === 0){
        contador.innerHTML ='<p>No hay ningun movimiento realizado<p>';
        totalDatos.textContent='$0';
        return;
    }

    let tabla=`<table border=1>
    <tr>
        <th>Tipo</th>
        <th>Cantidad</th>
    </tr>`;

    for(let i = 0; i < movimientos.length; i++){
        tabla += `<tr>
            <td>${movimientos[i].tipo}</td>
            <td>${movimientos[i].cantidad}</td>
        </tr>`;
    }

    tabla += `</table>`;
    contador.innerHTML =tabla;

    totalDatos.textContent ="$" + calcularTotal();
}

function calcularTotal(){
    let total = 0;

    for(let i = 0; i < movimientos.length; i++){
        if(movimientos[i].tipo === "Ahorro"){
            total += movimientos[i].cantidad;
        } else {
            total -= movimientos[i].cantidad;
        }
    }
    return total;
}

function guardarDatos(){
    localStorage.setItem("movimientos",JSON.stringify(movimientos));
}

document.addEventListener('DOMContentLoaded', mostrarMovimientos);