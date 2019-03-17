window.onload = function () {
    const VS_SOURCE =  `
        attribute vec4 a_position;
        uniform mat4 u_matrix;
        void main(){
            gl_Position = u_matrix*a_position;
            gl_PointSize = 10.0;
        }
    `;
    const FSHARDER_SOURCE = `
        void main(){
            gl_FragColor = vec4(1.0,0,0,1.0);
        }
    `;
    main()
    function main(){
        const canvas = document.getElementById("cvs");
        console.log(canvas);
        // 获取webgl的上下文
        const glc = getWebGLContext(canvas,true);
        console.log(glc);
        if(!initShaders(glc,VS_SOURCE,FSHARDER_SOURCE)){
            return;
        }
        const u_matrix = glc.getUniformLocation(glc.program,"u_matrix");
        console.log(u_matrix);
        const newMatrix = new Matrix4();
        console.log(newMatrix);
        // newMatrix.setRotate(45,0,0,1);
        newMatrix.setTranslate(0.23,0,0);
        newMatrix.rotate(45,0,0,1);
        newMatrix.scale(1/2,1/2,1/2);
        glc.uniformMatrix4fv(u_matrix,false,newMatrix.elements);
        const a_position = glc.getAttribLocation(glc.program, "a_position");
        console.log(a_position);

        const triangleBuffer = glc.createBuffer();
        glc.bindBuffer(glc.ARRAY_BUFFER, triangleBuffer);
        const data = new Float32Array([
            0, 0.5,
            -0.5, -0.5,
            0.5, -0.5
        ]);
        glc.bufferData(glc.ARRAY_BUFFER, data, glc.STATIC_DRAW);
        glc.vertexAttribPointer(a_position, 2, glc.FLOAT, false, 0, 0);
        glc.enableVertexAttribArray(a_position);
        glc.clearColor(0.0,0.0,0.0,1.0);
        glc.clear(glc.COLOR_BUFFER_BIT);
        glc.drawArrays(glc.TRIANGLE_STRIP, 0, 3);
    }
}