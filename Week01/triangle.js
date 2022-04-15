var gl;

window.onload = function init()
{
    var canvas = document.getElementById("gl-canvas");

    gl = WebGLUtils.setupWebGL(canvas);
    if( !gl ) {
        alert("WebGL isn't available!");
    }

    //삼각형의 위치 좌표
    var vertices = new Float32Array([-0.5, -0.5, 0, 0.5, 0.5, -0.5]);

    // WebGL 구성
    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.clearColor(1.0, 1.0, 1.0, 1.0); //배경색 색깔 지정

    // 셰이더 로드 및 속성 버퍼 초기화
    var program = initShaders(gl, "vertex-shader", "fragment-shader");
    gl.useProgram(program); //어느 셰이더 프로그램을 사용할지 지정

    // GPU에 데이터 로드
    var bufferId = gl.createBuffer(); //위치 데이터를 담을 위치 버퍼 생성
    gl.bindBuffer(gl.ARRAY_BUFFER, bufferId); // gl.ARRAY_BUFFER의 바인드 포인트로 bufferId 지정
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

    // 셰이더 변수를 데이터 버퍼와 연결
    var vPosition = gl.getAttribLocation(program, "vPosition"); //프로그램의 vPosition 애트리뷰트의 위치를 참조
    //현재 ARRAY_BUFFER의 바인드 포인트에서 데이터를 어떻게 가져올지 지정
    gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0); 
    gl.enableVertexAttribArray(vPosition); //사용할 애트리뷰트 지정

    render();
};

function render()
{
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
}
