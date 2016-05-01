/**
 * http://filesizejs.com/
 * filesize
 * @copyright 2016 Jason Mulligan <jason.mulligan@avoidwork.com>
 * @license BSD-3-Clause
 * @version 3.2.1
 */
(function(r){function e(e){var d=1>=arguments.length||void 0===arguments[1]?{}:arguments[1],a=[],b=0,c=void 0,h=void 0,f=void 0,k=void 0,m=void 0,l=b=void 0,n=void 0,g=void 0,p=void 0,q=void 0;if(isNaN(e))throw Error("Invalid arguments");f=!0===d.bits;g=!0===d.unix;h=d.base||2;n=void 0!==d.round?d.round:g?1:2;p=void 0!==d.spacer?d.spacer:g?"":" ";q=d.symbols||d.suffixes||{};l=d.output||"string";c=void 0!==d.exponent?d.exponent:-1;b=Number(e);m=0>b;k=2<h?1E3:1024;m&&(b=-b);if(0===b)a[0]=0,a[1]=g?"":
f?"b":"B";else{if(-1===c||isNaN(c))c=Math.floor(Math.log(b)/Math.log(k)),0>c&&(c=0);8<c&&(c=8);b=2===h?b/Math.pow(2,10*c):b/Math.pow(1E3,c);f&&(b*=8,b>k&&8>c&&(b/=k,c++));a[0]=Number(b.toFixed(0<c?n:0));a[1]=10===h&&1===c?f?"kb":"kB":t[f?"bits":"bytes"][c];g&&(a[1]=a[1].charAt(0),u.test(a[1])&&(a[0]=Math.floor(a[0]),a[1]=""))}m&&(a[0]=-a[0]);a[1]=q[a[1]]||a[1];return"array"===l?a:"exponent"===l?c:"object"===l?{value:a[0],suffix:a[1],symbol:a[1]}:a.join(p)}var u=/^(b|B)$/,t={bits:"b Kb Mb Gb Tb Pb Eb Zb Yb".split(" "),
bytes:"B KB MB GB TB PB EB ZB YB".split(" ")};"undefined"!==typeof exports?module.exports=e:"function"===typeof define&&define.amd?define(function(){return e}):r.filesize=e})("undefined"!==typeof window?window:global);