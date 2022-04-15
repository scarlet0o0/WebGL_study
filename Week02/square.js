var gl;

window.onload = function init()
{
    var canvas = document.getElementById("gl-canvas");

    gl = WebGLUtils.setupWebGL(canvas);
    if( !gl ) {
        alert("WebGL isn't available!");
    }

    //사각형의 위치 좌표
    var vertices = [
        vec2(-0.5, -0.5),
        vec2(-0.5, 0.5),
        vec2(0.5, 0.5),
        vec2(0.5, -0.5)
    ];

    // WebGL 구성
    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.clearColor(0.0, 0.0, 0.0, 1.0); //배경화면을 검은색으로

    // 셰이더 로드 및 속성 버퍼 초기화
    var program = initShaders(gl, "vertex-shader", "fragment-shader");
    gl.useProgram(program);

    // GPU에 데이터 로드
    var bufferId = gl.createBuffer(); //위치 데이터를 담을 위치 버퍼 생성
    gl.bindBuffer(gl.ARRAY_BUFFER, bufferId); // gl.ARRAY_BUFFER의 바인드 포인트로 bufferId 지정
    gl.bufferData(gl.ARRAY_BUFFER, flatten(vertices), gl.STATIC_DRAW);

    var vPosition = gl.getAttribLocation(program, "vPosition");
    gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0); //
    gl.enableVertexAttribArray(vPosition);

    render();
};

function render()
{
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.drawArrays(gl.TRIANGLE_FAN, 0, 4);
}
