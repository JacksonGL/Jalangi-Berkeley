var testContents = [ "<!DOCTYPE html>\n\
<head>\n\
\n\
<meta charset=utf8>\n\
\n\
<!--\n\
 Copyright (C) 2007 Apple Inc.  All rights reserved.\n\
\n\
 Redistribution and use in source and binary forms, with or without\n\
 modification, are permitted provided that the following conditions\n\
 are met:\n\
 1. Redistributions of source code must retain the above copyright\n\
    notice, this list of conditions and the following disclaimer.\n\
 2. Redistributions in binary form must reproduce the above copyright\n\
    notice, this list of conditions and the following disclaimer in the\n\
    documentation and/or other materials provided with the distribution.\n\
\n\
 THIS SOFTWARE IS PROVIDED BY APPLE COMPUTER, INC. ``AS IS'' AND ANY\n\
 EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE\n\
 IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR\n\
 PURPOSE ARE DISCLAIMED.  IN NO EVENT SHALL APPLE COMPUTER, INC. OR\n\
 CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,\n\
 EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO,\n\
 PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR\n\
 PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY\n\
 OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT\n\
 (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE\n\
 OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE. \n\
-->\n\
\n\
<title>SunSpider crypto-md5</title>\n\
<link rel=\"stylesheet\" href=\"sunspider.css\">\n\
</head>\n\
\n\
<body>\n\
<h3>crypto-md5</h3>\n\
<div id=\"console\">\n\
</div>\n\
<script>\n\
function record(time) {\n\
    document.getElementById(\"console\").innerHTML = time + \"ms\";\n\
    if (window.parent) {\n\
        parent.recordResult(time);\n\
    }\n\
}\n\
\n\
var _sunSpiderStartDate = new Date();\n\
\n\
/*\n\
 * A JavaScript implementation of the RSA Data Security, Inc. MD5 Message\n\
 * Digest Algorithm, as defined in RFC 1321.\n\
 * Version 2.1 Copyright (C) Paul Johnston 1999 - 2002.\n\
 * Other contributors: Greg Holt, Andrew Kepert, Ydnar, Lostinet\n\
 * Distributed under the BSD License\n\
 * See http://pajhome.org.uk/crypt/md5 for more info.\n\
 */\n\
\n\
/*\n\
 * Configurable variables. You may need to tweak these to be compatible with\n\
 * the server-side, but the defaults work in most cases.\n\
 */\n\
var hexcase = 0;  /* hex output format. 0 - lowercase; 1 - uppercase        */\n\
var b64pad  = \"\"; /* base-64 pad character. \"=\" for strict RFC compliance   */\n\
var chrsz   = 8;  /* bits per input character. 8 - ASCII; 16 - Unicode      */\n\
\n\
/*\n\
 * These are the functions you'll usually want to call\n\
 * They take string arguments and return either hex or base-64 encoded strings\n\
 */\n\
function hex_md5(s){ return binl2hex(core_md5(str2binl(s), s.length * chrsz));}\n\
function b64_md5(s){ return binl2b64(core_md5(str2binl(s), s.length * chrsz));}\n\
function str_md5(s){ return binl2str(core_md5(str2binl(s), s.length * chrsz));}\n\
function hex_hmac_md5(key, data) { return binl2hex(core_hmac_md5(key, data)); }\n\
function b64_hmac_md5(key, data) { return binl2b64(core_hmac_md5(key, data)); }\n\
function str_hmac_md5(key, data) { return binl2str(core_hmac_md5(key, data)); }\n\
\n\
/*\n\
 * Perform a simple self-test to see if the VM is working\n\
 */\n\
function md5_vm_test()\n\
{\n\
  return hex_md5(\"abc\") == \"900150983cd24fb0d6963f7d28e17f72\";\n\
}\n\
\n\
/*\n\
 * Calculate the MD5 of an array of little-endian words, and a bit length\n\
 */\n\
function core_md5(x, len)\n\
{\n\
  /* append padding */\n\
  x[len >> 5] |= 0x80 << ((len) % 32);\n\
  x[(((len + 64) >>> 9) << 4) + 14] = len;\n\
\n\
  var a =  1732584193;\n\
  var b = -271733879;\n\
  var c = -1732584194;\n\
  var d =  271733878;\n\
\n\
  for(var i = 0; i < x.length; i += 16)\n\
  {\n\
    var olda = a;\n\
    var oldb = b;\n\
    var oldc = c;\n\
    var oldd = d;\n\
\n\
    a = md5_ff(a, b, c, d, x[i+ 0], 7 , -680876936);\n\
    d = md5_ff(d, a, b, c, x[i+ 1], 12, -389564586);\n\
    c = md5_ff(c, d, a, b, x[i+ 2], 17,  606105819);\n\
    b = md5_ff(b, c, d, a, x[i+ 3], 22, -1044525330);\n\
    a = md5_ff(a, b, c, d, x[i+ 4], 7 , -176418897);\n\
    d = md5_ff(d, a, b, c, x[i+ 5], 12,  1200080426);\n\
    c = md5_ff(c, d, a, b, x[i+ 6], 17, -1473231341);\n\
    b = md5_ff(b, c, d, a, x[i+ 7], 22, -45705983);\n\
    a = md5_ff(a, b, c, d, x[i+ 8], 7 ,  1770035416);\n\
    d = md5_ff(d, a, b, c, x[i+ 9], 12, -1958414417);\n\
    c = md5_ff(c, d, a, b, x[i+10], 17, -42063);\n\
    b = md5_ff(b, c, d, a, x[i+11], 22, -1990404162);\n\
    a = md5_ff(a, b, c, d, x[i+12], 7 ,  1804603682);\n\
    d = md5_ff(d, a, b, c, x[i+13], 12, -40341101);\n\
    c = md5_ff(c, d, a, b, x[i+14], 17, -1502002290);\n\
    b = md5_ff(b, c, d, a, x[i+15], 22,  1236535329);\n\
\n\
    a = md5_gg(a, b, c, d, x[i+ 1], 5 , -165796510);\n\
    d = md5_gg(d, a, b, c, x[i+ 6], 9 , -1069501632);\n\
    c = md5_gg(c, d, a, b, x[i+11], 14,  643717713);\n\
    b = md5_gg(b, c, d, a, x[i+ 0], 20, -373897302);\n\
    a = md5_gg(a, b, c, d, x[i+ 5], 5 , -701558691);\n\
    d = md5_gg(d, a, b, c, x[i+10], 9 ,  38016083);\n\
    c = md5_gg(c, d, a, b, x[i+15], 14, -660478335);\n\
    b = md5_gg(b, c, d, a, x[i+ 4], 20, -405537848);\n\
    a = md5_gg(a, b, c, d, x[i+ 9], 5 ,  568446438);\n\
    d = md5_gg(d, a, b, c, x[i+14], 9 , -1019803690);\n\
    c = md5_gg(c, d, a, b, x[i+ 3], 14, -187363961);\n\
    b = md5_gg(b, c, d, a, x[i+ 8], 20,  1163531501);\n\
    a = md5_gg(a, b, c, d, x[i+13], 5 , -1444681467);\n\
    d = md5_gg(d, a, b, c, x[i+ 2], 9 , -51403784);\n\
    c = md5_gg(c, d, a, b, x[i+ 7], 14,  1735328473);\n\
    b = md5_gg(b, c, d, a, x[i+12], 20, -1926607734);\n\
\n\
    a = md5_hh(a, b, c, d, x[i+ 5], 4 , -378558);\n\
    d = md5_hh(d, a, b, c, x[i+ 8], 11, -2022574463);\n\
    c = md5_hh(c, d, a, b, x[i+11], 16,  1839030562);\n\
    b = md5_hh(b, c, d, a, x[i+14], 23, -35309556);\n\
    a = md5_hh(a, b, c, d, x[i+ 1], 4 , -1530992060);\n\
    d = md5_hh(d, a, b, c, x[i+ 4], 11,  1272893353);\n\
    c = md5_hh(c, d, a, b, x[i+ 7], 16, -155497632);\n\
    b = md5_hh(b, c, d, a, x[i+10], 23, -1094730640);\n\
    a = md5_hh(a, b, c, d, x[i+13], 4 ,  681279174);\n\
    d = md5_hh(d, a, b, c, x[i+ 0], 11, -358537222);\n\
    c = md5_hh(c, d, a, b, x[i+ 3], 16, -722521979);\n\
    b = md5_hh(b, c, d, a, x[i+ 6], 23,  76029189);\n\
    a = md5_hh(a, b, c, d, x[i+ 9], 4 , -640364487);\n\
    d = md5_hh(d, a, b, c, x[i+12], 11, -421815835);\n\
    c = md5_hh(c, d, a, b, x[i+15], 16,  530742520);\n\
    b = md5_hh(b, c, d, a, x[i+ 2], 23, -995338651);\n\
\n\
    a = md5_ii(a, b, c, d, x[i+ 0], 6 , -198630844);\n\
    d = md5_ii(d, a, b, c, x[i+ 7], 10,  1126891415);\n\
    c = md5_ii(c, d, a, b, x[i+14], 15, -1416354905);\n\
    b = md5_ii(b, c, d, a, x[i+ 5], 21, -57434055);\n\
    a = md5_ii(a, b, c, d, x[i+12], 6 ,  1700485571);\n\
    d = md5_ii(d, a, b, c, x[i+ 3], 10, -1894986606);\n\
    c = md5_ii(c, d, a, b, x[i+10], 15, -1051523);\n\
    b = md5_ii(b, c, d, a, x[i+ 1], 21, -2054922799);\n\
    a = md5_ii(a, b, c, d, x[i+ 8], 6 ,  1873313359);\n\
    d = md5_ii(d, a, b, c, x[i+15], 10, -30611744);\n\
    c = md5_ii(c, d, a, b, x[i+ 6], 15, -1560198380);\n\
    b = md5_ii(b, c, d, a, x[i+13], 21,  1309151649);\n\
    a = md5_ii(a, b, c, d, x[i+ 4], 6 , -145523070);\n\
    d = md5_ii(d, a, b, c, x[i+11], 10, -1120210379);\n\
    c = md5_ii(c, d, a, b, x[i+ 2], 15,  718787259);\n\
    b = md5_ii(b, c, d, a, x[i+ 9], 21, -343485551);\n\
\n\
    a = safe_add(a, olda);\n\
    b = safe_add(b, oldb);\n\
    c = safe_add(c, oldc);\n\
    d = safe_add(d, oldd);\n\
  }\n\
  return Array(a, b, c, d);\n\
\n\
}\n\
\n\
/*\n\
 * These functions implement the four basic operations the algorithm uses.\n\
 */\n\
function md5_cmn(q, a, b, x, s, t)\n\
{\n\
  return safe_add(bit_rol(safe_add(safe_add(a, q), safe_add(x, t)), s),b);\n\
}\n\
function md5_ff(a, b, c, d, x, s, t)\n\
{\n\
  return md5_cmn((b & c) | ((~b) & d), a, b, x, s, t);\n\
}\n\
function md5_gg(a, b, c, d, x, s, t)\n\
{\n\
  return md5_cmn((b & d) | (c & (~d)), a, b, x, s, t);\n\
}\n\
function md5_hh(a, b, c, d, x, s, t)\n\
{\n\
  return md5_cmn(b ^ c ^ d, a, b, x, s, t);\n\
}\n\
function md5_ii(a, b, c, d, x, s, t)\n\
{\n\
  return md5_cmn(c ^ (b | (~d)), a, b, x, s, t);\n\
}\n\
\n\
/*\n\
 * Calculate the HMAC-MD5, of a key and some data\n\
 */\n\
function core_hmac_md5(key, data)\n\
{\n\
  var bkey = str2binl(key);\n\
  if(bkey.length > 16) bkey = core_md5(bkey, key.length * chrsz);\n\
\n\
  var ipad = Array(16), opad = Array(16);\n\
  for(var i = 0; i < 16; i++)\n\
  {\n\
    ipad[i] = bkey[i] ^ 0x36363636;\n\
    opad[i] = bkey[i] ^ 0x5C5C5C5C;\n\
  }\n\
\n\
  var hash = core_md5(ipad.concat(str2binl(data)), 512 + data.length * chrsz);\n\
  return core_md5(opad.concat(hash), 512 + 128);\n\
}\n\
\n\
/*\n\
 * Add integers, wrapping at 2^32. This uses 16-bit operations internally\n\
 * to work around bugs in some JS interpreters.\n\
 */\n\
function safe_add(x, y)\n\
{\n\
  var lsw = (x & 0xFFFF) + (y & 0xFFFF);\n\
  var msw = (x >> 16) + (y >> 16) + (lsw >> 16);\n\
  return (msw << 16) | (lsw & 0xFFFF);\n\
}\n\
\n\
/*\n\
 * Bitwise rotate a 32-bit number to the left.\n\
 */\n\
function bit_rol(num, cnt)\n\
{\n\
  return (num << cnt) | (num >>> (32 - cnt));\n\
}\n\
\n\
/*\n\
 * Convert a string to an array of little-endian words\n\
 * If chrsz is ASCII, characters >255 have their hi-byte silently ignored.\n\
 */\n\
function str2binl(str)\n\
{\n\
  var len = str.length * chrsz, len1 = len>>5;\n\
  var bin = []; bin.length = len1;\n\
  for(var i = 0; i < len; i += chrsz) {bin[i>>5] = 0;}\n\
  var mask = (1 << chrsz) - 1;\n\
  for(var i = 0; i < len; i += chrsz)\n\
    bin[i>>5] |= (str.charCodeAt(i / chrsz) & mask) << (i%32);\n\
  return bin;\n\
}\n\
\n\
/*\n\
 * Convert an array of little-endian words to a string\n\
 */\n\
function binl2str(bin)\n\
{\n\
  var str = \"\";\n\
  var mask = (1 << chrsz) - 1;\n\
  for(var i = 0; i < bin.length * 32; i += chrsz)\n\
    str += String.fromCharCode((bin[i>>5] >>> (i % 32)) & mask);\n\
  return str;\n\
}\n\
\n\
/*\n\
 * Convert an array of little-endian words to a hex string.\n\
 */\n\
function binl2hex(binarray)\n\
{\n\
  var hex_tab = hexcase ? \"0123456789ABCDEF\" : \"0123456789abcdef\";\n\
  var str = \"\";\n\
  for(var i = 0; i < binarray.length * 4; i++)\n\
  {\n\
    str += hex_tab.charAt((binarray[i>>2] >> ((i%4)*8+4)) & 0xF) +\n\
           hex_tab.charAt((binarray[i>>2] >> ((i%4)*8  )) & 0xF);\n\
  }\n\
  return str;\n\
}\n\
\n\
/*\n\
 * Convert an array of little-endian words to a base-64 string\n\
 */\n\
function binl2b64(binarray)\n\
{\n\
  var tab = \"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/\";\n\
  var str = \"\";\n\
  for(var i = 0; i < binarray.length * 4; i += 3)\n\
  {\n\
    var triplet = (((binarray[i   >> 2] >> 8 * ( i   %4)) & 0xFF) << 16)\n\
                | (((binarray[i+1 >> 2] >> 8 * ((i+1)%4)) & 0xFF) << 8 )\n\
                |  ((binarray[i+2 >> 2] >> 8 * ((i+2)%4)) & 0xFF);\n\
    for(var j = 0; j < 4; j++)\n\
    {\n\
      if(i * 8 + j * 6 > binarray.length * 32) str += b64pad;\n\
      else str += tab.charAt((triplet >> 6*(3-j)) & 0x3F);\n\
    }\n\
  }\n\
  return str;\n\
}\n\
\n\
var plainText = \"Rebellious subjects, enemies to peace,\\n\\\n\
Profaners of this neighbour-stained steel,--\\n\\\n\
Will they not hear? What, ho! you men, you beasts,\\n\\\n\
That quench the fire of your pernicious rage\\n\\\n\
With purple fountains issuing from your veins,\\n\\\n\
On pain of torture, from those bloody hands\\n\\\n\
Throw your mistemper'd weapons to the ground,\\n\\\n\
And hear the sentence of your moved prince.\\n\\\n\
Three civil brawls, bred of an airy word,\\n\\\n\
By thee, old Capulet, and Montague,\\n\\\n\
Have thrice disturb'd the quiet of our streets,\\n\\\n\
And made Verona's ancient citizens\\n\\\n\
Cast by their grave beseeming ornaments,\\n\\\n\
To wield old partisans, in hands as old,\\n\\\n\
Canker'd with peace, to part your canker'd hate:\\n\\\n\
If ever you disturb our streets again,\\n\\\n\
Your lives shall pay the forfeit of the peace.\\n\\\n\
For this time, all the rest depart away:\\n\\\n\
You Capulet; shall go along with me:\\n\\\n\
And, Montague, come you this afternoon,\\n\\\n\
To know our further pleasure in this case,\\n\\\n\
To old Free-town, our common judgment-place.\\n\\\n\
Once more, on pain of death, all men depart.\"\n\
\n\
for (var i = 0; i < 13; i++) {\n\
    plainText += plainText;\n\
}\n\
\n\
var md5Output = hex_md5(plainText);\n\
\n\
\n\
var _sunSpiderInterval = new Date() - _sunSpiderStartDate;\n\
\n\
record(_sunSpiderInterval);\n\
</script>\n\
\n\
\n\
</body>\n\
</html>\n\
", "<!DOCTYPE html>\n\
<head>\n\
\n\
<meta charset=utf8>\n\
\n\
<!--\n\
 Copyright (C) 2007 Apple Inc.  All rights reserved.\n\
\n\
 Redistribution and use in source and binary forms, with or without\n\
 modification, are permitted provided that the following conditions\n\
 are met:\n\
 1. Redistributions of source code must retain the above copyright\n\
    notice, this list of conditions and the following disclaimer.\n\
 2. Redistributions in binary form must reproduce the above copyright\n\
    notice, this list of conditions and the following disclaimer in the\n\
    documentation and/or other materials provided with the distribution.\n\
\n\
 THIS SOFTWARE IS PROVIDED BY APPLE COMPUTER, INC. ``AS IS'' AND ANY\n\
 EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE\n\
 IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR\n\
 PURPOSE ARE DISCLAIMED.  IN NO EVENT SHALL APPLE COMPUTER, INC. OR\n\
 CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,\n\
 EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO,\n\
 PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR\n\
 PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY\n\
 OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT\n\
 (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE\n\
 OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE. \n\
-->\n\
\n\
<title>SunSpider crypto-sha1</title>\n\
<link rel=\"stylesheet\" href=\"sunspider.css\">\n\
</head>\n\
\n\
<body>\n\
<h3>crypto-sha1</h3>\n\
<div id=\"console\">\n\
</div>\n\
<script>\n\
function record(time) {\n\
    document.getElementById(\"console\").innerHTML = time + \"ms\";\n\
    if (window.parent) {\n\
        parent.recordResult(time);\n\
    }\n\
}\n\
\n\
var _sunSpiderStartDate = new Date();\n\
\n\
/*\n\
 * A JavaScript implementation of the Secure Hash Algorithm, SHA-1, as defined\n\
 * in FIPS PUB 180-1\n\
 * Version 2.1a Copyright Paul Johnston 2000 - 2002.\n\
 * Other contributors: Greg Holt, Andrew Kepert, Ydnar, Lostinet\n\
 * Distributed under the BSD License\n\
 * See http://pajhome.org.uk/crypt/md5 for details.\n\
 */\n\
\n\
/*\n\
 * Configurable variables. You may need to tweak these to be compatible with\n\
 * the server-side, but the defaults work in most cases.\n\
 */\n\
var hexcase = 0;  /* hex output format. 0 - lowercase; 1 - uppercase        */\n\
var b64pad  = \"\"; /* base-64 pad character. \"=\" for strict RFC compliance   */\n\
var chrsz   = 8;  /* bits per input character. 8 - ASCII; 16 - Unicode      */\n\
\n\
/*\n\
 * These are the functions you'll usually want to call\n\
 * They take string arguments and return either hex or base-64 encoded strings\n\
 */\n\
function hex_sha1(s){return binb2hex(core_sha1(str2binb(s),s.length * chrsz));}\n\
function b64_sha1(s){return binb2b64(core_sha1(str2binb(s),s.length * chrsz));}\n\
function str_sha1(s){return binb2str(core_sha1(str2binb(s),s.length * chrsz));}\n\
function hex_hmac_sha1(key, data){ return binb2hex(core_hmac_sha1(key, data));}\n\
function b64_hmac_sha1(key, data){ return binb2b64(core_hmac_sha1(key, data));}\n\
function str_hmac_sha1(key, data){ return binb2str(core_hmac_sha1(key, data));}\n\
\n\
/*\n\
 * Perform a simple self-test to see if the VM is working\n\
 */\n\
function sha1_vm_test()\n\
{\n\
  return hex_sha1(\"abc\") == \"a9993e364706816aba3e25717850c26c9cd0d89d\";\n\
}\n\
\n\
/*\n\
 * Calculate the SHA-1 of an array of big-endian words, and a bit length\n\
 */\n\
function core_sha1(x, len)\n\
{\n\
  /* append padding */\n\
  x[len >> 5] |= 0x80 << (24 - len % 32);\n\
  x[((len + 64 >> 9) << 4) + 15] = len;\n\
\n\
  var w = Array(80);\n\
  var a =  1732584193;\n\
  var b = -271733879;\n\
  var c = -1732584194;\n\
  var d =  271733878;\n\
  var e = -1009589776;\n\
\n\
  for(var i = 0; i < x.length; i += 16)\n\
  {\n\
    var olda = a;\n\
    var oldb = b;\n\
    var oldc = c;\n\
    var oldd = d;\n\
    var olde = e;\n\
\n\
    for(var j = 0; j < 80; j++)\n\
    {\n\
      if(j < 16) w[j] = x[i + j];\n\
      else w[j] = rol(w[j-3] ^ w[j-8] ^ w[j-14] ^ w[j-16], 1);\n\
      var t = safe_add(safe_add(rol(a, 5), sha1_ft(j, b, c, d)),\n\
                       safe_add(safe_add(e, w[j]), sha1_kt(j)));\n\
      e = d;\n\
      d = c;\n\
      c = rol(b, 30);\n\
      b = a;\n\
      a = t;\n\
    }\n\
\n\
    a = safe_add(a, olda);\n\
    b = safe_add(b, oldb);\n\
    c = safe_add(c, oldc);\n\
    d = safe_add(d, oldd);\n\
    e = safe_add(e, olde);\n\
  }\n\
  return Array(a, b, c, d, e);\n\
\n\
}\n\
\n\
/*\n\
 * Perform the appropriate triplet combination function for the current\n\
 * iteration\n\
 */\n\
function sha1_ft(t, b, c, d)\n\
{\n\
  if(t < 20) return (b & c) | ((~b) & d);\n\
  if(t < 40) return b ^ c ^ d;\n\
  if(t < 60) return (b & c) | (b & d) | (c & d);\n\
  return b ^ c ^ d;\n\
}\n\
\n\
/*\n\
 * Determine the appropriate additive constant for the current iteration\n\
 */\n\
function sha1_kt(t)\n\
{\n\
  return (t < 20) ?  1518500249 : (t < 40) ?  1859775393 :\n\
         (t < 60) ? -1894007588 : -899497514;\n\
}\n\
\n\
/*\n\
 * Calculate the HMAC-SHA1 of a key and some data\n\
 */\n\
function core_hmac_sha1(key, data)\n\
{\n\
  var bkey = str2binb(key);\n\
  if(bkey.length > 16) bkey = core_sha1(bkey, key.length * chrsz);\n\
\n\
  var ipad = Array(16), opad = Array(16);\n\
  for(var i = 0; i < 16; i++)\n\
  {\n\
    ipad[i] = bkey[i] ^ 0x36363636;\n\
    opad[i] = bkey[i] ^ 0x5C5C5C5C;\n\
  }\n\
\n\
  var hash = core_sha1(ipad.concat(str2binb(data)), 512 + data.length * chrsz);\n\
  return core_sha1(opad.concat(hash), 512 + 160);\n\
}\n\
\n\
/*\n\
 * Add integers, wrapping at 2^32. This uses 16-bit operations internally\n\
 * to work around bugs in some JS interpreters.\n\
 */\n\
function safe_add(x, y)\n\
{\n\
  var lsw = (x & 0xFFFF) + (y & 0xFFFF);\n\
  var msw = (x >> 16) + (y >> 16) + (lsw >> 16);\n\
  return (msw << 16) | (lsw & 0xFFFF);\n\
}\n\
\n\
/*\n\
 * Bitwise rotate a 32-bit number to the left.\n\
 */\n\
function rol(num, cnt)\n\
{\n\
  return (num << cnt) | (num >>> (32 - cnt));\n\
}\n\
\n\
/*\n\
 * Convert an 8-bit or 16-bit string to an array of big-endian words\n\
 * In 8-bit function, characters >255 have their hi-byte silently ignored.\n\
 */\n\
function str2binb(str)\n\
{\n\
  var len = str.length * chrsz, len1 = len>>5;\n\
  var bin = []; bin.length = len1;\n\
  for(var i = 0; i < len; i += chrsz) { bin[i>>5] = 0; }\n\
  var mask = (1 << chrsz) - 1;\n\
  for(var i = 0; i < len; i += chrsz)\n\
    bin[i>>5] |= (str.charCodeAt(i / chrsz) & mask) << (32 - chrsz - i%32);\n\
  return bin;\n\
}\n\
\n\
/*\n\
 * Convert an array of big-endian words to a string\n\
 */\n\
function binb2str(bin)\n\
{\n\
  var str = \"\";\n\
  var mask = (1 << chrsz) - 1;\n\
  for(var i = 0; i < bin.length * 32; i += chrsz)\n\
    str += String.fromCharCode((bin[i>>5] >>> (32 - chrsz - i%32)) & mask);\n\
  return str;\n\
}\n\
\n\
/*\n\
 * Convert an array of big-endian words to a hex string.\n\
 */\n\
function binb2hex(binarray)\n\
{\n\
  var hex_tab = hexcase ? \"0123456789ABCDEF\" : \"0123456789abcdef\";\n\
  var str = \"\";\n\
  for(var i = 0; i < binarray.length * 4; i++)\n\
  {\n\
    str += hex_tab.charAt((binarray[i>>2] >> ((3 - i%4)*8+4)) & 0xF) +\n\
           hex_tab.charAt((binarray[i>>2] >> ((3 - i%4)*8  )) & 0xF);\n\
  }\n\
  return str;\n\
}\n\
\n\
/*\n\
 * Convert an array of big-endian words to a base-64 string\n\
 */\n\
function binb2b64(binarray)\n\
{\n\
  var tab = \"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/\";\n\
  var str = \"\";\n\
  for(var i = 0; i < binarray.length * 4; i += 3)\n\
  {\n\
    var triplet = (((binarray[i   >> 2] >> 8 * (3 -  i   %4)) & 0xFF) << 16)\n\
                | (((binarray[i+1 >> 2] >> 8 * (3 - (i+1)%4)) & 0xFF) << 8 )\n\
                |  ((binarray[i+2 >> 2] >> 8 * (3 - (i+2)%4)) & 0xFF);\n\
    for(var j = 0; j < 4; j++)\n\
    {\n\
      if(i * 8 + j * 6 > binarray.length * 32) str += b64pad;\n\
      else str += tab.charAt((triplet >> 6*(3-j)) & 0x3F);\n\
    }\n\
  }\n\
  return str;\n\
}\n\
\n\
\n\
var plainText = \"Two households, both alike in dignity,\\n\\\n\
In fair Verona, where we lay our scene,\\n\\\n\
From ancient grudge break to new mutiny,\\n\\\n\
Where civil blood makes civil hands unclean.\\n\\\n\
From forth the fatal loins of these two foes\\n\\\n\
A pair of star-cross'd lovers take their life;\\n\\\n\
Whole misadventured piteous overthrows\\n\\\n\
Do with their death bury their parents' strife.\\n\\\n\
The fearful passage of their death-mark'd love,\\n\\\n\
And the continuance of their parents' rage,\\n\\\n\
Which, but their children's end, nought could remove,\\n\\\n\
Is now the two hours' traffic of our stage;\\n\\\n\
The which if you with patient ears attend,\\n\\\n\
What here shall miss, our toil shall strive to mend.\";\n\
\n\
for (var i = 0; i < 14; i++) {\n\
    plainText += plainText;\n\
}\n\
\n\
var sha1Output = hex_sha1(plainText);\n\
var sha1Output = hex_sha1(plainText);\n\
\n\
\n\
var _sunSpiderInterval = new Date() - _sunSpiderStartDate;\n\
\n\
record(_sunSpiderInterval);\n\
</script>\n\
\n\
\n\
</body>\n\
</html>\n\
", "<!DOCTYPE html>\n\
<head>\n\
\n\
<meta charset=utf8>\n\
\n\
<!--\n\
 Copyright (C) 2007 Apple Inc.  All rights reserved.\n\
\n\
 Redistribution and use in source and binary forms, with or without\n\
 modification, are permitted provided that the following conditions\n\
 are met:\n\
 1. Redistributions of source code must retain the above copyright\n\
    notice, this list of conditions and the following disclaimer.\n\
 2. Redistributions in binary form must reproduce the above copyright\n\
    notice, this list of conditions and the following disclaimer in the\n\
    documentation and/or other materials provided with the distribution.\n\
\n\
 THIS SOFTWARE IS PROVIDED BY APPLE COMPUTER, INC. ``AS IS'' AND ANY\n\
 EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE\n\
 IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR\n\
 PURPOSE ARE DISCLAIMED.  IN NO EVENT SHALL APPLE COMPUTER, INC. OR\n\
 CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,\n\
 EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO,\n\
 PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR\n\
 PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY\n\
 OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT\n\
 (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE\n\
 OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE. \n\
-->\n\
\n\
<title>SunSpider date-format-tofte</title>\n\
<link rel=\"stylesheet\" href=\"sunspider.css\">\n\
</head>\n\
\n\
<body>\n\
<h3>date-format-tofte</h3>\n\
<div id=\"console\">\n\
</div>\n\
<script>\n\
function record(time) {\n\
    document.getElementById(\"console\").innerHTML = time + \"ms\";\n\
    if (window.parent) {\n\
        parent.recordResult(time);\n\
    }\n\
}\n\
\n\
var _sunSpiderStartDate = new Date();\n\
\n\
function arrayExists(array, x) {\n\
    for (var i = 0; i < array.length; i++) {\n\
        if (array[i] == x) return true;\n\
    }\n\
    return false;\n\
}\n\
\n\
Date.prototype.formatDate = function (input,time) {\n\
    // formatDate :\n\
    // a PHP date like function, for formatting date strings\n\
    // See: http://www.php.net/date\n\
    //\n\
    // input : format string\n\
    // time : epoch time (seconds, and optional)\n\
    //\n\
    // if time is not passed, formatting is based on \n\
    // the current \"this\" date object's set time.\n\
    //\n\
    // supported:\n\
    // a, A, B, d, D, F, g, G, h, H, i, j, l (lowercase L), L, \n\
    // m, M, n, O, r, s, S, t, U, w, W, y, Y, z\n\
    //\n\
    // unsupported:\n\
    // I (capital i), T, Z    \n\
\n\
    var switches =    [\"a\", \"A\", \"B\", \"d\", \"D\", \"F\", \"g\", \"G\", \"h\", \"H\", \n\
                       \"i\", \"j\", \"l\", \"L\", \"m\", \"M\", \"n\", \"O\", \"r\", \"s\", \n\
                       \"S\", \"t\", \"U\", \"w\", \"W\", \"y\", \"Y\", \"z\"];\n\
    var daysLong =    [\"Sunday\", \"Monday\", \"Tuesday\", \"Wednesday\", \n\
                       \"Thursday\", \"Friday\", \"Saturday\"];\n\
    var daysShort =   [\"Sun\", \"Mon\", \"Tue\", \"Wed\", \n\
                       \"Thu\", \"Fri\", \"Sat\"];\n\
    var monthsShort = [\"Jan\", \"Feb\", \"Mar\", \"Apr\",\n\
                       \"May\", \"Jun\", \"Jul\", \"Aug\", \"Sep\",\n\
                       \"Oct\", \"Nov\", \"Dec\"];\n\
    var monthsLong =  [\"January\", \"February\", \"March\", \"April\",\n\
                       \"May\", \"June\", \"July\", \"August\", \"September\",\n\
                       \"October\", \"November\", \"December\"];\n\
    var daysSuffix = [\"st\", \"nd\", \"rd\", \"th\", \"th\", \"th\", \"th\", // 1st - 7th\n\
                      \"th\", \"th\", \"th\", \"th\", \"th\", \"th\", \"th\", // 8th - 14th\n\
                      \"th\", \"th\", \"th\", \"th\", \"th\", \"th\", \"st\", // 15th - 21st\n\
                      \"nd\", \"rd\", \"th\", \"th\", \"th\", \"th\", \"th\", // 22nd - 28th\n\
                      \"th\", \"th\", \"st\"];                        // 29th - 31st\n\
\n\
    function a() {\n\
        // Lowercase Ante meridiem and Post meridiem\n\
        return self.getHours() > 11? \"pm\" : \"am\";\n\
    }\n\
    function A() {\n\
        // Uppercase Ante meridiem and Post meridiem\n\
        return self.getHours() > 11? \"PM\" : \"AM\";\n\
    }\n\
\n\
    function B(){\n\
        // Swatch internet time. code simply grabbed from ppk,\n\
        // since I was feeling lazy:\n\
        // http://www.xs4all.nl/~ppk/js/beat.html\n\
        var off = (self.getTimezoneOffset() + 60)*60;\n\
        var theSeconds = (self.getHours() * 3600) + \n\
                         (self.getMinutes() * 60) + \n\
                          self.getSeconds() + off;\n\
        var beat = Math.floor(theSeconds/86.4);\n\
        if (beat > 1000) beat -= 1000;\n\
        if (beat < 0) beat += 1000;\n\
        if ((\"\"+beat).length == 1) beat = \"00\"+beat;\n\
        if ((\"\"+beat).length == 2) beat = \"0\"+beat;\n\
        return beat;\n\
    }\n\
    \n\
    function d() {\n\
        // Day of the month, 2 digits with leading zeros\n\
        return new String(self.getDate()).length == 1?\n\
        \"0\"+self.getDate() : self.getDate();\n\
    }\n\
    function D() {\n\
        // A textual representation of a day, three letters\n\
        return daysShort[self.getDay()];\n\
    }\n\
    function F() {\n\
        // A full textual representation of a month\n\
        return monthsLong[self.getMonth()];\n\
    }\n\
    function g() {\n\
        // 12-hour format of an hour without leading zeros\n\
        return self.getHours() > 12? self.getHours()-12 : self.getHours();\n\
    }\n\
    function G() {\n\
        // 24-hour format of an hour without leading zeros\n\
        return self.getHours();\n\
    }\n\
    function h() {\n\
        // 12-hour format of an hour with leading zeros\n\
        if (self.getHours() > 12) {\n\
          var s = new String(self.getHours()-12);\n\
          return s.length == 1?\n\
          \"0\"+ (self.getHours()-12) : self.getHours()-12;\n\
        } else { \n\
          var s = new String(self.getHours());\n\
          return s.length == 1?\n\
          \"0\"+self.getHours() : self.getHours();\n\
        }  \n\
    }\n\
    function H() {\n\
        // 24-hour format of an hour with leading zeros\n\
        return new String(self.getHours()).length == 1?\n\
        \"0\"+self.getHours() : self.getHours();\n\
    }\n\
    function i() {\n\
        // Minutes with leading zeros\n\
        return new String(self.getMinutes()).length == 1? \n\
        \"0\"+self.getMinutes() : self.getMinutes(); \n\
    }\n\
    function j() {\n\
        // Day of the month without leading zeros\n\
        return self.getDate();\n\
    }    \n\
    function l() {\n\
        // A full textual representation of the day of the week\n\
        return daysLong[self.getDay()];\n\
    }\n\
    function L() {\n\
        // leap year or not. 1 if leap year, 0 if not.\n\
        // the logic should match iso's 8601 standard.\n\
        var y_ = Y();\n\
        if (         \n\
            (y_ % 4 == 0 && y_ % 100 != 0) ||\n\
            (y_ % 4 == 0 && y_ % 100 == 0 && y_ % 400 == 0)\n\
            ) {\n\
            return 1;\n\
        } else {\n\
            return 0;\n\
        }\n\
    }\n\
    function m() {\n\
        // Numeric representation of a month, with leading zeros\n\
        return self.getMonth() < 9?\n\
        \"0\"+(self.getMonth()+1) : \n\
        self.getMonth()+1;\n\
    }\n\
    function M() {\n\
        // A short textual representation of a month, three letters\n\
        return monthsShort[self.getMonth()];\n\
    }\n\
    function n() {\n\
        // Numeric representation of a month, without leading zeros\n\
        return self.getMonth()+1;\n\
    }\n\
    function O() {\n\
        // Difference to Greenwich time (GMT) in hours\n\
        var os = Math.abs(self.getTimezoneOffset());\n\
        var h = \"\"+Math.floor(os/60);\n\
        var m = \"\"+(os%60);\n\
        h.length == 1? h = \"0\"+h:1;\n\
        m.length == 1? m = \"0\"+m:1;\n\
        return self.getTimezoneOffset() < 0 ? \"+\"+h+m : \"-\"+h+m;\n\
    }\n\
    function r() {\n\
        // RFC 822 formatted date\n\
        var r; // result\n\
        //  Thu    ,     21          Dec         2000\n\
        r = D() + \", \" + j() + \" \" + M() + \" \" + Y() +\n\
        //        16     :    01     :    07          +0200\n\
            \" \" + H() + \":\" + i() + \":\" + s() + \" \" + O();\n\
        return r;\n\
    }\n\
    function S() {\n\
        // English ordinal suffix for the day of the month, 2 characters\n\
        return daysSuffix[self.getDate()-1];\n\
    }\n\
    function s() {\n\
        // Seconds, with leading zeros\n\
        return new String(self.getSeconds()).length == 1?\n\
        \"0\"+self.getSeconds() : self.getSeconds();\n\
    }\n\
    function t() {\n\
\n\
        // thanks to Matt Bannon for some much needed code-fixes here!\n\
        var daysinmonths = [null,31,28,31,30,31,30,31,31,30,31,30,31];\n\
        if (L()==1 && n()==2) return 29; // leap day\n\
        return daysinmonths[n()];\n\
    }\n\
    function U() {\n\
        // Seconds since the Unix Epoch (January 1 1970 00:00:00 GMT)\n\
        return Math.round(self.getTime()/1000);\n\
    }\n\
    function W() {\n\
        // Weeknumber, as per ISO specification:\n\
        // http://www.cl.cam.ac.uk/~mgk25/iso-time.html\n\
        \n\
        // if the day is three days before newyears eve,\n\
        // there's a chance it's \"week 1\" of next year.\n\
        // here we check for that.\n\
        var beforeNY = 364+L() - z();\n\
        var afterNY  = z();\n\
        var weekday = w()!=0?w()-1:6; // makes sunday (0), into 6.\n\
        if (beforeNY <= 2 && weekday <= 2-beforeNY) {\n\
            return 1;\n\
        }\n\
        // similarly, if the day is within threedays of newyears\n\
        // there's a chance it belongs in the old year.\n\
        var ny = new Date(\"January 1 \" + Y() + \" 00:00:00\");\n\
        var nyDay = ny.getDay()!=0?ny.getDay()-1:6;\n\
        if (\n\
            (afterNY <= 2) && \n\
            (nyDay >=4)  && \n\
            (afterNY >= (6-nyDay))\n\
            ) {\n\
            // Since I'm not sure we can just always return 53,\n\
            // i call the function here again, using the last day\n\
            // of the previous year, as the date, and then just\n\
            // return that week.\n\
            var prevNY = new Date(\"December 31 \" + (Y()-1) + \" 00:00:00\");\n\
            return prevNY.formatDate(\"W\");\n\
        }\n\
        \n\
        // week 1, is the week that has the first thursday in it.\n\
        // note that this value is not zero index.\n\
        if (nyDay <= 3) {\n\
            // first day of the year fell on a thursday, or earlier.\n\
            return 1 + Math.floor( ( z() + nyDay ) / 7 );\n\
        } else {\n\
            // first day of the year fell on a friday, or later.\n\
            return 1 + Math.floor( ( z() - ( 7 - nyDay ) ) / 7 );\n\
        }\n\
    }\n\
    function w() {\n\
        // Numeric representation of the day of the week\n\
        return self.getDay();\n\
    }\n\
    \n\
    function Y() {\n\
        // A full numeric representation of a year, 4 digits\n\
\n\
        // we first check, if getFullYear is supported. if it\n\
        // is, we just use that. ppks code is nice, but wont\n\
        // work with dates outside 1900-2038, or something like that\n\
        if (self.getFullYear) {\n\
            var newDate = new Date(\"January 1 2001 00:00:00 +0000\");\n\
            var x = newDate .getFullYear();\n\
            if (x == 2001) {              \n\
                // i trust the method now\n\
                return self.getFullYear();\n\
            }\n\
        }\n\
        // else, do this:\n\
        // codes thanks to ppk:\n\
        // http://www.xs4all.nl/~ppk/js/introdate.html\n\
        var x = self.getYear();\n\
        var y = x % 100;\n\
        y += (y < 38) ? 2000 : 1900;\n\
        return y;\n\
    }\n\
    function y() {\n\
        // A two-digit representation of a year\n\
        var y = Y()+\"\";\n\
        return y.substring(y.length-2,y.length);\n\
    }\n\
    function z() {\n\
        // The day of the year, zero indexed! 0 through 366\n\
        var t = new Date(\"January 1 \" + Y() + \" 00:00:00\");\n\
        var diff = self.getTime() - t.getTime();\n\
        return Math.floor(diff/1000/60/60/24);\n\
    }\n\
        \n\
    var self = this;\n\
    if (time) {\n\
        // save time\n\
        var prevTime = self.getTime();\n\
        self.setTime(time);\n\
    }\n\
    \n\
    var ia = input.split(\"\");\n\
    var ij = 0, len = ia.length;\n\
    while (ij < len) {\n\
        if (ia[ij] == \"\\\\\") {\n\
            // this is our way of allowing users to escape stuff\n\
            ia.splice(ij,1);\n\
        } else {\n\
            if (arrayExists(switches,ia[ij])) {\n\
                ia[ij] = eval(ia[ij] + \"()\");\n\
            }\n\
        }\n\
        ij++;\n\
    }\n\
    // reset time, back to what it was\n\
    if (prevTime) {\n\
        self.setTime(prevTime);\n\
    }\n\
    return ia.join(\"\");\n\
}\n\
\n\
var date = new Date(\"1/1/2007 1:11:11\");\n\
\n\
for (i = 0; i < 20000; ++i) {\n\
    var shortFormat = date.formatDate(\"Y-m-d\");\n\
    var longFormat = date.formatDate(\"l, F d, Y g:i:s A\");\n\
    date.setTime(date.getTime() + 84266956);\n\
}\n\
\n\
\n\
\n\
var _sunSpiderInterval = new Date() - _sunSpiderStartDate;\n\
\n\
record(_sunSpiderInterval);\n\
</script>\n\
\n\
\n\
</body>\n\
</html>\n\
", "<!DOCTYPE html>\n\
<head>\n\
\n\
<meta charset=utf8>\n\
\n\
<!--\n\
 Copyright (C) 2007 Apple Inc.  All rights reserved.\n\
\n\
 Redistribution and use in source and binary forms, with or without\n\
 modification, are permitted provided that the following conditions\n\
 are met:\n\
 1. Redistributions of source code must retain the above copyright\n\
    notice, this list of conditions and the following disclaimer.\n\
 2. Redistributions in binary form must reproduce the above copyright\n\
    notice, this list of conditions and the following disclaimer in the\n\
    documentation and/or other materials provided with the distribution.\n\
\n\
 THIS SOFTWARE IS PROVIDED BY APPLE COMPUTER, INC. ``AS IS'' AND ANY\n\
 EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE\n\
 IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR\n\
 PURPOSE ARE DISCLAIMED.  IN NO EVENT SHALL APPLE COMPUTER, INC. OR\n\
 CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,\n\
 EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO,\n\
 PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR\n\
 PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY\n\
 OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT\n\
 (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE\n\
 OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE. \n\
-->\n\
\n\
<title>SunSpider 3d-cube</title>\n\
<link rel=\"stylesheet\" href=\"../sunspider.css\">\n\
</head>\n\
\n\
<body>\n\
<h3>3d-cube</h3>\n\
<div id=\"console\">\n\
</div>\n\
<script>\n\
function record(time) {\n\
    document.getElementById(\"console\").innerHTML = time + \"ms\";\n\
    if (window.parent) {\n\
        parent.recordResult(time);\n\
    }\n\
}\n\
\n\
var _sunSpiderStartDate = new Date();\n\
\n\
// 3D Cube Rotation\n\
// http://www.speich.net/computer/moztesting/3d.htm\n\
// Created by Simon Speich\n\
\n\
var Q = new Array();\n\
var MTrans = new Array();  // transformation matrix\n\
var MQube = new Array();  // position information of qube\n\
var I = new Array();      // entity matrix\n\
var Origin = new Object();\n\
var Testing = new Object();\n\
var LoopTimer;\n\
\n\
var DisplArea = new Object();\n\
DisplArea.Width = 300;\n\
DisplArea.Height = 300;\n\
\n\
function DrawLine(From, To) {\n\
  var x1 = From.V[0];\n\
  var x2 = To.V[0];\n\
  var y1 = From.V[1];\n\
  var y2 = To.V[1];\n\
  var dx = Math.abs(x2 - x1);\n\
  var dy = Math.abs(y2 - y1);\n\
  var x = x1;\n\
  var y = y1;\n\
  var IncX1, IncY1;\n\
  var IncX2, IncY2;  \n\
  var Den;\n\
  var Num;\n\
  var NumAdd;\n\
  var NumPix;\n\
\n\
  if (x2 >= x1) {  IncX1 = 1; IncX2 = 1;  }\n\
  else { IncX1 = -1; IncX2 = -1; }\n\
  if (y2 >= y1)  {  IncY1 = 1; IncY2 = 1; }\n\
  else { IncY1 = -1; IncY2 = -1; }\n\
  if (dx >= dy) {\n\
    IncX1 = 0;\n\
    IncY2 = 0;\n\
    Den = dx;\n\
    Num = dx / 2;\n\
    NumAdd = dy;\n\
    NumPix = dx;\n\
  }\n\
  else {\n\
    IncX2 = 0;\n\
    IncY1 = 0;\n\
    Den = dy;\n\
    Num = dy / 2;\n\
    NumAdd = dx;\n\
    NumPix = dy;\n\
  }\n\
\n\
  NumPix = Math.round(Q.LastPx + NumPix);\n\
\n\
  var i = Q.LastPx;\n\
  for (; i < NumPix; i++) {\n\
    Num += NumAdd;\n\
    if (Num >= Den) {\n\
      Num -= Den;\n\
      x += IncX1;\n\
      y += IncY1;\n\
    }\n\
    x += IncX2;\n\
    y += IncY2;\n\
  }\n\
  Q.LastPx = NumPix;\n\
}\n\
\n\
function CalcCross(V0, V1) {\n\
  var Cross = new Array();\n\
  Cross[0] = V0[1]*V1[2] - V0[2]*V1[1];\n\
  Cross[1] = V0[2]*V1[0] - V0[0]*V1[2];\n\
  Cross[2] = V0[0]*V1[1] - V0[1]*V1[0];\n\
  return Cross;\n\
}\n\
\n\
function CalcNormal(V0, V1, V2) {\n\
  var A = new Array();   var B = new Array(); \n\
  for (var i = 0; i < 3; i++) {\n\
    A[i] = V0[i] - V1[i];\n\
    B[i] = V2[i] - V1[i];\n\
  }\n\
  A = CalcCross(A, B);\n\
  var Length = Math.sqrt(A[0]*A[0] + A[1]*A[1] + A[2]*A[2]); \n\
  for (var i = 0; i < 3; i++) A[i] = A[i] / Length;\n\
  A[3] = 1;\n\
  return A;\n\
}\n\
\n\
function CreateP(X,Y,Z) {\n\
  this.V = [X,Y,Z,1];\n\
}\n\
\n\
// multiplies two matrices\n\
function MMulti(M1, M2) {\n\
  var M = [[],[],[],[]];\n\
  var i = 0;\n\
  var j = 0;\n\
  for (; i < 4; i++) {\n\
    j = 0;\n\
    for (; j < 4; j++) M[i][j] = M1[i][0] * M2[0][j] + M1[i][1] * M2[1][j] + M1[i][2] * M2[2][j] + M1[i][3] * M2[3][j];\n\
  }\n\
  return M;\n\
}\n\
\n\
//multiplies matrix with vector\n\
function VMulti(M, V) {\n\
  var Vect = new Array();\n\
  var i = 0;\n\
  for (;i < 4; i++) Vect[i] = M[i][0] * V[0] + M[i][1] * V[1] + M[i][2] * V[2] + M[i][3] * V[3];\n\
  return Vect;\n\
}\n\
\n\
function VMulti2(M, V) {\n\
  var Vect = new Float64Array(2);//var Vect = new Array();\n\
  var i = 0;\n\
  for (;i < 3; i++) Vect[i] = M[i][0] * V[0] + M[i][1] * V[1] + M[i][2] * V[2];\n\
  return Vect;\n\
}\n\
\n\
// add to matrices\n\
function MAdd(M1, M2) {\n\
  var M = [[],[],[],[]];\n\
  var i = 0;\n\
  var j = 0;\n\
  for (; i < 4; i++) {\n\
    j = 0;\n\
    for (; j < 4; j++) M[i][j] = M1[i][j] + M2[i][j];\n\
  }\n\
  return M;\n\
}\n\
\n\
function Translate(M, Dx, Dy, Dz) {\n\
  var T = [\n\
  [1,0,0,Dx],\n\
  [0,1,0,Dy],\n\
  [0,0,1,Dz],\n\
  [0,0,0,1]\n\
  ];\n\
  return MMulti(T, M);\n\
}\n\
\n\
function RotateX(M, Phi) {\n\
  var a = Phi;\n\
  a *= Math.PI / 180;\n\
  var Cos = Math.cos(a);\n\
  var Sin = Math.sin(a);\n\
  var R = [\n\
  [1,0,0,0],\n\
  [0,Cos,-Sin,0],\n\
  [0,Sin,Cos,0],\n\
  [0,0,0,1]\n\
  ];\n\
  return MMulti(R, M);\n\
}\n\
\n\
function RotateY(M, Phi) {\n\
  var a = Phi;\n\
  a *= Math.PI / 180;\n\
  var Cos = Math.cos(a);\n\
  var Sin = Math.sin(a);\n\
  var R = [\n\
  [Cos,0,Sin,0],\n\
  [0,1,0,0],\n\
  [-Sin,0,Cos,0],\n\
  [0,0,0,1]\n\
  ];\n\
  return MMulti(R, M);\n\
}\n\
\n\
function RotateZ(M, Phi) {\n\
  var a = Phi;\n\
  a *= Math.PI / 180;\n\
  var Cos = Math.cos(a);\n\
  var Sin = Math.sin(a);\n\
  var R = [\n\
  [Cos,-Sin,0,0],\n\
  [Sin,Cos,0,0],\n\
  [0,0,1,0],   \n\
  [0,0,0,1]\n\
  ];\n\
  return MMulti(R, M);\n\
}\n\
\n\
function DrawQube() {\n\
  // calc current normals\n\
  var CurN = new Array();\n\
  var i = 5;\n\
  Q.LastPx = 0;\n\
  for (; i > -1; i--) CurN[i] = VMulti2(MQube, Q.Normal[i]);\n\
  if (CurN[0][2] < 0) {\n\
    if (!Q.Line[0]) { DrawLine(Q[0], Q[1]); Q.Line[0] = true; };\n\
    if (!Q.Line[1]) { DrawLine(Q[1], Q[2]); Q.Line[1] = true; };\n\
    if (!Q.Line[2]) { DrawLine(Q[2], Q[3]); Q.Line[2] = true; };\n\
    if (!Q.Line[3]) { DrawLine(Q[3], Q[0]); Q.Line[3] = true; };\n\
  }\n\
  if (CurN[1][2] < 0) {\n\
    if (!Q.Line[2]) { DrawLine(Q[3], Q[2]); Q.Line[2] = true; };\n\
    if (!Q.Line[9]) { DrawLine(Q[2], Q[6]); Q.Line[9] = true; };\n\
    if (!Q.Line[6]) { DrawLine(Q[6], Q[7]); Q.Line[6] = true; };\n\
    if (!Q.Line[10]) { DrawLine(Q[7], Q[3]); Q.Line[10] = true; };\n\
  }\n\
  if (CurN[2][2] < 0) {\n\
    if (!Q.Line[4]) { DrawLine(Q[4], Q[5]); Q.Line[4] = true; };\n\
    if (!Q.Line[5]) { DrawLine(Q[5], Q[6]); Q.Line[5] = true; };\n\
    if (!Q.Line[6]) { DrawLine(Q[6], Q[7]); Q.Line[6] = true; };\n\
    if (!Q.Line[7]) { DrawLine(Q[7], Q[4]); Q.Line[7] = true; };\n\
  }\n\
  if (CurN[3][2] < 0) {\n\
    if (!Q.Line[4]) { DrawLine(Q[4], Q[5]); Q.Line[4] = true; };\n\
    if (!Q.Line[8]) { DrawLine(Q[5], Q[1]); Q.Line[8] = true; };\n\
    if (!Q.Line[0]) { DrawLine(Q[1], Q[0]); Q.Line[0] = true; };\n\
    if (!Q.Line[11]) { DrawLine(Q[0], Q[4]); Q.Line[11] = true; };\n\
  }\n\
  if (CurN[4][2] < 0) {\n\
    if (!Q.Line[11]) { DrawLine(Q[4], Q[0]); Q.Line[11] = true; };\n\
    if (!Q.Line[3]) { DrawLine(Q[0], Q[3]); Q.Line[3] = true; };\n\
    if (!Q.Line[10]) { DrawLine(Q[3], Q[7]); Q.Line[10] = true; };\n\
    if (!Q.Line[7]) { DrawLine(Q[7], Q[4]); Q.Line[7] = true; };\n\
  }\n\
  if (CurN[5][2] < 0) {\n\
    if (!Q.Line[8]) { DrawLine(Q[1], Q[5]); Q.Line[8] = true; };\n\
    if (!Q.Line[5]) { DrawLine(Q[5], Q[6]); Q.Line[5] = true; };\n\
    if (!Q.Line[9]) { DrawLine(Q[6], Q[2]); Q.Line[9] = true; };\n\
    if (!Q.Line[1]) { DrawLine(Q[2], Q[1]); Q.Line[1] = true; };\n\
  }\n\
  Q.Line = [false,false,false,false,false,false,false,false,false,false,false,false];\n\
  Q.LastPx = 0;\n\
}\n\
\n\
function Loop() {\n\
  if (Testing.LoopCount > Testing.LoopMax) return;\n\
  var TestingStr = String(Testing.LoopCount);\n\
  while (TestingStr.length < 3) TestingStr = \"0\" + TestingStr;\n\
  MTrans = Translate(I, -Q[8].V[0], -Q[8].V[1], -Q[8].V[2]);\n\
  MTrans = RotateX(MTrans, 1);\n\
  MTrans = RotateY(MTrans, 3);\n\
  MTrans = RotateZ(MTrans, 5);\n\
  MTrans = Translate(MTrans, Q[8].V[0], Q[8].V[1], Q[8].V[2]);\n\
  MQube = MMulti(MTrans, MQube);\n\
  var i = 8;\n\
  for (; i > -1; i--) {\n\
    Q[i].V = VMulti(MTrans, Q[i].V);\n\
  }\n\
  DrawQube();\n\
  Testing.LoopCount++;\n\
  Loop();\n\
}\n\
\n\
function Init(CubeSize) {\n\
  // init/reset vars\n\
  Origin.V = [150,150,20,1];\n\
  Testing.LoopCount = 0;\n\
  Testing.LoopMax = 50;\n\
  Testing.TimeMax = 0;\n\
  Testing.TimeAvg = 0;\n\
  Testing.TimeMin = 0;\n\
  Testing.TimeTemp = 0;\n\
  Testing.TimeTotal = 0;\n\
  Testing.Init = false;\n\
\n\
  // transformation matrix\n\
  MTrans = [\n\
  [1,0,0,0],\n\
  [0,1,0,0],\n\
  [0,0,1,0],\n\
  [0,0,0,1]\n\
  ];\n\
  \n\
  // position information of qube\n\
  MQube = [\n\
  [1,0,0,0],\n\
  [0,1,0,0],\n\
  [0,0,1,0],\n\
  [0,0,0,1]\n\
  ];\n\
  \n\
  // entity matrix\n\
  I = [\n\
  [1,0,0,0],\n\
  [0,1,0,0],\n\
  [0,0,1,0],\n\
  [0,0,0,1]\n\
  ];\n\
  \n\
  // create qube\n\
  Q[0] = new CreateP(-CubeSize,-CubeSize, CubeSize);\n\
  Q[1] = new CreateP(-CubeSize, CubeSize, CubeSize);\n\
  Q[2] = new CreateP( CubeSize, CubeSize, CubeSize);\n\
  Q[3] = new CreateP( CubeSize,-CubeSize, CubeSize);\n\
  Q[4] = new CreateP(-CubeSize,-CubeSize,-CubeSize);\n\
  Q[5] = new CreateP(-CubeSize, CubeSize,-CubeSize);\n\
  Q[6] = new CreateP( CubeSize, CubeSize,-CubeSize);\n\
  Q[7] = new CreateP( CubeSize,-CubeSize,-CubeSize);\n\
  \n\
  // center of gravity\n\
  Q[8] = new CreateP(0, 0, 0);\n\
  \n\
  // anti-clockwise edge check\n\
  Q.Edge = [[0,1,2],[3,2,6],[7,6,5],[4,5,1],[4,0,3],[1,5,6]];\n\
  \n\
  // calculate squad normals\n\
  Q.Normal = new Array();\n\
  for (var i = 0; i < Q.Edge.length; i++) Q.Normal[i] = CalcNormal(Q[Q.Edge[i][0]].V, Q[Q.Edge[i][1]].V, Q[Q.Edge[i][2]].V);\n\
  \n\
  // line drawn ?\n\
  Q.Line = [false,false,false,false,false,false,false,false,false,false,false,false];\n\
  \n\
  // create line pixels\n\
  Q.NumPx = 9 * 2 * CubeSize;\n\
  for (var i = 0; i < Q.NumPx; i++) CreateP(0,0,0);\n\
  \n\
  MTrans = Translate(MTrans, Origin.V[0], Origin.V[1], Origin.V[2]);\n\
  MQube = MMulti(MTrans, MQube);\n\
\n\
  var i = 0;\n\
  for (; i < 9; i++) {\n\
    Q[i].V = VMulti(MTrans, Q[i].V);\n\
  }\n\
  DrawQube();\n\
  Testing.Init = true;\n\
  Loop();\n\
}\n\
\n\
for ( var i = 20; i <= 1600; i *= 2 ) {\n\
  Init(i);\n\
}\n\
\n\
Q = null;\n\
MTrans = null;\n\
MQube = null;\n\
I = null;\n\
Origin = null;\n\
Testing = null;\n\
LoopTime = null;\n\
DisplArea = null;\n\
\n\
\n\
var _sunSpiderInterval = new Date() - _sunSpiderStartDate;\n\
\n\
record(_sunSpiderInterval);\n\
</script>\n\
\n\
\n\
</body>\n\
</html>\n\
"];