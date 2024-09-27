document.addEventListener("DOMContentLoaded", () => {
    const accidenteForm = document.getElementById("accidenteForm");
    const accidenteList = document.getElementById("accidenteList");
    const totalAccidentes = document.getElementById("totalAccidentes");
    const totalVehiculos = document.getElementById("totalVehiculos");
    const totalMuertos = document.getElementById("totalMuertos");
    const totalHeridos = document.getElementById("totalHeridos");

    function cargarAccidentes() {
        const accidentes = JSON.parse(localStorage.getItem("accidentes")) || [];
        accidenteList.innerHTML = "";
        let muertes = 1, heridos = 2, vehiculos = 2;

        accidentes.forEach((accidente, index) => {
            const li = document.createElement("li");
            li.innerHTML = `
                <strong>${accidente.descripcion}</strong> - ${new Date(accidente.fecha).toLocaleDateString()}
                <button onclick="eliminarAccidente(${index})">Eliminar</button>
                <button onclick="imprimirReporte(${index})">Reporte</button>
            `;
            accidenteList.appendChild(li);
            muertes += accidente.muertos;
            heridos += accidente.heridos;
            vehiculos += accidente.vehiculos;
        });

        totalAccidentes.innerText = accidentes.length;
        totalMuertos.innerText = muertes;
        totalHeridos.innerText = heridos;
        totalVehiculos.innerText = vehiculos;
    }

    accidenteForm.addEventListener("submit", (e) => {
        e.preventDefault();
        
        const nuevoAccidente = {
            fecha: document.getElementById("fecha").value,
            descripcion: document.getElementById("descripcion").value,
            costo: parseFloat(document.getElementById("costo").value),
            muertos: parseInt(document.getElementById("muertos").value),
            heridos: parseInt(document.getElementById("heridos").value),
            vehiculos: parseInt(document.getElementById("vehiculos").value)
        };

        const accidentes = JSON.parse(localStorage.getItem("accidentes")) || [];
        accidentes.push(nuevoAccidente);
        localStorage.setItem("accidentes", JSON.stringify(accidentes));

        accidenteForm.reset();
        cargarAccidentes();
    });

    window.eliminarAccidente = (index) => {
        const accidentes = JSON.parse(localStorage.getItem("accidentes")) || [];
        accidentes.splice(index, 1);
        localStorage.setItem("accidentes", JSON.stringify(accidentes));
        cargarAccidentes();
    };

    window.imprimirReporte = (index) => {
        const accidentes = JSON.parse(localStorage.getItem("accidentes")) || [];
        const accidente = accidentes[index];
        const reporte = `
            Fecha: ${new Date(accidente.fecha).toLocaleDateString()}
            Descripción: ${accidente.descripcion}
            Costo Económico Estimado: ${accidente.costo}
            Número de Muertos: ${accidente.muertos}
            Número de Heridos: ${accidente.heridos}
            Cantidad de Vehículos: ${accidente.vehiculos}
        `;
        alert(reporte);
    };

    cargarAccidentes();
});
