/*jslint browser this */
/*global main, calques */

(function (global) {
    "use strict";

    var tool = {
        element: null,
        enabled: false,
        actif: false,
        context: null,
        started: {},
        createElement: function () {
            var lineTool = document.createElement("a");
            lineTool.href = "#";
            lineTool.className = "flaticon-line";
            lineTool.id = "line";
            main.doms.tools.appendChild(lineTool);
            this.element = lineTool;
        },
        elementHandleClick: function (e) {
            e.preventDefault();
            main.paintMode.globalCompositeOperation = "source-over";
            main.courentTool = "line";
        },
        handleMouseUp: function () {
            if (main.courentTool === "line") {
                this.actif = false;
                main.merge();
            }
        },
        handleMouseDown: function (e) {
            if (main.courentTool === "line") {
                var mouseX = e.pageX - e.target.offsetLeft;
                var mouseY = e.pageY - e.target.offsetTop;
                this.started.x = mouseX;
                this.started.y = mouseY;
                this.actif = true;
            }
        },
        handleMouseMove: function (e) {
            if (main.courentTool === "line" && this.actif === true) {
                var mouseX = e.pageX - e.target.offsetLeft;
                var mouseY = e.pageY - e.target.offsetTop;
                this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height);
                this.context.beginPath();
                this.context.moveTo(this.started.x, this.started.y);
                this.context.lineTo(mouseX, mouseY);
                this.context.closePath();
                this.context.lineJoin = main.paintMode.lineJoin;
                this.context.lineWidth = main.paintMode.lineWidth;
                this.context.strokeStyle = main.paintMode.strokeStyle;
                this.context.globalCompositeOperation = main.paintMode.globalCompositeOperation;
                this.context.stroke();
            }
        },
        addListeners: function () {
            this.element.addEventListener('click', this.elementHandleClick.bind(this));
            var element = calques.elements.default;
            element.addEventListener('mousemove', this.handleMouseMove.bind(this));
            element.addEventListener('mousedown', this.handleMouseDown.bind(this));
            element.addEventListener('mouseup', this.handleMouseUp.bind(this));
        },
        init: function () {
            this.createElement();
            this.addListeners();
            this.context = calques.elements.default.getContext("2d");
        }
    };
    global.line = tool;

    document.addEventListener('MyPaintsLoad', function () {
        tool.init();
    });
}(this));
