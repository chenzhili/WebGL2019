window.onload = function () {
    const cx_source = `
        attribute vec4 a_position;
        void main(){
            gl_Position = a_position;
            gl_PointSize = 10.0;
        }
    `;
    const fs_source = `
        precision mediump float;
        uniform vec4 u_fragColor;
        void main(){
            gl_FragColor = u_fragColor;
        }
    `;
    main();
    function main() {
        const cvs = document.getElementById("cvs");
        const glc = getWebGLContext(cvs);
        if (!initShaders(glc, cx_source, fs_source)) {
            return;
        }

        // 运用 webgl 的 缓存区 存储 多个顶点的信息
        const vertices = new Float32Array([0,0.5,-0.5,-0.5,0.5,-0.5]);
        const vertexBuffer = glc.createBuffer();
        console.log(vertexBuffer);
        glc.bindBuffer(glc.ARRAY_BUFFER,vertexBuffer);
        glc.bufferData(glc.ARRAY_BUFFER,vertices,glc.STATIC_DRAW);
        console.log(vertices.length);
        const a_position = glc.getAttribLocation(glc.program,"a_position");
        if(a_position < 0){return;}

        const u_fragColor = glc.getUniformLocation(glc.program,"u_fragColor");
        if(!u_fragColor){return;}

        glc.vertexAttrib2f(a_position,0,0);
        glc.uniform4f(u_fragColor,0,0,1,1);
        glc.clearColor(0, 0, 0, 1.0);
        glc.clear(glc.COLOR_BUFFER_BIT);
        glc.drawArrays(glc.POINTS,0,1);
    }
}