
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
  
  
// Recuperar la lista de Tours
function fetchTours() {
  $.ajax({
    url: 'tours-list.php',
    type: 'GET',
    success: function (response) {
      console.log(response);
      const tours = JSON.parse(response);
      
      let template = '';
      let template_inventario = '';
      let template_dias = '';
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

        template_inventario +=`
        <tr data-tourid="${tour.id}">
        <td>${tour.id}</td>
        <td>
          <a href="#" class="tour-item" data-tourid="${tour.id}">
            ${tour.title}
          </a>
        </td>   
        <td>${tour.pax}</td> <!-- Nuevo campo PAX -->
        <td>${tour.include}</td> <!-- Nuevo campo Include -->
        <td>${tour.not_include}</td> <!-- Nuevo campo Not Include -->
        <td>${tour.single_supplement}</td> <!-- Nuevo campo Single Supplement -->
        <td>
          <button class="tour-delete btn btn-danger" data-tourid="${tour.id}">
            Delete
          </button>
        </td>
      </tr>
    `;
        

        // Insertar la información de días en la tabla de días
        template_dias += `
          <tr data-dayid="${tour.id}">
            <td>${tour.id}</td>
            <td>${tour.title}</td>
            <td>${tour.number_day}</td> <!-- Nuevo campo 'number_day' de días -->
            <td>${tour.title_day}</td> <!-- Nuevo campo 'title_day' de días -->
            <td>${tour.description_day}</td> <!-- Nuevo campo 'description_day' de días -->
            <!-- Agregar más campos de días según sea necesario -->
            <td>
              <button class "day-delete btn btn-danger" data-dayid="${tour.id}">
                Delete
              </button>
            </td>
          </tr>
        `;

        // Insertar Swiper Slider -index.html and tour-choose-details.html
        template_index_tours += `
          <div tour-id='${tour.id}'
            style="background: linear-gradient(to top, rgb(15, 32, 39), rgba(32, 58, 67, 0), rgba(44, 83, 100, 0)), url(${tour.image_path}) 50% 50% / cover no-repeat !important;"
            class="swiper-slide   swiper-slide-visible swiper-slide-active" role="group" aria-label="5 / 5" data-swiper-slide-index="4" style="transition-duration: 0ms; transform: translate3d(0px, 0px, -0.208217px) rotateX(0deg) rotateY(0deg) scale(1); z-index: 1; margin-right: 60px;">
            <span>${tour.title}</span>
            <div>
              <p>${tour.description}</p>
              <h6 class="p-ubication">
                <span><img src="${tour.image_path}" alt=""></span>
                ${tour.region}
              </h6>
              <a href="tour-choose-details.html?tourId=${tour.id}">View Details</a>
            </div>
            <div class="swiper-slide-shadow-left swiper-slide-shadow-coverflow" style="opacity: 0; transition-duration: 0ms;"></div><div class="swiper-slide-shadow-right swiper-slide-shadow-coverflow" style="opacity: 0.00208217; transition-duration: 0ms;"></div>
          </div>`;
      });

      $('#tours').html(template);
      $('#inventory').html(template_inventario);
      $('#days').html(template_dias);
      $('.swiper-wrapper').html(template_index_tours);
    }
  });
}

// get single Obtener un Tour individual por su ID
$(document).on('click', '.tour-item', function(e) {
 // Verifica si estás en modo de edición
 if (edit) {
  $('#image').attr('required', 'required');
 
} else {
  $('#image').removeAttr('required');
  
}
  const tourId = $(this).data('tourid');
  $.post('tour-single.php', { id: tourId }, (response) => {
    const tour = response; // Asegúrate de que el objeto 'tour' contiene todos los campos que esperas
    console.log('Json recuperado single: ' + JSON.stringify(response, null, 2));

    $('#title').val(tour.title);
    $('#description').val(tour.description);
    $('#price').val(tour.price);
    $('#group_size').val(tour.group_size);
    $('#duration').val(tour.duration);
    $('#date_departure').val(tour.date_departure);
    $('#region').val(tour.region);
    $('#tourId').val(tourId);
    
    // Añadir el elemento de imagen con la ruta de la imagen
    const image = $('<img>').attr('src', tour.image_path);
    $('#image-container').empty().append(image);

    // Acceder a los campos de 'inventario'
    $('#pax').val(tour.pax);
    $('#include').val(tour.include);
    $('#not_include').val(tour.not_include);
    $('#single_supplement').val(tour.single_supplement);

   

    // // Acceder a los campos de 'dias'
    // $('#number_day').val(tour.number_day);
    // $('#title_day').val(tour.title_day);
    // $('#description_day').val(tour.description_day);
   // Assuming response contains the JSON data you provided


   let $ul = $('#days-list');
   $ul.empty(); // Esto eliminará todas las etiquetas <li> dentro de la lista <ul>
// Loop through the 'days' array in the response
response.days.forEach(function(day) {
    // Create a new list item for each day
    var li = document.createElement("li");
    // Populate the list item with day information
    li.innerHTML = `    
    <strong>Number:</strong> <span class="editable" data-field="number">${day.number}</span><br>
    <strong>Title:</strong> <span class="editable" data-field="title">${day.title}</span><br>
    <strong>Description:</strong> <span class="editable" data-field="description">${day.description}</span>
    <br>
    <button type="button" class="edit-day-button">Edit</button>
    <button type="button" class="delete-day-button">Delete</button>

  
    
    `;
    // 
        // <strong>Number:</strong> ${day.number}<br>
        // <strong>Title:</strong> ${day.title}<br>
        // <strong>Description:</strong> ${day.description}
    // Append the list item to the "days-list" ul
    $('#days-list').append(li);
});

    
    edit = true;
  });
  e.preventDefault();
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
    console.error('No valid tourId, tour package found in the URL.');
  }
  
  // ...ADD Form  Data 

  $('#tour-form').submit(e => {
    e.preventDefault();

    const formData = new FormData();

    // Add form data to the FormData object
    formData.append('title', $('#title').val());
    formData.append('description', $('#description').val());
    formData.append('price', $('#price').val());
    formData.append('group_size', $('#group_size').val());
    formData.append('duration', $('#duration').val());
    formData.append('date_departure', $('#date_departure').val());
    formData.append('region', $('#region').val());
    formData.append('id', $('#tourId').val());

    // // Add the image to the FormData object
    // const imageInput = document.getElementById('image');
    // formData.append('image', imageInput.files[0]);

    // Add inventario data
    formData.append('pax', $('#pax').val());
    formData.append('include', $('#include').val());
    formData.append('not_include', $('#not_include').val());
    formData.append('single_supplement', $('#single_supplement').val());

    
    // Check if a new image has been selected
    const imageInput = document.getElementById('image');
    if (imageInput.files[0]) {
        formData.append('image', imageInput.files[0]);
    } else {
        // If no new image is selected, use the previous image path
        const prevImage = $('#prevImage').val();
        formData.append('prevImage', prevImage);
    }

    let  daysToAdd = [];
    daysToAdd  = getDays();
    // Check if the 'daysToAdd' array is empty and add a default day if it is
    if (daysToAdd.length === 0) {
      daysToAdd.push({
          number: '1',
          title: 'Default Day',
          description: 'This is a default day description.',
      });
  }else{
    // significa qie si  hay dias  en un aarray
    
  }

    
    // Add días data
    // formData.append('number_day', $('#number_day').val());
    // formData.append('title_day', $('#title_day').val());
    // formData.append('description_day', $('#description_day').val());    
    formData.append('days', JSON.stringify(daysToAdd));
    // Display the details of each day in the console    
    for (const pair of formData.entries()) {
      console.log(pair[0] + ', ' + pair[1]);
    }

    const url = edit === false ? 'tour-add.php' : 'tour-edit.php';

    // if(url == 'tour-edit.php'){
    // }else{

    // }

    $.ajax({
        url: url,
        type: 'POST',
        data: formData,
        contentType: false,
        processData: false,
        success: function (response) {
            console.log(response);
              // Limpia la lista de días y el arreglo de días
              $daysList.empty();
              days.length = 0;
  
              $('#prevImage').val('');

            // Limpia los campos de entrada
            // Clear the entire <ul> element
            $('#days-list').empty();
              
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
  
  $.post('tour-single.php', { id: tourId }, (response) => {
    console.log(response);

    // The response is already an object, so you can directly access its properties
    const tour = response;
    console.log('Received JSON object:', tour);    

    // Limpia cualquier contenido previo en el contenedor de días
    $('#days-container').empty();

    //DAYS LIST TOUR TODO
    // Recorre los días del tour y crea dinámicamente la lista de días
    tour.days.forEach((day) => {
      const templateDay = `
        <div class="day">
          <p style="min-width: fit-content;">Day ${day.number}</p>
          <span>
            <div class="diamond"></div>
            <div class="conect_line"></div>
          </span>
          <div class="cont-day-activity">
            <div class="cont_title_description">
              <h2 class="title_activity">${day.title}</h2>
              <p class="description_activity">${day.description}</p>
            </div>
            <span class="span_img_day">
              <img src="imgs/pic${day.number}.jpg" alt="">
            </span>
          </div>
        </div>
      `;

      // Agrega el día al contenedor de días
      $('.timeline').append(templateDay);
    });

    // Now, populate the placeholders with the retrieved tour details
    $('#tour-title').text(tour.title);
    $('main').css('background-image', `url(${tour.image_path})`);
    $('#tour-description').text(tour.description);   
    $('#id-region-tour').text(tour.region);
    $('#id-price-tour').text(tour.price);  
    $('#id').text(tour.description); 
    $('#id-date-departure').text(tour.date_departure);
    
     
    //inventory
    $('#id-dias').text(tour.number_day);    
    $('#id-group-size').text(tour.group_size);
    $('#id-pax').text(tour.pax);
    $('#id-supplement').text(tour.single_supplement);
    $('#id-include-tour').text(tour.include);
    $('#id-no-include').text(tour.not_include);


  });
}







