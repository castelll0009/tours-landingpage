

    // Lista de días
    days = [];

    // Referencias a los elementos HTML
    const $daysList = $('#days-list');
    const $addDayButton = $('#add-day-btn');

    // Función para agregar un día a la lista
    function addDay(numberDay, titleDay, descriptionDay) {
        // Crear un objeto de día
        const day = {
            number: numberDay,
            title: titleDay,
            description: descriptionDay,
        };

        // Agregar el día a la lista
        days.push(day);

        // Agregar el día como un elemento de lista
        const $dayItem = $('<div>').html(`Day ${numberDay}: ${titleDay}<br>${descriptionDay}`);
        $daysList.append($dayItem);
    }

    // Al hacer clic en el botón "Agregar Día"
    $addDayButton.click(function() {
        // Obtener los valores de los campos para el nuevo día
        const numberDay = days.length + 1; // Número de día basado en la cantidad actual de días
        const titleDay = prompt('Enter Day Title:');
        const descriptionDay = prompt('Enter Day Description:');

        if (titleDay && descriptionDay) {
            // Llamar a la función para agregar el día
            addDay(numberDay, titleDay, descriptionDay);
        }
    });
    // Muestra el array 'days' en forma de JSON en la consola
console.log(JSON.stringify(days));

// Muestra la lista de días en la consola
console.log(days);



