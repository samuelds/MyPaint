/*jslint browser this */
/*global main, calques, CustomEvent*/

(function (global) {
    "use strict";

    var main = {
        doms: {
            tools: null,
            canvas: null,
            prevews: null
        },
        paintMode: {
            lineWidth: 5,
            lineJoin: 'round',
            strokeStyle: '#000000',
            globalCompositeOperation: 'source-over'
        },
        courentTool: null,
        merge: function () {
            var tmp = calques.elements.default;
            var tmpContext = tmp.getContext("2d");
            var courent = calques.courent.calque.getContext("2d");
            courent.lineJoin = this.paintMode.lineJoin;
            courent.lineWidth = this.paintMode.lineWidth;
            courent.strokeStyle = this.paintMode.strokeStyle;
            courent.globalCompositeOperation = this.paintMode.globalCompositeOperation;
            courent.drawImage(tmp, 0, 0);
            tmpContext.clearRect(0, 0, tmpContext.canvas.width, tmpContext.canvas.height);
            calques.renderPrevew();
        },
        sendEvent: function () {
            var MyEvent = new CustomEvent("MyPaintsLoad");
            document.dispatchEvent(MyEvent);
        },
        init: function () {
            this.doms.tools = document.getElementById('tools');
            this.doms.canvas = document.getElementById('canvasDiv');
            this.doms.prevews = document.getElementById('prevews');
            calques.init();
            this.sendEvent();
        }
    };

    global.main = main;

    document.addEventListener('DOMContentLoaded', function () {
        main.init();
    });
}(this));
