window.onload = function(){
    /* const canvas = document.getElementById("cvs");
    console.log(canvas);
    // 获取webgl的上下文
    const glc = getWebGLContext(canvas,true);
    // const glc = canvas.getContext("webgl");
    console.log(glc);

    glc.clearColor(0.0,0.0,0.0,1.0);
    glc.clear(glc.COLOR_BUFFER_BIT); */

    const VS_SOURCE =  `
        void main(){
            gl_Position = vec4(0.0,0.0,0.0,1.0);
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
        // const glc = canvas.getContext("webgl");
        console.log(glc);
        if(!initShaders(glc,VS_SOURCE,FSHARDER_SOURCE)){
            return;
        }
        glc.clearColor(0.0,0.0,0.0,1.0);
        glc.clear(glc.COLOR_BUFFER_BIT);
        glc.drawArrays(glc.POINTS,0,1);
    }
}