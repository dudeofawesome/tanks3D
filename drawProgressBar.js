/**
* Progressbar r0522122229
* @author Josh Gibbs - uPaymeiFixit@gmail.com
*
* Description:
*   Draws a progress bar on the canvas
*
* Usage:
*   context.drawProgressBar( 0.25, 10, 20 )
*
* @param   Number  value         Default   0.50
* @param   Number  x             Default   0
* @param   Number  y             Default   0
* @param   Number  width         Default   100
* @param   Number  height        Default   20
* @param   Color   fill_color    Default   red
* @param   Color   outline_color Default   context.strokeStyle
*/

Object.prototype.drawProgressBar = function(value,x,y,width,height,fillcolor,strokecolor) {

    var o_fillcolor = this.fillStyle;
    var o_strokecolor = this.strokeStyle;
    value = value ? value : 0.5;

    this.fillStyle = fillcolor || "f00"; // o_fillcolor
    this.strokeStyle = strokecolor || o_strokecolor;

    this.fillRect(x || 0, y || 0, (width || 100) * value, height || 20);
    this.strokeRect(x || 0, y || 0, width || 100, height || 20);

    this.fillStyle = o_fillcolor;
    this.strokeStyle = o_strokecolor;
};
