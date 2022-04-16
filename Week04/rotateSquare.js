var gl;
var theta = 0;
var thetaLoc;
var direction = true;
var stop = false;
var delay = 100;
var length =1.0;
var lengthLoc;
window.onload = function init()
{
    var canvas = document.getElementById("gl-canvas");

    gl = WebGLUtils.setupWebGL(canvas);
    if( !gl ) {
        alert("WebGL isn't available!");
    }

    document.getElementById("directionButton").onclick = function(){
        direction = !direction
    };
    document.getElementById("myMeny").onclick = function(event){
        switch(event.target.index){
            case 0:
                delay *=0.5;
                break;
            case 1:
                delay *=2.0;
                break;
            case 2:
                length *=1.1;
                break;
            case 3:
                length *=0.9;
                break;
        }
    };
    document.getElementById("speedSlider").onclick = function(event){
        delay = event.target.value;
    };
    document.getElementById("stopButton").onclick = function(){
        stop = !stop
    };

    var vertices = [
        vec2(0, 1),
        vec2(-1, 0),
        vec2(0, -1),
        vec2(1, 0)
    ];

    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.clearColor(1.0, 1.0, 1.0, 1.0);

    var program = initShaders(gl, "vertex-shader", "fragment-shader");
    gl.useProgram(program);

    var bufferId = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, bufferId);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(vertices), gl.STATIC_DRAW);

    var vPosition = gl.getAttribLocation(program, "vPosition");
    gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vPosition);

    thetaLoc = gl.getUniformLocation(program,"theta")
    gl.uniform1f(thetaLoc,theta)

    lengthLoc = gl.getUniformLocation(program,"length")
    gl.uniform1f(lengthLoc,length)
    render();
};

function render()
{
    setTimeout(function(){
        gl.clear(gl.COLOR_BUFFER_BIT);

        theta += (stop ? 0 : (direction ? 0.1 : -0.1))
        gl.uniform1f(thetaLoc, theta);
        gl.uniform1f(lengthLoc,length)
        
        gl.drawArrays(gl.TRIANGLE_FAN,0,4);
        window.requestAnimationFrame(render);
    },delay);
    
}
