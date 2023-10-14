$(document).ready(function() {
  $('#toggle-view').click(function() {
    $('#tour-form, #tour-result').toggle();
  });
  
  // Configuraciones globales
  let edit = false;
  
  // Testing jQuery
  console.log('jQuery is working!');
  fetchTours();
  $('#tour-result').hide();
  
  // Evento de búsqueda por clave de búsqueda
  $('#search').keyup(function() {
    let search = $('#search').val();
    if (search) {
      $.ajax({
        url: 'tour-search.php',
        data: { search },
        type: 'POST',
        success: function(response) {
          if (!response.error) {
            let tours = JSON.parse(response);
            let template = '';
            tours.forEach(tour => {
              template += `
              <tr data-tourid="${tour.id}">
              <td>${tour.id}</td>
              <td>
              <a href="#" class="tour-item" data-tourid="${tour.id}">
              ${tour.title}
              </a>
              </td>
              <td>${tour.description}</td>
              <td>${tour.price}</td>
              <td>
              <span class="img-form" style="display: block; min-width: 150px;">
              <img src="${tour.image_path}" alt="Tour Image" style="display:block; width:100%"> 
              </span>
             </td>
              <td>${tour.group_size}</td>
              <td>${tour.duration}</td>
              <td>${tour.date_departure}</td>
              <td>${tour.region}</td>
              
              <td>
              <button class="tour-delete btn btn-danger" data-tourid="${tour.id}">
              Delete
              </button>
              </td>
              </tr>
              `;
            });
            $('#tours').html(template); // Reemplazar el contenido de la tabla
          }
        }
      });
    } else {
      // Si el campo de búsqueda está vacío, vuelve a cargar la lista completa
      fetchTours();
    }
  });
  
  //OLD TOUR FORM
  // $('#tour-form').submit(e => {
  //   e.preventDefault();
  //   const postData = {
  //     title: $('#title').val(),
  //     description: $('#description').val(),
  //     price: $('#price').val(),
  //     group_size: $('#group_size').val(),
  //     duration: $('#duration').val(),
  //     date_departure: $('#date_departure').val(),
  //     region: $('#region').val(),
  //     id: $('#tourId').val()
  //   };
  //   const url = edit === false ? 'tour-add.php' : 'tour-edit.php';
  //   $.post(url, postData, (response) => {
  //     console.log(response);
  //     $('#tour-form').trigger('reset');
  //     fetchTours();
  //     edit = false; // Restablecer el modo de edición a falso
  //   });
  // });
  
  // Recuperar la lista de Tours
  function fetchTours() {
    $.ajax({
      url: 'tours-list.php',
      type: 'GET',
      success: function(response) {
        const tours = JSON.parse(response);
        console.log(tours);
        console.log(tours.title);
        let template = '';
        let template_index_tours = '';
        tours.forEach(tour => {
          template += `
          <tr data-tourid="${tour.id}">
          <td>${tour.id}</td>
          <td>
          <a href="#" class="tour-item" data-tourid="${tour.id}">
          ${tour.title}
          </a>
          </td>
          <td>${tour.description}</td>
          <td>${tour.price}</td>
          <td>
            <span class="img-form" style="display: block; min-width: 150px;">
            <img src="${tour.image_path}" alt="Tour Image" style="display:block; width:100%"> 
            <span>
          </td>
          <td>${tour.group_size}</td>
          <td>${tour.duration}</td>
          <td>${tour.date_departure}</td>
          <td>${tour.region}</td>
          
          <td>
          <button class="tour-delete btn btn-danger" data-tourid="${tour.id}">
          Delete
          </button>
          </td>
          </tr>
          `;
          
          // Insertar Swiper Slider          
													
          template_index_tours +=`
          <div tour-id='${tour.id}' 
          style="background: linear-gradient(to top, rgb(15, 32, 39), rgba(32, 58, 67, 0), rgba(44, 83, 100, 0)), url(${tour.image_path}) 50% 50% / cover no-repeat !important;"
           class="swiper-slide   swiper-slide-visible swiper-slide-active" role="group" aria-label="5 / 5" data-swiper-slide-index="4" style="transition-duration: 0ms; transform: translate3d(0px, 0px, -0.208217px) rotateX(0deg) rotateY(0deg) scale(1); z-index: 1; margin-right: 60px;">								       
          <span>${tour.title}</span>
          <div>
            <h2>${tour.description}</h2>
            <p class="p-ubication">
              <span><img src="${tour.image_path}" alt=""></span>                              
            ${tour.region}
            </p>
            <a href="tour-choose-details.html?tourId=${tour.id}">View Details</a>
          </div>
          <div class="swiper-slide-shadow-left swiper-slide-shadow-coverflow" style="opacity: 0; transition-duration: 0ms;"></div><div class="swiper-slide-shadow-right swiper-slide-shadow-coverflow" style="opacity: 0.00208217; transition-duration: 0ms;"></div></div>`;
        });
        $('#tours').html(template);
        $('.swiper-wrapper').html(template_index_tours);
      }
    });
  }
  
  // Obtener un Tour individual por su ID
  // $(document).on('click', '.tour-item', function(e) {
  //     const tourId = $(this).data('tourid'); // Usar 'data-tourid' en lugar de 'tourId'
  //     $.post('tour-single.php', { id: tourId }, (response) => {
  //         const tour = (response);
  //         console.log(tour);
  //         console.log(tour.title);
  
  //         $('#title').val(tour.title);
  //         $('#description').val(tour.description);
  //         $('#price').val(tour.price);
  //         $('#group_size').val(tour.group_size);
  //         $('#duration').val(tour.duration);
  //         $('#date_departure').val(tour.date_departure);
  //         $('#region').val(tour.region);
  //         $('#tourId').val(tourId);
  //         edit = true;
  //     });
  //     e.preventDefault();
  // });
  // Obtener un Tour individual por su ID y llenar el formulario
  $(document).on('click', '.tour-item', function(e) {
    e.preventDefault();
    const tourId = $(this).data('tourid'); // Obtén el ID del atributo data-tourid
    const row = $(this).closest('tr'); // Encuentra la fila padre
    const title = row.find('td:eq(1)').text().trim();
    const description = row.find('td:eq(2)').text(); // Obtiene la descripción de la tercera columna
    const price = row.find('td:eq(3)').text(); // Obtiene el precio de la cuarta columna
    const group_size = row.find('td:eq(4)').text(); // Obtiene el tamaño del grupo de la quinta columna
    const duration = row.find('td:eq(5)').text(); // Obtiene la duración de la sexta columna
    const date_departure = row.find('td:eq(6)').text(); // Obtiene la fecha de salida de la séptima columna
    const region = row.find('td:eq(7)').text(); // Obtiene la región de la octava columna
    
    // Llena los campos del formulario con los valores recuperados
    $('#title').val(title);
    $('#description').val(description);
    $('#price').val(price);
    $('#group_size').val(group_size);
    $('#duration').val(duration);
    $('#date_departure').val(date_departure);
    $('#region').val(region);
    $('#tourId').val(tourId);
    edit = true;
  });
  
  
  
  
  // Eliminar un Tour individual
  $(document).on('click', '.tour-delete', function(e) {
    if (confirm('¿Seguro que desea eliminarlo?')) {
      const tourId = $(this).data('tourid');
      $.post('tour-delete.php', { id: tourId }, (response) => {
        fetchTours();
      });
    }
  });
  
  // Extract the tourId from the URL query parameters
  const urlParams = new URLSearchParams(window.location.search);
  const tourId = urlParams.get('tourId');  
  
  // Check if tourId is valid and call fetchTourSingle if it exists
  if (tourId) {
    fetchTourPackageDetails(tourId);
  } else {
    // Handle the case where tourId is missing or invalid
    console.error('No valid tourId found in the URL.');
  }
  
  // ... Form  Data 

$('#tour-form').submit(e => {
  e.preventDefault();

  const formData = new FormData(); // Create a FormData object

  // Add form data to the FormData object
  formData.append('title', $('#title').val());
  formData.append('description', $('#description').val());
  formData.append('price', $('#price').val());
  formData.append('group_size', $('#group_size').val());
  formData.append('duration', $('#duration').val());
  formData.append('date_departure', $('#date_departure').val());
  formData.append('region', $('#region').val());
  formData.append('id', $('#tourId').val());

  // Add the image to the FormData object
  const imageInput = document.getElementById('image');
  formData.append('image', imageInput.files[0]);

  const url = edit === false ? 'tour-add.php' : 'tour-edit.php';

  // Send the FormData object instead of postData
  $.ajax({
      url: url,
      type: 'POST',
      data: formData,
      contentType: false,
      processData: false, // Set processData to false when sending FormData
      success: function (response) {
          console.log(response);
          $('#tour-form').trigger('reset');
          fetchTours();
          edit = false;
      },
  });
});

// ...

  
});


// Enlist the tour in tour package details
function fetchTourPackageDetails(tourId) {
  // Use tourId directly, no need to create another variable
  alert('fetching ' + tourId);
  $.post('tour-single.php', { id: tourId }, (response) => {
    console.log(response);

    // The response is already an object, so you can directly access its properties
    const tour = response;
    console.log('Received JSON object:', tour);

    // Now, populate the placeholders with the retrieved tour details
    $('#tour-title').text(tour.title);
    $('#tour-description').text(tour.description);    
    // Add similar lines for other elements
  });
}





