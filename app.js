$(document).ready(function() {

  
    // Testing Jquery
    console.log('jquery is working!');  
  
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
});
    