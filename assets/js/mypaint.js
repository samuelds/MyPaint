// (function (global) {
//
//     "use strict";
//     var mypaint = {
//         canvasDiv : null,
//         canvas: null,
//         context: null,
//         tmpCanva: null,
//         tmpContext: null,
//         paint: false,
//         courent: 0,
//         infos: [],
//         tmpInfos: [],
//         tmp : false,
//         tool: null,
//         opts: {
//           lineWidth: 5,
//           lineJoin: 'round',
//           strokeStyle: '#000000',
//           globalCompositeOperation : 'source-over'
//         },
//         colors: [
//           '#000000',
//           '#ffffff',
//           '#d50000',
//           '#C51162',
//           '#6200EA',
//           '#AA00FF',
//           '#304FFE',
//           '#2962FF',
//           '#0091EA',
//           '#00B8D4',
//           '#00BFA5',
//           '#00C853',
//           '#64DD17',
//           '#AEEA00',
//           '#FFD600',
//           '#FFAB00',
//           '#FF6D00',
//           '#DD2C00',
//           '#f44336',
//           '#E91E63',
//           '#9C27B0',
//           '#673AB7',
//           '#3F51B5',
//           '#2196F3',
//           '#03A9F4',
//           '#00BCD4',
//           '#009688',
//           '#4CAF50',
//           '#8BC34A',
//           '#CDDC39',
//           '#FFEB3B',
//           '#FFC107',
//           '#FF9800',
//           '#FF5722',
//           '#795548',
//           '#9E9E9E',
//           '#607D8B',
//           '#b71c1c',
//           '#880E4F',
//           '#4A148C',
//           '#311B92',
//           '#1A237E',
//           '#0D47A1',
//           '#01579B',
//           '#006064',
//           '#004D40',
//           '#1B5E20',
//           '#33691E',
//           '#827717',
//           '#F57F17',
//           '#FF6F00',
//           '#E65100',
//           '#BF360C',
//           '#3E2723',
//           '#212121',
//           '#263238',
//           '#ecf0f1',
//           '#7f8c8d',
//           '#bdc3c7',
//           '#2c3e50',
//           '#45fe71',
//           '#fe4a5e',
//           '#54a5d1',
//           '#5f4d2a'
//         ],
//         displayColor : function () {
//           var element = document.getElementById('courentColor');
//           element.style.backgroundColor = this.opts.strokeStyle;
//         },
//         loadSize : function () {
//           var element = document.getElementById('size');
//           element.innerHTML = this.opts.lineWidth;
//         },
//         changeSize : function (less) {
//           if (this.opts.lineWidth !== 0 && less) {
//             this.opts.lineWidth -= 1;
//           } else if (!less){
//             this.opts.lineWidth += 1;
//           }
//           this.loadSize();
//         },
//         loadColors : function () {
//           var element = document.getElementById('colors');
//           for (var i = 0; i < this.colors.length; i += 1) {
//             var html = document.createElement('div');
//             html.className = "color";
//             html.style.backgroundColor = this.colors[i];
//             element.appendChild(html);
//           }
//         },
//         addColor : function (color) {
//           var element = document.getElementById('custum');
//           var html = document.createElement('div');
//           html.className = "color";
//           html.style.backgroundColor = color;
//           element.appendChild(html);
//         },
//         generateCanvas : function (idName) {
//           var canvasGenerate = document.createElement('canvas');
//           canvasGenerate.setAttribute('width', '500');
//           canvasGenerate.setAttribute('height', '500');
//           canvasGenerate.setAttribute('id', idName);
//           return canvasGenerate;
//         },
//         convertDivToCanvas : function () {
//           var canvas = this.generateCanvas('canvas');
//           this.canvasDiv.appendChild(canvas);
//           this.canvas = document.getElementById('canvas');
//           this.context = this.canvas.getContext("2d");
//
//           var tmpCanvas = this.generateCanvas('tmpCanvas');
//           this.canvasDiv.appendChild(tmpCanvas);
//           this.tmpCanvas = document.getElementById('tmpCanvas');
//           this.tmpContext = this.tmpCanvas.getContext("2d");
//         },
//         clear : function (context, infos, courent) {
//           context.clearRect(0, 0, context.canvas.width, context.canvas.height);
//           infos = [];
//           courent = 0;
//         },
//         printDraw : function (i, context, list) {
//           context.beginPath();
//
//           if (list[i] && (list[i].tool === "cercleEmpty" || list[i].tool === "cercleFull") ) {
//             context.arc(list[i].x, list[i].y, list[i].opts.size, 0, Math.PI*2);
//           } else if (list[i] && (list[i].tool === "rectEmpty" || list[i].tool === "rectFull") ) {
//             context.rect(list[i].x, list[i].y, list[i].opts.sizeX, list[i].opts.sizeY);
//           } else {
//             if (list[i].drag && i) {
//               context.moveTo(list[i-1].x, list[i-1].y);
//             } else {
//               context.moveTo((list[i].x)-1, list[i].y);
//             }
//             context.lineTo(list[i].x, list[i].y);
//           }
//           context.closePath();
//           context.lineJoin = this.opts.lineJoin;
//           context.lineWidth = list[i].lineWidth;
//           context.strokeStyle = list[i].strokeStyle;
//           context.fillStyle = list[i].strokeStyle;
//           context.globalCompositeOperation = list[i].globalCompositeOperation;
//           if (list[i].tool === "cercleFull") {
//             context.fill();
//           } else if (list[i].tool === "rectFull") {
//             context.fill();
//           } else {
//             context.stroke();
//           }
//         },
//         redraw : function (context, infos, courent) {
//           this.clear(context, infos, courent);
//           this.draw(0, context, infos, courent);
//         },
//         draw : function (value, context, infos) {
//           for (var i = value; i < infos.length; i++) {
//             this.printDraw(i, context, infos);
//           }
// 	      },
//         mergeInfos: function () {
//           var depart = this.courent;
//           for (var i = 0; i < this.tmpInfos.length; i += 1) {
//             var courent = this.courent;
//             this.infos[courent] = this.tmpInfos[i];
//             this.courent += 1;
//           }
//           this.draw(depart, this.context, this.infos);
//         },
//         addClick : function (x, y, dragging, courent, infos, opts) {
//           var values = {
//             'x' : x,
//             'y' : y,
//             'drag' : dragging,
//             'strokeStyle' : this.opts.strokeStyle,
//             'lineWidth' : this.opts.lineWidth,
//             'tool' : this.tool,
//             'globalCompositeOperation': this.opts.globalCompositeOperation,
//             'opts' : opts,
//           }
//           infos[courent] = values;
//         },
//         handleMouseMove : function (e) {
//           var mouseX = e.pageX - e.target.offsetLeft;
//           var mouseY = e.pageY - e.target.offsetTop;
//
//           if (this.tool !== "line" && this.paint === true && this.tmp === false) {
//             this.addClick(mouseX, mouseY, true, this.courent, this.infos, {});
//             this.draw(this.courent, this.context, this.infos);
//             this.courent += 1;
//           } else if (this.tool === "line" && this.paint === true && this.tmp === true) {
//             this.clear(this.tmpContext, this.tmpInfos, 0);
//             this.addClick(mouseX, mouseY, true, 1, this.tmpInfos, {});
//             this.draw(1, this.tmpContext, this.tmpInfos);
//           } else if ((this.tool === "cercleEmpty" || this.tool === "cercleFull") && this.paint === true && this.tmp === true) {
//             var calcul = Math.sqrt(Math.pow((mouseX - this.tmpInfos[0].x), 2) + Math.pow((mouseY - this.tmpInfos[0].y), 2));
//             this.clear(this.tmpContext, this.tmpInfos, 0);
//             this.addClick(this.tmpInfos[0].x, this.tmpInfos[0].y, true, 0, this.tmpInfos, {
//               'size': calcul
//             });
//             this.draw(0, this.tmpContext, this.tmpInfos);
//           } else if ((this.tool === "rectFull" || this.tool === "rectEmpty") && this.paint === true && this.tmp === true) {
//             var calculX = mouseX - this.tmpInfos[0].x;
//             var calculY = mouseY - this.tmpInfos[0].y;
//             this.clear(this.tmpContext, this.tmpInfos, 0);
//             this.addClick(this.tmpInfos[0].x, this.tmpInfos[0].y, true, 0, this.tmpInfos, {
//               'sizeX': calculX,
//               'sizeY': calculY
//             });
//             this.draw(0, this.tmpContext, this.tmpInfos);
//           }
//         },
//         handleMouseDown : function (e) {
//           if (this.tool !== null) {
//             var mouseX = e.pageX - e.target.offsetLeft;
//             var mouseY = e.pageY - e.target.offsetTop;
//             this.paint = true;
//
//             if (this.tool === "pencil" || this.tool === "eraser") {
//               this.addClick(mouseX, mouseY, false, this.courent, this.infos, {});
//               this.draw(this.courent, this.context, this.infos);
//               this.courent += 1;
//             } else if (this.tool === "line") {
//               this.addClick(mouseX, mouseY, false, 0, this.tmpInfos, {});
//               this.draw(0, this.tmpContext, this.tmpInfos);
//               this.tmp = true;
//             } else if (this.tool === "cercleEmpty" || this.tool === "cercleFull" || this.tool === "rectFull" || this.tool === "rectEmpty") {
//               this.addClick(mouseX, mouseY, false, 0, this.tmpInfos, {});
//               this.draw(0, this.tmpContext, this.tmpInfos);
//               this.tmp = true;
//             }
//           }
//         },
//         handleMouseUp : function (e) {
//           this.paint = false;
//
//           if (this.tool === "line") {
//             this.mergeInfos();
//             this.clear(this.tmpContext, this.tmpInfos, 0);
//             this.tmpInfos = [];
//             this.tmp = false;
//           } else if (this.tool === "cercleEmpty" || this.tool === "cercleFull" || this.tool === "rectFull" || this.tool === "rectEmpty") {
//             this.mergeInfos();
//             this.clear(this.tmpContext, this.tmpInfos, 0);
//             this.tmpInfos = [];
//             this.tmp = false;
//           }
//
//         },
//         handleMouseLeave : function (e) {
//           //this.paint = false;
//         },
//         handleEraserClick : function (e) {
//           e.preventDefault();
//           this.tool = "eraser";
//           this.opts.globalCompositeOperation = "destination-out";
//           this.paint = false;
//         },
//         handlePencilClick : function (e) {
//           e.preventDefault();
//           this.tool = "pencil";
//           this.opts.globalCompositeOperation = "source-over";
//         },
//         handleColorClick : function (e) {
//           var element = e.toElement;
//           var getClass = element.className;
//           var color = element.style.backgroundColor;
//           if (getClass && color) {
//             this.opts.strokeStyle = color;
//           }
//           this.displayColor();
//         },
//         handleClearClick : function (e) {
//           e.preventDefault();
//           this.clear(this.context, this.tmpInfos, this.courent);
//           this.courent = 0;
//           this.infos = [];
//         },
//         handleFormColorSubmit  : function (e) {
//           e.preventDefault();
//           var value = document.getElementById('colorPicker').value;
//           this.addColor(value);
//         },
//         handleMoreClick : function (e) {
//           e.preventDefault();
//           this.changeSize();
//         },
//         handleLessClick : function (e) {
//           e.preventDefault();
//           this.changeSize(true);
//         },
//         handleLineClick : function (e) {
//           e.preventDefault();
//           this.tool = "line";
//           this.paint = false;
//           this.opts.globalCompositeOperation = "source-over";
//         },
//         handleCercleEmptyClick : function (e) {
//           e.preventDefault();
//           this.tool = "cercleEmpty";
//           this.paint = false;
//           this.opts.globalCompositeOperation = "source-over";
//         },
//         handlecercleFullClick : function (e) {
//           e.preventDefault();
//           this.tool = "cercleFull";
//           this.paint = false;
//           this.opts.globalCompositeOperation = "source-over";
//         },
//         handleRectEmptyClick : function (e) {
//           e.preventDefault();
//           this.tool = "rectEmpty";
//           this.paint = false;
//           this.opts.globalCompositeOperation = "source-over";
//         },
//         handleRectFullClick : function (e) {
//           e.preventDefault();
//           this.tool = "rectFull";
//           this.paint = false;
//           this.opts.globalCompositeOperation = "source-over";
//         },
//         addListeners: function () {
//           this.canvas.addEventListener('mousemove', this.handleMouseMove.bind(this));
//           this.canvas.addEventListener('mousedown', this.handleMouseDown.bind(this));
//           this.canvas.addEventListener('mouseup', this.handleMouseUp.bind(this));
//           this.canvas.addEventListener('mouseleave', this.handleMouseLeave.bind(this));
//
//           // tools
//           var eraser = document.getElementById('eraser');
//           eraser.addEventListener('click', this.handleEraserClick.bind(this));
//
//           var pencil = document.getElementById('pencil');
//           pencil.addEventListener('click', this.handlePencilClick.bind(this));
//
//           var color = document.getElementById('colors');
//           color.addEventListener('click', this.handleColorClick.bind(this));
//           var custum = document.getElementById('custum');
//           custum.addEventListener('click', this.handleColorClick.bind(this));
//
//           var formColor = document.getElementById('form-color');
//           formColor.addEventListener('submit', this.handleFormColorSubmit.bind(this));
//
//           var clear = document.getElementById('clear');
//           clear.addEventListener('click', this.handleClearClick.bind(this));
//
//           var more = document.getElementById('more');
//           more.addEventListener('click', this.handleMoreClick.bind(this));
//
//           var less = document.getElementById('less');
//           less.addEventListener('click', this.handleLessClick.bind(this));
//
//           var line = document.getElementById('line');
//           line.addEventListener('click', this.handleLineClick.bind(this));
//
//           var cercleEmpty = document.getElementById('cercleEmpty');
//           cercleEmpty.addEventListener('click', this.handleCercleEmptyClick.bind(this));
//
//           var cercleFull = document.getElementById('cercleFull');
//           cercleFull.addEventListener('click', this.handlecercleFullClick.bind(this));
//
//           var rectEmpty = document.getElementById('rectEmpty');
//           rectEmpty.addEventListener('click', this.handleRectEmptyClick.bind(this));
//
//           var rectFull = document.getElementById('rectFull');
//           rectFull.addEventListener('click', this.handleRectFullClick.bind(this));
//         },
//         init : function () {
//           this.canvasDiv = document.getElementById('canvasDiv');
//
//           this.displayColor();
//
//           // Convert Div To Canvas
//           this.convertDivToCanvas();
//           this.addListeners();
//           this.loadColors();
//           this.loadSize();
//
//         },
//     }
//
//     document.addEventListener('DOMContentLoaded', function () {
//       mypaint.init();
//     });
//
// }(this));
