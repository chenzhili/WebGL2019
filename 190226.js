window.onload = function () {

    const v_source = `
        attribute vec4 a_position;
        uniform float u_cosB,u_sinB;
        void main(){
            gl_Position.x = a_position.x*u_cosB-a_position.y*u_sinB;
            gl_Position.y = a_position.x*u_sinB+a_position.y*u_cosB;
            gl_Position.z = a_position.z;
            gl_Position.w = 1.0;
            gl_PointSize = 10.0;
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
        if(!initShaders(glc,v_source,s_source)){
            return;
        }
        const tangle = 60;
        const radian = Math.PI*tangle/180;
        const cosB = Math.cos(radian),sinB = Math.sin(radian);
        console.log(cosB,sinB);
        const u_cosB = glc.getUniformLocation(glc.program,"u_cosB");
        console.log(u_cosB);
        const u_sinB = glc.getUniformLocation(glc.program,"u_sinB");
        console.log(u_sinB);
        glc.uniform1f(u_cosB,cosB);
        glc.uniform1f(u_sinB,sinB);
        
        const a_position = glc.getAttribLocation(glc.program,"a_position");
        console.log(a_position);
        
        const triangleBuffer = glc.createBuffer();
        glc.bindBuffer(glc.ARRAY_BUFFER,triangleBuffer);
        const data = new Float32Array([
            0,0.5,
            -0.5,-0.5,
            0.5,-0.5
        ]);
        glc.bufferData(glc.ARRAY_BUFFER,data,glc.STATIC_DRAW);
        glc.vertexAttribPointer(a_position,2,glc.FLOAT,false,0,0);
        glc.enableVertexAttribArray(a_position);
        glc.clearColor(0,0,0,1.0);
        glc.clear(glc.COLOR_BUFFER_BIT);
        glc.drawArrays(glc.TRIANGLE_STRIP,0,3);
    }

}