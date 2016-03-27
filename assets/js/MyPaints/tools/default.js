// /*jslint browser this */
// /*global main, calques */
//
// (function (global) {
//     "use strict";
//
//     var tool = {
//         element: null,
//         enabled: false,
//         actif: false,
//         context: null,
//         createElement: function () {
//             var pencil = document.createElement("a");
//             pencil.href = "#";
//             pencil.className = "flaticon-*";
//             pencil.id = "pencil";
//             main.dom.tools.appendChild(pencil);
//             this.element = pencil;
//         },
//         elementHandleClick: function (e) {
//             e.preventDefault();
//             this.enabled = true;
//             main.paintMode.globalCompositeOperation = "source-over";
//         },
//         handleMouseUp: function (e) {
//             if (this.enabled === true) {
//                 this.actif = false;
//                 main.merge();
//             }
//         },
//         handleMouseDown: function (e) {
//             if (this.enabled === true) {
//                 var mouseX = e.pageX - e.target.offsetLeft;
//                 var mouseY = e.pageY - e.target.offsetTop;
//                 this.actif = true;
//             }
//         },
//         handleMouseMove: function (e) {
//             if (this.enabled === true && this.actif === true) {
//                 var mouseX = e.pageX - e.target.offsetLeft;
//                 var mouseY = e.pageY - e.target.offsetTop;
//             }
//         },
//         addListeners: function () {
//             this.element.addEventListener('click', this.elementHandleClick.bind(this));
//             var element = calques.elements.default;
//             element.addEventListener('mousemove', this.handleMouseMove.bind(this));
//             element.addEventListener('mousedown', this.handleMouseDown.bind(this));
//             element.addEventListener('mouseup', this.handleMouseUp.bind(this));
//         },
//         init: function () {
//             this.createElement();
//             this.addListeners();
//             this.context = calques.elements.default.getContext("2d");
//         }
//     };
//     global.default = tool;
//
//     document.addEventListener('MyPaintsLoad', function () {
//         tool.init();
//     });
// }(this));
