// jQuery code to handle navigation menu toggle and display current year

// Get references to the navigation menu and menu button
var nav = $("#navbarSupportedContent");
var btn = $(".custom_menubtn");

// Toggle navigation menu and button style on click
btn.click(function (e) {
    e.preventDefault(); // Prevent the default action of the button
    nav.toggleClass("lg_nav-toggle"); // Toggle the 'lg_nav-toggle' class on the navigation menu
    document.querySelector(".custom_menubtn").classList.toggle("menu_btn-style"); // Toggle the 'menu_btn-style' class on the button
});

// Function to get the current year and display it in the element with ID 'displayDate'
function getCurrentYear() {
    var d = new Date(); // Create a new Date object
    var currentYear = d.getFullYear(); // Get the current year from the Date object

    $("#displayDate").html(currentYear); // Set the inner HTML of the element with ID 'displayDate' to the current year
}

// Call the function to display the current year when the script loads
getCurrentYear();
