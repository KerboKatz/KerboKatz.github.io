/**
 * http://filesizejs.com/
 *
 * filesize
 *
 * @copyright 2016 Jason Mulligan <jason.mulligan@avoidwork.com>
 * @license BSD-3-Clause
 * @version 3.2.1
 */
(function(r){function e(e){var d=1>=arguments.length||void 0===arguments[1]?{}:arguments[1],a=[],c=0,b=void 0,h=void 0,f=void 0,k=void 0,m=void 0,l=void 0,n=void 0,g=void 0,p=void 0,q=void 0;if(isNaN(e))throw Error("Invalid arguments");f=!0===d.a;g=!0===d.s;h=d.g||2;n=void 0!==d.round?d.round:g?1:2;p=void 0!==d.c?d.c:g?"":" ";q=d.o||d.suffixes||{};l=d.l||"string";b=void 0!==d.b?d.b:-1;c=Number(e);m=0>c;k=2<h?1E3:1024;m&&(c=-c);if(0===c)a[0]=0,a[1]=g?"":f?"b":"B";else{if(-1===b||isNaN(b))b=Math.floor(Math.log(c)/
Math.log(k)),0>b&&(b=0);8<b&&(b=8);c=2===h?c/Math.pow(2,10*b):c/Math.pow(1E3,b);f&&(c*=8,c>k&&8>b&&(c/=k,b++));a[0]=Number(c.toFixed(0<b?n:0));a[1]=10===h&&1===b?f?"kb":"kB":t[f?"bits":"bytes"][b];g&&(a[1]=a[1].charAt(0),u.test(a[1])&&(a[0]=Math.floor(a[0]),a[1]=""))}m&&(a[0]=-a[0]);a[1]=q[a[1]]||a[1];return"array"===l?a:"exponent"===l?b:"object"===l?{value:a[0],m:a[1],symbol:a[1]}:a.join(p)}var u=/^(b|B)$/,t={a:"b Kb Mb Gb Tb Pb Eb Zb Yb".split(" "),h:"B KB MB GB TB PB EB ZB YB".split(" ")};"undefined"!==
typeof exports?module.i=e:"function"===typeof define&&define.f?define(function(){return e}):r.j=e})("undefined"!==typeof window?window:global);