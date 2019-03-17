window.onload = function () {
    const vertext_source = `
        attribute vec4 v_position;
        attribute float v_pointSize;
        void main(){
            gl_Position = v_position;
            gl_PointSize = v_pointSize;
        } 
    `;
    const fs_source = `
        // 需要设置 精度，现在不了解为啥
        precision mediump float;
        uniform vec4 u_fragColor;
        void main(){
            gl_FragColor = u_fragColor;
        }
    `

    main();
    function main() {
        const cvs = document.getElementById("cvs");
        const glc = getWebGLContext(cvs);
        console.log(glc);
        if (!initShaders(glc, vertext_source, fs_source)) {
            return;
        }
        const v_position = glc.getAttribLocation(glc.program, "v_position");
        if (v_position < 0) { return; }
        // glc.vertexAttrib3f(v_position,0,0,0);
        const v_pointSize = glc.getAttribLocation(glc.program, "v_pointSize");

        const u_fragColor = glc.getUniformLocation(glc.program, "u_fragColor");
        if (!u_fragColor) { return; }
        console.log(u_fragColor);

        if (v_pointSize < 0) { return; }

        glc.vertexAttrib1f(v_pointSize, 10.0);
        glc.clearColor(0, 0, 0, 1.0);
        glc.clear(glc.COLOR_BUFFER_BIT);
        const points = [],colors = [];
        cvs.onmousedown = function (e) {
            console.log(e.clientX);
            console.log(e.target.getBoundingClientRect());
            // 距离 屏幕左边、上边 的距离
            const x = e.clientX;
            const y = e.clientY;
            // 获取 canvas 左上角 离屏幕的 距离
            const rect = e.target.getBoundingClientRect();

            const resultX = ((x - rect.left) - cvs.width / 2) / (cvs.width / 2);
            const resultY = (cvs.height / 2 - (y - rect.top)) / (cvs.height / 2);
            console.log(resultX, resultY);
            glc.clear(glc.COLOR_BUFFER_BIT);
            // points.push(resultX); points.push(resultY);
            points.push({
                resultX,resultY
            });
            let a = Math.ceil(Math.random() * 10) / 10,
                b = Math.ceil(Math.random() * 10) / 10,
                c = Math.ceil(Math.random() * 10) / 10;
            colors.push({
                a,b,c
            });

            for (let i = 0; i < points.length; i++) {
                glc.vertexAttrib2f(v_position, points[i]["resultX"], points[i]["resultY"]);
                glc.uniform4f(u_fragColor, colors[i]["a"], colors[i]["b"], colors[i]["c"],1.0);
                glc.drawArrays(glc.POINTS, 0, 1);
            }
        }
        // glc.drawArrays(glc.POINTS,0,1);
    }
}