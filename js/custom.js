// Toggle navigation menu and button style
var nav = $("#navbarSupportedContent");
var btn = $(".custom_menu-btn");

btn.click(function (e) {
    e.preventDefault();
    nav.toggleClass("lg_nav-toggle");
    btn.toggleClass("menu_btn-style"); // Use btn instead of document.querySelector for consistency
});

// Display the current year
function getCurrentYear() {
    var d = new Date();
    var currentYear = d.getFullYear();
    $("#displayDate").html(currentYear);
}

getCurrentYear();
