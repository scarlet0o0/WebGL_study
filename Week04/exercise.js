var gl;

window.onload = function init()
{
    var canvas = document.getElementById("gl-canvas");

    gl = WebGLUtils.setupWebGL(canvas);
    if( !gl ) {
        alert("WebGL isn't available!");
    }

    var vertices = [
        vec2(-0.5, -0.5),
        vec2(-0.5, 0.5),
        vec2(0.5, 0.5),
        vec2(0.5, -0.5),

        vec2(-0.5, -0.5),
        vec2(-0.5, 0.5),
        vec2(0.5, 0.5),
        vec2(0.5, -0.5),

        vec2(-0.5, 0.5),
        vec2(0.5, 0.5),
        vec2(0.0, 0.8),

        vec2(-0.2, 0.0),
        vec2(-0.2, 0.3),
        vec2(0.2, 0.3),
        vec2(0.2, 0.0),

        vec2(0.0, 0.3),
        vec2(0.0, 0.0),

        vec2(-0.2, 0.15),
        vec2(0.2, 0.15),

        vec2(-0.2, -0.5),
        vec2(-0.2, -0.1),
        vec2(0.2, -0.1),
        vec2(0.2, -0.5),

        vec2(-0.15, -0.35),
        vec2(-0.15, -0.25),
        vec2(-0.05, -0.25),
        vec2(-0.05, -0.35),
    ];
    
    var colors = [
        vec4(0, 1, 0, 1),
        vec4(0, 1, 0, 1),
        vec4(0, 1, 0, 1),
        vec4(0, 1, 0, 1),

        vec4(0, 0, 0, 1),
        vec4(0, 0, 0, 1),
        vec4(0, 0, 0, 1),
        vec4(0, 0, 0, 1),

        vec4(1, 0, 0, 1),
        vec4(1, 0, 0, 1),
        vec4(1, 0, 0, 1),

        vec4(1, 1, 1, 1),
        vec4(1, 1, 1, 1),
        vec4(1, 1, 1, 1),
        vec4(1, 1, 1, 1),

        vec4(0, 0, 0, 1),
        vec4(0, 0, 0, 1),
        vec4(0, 0, 0, 1),
        vec4(0, 0, 0, 1),

        vec4(1, 1, 1, 1),
        vec4(1, 1, 1, 1),
        vec4(1, 1, 1, 1),
        vec4(1, 1, 1, 1),

        vec4(0, 0, 1, 1),
        vec4(0, 0, 1, 1),
        vec4(0, 0, 1, 1),
        vec4(0, 0, 1, 1),
    ]

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

    var cbufferId = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, cbufferId);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(colors), gl.STATIC_DRAW);

    var vColor = gl.getAttribLocation(program, "vColor");
    gl.vertexAttribPointer(vColor, 4, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vColor);

    render();
};

function render()
{
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.drawArrays(gl.TRIANGLE_FAN, 0, 4);
    gl.drawArrays(gl.TRIANGLE_FAN, 8, 3);
    gl.drawArrays(gl.TRIANGLE_FAN, 11, 4);
    gl.drawArrays(gl.TRIANGLE_FAN, 19, 4);
    gl.drawArrays(gl.TRIANGLE_FAN, 23, 4);

    gl.drawArrays(gl.LINES, 15, 2);
    gl.drawArrays(gl.LINES, 17, 2);
    gl.drawArrays(gl.LINE_LOOP, 4, 4);
    
}
