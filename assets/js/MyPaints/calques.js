/*jslint browser this */
/*global main, calques */

(function (global) {
    "use strict";

    var calques = {
        elements: {},
        prevews: {},
        courent: {},
        zIndex: 1000,
        count: 1,
        tool: null,
        doms: {},
        renderPrevew: function () {
            var calque = this.courent.calque;
            var prevew = this.courent.prevew.getContext("2d");
            prevew.lineJoin = main.paintMode.lineJoin;
            prevew.lineWidth = main.paintMode.lineWidth;
            prevew.strokeStyle = main.paintMode.strokeStyle;
            prevew.globalCompositeOperation = main.paintMode.globalCompositeOperation;
            prevew.drawImage(calque, 0, 0, 100, 100);
        },
        createElement: function () {
            var calqueTool = document.createElement("a");
            calqueTool.href = "#";
            calqueTool.className = "flaticon-square-2";
            calqueTool.id = "calqueTool";
            main.doms.tools.appendChild(calqueTool);
            this.tool = calqueTool;
        },
        generateCanvas: function (name, zIndex, className, width, height) {
            var canvasGenerate = document.createElement('canvas');
            canvasGenerate.setAttribute('width', width);
            canvasGenerate.setAttribute('height', height);
            canvasGenerate.setAttribute('id', className + "-" + name);
            canvasGenerate.setAttribute('data-calque', name);
            canvasGenerate.className = className;
            canvasGenerate.style.zIndex = zIndex;
            return canvasGenerate;
        },
        createPrevewCanvas: function (name) {
            var generatePreviewCanvas = this.generateCanvas(name, this.zIndex, "prevew", 100, 100);
            main.doms.prevews.appendChild(generatePreviewCanvas);
            this.prevews[name] = generatePreviewCanvas;
            return generatePreviewCanvas;
        },
        createCalqueCanvas: function (name) {
            var generateCanvas = this.generateCanvas(name, this.zIndex, "calque", 700, 700);
            this.zIndex -= 1;
            main.doms.canvas.appendChild(generateCanvas);
            this.elements[name] = generateCanvas;
            return generateCanvas;
        },
        createCalques: function () {
            this.createCalqueCanvas("default");
            var save = this.createCalqueCanvas("save");
            save.style.display = "none";
            this.courent.calque = this.createCalqueCanvas("1");
            this.courent.prevew = this.createPrevewCanvas("1");
        },
        elementHandleClick: function (e) {
            e.preventDefault();
            this.count += 1;
            this.createCalqueCanvas(this.count);
            this.createPrevewCanvas(this.count);
        },
        HandleClick: function (e) {
            e.preventDefault();
            var calque = e.srcElement.getAttribute('data-calque');
            this.courent.calque = this.elements[calque];
            this.courent.prevew = this.prevews[calque];
        },
        addListeners: function () {
            this.tool.addEventListener('click', this.elementHandleClick.bind(this));
            main.doms.prevews.addEventListener('click', this.HandleClick.bind(this));
        },
        init: function () {
            this.createElement();
            this.createCalques();
            this.addListeners();
        }
    };

    global.calques = calques;
}(this));
