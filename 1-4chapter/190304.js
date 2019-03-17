window.onload = function () {

    const v_source = `
        attribute vec4 a_position;
        uniform mat4 u_matrix;
        void main(){
            gl_Position = a_position*u_matrix;
        }
    `
    const s_source = `
        void main(){
            gl_FragColor = vec4(1,0,0,1);
        }
    `;
    main();
    function main() {
        const cvs = document.getElementById("cvs");
        const glc = getWebGLContext(cvs);
        if (!initShaders(glc, v_source, s_source)) {
            return;
        }
        const tangle = 60;
        const radian = Math.PI * tangle / 180;
        const cosB = Math.cos(radian), sinB = Math.sin(radian);
        console.log(cosB, sinB);
        const u_matrix = glc.getUniformLocation(glc.program, "u_matrix");
        console.log(u_matrix);
        const martix_data = new Float32Array([
            /* cosB, sinB, 0, 0,
            -sinB, cosB, 0, 0,
            0, 0, 1, 0,
            0, 0, 0, 1 */
            /* 1,0,0,0.5,
            0,1,0,0.5,
            0,0,1,0,
            0,0,0,1 */
            1/2,0,0,0,
            0,1/2,0,0,
            0,0,1/2,0,
            0,0,0,1
        ]);
        glc.uniformMatrix4fv(u_matrix, false, martix_data);
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
        glc.clearColor(0, 0, 0, 1.0);
        glc.clear(glc.COLOR_BUFFER_BIT);
        glc.drawArrays(glc.TRIANGLE_STRIP, 0, 3);
    }

}