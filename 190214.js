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

        const a_position = glc.getAttribLocation(glc.program,"a_position");
        if(a_position < 0){return;}
        // 运用 webgl 的 缓存区 存储 多个顶点的信息
        const vertices = new Float32Array([0,0.5,-0.5,-0.5,0.5,-0.5]);
        const vertexBuffer = glc.createBuffer();
        console.log(vertexBuffer);
        glc.bindBuffer(glc.ARRAY_BUFFER,vertexBuffer);
        glc.bufferData(glc.ARRAY_BUFFER,vertices,glc.STATIC_DRAW);
        console.log(vertices.length);

        // 把缓存对象 分配给 attribute 变量
        glc.vertexAttribPointer(a_position,2,glc.FLOAT,false,0,0);
        // 开启 attribute 变量
        glc.enableVertexAttribArray(a_position);

        

        const u_fragColor = glc.getUniformLocation(glc.program,"u_fragColor");
        if(!u_fragColor){return;}

        // glc.vertexAttrib2f(a_position,0,0);
        glc.uniform4f(u_fragColor,0,0,1,1);
        glc.clearColor(0, 0, 0, 1.0);
        glc.clear(glc.COLOR_BUFFER_BIT);
        glc.drawArrays(glc.TRIANGLE_STRIP,0,3);
        // type 的类型 glc.POINTS(点)、glc.LINES(线段)、glc.LINE_STRIP(线条，选中 点 连接的 一系列 线段 的连接)、glc.LINE_LOOP(线段的回路)、glc.TRIANGLES(一系列 三角形)、glc.TRIANGLE_STRIP(前三个点 构成第一个 三角行、从 第二个 点 开始 三个点 构成 第二个，两个三角行 共享一个边、以此类推 注意：点的 顺序 (v0,v1,v2) (v2,v1,v3))
    }
}