$("document").ready(function () {
    
    $("#gamedropmenu").css("width", addCSSpx($("#homebutton").css("width"), $("#gamedropbutton").css("width")));
    $("#gamedropbutton, #gamedropmenu").mouseenter(function() {
        $("#gamedropmenu").css("left", $("#width").css("width"));      
        $("#gamedropmenu").css("top", addCSSpx($("#1stheight").css("height"), $("#2ndheight").css("height")));      
        });
    $("#gamedropbutton").mouseleave(function() {
        $("#gamedropmenu").css("left", "-9999999999999px");   
        });
});
function addCSSpx(a,b) {
    var anum = parseInt(a.replace("px", ""));
    var bnum = parseInt(b.replace("px",""));
    var newnum = anum+bnum;
    var abstr = newnum+"px";
    return abstr;
}
