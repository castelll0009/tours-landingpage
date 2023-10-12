$(document).ready(function() {

  
    // Testing Jquery
    console.log('jquery is working!');  
  
    // search key type event
    $('#search').keyup(function() {
     
        let search = $('#search').val();
        $.ajax({
            url: 'task-search.php',
            data: {search},
            type: 'POST',
            success: function (response) {
                console.log(responde);
            }
            })
        })     
});
    