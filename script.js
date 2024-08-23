
fgjutyjtyfgtjnmtyuj
var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");

function onLoad(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    setCanvasBackground();
}

var isPainting = false;
//////////////////////////////////////////////////////////
function canvasMouseDown(e){
    startPainting(e);
}

function canvasOnmouseMove(e){
    painting(e);
}

function canvasMouseUp(){
    isPainting = false;
}
///////////////////////////////////////////////////////////
var mouseMemoryX;
var mouseMemoryY;
var screenMemory;





function startPainting(e){
    isPainting = true;

    mouseMemoryX = e.offsetX;
    mouseMemoryY = e.offsetY;

    context.lineWidth = brushSize;
    context.beginPath();

    screenMemory = context.getImageData(0, 0, canvas.width,
         canvas.height);
 
}


function painting(e){
    if(isPainting == true){
         context.strokeStyle = selectedColor;
         context.fillStyle = selectedColor;
        context.putImageData(screenMemory, 0, 0);

       

        
        if(selectedDrawingTool == "brush"){ 
            context.lineTo(e.offsetX, e.offsetY);
            context.stroke();
        }else if(selectedDrawingTool == "rectangle"){
            drawRectangle(e);
        }else if(selectedDrawingTool == "triangle"){
            drawingTriangle(e);
        }else if (selectedDrawingTool == "circle"){
            drawcircle(e);
        }else if (selectedDrawingTool =="eraser"){
            context.strokeStyle = "white";
            context.lineTo(e.offsetX, e.offsetY);
            context.stroke();

        }
    
    
    }else{
        return;
    }
}


var fillChecBox = document.getElementById("fill-checkbox");


function drawingTriangle(e){

    context.beginPath();
    context.moveTo(mouseMemoryX, mouseMemoryY);
    context.lineTo(e.offsetX, e.offsetY);
    context.lineTo(mouseMemoryX * 2 - e.offsetX, e.offsetY);
    context.closePath();

    if(fillChecBox.checked){
        context.fill();
    }else{
        context.stroke();
    }
}



function drawRectangle(e){
    if(fillChecBox.checked){
        context.fillRect(e.offsetX, e.offsetY, mouseMemoryX - e.offsetX, mouseMemoryY - e.offsetY);

    }else{
        context.strokeRect(e.offsetX, e.offsetY, mouseMemoryX - e.offsetX, mouseMemoryY - e.offsetY);
    }
}

var selectedColor = "black";



function changeColor(){
    
    var colorpicker = document.getElementById("color-picker");
    selectedColor = colorpicker.value;
}

var selectedDrawingTool ="brush"



function changeTool(tool){
    selectedDrawingTool = tool;
}

var brushSize = 5;



function changeBrushSize(){
    var sizeRange = document.getElementById("size-range")
    brushSize = sizeRange.value;
}

function drawcircle(e){
    context.beginPath();
    var dx = mouseMemoryX - e.offsetX;
    var dy = mouseMemoryY - e.offsetY;
    var radius = Math.sqrt(dx * dx + dy * dy);
    context.arc(mouseMemoryX, mouseMemoryY, radius, 0,2 * Math.PI);

    if(fillChecBox.checked){
        context.fill();
    }else{
        context.stroke();
    }
}


function clearCanvas(){
    context.clearRect(0, 0, canvas.width, canvas.width);
    setCanvasBackground();
    selectedDrawingTool =  "brush";
}

function save(){
        const link = document.createElement("a");
        link.download = '${Date.now()}.jpg';
        link.href = canvas.toDataURL();
        link.click();

}


function setCanvasBackground(){
    context.fillStyle = "white";
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = selectedColor;

}
