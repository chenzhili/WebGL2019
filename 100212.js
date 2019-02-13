window.onload = function () {
    const vs_point = `
        attribute vec4 a_position;
        attribute float a_pointSize;
        void main(){
            gl_Position = a_position;
            gl_PointSize = a_pointSize;
        }
    `;
    const vs_source = `
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
        if (!initShaders(glc, vs_point, vs_source)) {
            return;
        }
        const a_Position = glc.getAttribLocation(glc.program, "a_position");
        
        if (a_Position<0) { return;}
        console.log(a_Position);
        // 通过 js 向 着色器语言，动态 传入 顶点 的 信息
        /**
         * 第一种方式
         */
        // glc.vertexAttrib3f(a_Position,0.0,0.0,0.0);//这里传入的 三个参数，在 gl_Postion 会 自动 补全 第四个参数 为 1.0（齐次坐标）
        /**
         * 第二种方式
         */
        const positions = new Float32Array([0.0,0.0,0.0]);
        glc.vertexAttrib3fv(a_Position,positions);

        const a_pointSize = glc.getAttribLocation(glc.program,"a_pointSize");
        console.log(a_pointSize);
        glc.vertexAttrib1f(a_pointSize,40.0);

        const u_fragColor = glc.getUniformLocation(glc.program,"u_fragColor");
        console.log(u_fragColor);
        glc.uniform4f(u_fragColor,1,0,0,1);
        /**
         * webGL的 函数的 命名规范 pdf的 44 页
         */

        glc.clearColor(0.0, 0.0, 0.0, 1.0);
        glc.clear(glc.COLOR_BUFFER_BIT);
        glc.drawArrays(glc.POINTS,0,1);
    }
}