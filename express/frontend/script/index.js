$(document).ready(function () {
    $("#connect").hide();
    $("#disconnect").hide();

    $("#start").click(function () {
        startOBS();
    });
    $("#stop").click(function () {
        stopOBS();
    });
    $("#connect").click(function () {
        connectOBS();
    });
    $("#disconnect").click(function (){
        disconnectOBS();
    });
});

function startOBS() {
    console.log("Starting OBS");
    $.getJSON(`${location}api/obs/start`);
    $("#connect").fadeIn(1527);
    $("#disconnect").fadeIn(1527);


}

function stopOBS() {
    console.log("Stopping OBS");
    $.getJSON(`${location}api/obs/stop`);
    $("#connect").fadeOut(1527);
    $("#disconnect").fadeOut(1527);

}

function connectOBS() {
    console.log("Connect OBS");
    $.getJSON(`${location}api/obs/connect`);
    $("#start").fadeOut(1527);
    $("#stop").fadeOut(1527);
}

function disconnectOBS() {
    console.log("Connect OBS");
    $.getJSON(`${location}api/obs/disconnect`);
    $("#start").fadeIn(1527);
    $("#stop").fadeIn(1527);
}