$(document).ready(function() {

  
    // Testing Jquery
    console.log('jquery is working!');  
    fetchTours();
    // search key type event
    $('#search').keyup(function() {
     
        let search = $('#search').val();
        console.log(search);
        $.ajax({
            
            url: 'task-search.php',
            type: 'POST',
            data: {search: search},        
            success: function (response) {
                if(!response.error) {
                    let tours = JSON.parse(response);
                    let template = '';
                    tours.forEach(tour => {
                        template += `
                            <tr>
                                <td>${tour.id}</td>
                                <td>${tour.title}</td>
                                <td>${tour.description}</td>
                                <td>${tour.price}</td>
                                <td>${tour.group_size}</td>
                                <td>${tour.duration}</td>
                                <td>${tour.date_departure}</td>
                                <td>${tour.region}</td>
                            </tr>
                        `;
                    });
                    $('#tours').html(template); // Reemplaza el contenido de la tabla con los tours
                    $('#task-result').show();
                }
            }
            
        })
    })     

    $('#tour-form').submit(e => {
        e.preventDefault();
        const postData = {
            title: $('#title').val(),
            description: $('#description').val(),
            price: $('#price').val(),
            group_size: $('#group_size').val(),
            duration: $('#duration').val(),
            date_departure: $('#date_departure').val(),
            region: $('#region').val(),
            id: $('#tourId').val()
        };
        // const url = edit === false ? 'tour-add.php' : 'tour-edit.php';
        // $.post(url, postData, (response) => {
        //     $('#tour-form').trigger('reset');
        //     fetchTours();
        // });
        $.post('task-add.php', postData, (response) => {
                $('#tour-form').trigger('reset');
                fetchTours();
            });
    });

     
// Fetching Tours
function fetchTours() {
    $.ajax({
      url: 'tours-list.php', // Asegúrate de tener un archivo "tours-list.php" que maneje la recuperación de la lista de tours
      type: 'GET',
      success: function (response) {
        const tours = JSON.parse(response);
        let template = '';
        tours.forEach(tour => {
          template += `
            <tr tourId="${tour.id}">
              <td>${tour.id}</td>
              <td>
                <a href="#" class="tour-item">
                  ${tour.title} 
                </a>
              </td>
              <td>${tour.description}</td>
              <td>${tour.price}</td>
              <td>${tour.group_size}</td>
              <td>${tour.duration}</td>
              <td>${tour.date_departure}</td>
              <td>${tour.region}</td>
              <td>
                <button class="tour-delete btn btn-danger">
                  Delete 
                </button>
              </td>
            </tr>
          `;
        });
        $('#tours').html(template);
      }
    });
  }
  

    

});
    