$(document).ready(function() {
    var container = $("#images-container");

    pdfjsLib.getDocument('pdf1.pdf').promise.then(function(pdf) {
        for (var i = 1; i <= pdf.numPages; i++) {
            pdf.getPage(i).then(function(page) {
                var scale = 1.5;
                var viewport = page.getViewport({ scale: scale });
                var canvas = document.createElement('canvas');
                var context = canvas.getContext('2d');

                canvas.height = viewport.height;
                canvas.width = viewport.width;

                var renderContext = {
                    canvasContext: context,
                    viewport: viewport
                };

                page.render(renderContext).promise.then(function() {
                    var imgData = canvas.toDataURL('image/png');
                    var img = $('<img>').attr('src', imgData).css({
                        position: 'absolute',
                        top: Math.random() * 100 + '%',
                        left: Math.random() * 100 + '%',
                        width: '100px',
                        opacity: 0.9,
                        animation: 'float 10s infinite'
                    }).appendTo(container);
                });
            });
        }
    });
});
