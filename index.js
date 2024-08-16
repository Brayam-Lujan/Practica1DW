let estudiantes = [];

// Referencias
const numEstudiantesForm = document.getElementById('numEstudiantesForm');
const formulariosEstudiantes = document.getElementById('formulariosEstudiantes');
const estudiantesList = document.getElementById('estudiantesList');
const ganaronPorcentaje = document.getElementById('ganaronPorcentaje');
const perdieronPorcentaje = document.getElementById('perdieronPorcentaje');

// Función calcular nota 
function calcularNotaFinal(notas, porcentajes) {
    let notaFinal = 0;
    for (let i = 0; i < notas.length; i++) {
        notaFinal += (notas[i] * porcentajes[i]) / 100;
    }
    return notaFinal;
}

// Función ganó o perdió
function calcularResultado(estudiante) {
    const notaMinima = 3.0;
    estudiante.resultado = estudiante.notaFinal >= notaMinima ? 'Ganó' : 'Perdió';
    return estudiante;
}

// Función para actualizar
function actualizarListadoYEstadisticas() {
    estudiantesList.innerHTML = '';

    // Calcular resultados
    estudiantes.forEach(calcularResultado);

    // Mostrar resultados
    estudiantes.forEach(est => {
        const div = document.createElement('div');
        div.textContent = `${est.nombre}: Nota final = ${est.notaFinal.toFixed(2)}, Resultado = ${est.resultado}`;
        estudiantesList.appendChild(div);
    });

    // Calcular porcentajes
    const total = estudiantes.length;
    const ganaron = estudiantes.filter(est => est.resultado === 'Ganó').length;
    const perdieron = estudiantes.filter(est => est.resultado === 'Perdió').length;

    const ganaronPorc = (ganaron / total) * 100;
    const perdieronPorc = (perdieron / total) * 100;
    ganaronPorcentaje.textContent = `Porcentaje de estudiantes que ganaron: ${ganaronPorc.toFixed(2)}%`;
    perdieronPorcentaje.textContent = `Porcentaje de estudiantes que perdieron: ${perdieronPorc.toFixed(2)}%`;
}

// formulario 
numEstudiantesForm.addEventListener('submit', function(event) {
    event.preventDefault();
    const cantidad = parseInt(document.getElementById('numEstudiantes').value);

    formulariosEstudiantes.innerHTML = '';
    for (let i = 0; i < cantidad; i++) {
        const form = document.createElement('form');
        form.classList.add('estudianteForm');
        form.innerHTML = `
            <h3>Estudiante ${i + 1}</h3>
            <label for="nombre${i}">Nombre:</label>
            <input type="text" id="nombre${i}" required>
            
            <label for="nota1_${i}">Nota 1:</label>
            <input type="number" id="nota1_${i}" min="1" max="5" step="0.1" required>
            <label for="porcentaje1_${i}">Porcentaje (%):</label>
            <input type="number" id="porcentaje1_${i}" min="0" max="100" required>
            
            <label for="nota2_${i}">Nota 2:</label>
            <input type="number" id="nota2_${i}" min="1" max="5" step="0.1" required>
            <label for="porcentaje2_${i}">Porcentaje (%):</label>
            <input type="number" id="porcentaje2_${i}" min="0" max="100" required>
            
            <label for="nota3_${i}">Nota 3:</label>
            <input type="number" id="nota3_${i}" min="1" max="5" step="0.1" required>
            <label for="porcentaje3_${i}">Porcentaje (%):</label>
            <input type="number" id="porcentaje3_${i}" min="0" max="100" required>
            
            <label for="nota4_${i}">Nota 4:</label>
            <input type="number" id="nota4_${i}" min="1" max="5" step="0.1" required>
            <label for="porcentaje4_${i}">Porcentaje (%):</label>
            <input type="number" id="porcentaje4_${i}" min="0" max="100" required>
            
            <label for="nota5_${i}">Nota 5:</label>
            <input type="number" id="nota5_${i}" min="1" max="5" step="0.1" required>
            <label for="porcentaje5_${i}">Porcentaje (%):</label>
            <input type="number" id="porcentaje5_${i}" min="0" max="100" required>
            
            <button type="button" onclick="agregarEstudiante(${i})">Agregar Estudiante</button>
        `;
        formulariosEstudiantes.appendChild(form);
    }
});

// Función agregar
function agregarEstudiante(indice) {
    const nombre = document.getElementById(`nombre${indice}`).value;
    const nota1 = parseFloat(document.getElementById(`nota1_${indice}`).value);
    const porcentaje1 = parseFloat(document.getElementById(`porcentaje1_${indice}`).value);
    const nota2 = parseFloat(document.getElementById(`nota2_${indice}`).value);
    const porcentaje2 = parseFloat(document.getElementById(`porcentaje2_${indice}`).value);
    const nota3 = parseFloat(document.getElementById(`nota3_${indice}`).value);
    const porcentaje3 = parseFloat(document.getElementById(`porcentaje3_${indice}`).value);
    const nota4 = parseFloat(document.getElementById(`nota4_${indice}`).value);
    const porcentaje4 = parseFloat(document.getElementById(`porcentaje4_${indice}`).value);
    const nota5 = parseFloat(document.getElementById(`nota5_${indice}`).value);
    const porcentaje5 = parseFloat(document.getElementById(`porcentaje5_${indice}`).value);

    // Calcular nota 
    const notas = [nota1, nota2, nota3, nota4, nota5];
    const porcentajes = [porcentaje1, porcentaje2, porcentaje3, porcentaje4, porcentaje5];
    const notaFinal = calcularNotaFinal(notas, porcentajes);

    // Agregar estudiante
    estudiantes.push({ nombre, notaFinal });

    // Actualizar el listado y las estadísticas
    actualizarListadoYEstadisticas();
}
