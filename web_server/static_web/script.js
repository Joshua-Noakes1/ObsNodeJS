$(document).ready(function () {
    $("#testBTN").click(function () {
        $.getJSON(`${location}api/obs/shutdown`)
    });
});