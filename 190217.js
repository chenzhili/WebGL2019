window.onload = function () {
    const v_source = `
        attribute vec4 a_position;
        void main(){
            gl_Position = a_position;
        }
    `;
    const s_source = `
        void main(){
            gl_FragColor = vec4(0,0,1,1);
        }
    `;
    main();
    function main() {
        const cvs = document.getElementById("cvs");
        const glc = getWebGLContext(cvs);
        console.log(glc);

        if(!initShaders(glc,v_source,s_source)){return;}

        const a_position = glc.getAttribLocation(glc.program,"a_position");
        console.log(a_position);
        // 批量 向 a_positon 传值
        const buffer = glc.createBuffer(cvs);
        const data = new Float32Array([
            -0.5,-0.5,
            0.5,-0.5,
            -0.5,0.5,
            0.5,0.5
        ]);
        console.log(buffer);
        glc.bindBuffer(glc.ARRAY_BUFFER,buffer)
        glc.bufferData(glc.ARRAY_BUFFER,data,glc.STATIC_DRAW);
        
        glc.vertexAttribPointer(a_position,2,glc.FLOAT,false,0,0);
        glc.enableVertexAttribArray(a_position);
        

        glc.clearColor(0,0,0,1);
        glc.clear(glc.COLOR_BUFFER_BIT);
        glc.drawArrays(glc.TRIANGLE_FAN,0,4);
    }
}