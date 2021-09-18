"use strict";
Element.prototype.siblings = function () {
    for (var a = [], b = this.parentNode.children, c = 0; c < b.length; c++) b[c] !== this && a.push(b[c]);
    return a
};