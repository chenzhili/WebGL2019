window.onload = function(){
    const canvas = document.getElementById("cvs");
    console.log(canvas);
    // 获取webgl的上下文
    const glc = getWebGLContext(canvas,true);
    // const glc = canvas.getContext("webgl");
    console.log(glc);
    glc.clearColor(0.0,0.0,0.0,1.0);
    glc.clear(glc.COLOR_BUFFER_BIT);
}