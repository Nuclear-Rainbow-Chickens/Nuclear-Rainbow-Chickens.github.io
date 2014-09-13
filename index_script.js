$("document").ready(function () {
    $("#gamemenu").fadeOut(0);
    $("#gamedrop, .gamelink").click(function() {
        $("#gamemenu").fadeToggle(400);
        });
});