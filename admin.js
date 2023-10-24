

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
        
        const $dayItem = $('<li>').html(`
        <strong>Number:</strong> <span class="" data-field="number">${numberDay}</span><br>
        <strong>Title:</strong> <span class="editable" data-field="title">${titleDay}</span><br>
        <strong>Description:</strong> <span class="editable" data-field="description">${descriptionDay}</span>
        <button type="button" class="edit-day-button">Edit</button>
        <button type="button" class="delete-day-button">Delete</button>

      `);

      
      $daysList.append($dayItem);

        // const $dayItem = $('<div>').html(`Day ${numberDay}: ${titleDay}<br>${descriptionDay}`);
        // $daysList.append($dayItem);
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


// edti and  delete  days
$(document).ready(function() {
    // Variable para rastrear si estás en modo de edición o no
    var isEditing = false;
  
    // Maneja el clic en el botón "Edit" o "Save"
    $('.edit-day-button').click(function() {
      var li = $(this).closest('li');
      
      if (!isEditing) {
        // Cambia a modo de edición
        $(this).text('Save');
        li.find('.editable').each(function() {
          var field = $(this).data('field');
          var content = $(this).text();
          var inputElement = $('<input type="text" class="form-control">').val(content);
          $(this).html(inputElement);
        });
      } else {
        // Cambia a modo de visualización y guarda los cambios
        $(this).text('Edit');
        li.find('.editable input').each(function() {
          var updatedContent = $(this).val();
          $(this).parent().text(updatedContent);
        });
        // Aquí puedes guardar los cambios si es necesario
      }
  
      isEditing = !isEditing; // Invierte el estado de edición
    });
  
    // Maneja el clic en el botón "Delete"
    $('.delete-day-button').click(function() {
      $(this).closest('li').remove(); // Elimina el <li> actual
    });
  
    // Otros manejadores de eventos, como el botón "Add Day"
  });
  
  



