
$(document).ready(function () {
  $('#toggle-view').click(function () {
    $('#tour-form, #tour-result').toggle();
  });

  // Configuraciones globales
  let edit = false;

  // Testing jQuery
  console.log('jQuery is working!');
  fetchTours();
  $('#tour-result').hide();

  // Evento de búsqueda por clave de búsqueda
  $('#search').keyup(function () {
    let search = $('#search').val();
    if (search) {
      $.ajax({
        url: 'tour-search.php',
        data: { search },
        type: 'POST',
        success: function (response) {
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

          template_inventario += `
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
  $(document).on('click', '.tour-item', function (e) {
    $('#preview-image').css('display', 'block');


    const tourId = $(this).data('tourid');
    $.post('tour-single.php', { id: tourId }, (response) => {
      const tour = response;
      console.log('Json recuperado single: ' + JSON.stringify(response, null, 2));

      // Mostrar la imagen en el visor
      $('#preview-image').attr('src', tour.image_path).data('original-image-name', tour.image_name);
      $('#title').val(tour.title);
      $('#description').val(tour.description);
      $('#price').val(tour.price);
      $('#group_size').val(tour.group_size);
      $('#duration').val(tour.duration);
      $('#date_departure').val(tour.date_departure);
      $('#region').val(tour.region);
      $('#tourId').val(tourId);

      // Acceder a los campos de 'inventario'
      $('#pax').val(tour.pax);
      $('#include').val(tour.include);
      $('#not_include').val(tour.not_include);
      $('#single_supplement').val(tour.single_supplement);

      let $ul = $('#days-list');
      $ul.empty(); // Esto eliminará todas las etiquetas <li> dentro de la lista <ul>
        
  // Recorre los días en la respuesta y crea elementos para mostrarlos.
  response.days.forEach(function (day) {
    var li = document.createElement("li");
    alert('day image path of day number '+day.number+' path: '+day.image_path);
    li.innerHTML = `
      <strong>Number:</strong> <span class="editable" data-field="number">${day.number}</span><br>
      <strong>Title:</strong> <span class="editable" data-field="title">${day.title}</span><br>
      <strong>Description:</strong> <span class="editable" data-field="description">${day.description}</span><br>
      <strong>Image Path:</strong>
      <div class="form-group cont-day-image-preview" style="display: block;">
        <input type="file" id="day-previewImage${day.number}" class="form-control" accept="image/*">
        <input type="hidden" id="day-prevImage${day.number}" name="day-prevImage${day.number}">
        <!-- Add a preview image for the day -->
        <img id="day-preview-image${day.number}" src="${day.image_path}" alt="Day Preview Image" style="max-width: 50%;">
      </div>
      <br>
      <button type="button" class="edit-day-button">Edit</button>
      <button type="button" class="delete-day-button">Delete</button>
    `;

    
    $(`#day-preview-image${day.number}`).attr('src', day.image_path).data('original-image-name', day.image_name);
    $('#days-list').append(li);
    alert('day single ruta: '+day.image_path);
  });  

      // Establece un valor para el campo de la imagen original (para futura comparación)
      $('#original-image-path').val(tour.image_path);
      edit = true;
      //Verifica si estás en modo de edición
      if (edit) {
        // alert(edit);
        $('#previewImage').removeAttr('required');
      } else {
        // alert(edit);
        $('#previewImage').attr('required', 'required');

      }
    });
    e.preventDefault();
  });





  // Eliminar un Tour individual
  $(document).on('click', '.tour-delete', function (e) {
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
  const banderaCambio = true;
  $(document).ready(function () {
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

      // Add inventory data
      formData.append('pax', $('#pax').val());
      formData.append('include', $('#include').val());
      formData.append('not_include', $('#not_include').val());
      formData.append('single_supplement', $('#single_supplement').val());

      addImageToFormData(formData, 'previewImage', 'preview-image', 'previewImage');
      // Continue with adding the days array
      addDaysArrayToFormData(formData);
    });

    function addDaysArrayToFormData(formData) {
      let daysToAdd = [];
      daysToAdd = getDays();

      // Check if the 'daysToAdd' array is empty and add a default day if it is
      if (daysToAdd.length === 0) {
        daysToAdd.push({
          number: '1',
          title: 'Default Day',
          description: 'This is a default day description.',
          image: {
            path: 'default_day_image.jpg', // Ruta por defecto para la imagen
            preview: 'default_day_preview.jpg', // Ruta por defecto para la vista previa de la imagen
          },
        });
      }else{

      }

      // Add days data
      formData.append('days', JSON.stringify(daysToAdd));
      

    
      // Handle images for each day
      $('#days-list li').each(function () {
        
        alert('subiendo los day al dataForm');
        const number = $(this).find('[data-field="number"]').text();
        if (!$(`#day-previewImage${number}`).prop('files').length) {
         alert('no se selecciono imagen');
         const defaultImagePath = 'ruta_por_defecto.jpg'; // Reemplaza con tu ruta por defecto
         formData.append('day-previewImage' + number, defaultImagePath);
      } else {
        alert('se selecciono imagen');
        addImageToFormData(formData, 'day-previewImage' + number, 'day-preview-image' + number, 'dayImage' + number);
      }
             
      });

      formData.forEach(function (value, key) {
        console.log('DATOSS ', key, value);
      });
      formData.forEach(function (value, key) {
        if (value instanceof File) {
          console.log('Archivo:', key, value.name);
        } else {
          console.log('Campo:', key, value);
        }
      });
      // Continue with submitting the form
      submitForm(formData);
    }

    function submitForm(formData) {
      const url = edit === false ? 'tour-add.php' : 'tour-edit.php';
      if (!banderaCambio) {
        url = 'tour-edit-noimg.php';
      }
  

      $.ajax({
        url: url,
        type: 'POST',
        data: formData,
        contentType: false,
        processData: false,
        success: function (response) {
          console.log(response);

          // Clear the days list and the days array
          $daysList.empty();
          days.length = 0;

          $('#previewImage').val('');

          // Clear the input fields
          $('#days-list').empty();

          $('#tour-form').trigger('reset');
          fetchTours();
          edit = false;
        },
      });
    }

  

});
///////////////////////////FUNCIONES /////////////////////////
//////////////////////////////////////////////////////////
// Function to add an image to the FormData
function addImageToFormData(formData, inputElement, imageElement, formDataKey) {
  const imageInput = document.getElementById(inputElement);
  if (imageInput.files.length > 0) {
    // An image file has been selected
    const imageElementget = document.getElementById(imageElement);
    if (imageElementget.src) {
      // Get the data URI of the image from the preview
      const imageSrc = imageElementget.src;
      // Generate a new random file name
      const newFileName = generateRandomFileName();
      // Convert the data URI to a Blob
      const imageBlob = dataURItoBlob(imageSrc);
      // Create a File from the Blob with the new random name
      const imageFile = new File([imageBlob], newFileName, { type: 'image/jpeg' });
      // Add the image file to the form data
      formData.append(formDataKey, imageFile);
    } else {
      // Image preview is empty
      // Handle it as needed, e.g., set a flag or show an error message
    }
  }
}
  // Helper function to convert Data URI to Blob
  function dataURItoBlob(dataURI) {
    const byteString = atob(dataURI.split(',')[1]);
    const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: mimeString });
  }
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

// Llama a la función para configurar la vista previa de la imagen de 'previewImage'
setupImagePreview('previewImage', 'preview-image');

// Cuando se selecciona una imagen desde el dispositivo
function setupImagePreview(inputId, imageId) {
  document.getElementById(inputId).addEventListener('change', function () {
    const file = this.files[0];
    const imageType = /image.*/;

    if (file.type.match(imageType)) {
      const reader = new FileReader();

      reader.onload = function () {
        const img = new Image();
        img.src = reader.result;

        img.onload = function () {
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
          canvas.width = 600; // Ancho deseado
          canvas.height = 400; // Alto deseado
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
          const dataURL = canvas.toDataURL('image/jpeg', 0.7); // Cambia el formato y la calidad aquí

          // Ahora puedes mostrar dataURL en una etiqueta de imagen
          const previewImage = document.getElementById(imageId);
          previewImage.src = dataURL;

          // Mostrar la imagen estableciendo display en "block"
          previewImage.style.display = 'block';
        };
      };

      reader.readAsDataURL(file);
    }
  });
}

// Generar un nombre de archivo aleatorio único
function generateRandomFileName() {
  const randomId = Math.random().toString(36).substr(2, 9); // Genera un ID aleatorio de 9 caracteres
  const timestamp = new Date().getTime(); // Agrega una marca de tiempo para mayor unicidad
  return `image_${timestamp}_${randomId}.jpg`;
}
