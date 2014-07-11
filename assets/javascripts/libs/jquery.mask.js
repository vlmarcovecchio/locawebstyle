/**
 * jquery.mask.js
 * @version: v1.6.4
 * @author: Igor Escobar
 *
 * Created by Igor Escobar on 2012-03-10. Please report any bug at http://blog.igorescobar.com
 *
 * Copyright (c) 2012 Igor Escobar http://blog.igorescobar.com
 *
 * The MIT License (http://www.opensource.org/licenses/mit-license.php)
 *
 * Permission is hereby granted, free of charge, to any person
 * obtaining a copy of this software and associated documentation
 * files (the "Software"), to deal in the Software without
 * restriction, including without limitation the rights to use,
 * copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following
 * conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
 * OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
 * OTHER DEALINGS IN THE SOFTWARE.
 */
!function(t){"function"==typeof define&&define.amd?define(["jquery"],t):t(window.jQuery||window.Zepto)}(function(t){"use strict";var e=function(e,n,a){var o,i=this;e=t(e),n="function"==typeof n?n(e.val(),void 0,e,a):n,i.init=function(){a=a||{},i.byPassKeys=[9,16,17,18,36,37,38,39,40,91],i.translation={0:{pattern:/\d/},9:{pattern:/\d/,optional:!0},"#":{pattern:/\d/,recursive:!0},A:{pattern:/[a-zA-Z0-9]/},S:{pattern:/[a-zA-Z]/}},i.translation=t.extend({},i.translation,a.translation),i=t.extend(!0,{},i,a),e.each(function(){a.maxlength!==!1&&e.attr("maxlength",n.length),a.placeholder&&e.attr("placeholder",a.placeholder),e.attr("autocomplete","off"),s.destroyEvents(),s.events();var t=s.getCaret();s.val(s.getMasked()),s.setCaret(t+s.getMaskCharactersBeforeCount(t,!0))})};var s={getCaret:function(){var t,n=0,a=e.get(0),o=document.selection,i=a.selectionStart;return o&&!~navigator.appVersion.indexOf("MSIE 10")?(t=o.createRange(),t.moveStart("character",e.is("input")?-e.val().length:-e.text().length),n=t.text.length):(i||"0"===i)&&(n=i),n},setCaret:function(t){if(e.is(":focus")){var n,a=e.get(0);a.setSelectionRange?a.setSelectionRange(t,t):a.createTextRange&&(n=a.createTextRange(),n.collapse(!0),n.moveEnd("character",t),n.moveStart("character",t),n.select())}},events:function(){e.on("keydown.mask",function(){o=s.val()}),e.on("keyup.mask",s.behaviour),e.on("paste.mask drop.mask",function(){setTimeout(function(){e.keydown().keyup()},100)}),e.on("change.mask",function(){e.data("changeCalled",!0)}),e.on("blur.mask",function(e){var n=t(e.target);n.prop("defaultValue")!==n.val()&&(n.prop("defaultValue",n.val()),n.data("changeCalled")||n.trigger("change")),n.data("changeCalled",!1)}),e.on("focusout.mask",function(){a.clearIfNotMatch&&s.val().length<n.length&&s.val("")})},destroyEvents:function(){e.off("keydown.mask keyup.mask paste.mask drop.mask change.mask blur.mask focusout.mask").removeData("changeCalled")},val:function(t){var n=e.is("input");return arguments.length>0?n?e.val(t):e.text(t):n?e.val():e.text()},getMaskCharactersBeforeCount:function(t,e){for(var a=0,o=0,s=n.length;s>o&&t>o;o++)i.translation[n.charAt(o)]||(t=e?t+1:t,a++);return a},determineCaretPos:function(t,e,a,o){var r=i.translation[n.charAt(Math.min(t-1,n.length-1))];return r?Math.min(t+a-e-o,a):s.determineCaretPos(t+1,e,a,o)},behaviour:function(e){e=e||window.event;var n=e.keyCode||e.which;if(-1===t.inArray(n,i.byPassKeys)){var a=s.getCaret(),o=s.val(),r=o.length,l=r>a,c=s.getMasked(),u=c.length,d=s.getMaskCharactersBeforeCount(u-1)-s.getMaskCharactersBeforeCount(r-1);return c!==o&&s.val(c),!l||65===n&&e.ctrlKey||(8!==n&&46!==n&&(a=s.determineCaretPos(a,r,u,d)),s.setCaret(a)),s.callbacks(e)}},getMasked:function(t){var e,o,r=[],l=s.val(),c=0,u=n.length,d=0,h=l.length,f=1,p="push",m=-1;for(a.reverse?(p="unshift",f=-1,e=0,c=u-1,d=h-1,o=function(){return c>-1&&d>-1}):(e=u-1,o=function(){return u>c&&h>d});o();){var g=n.charAt(c),v=l.charAt(d),y=i.translation[g];y?(v.match(y.pattern)?(r[p](v),y.recursive&&(-1===m?m=c:c===e&&(c=m-f),e===m&&(c-=f)),c+=f):y.optional&&(c+=f,d-=f),d+=f):(t||r[p](g),v===g&&(d+=f),c+=f)}var b=n.charAt(e);return u!==h+1||i.translation[b]||r.push(b),r.join("")},callbacks:function(t){var i=s.val(),r=s.val()!==o;r===!0&&"function"==typeof a.onChange&&a.onChange(i,t,e,a),r===!0&&"function"==typeof a.onKeyPress&&a.onKeyPress(i,t,e,a),"function"==typeof a.onComplete&&i.length===n.length&&a.onComplete(i,t,e,a)}};i.remove=function(){var t=s.getCaret(),e=s.getMaskCharactersBeforeCount(t);s.destroyEvents(),s.val(i.getCleanVal()).removeAttr("maxlength"),s.setCaret(t-e)},i.getCleanVal=function(){return s.getMasked(!0)},i.init()};t.fn.mask=function(n,a){return this.unmask(),this.each(function(){t(this).data("mask",new e(this,n,a))})},t.fn.unmask=function(){return this.each(function(){try{t(this).data("mask").remove()}catch(e){}})},t.fn.cleanVal=function(){return t(this).data("mask").getCleanVal()},t("*[data-mask]").each(function(){var e=t(this),n={},a="data-mask-";"true"===e.attr(a+"reverse")&&(n.reverse=!0),"false"===e.attr(a+"maxlength")&&(n.maxlength=!1),"true"===e.attr(a+"clearifnotmatch")&&(n.clearIfNotMatch=!0),e.mask(e.attr("data-mask"),n)})});