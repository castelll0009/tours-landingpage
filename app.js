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
                
                console.log(response);
            }
            })
        })     
});
    