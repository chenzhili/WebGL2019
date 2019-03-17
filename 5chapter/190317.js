window.onload = function () {
    main();
    function main() {
        const cvs = document.getElementById("cvs");
        const glc = getWebGLContext(cvs);
        console.log(glc);

        const VS_SOURCE = `
        attribute vec4 a_position;
        attribute float a_pointSize;
        void main(){
            gl_Position = a_position;
            gl_PointSize = a_pointSize;
        }
    `;
        const FSHARDER_SOURCE = `
        void main(){
            gl_FragColor = vec4(1.0,0,0,1.0);
        }
    `;
        if (!initShaders(glc, VS_SOURCE, FSHARDER_SOURCE)) return;
        const a_position = glc.getAttribLocation(glc.program,"a_position");
        const a_pointSize = glc.getAttribLocation(glc.program,"a_pointSize");
        console.log(a_position);
        console.log(a_pointSize);

        glc.clearColor(0, 0, 0, 1.0);
        glc.clear(glc.COLOR_BUFFER_BIT);
    }
}