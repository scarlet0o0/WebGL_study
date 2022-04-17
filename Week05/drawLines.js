var gl;
var points, colors;

window.onload = function init() {
    var canvas = document.getElementById("gl-canvas");

    gl = WebGLUtils.setupWebGL(canvas);
    if( !gl ) {
        alert("WebGL isn't available!");
    }

    points = [];
    colors = [];
    var bMouseDown = false;

    canvas.addEventListener("mousedown", function(event) {
        if(!bMouseDown){
            var point = vec2(2 * event.clientX/canvas.width - 1,
            2 * (canvas.height - event.clientY) / canvas.height - 1);
            points.push(point);
            points.push(point);
            gl.bindBuffer(gl.ARRAY_BUFFER, bufferId);
            gl.bufferData(gl.ARRAY_BUFFER, flatten(points), gl.STATIC_DRAW);

            colors.push(currentColor);
            colors.push(currentColor);
            gl.bindBuffer(gl.ARRAY_BUFFER, cbufferId);
            gl.bufferData(gl.ARRAY_BUFFER,flatten(colors),gl.STATIC_DRAW);
        }
        bMouseDown = true;
    });
    canvas.addEventListener("mouseup", function(event) {
        bMouseDown = false;
    });
    canvas.addEventListener("mousemove", function(event) {
        if( bMouseDown ) {
            var point = vec2(2 * event.clientX/canvas.width - 1,
                2 * (canvas.height - event.clientY) / canvas.height - 1);
            points.pop();
            points.push(point);
            gl.bindBuffer(gl.ARRAY_BUFFER, bufferId);
            gl.bufferData(gl.ARRAY_BUFFER, flatten(points), gl.STATIC_DRAW);

            colors.pop();
            colors.push(currentColor);
            gl.bindBuffer(gl.ARRAY_BUFFER, cbufferId);
            gl.bufferData(gl.ARRAY_BUFFER,flatten(colors),gl.STATIC_DRAW);

            render();
        }
    });

    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.clearColor(1.0, 1.0, 1.0, 1.0);

    var program = initShaders(gl, "vertex-shader", "fragment-shader");
    gl.useProgram(program);

    var bufferId = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, bufferId);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(points), gl.STATIC_DRAW);

    var vPosition = gl.getAttribLocation(program, "vPosition");
    gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vPosition);

    var cbufferId = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, cbufferId);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(colors), gl.STATIC_DRAW);

    var vColor = gl.getAttribLocation(program, "vColor");
    gl.vertexAttribPointer(vColor, 4, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vColor);

    var currentColor = vec4(1.0, 0.0, 0.0, 1.0);

    document.getElementById("lineColor").onclick = function(event){
        switch(event.target.value){
            case "red":
                currentColor = vec4( 1.0, 0.0, 0.0, 1.0);
                break;
            case "green":
                currentColor = vec4( 0.0, 1.0, 0.0, 1.0);
                break;
            case "blue":
                currentColor = vec4( 0.0, 0.0, 1.0, 1.0);
                break;
            case "yellow":
                currentColor = vec4( 1.0, 1.0, 0.0, 1.0);
                break;
            case "cyan":
                currentColor = vec4( 0.0, 1.0, 1.0, 1.0);
                break;
            case "magenta":
                currentColor = vec4( 1.0, 0.0, 1.0, 1.0);
                break;
            case "gray":
                currentColor = vec4( 0.5, 0.5, 0.5, 1.0);
                break;
            case "black":
                currentColor = vec4( 0.0, 0.0, 0.0, 1.0);
                break;
        }
    }

    render();
};

function render() {
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.drawArrays(gl.LINES, 0, points.length);
}
