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
    alert('Button Clicked'); // Test if the click event is firing
    const numberDay = $daysList.find('li').length + 1;
    const titleDay = prompt('Enter Day Title:');
    const descriptionDay = prompt('Enter Day Description:');
    
    if (titleDay && descriptionDay) {
      // Calling the function to add the day
      addDay(numberDay, titleDay, descriptionDay);
    }
  });

