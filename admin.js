// Define an array to store the days
const days = [];
// Define $daysList globally
const $daysList = $('#days-list');

// Function to get days from the list and format them as an array
function getDays() {
  alert('Getting days from li an converting to array');
  const dayItems = Array.from($daysList[0].getElementsByTagName('li'));
  const days = dayItems.map(function(item) {
    const number = item.querySelector('[data-field="number"]').textContent;
    const title = item.querySelector('[data-field="title"]').textContent;
    const description = item.querySelector('[data-field="description"]').textContent;
    return { number, title, description };
  });
  return days;
}

// Function to show all days
function showAllDays($daysList) {
  alert('showing');
  // Get the days as an array
  const allDays = getDays($daysList);

  // Loop through the days and display them
  allDays.forEach(function(day) {
    console.log('Number:', day.number);
    console.log('Title:', day.title);
    console.log('Description:', day.description);
  });
}

  // Function to add a day to the list
  function addDay(numberDay, titleDay, descriptionDay) {
    const day = {
        number: numberDay,
        title: titleDay,
        description: descriptionDay,
    };

    const $dayItem = $('<li>').html(`
        <strong>Number:</strong> <span class="editable" data-field="number">${numberDay}</span><br>
        <strong>Title:</strong> <span class="editable" data-field="title">${titleDay}</span><br>
        <strong>Description:</strong> <span class="editable" data-field="description">${descriptionDay}</span>
        <button type="button" class="edit-day-button">Edit</button>
        <button type="button" class="delete-day-button">Delete</button>
    `);

    $daysList.append($dayItem);
  }

  // Add a click event handler for the "Add Day" button
  $('#add-day-btn').click(function() {
    // alert('Button Clicked'); // Test if the click event is firing
    const numberDay = $daysList.find('li').length + 1;
    const titleDay = prompt('Enter Day Title:');
    const descriptionDay = prompt('Enter Day Description:');
    
    if (titleDay && descriptionDay) {
      // Calling the function to add the day
      addDay(numberDay, titleDay, descriptionDay);
    }
  });


  
// edti and  delete  days
// $(document).ready(function() {
//   // Variable para rastrear si estás en modo de edición o no
//   var isEditing = false;

//   // Maneja el clic en el botón "Edit" o "Save"
//   $('.edit-day-button').click(function() {
//     alert('i am insiede editing');
//     var li = $(this).closest('li');
    
//     if (!isEditing) {
//       // Cambia a modo de edición
//       $(this).text('Save');
//       li.find('.editable').each(function() {
//         var field = $(this).data('field');
//         var content = $(this).text();
//         var inputElement = $('<input type="text" class="form-control">').val(content);
//         $(this).html(inputElement);
//       });
//     } else {
//       // Cambia a modo de visualización y guarda los cambios
//       $(this).text('Edit');
//       li.find('.editable input').each(function() {
//         var updatedContent = $(this).val();
//         $(this).parent().text(updatedContent);
//       });
//       // Aquí puedes guardar los cambios si es necesario
//     }

//     isEditing = !isEditing; // Invierte el estado de edición
//   });

//   // Maneja el clic en el botón "Delete"
//   $('.delete-day-button').click(function() {
//     $(this).closest('li').remove(); // Elimina el <li> actual
//   });

//   // Otros manejadores de eventos, como el botón "Add Day"
// });
$(document).ready(function() {
  // Variable para rastrear si estás en modo de edición o no
  var isEditing = false;

  // Maneja el clic en el botón "Edit" o "Save" mediante la delegación de eventos
  $('#days-list').on('click', '.edit-day-button', function() {
    alert('Estás dentro de la edición');
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

// Maneja el clic en el botón "Delete" mediante la delegación de eventos
$('#days-list').on('click', '.delete-day-button', function() {
  var li = $(this).closest('li');

  if (li.is(':last-child')) {
    li.remove(); // Elimina el <li> actual si es el último
  } else {
    alert("No puedes eliminar elementos anteriores al último.");
  }
});


  // Otros manejadores de eventos, como el botón "Add Day"
});

