$(document).ready(function() {
    var container = $("#images-container");

    // Ensure video plays
    var video = document.getElementById("background-video");
    video.play();

    // Ensure audio plays
    var audio3 = document.getElementById("audio3");
    audio3.play();

    // Load and render PDF
    pdfjsLib.getDocument('pdf1.pdf').promise.then(function(pdf) {
        for (var i = 1; i <= pdf.numPages; i++) {
            pdf.getPage(i).then(function(page) {
                var scale = 0.5; // Smaller scale for floating images
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
                        top: Math.random() * 100 + '%', // Random initial position
                        left: Math.random() * 100 + '%',
                        width: '150px', // Adjust size as needed
                        opacity: 0.8, // Slightly transparent
                        zIndex: 1 // Ensure images stay in the background
                    }).appendTo(container);

                    // Animate the image to float slowly
                    floatImage(img);
                });
            });
        }
    }).catch(function(error) {
        console.error("Error loading PDF: ", error);
    });

    // Function to make images float
    function floatImage(img) {
        var xDirection = Math.random() > 0.5 ? 1 : -1; // Random horizontal direction
        var yDirection = Math.random() > 0.5 ? 1 : -1; // Random vertical direction

        function animate() {
            var currentTop = parseFloat(img.css('top'));
            var currentLeft = parseFloat(img.css('left'));

            // Move the image
            var newTop = currentTop + yDirection * 0.1; // Adjust speed
            var newLeft = currentLeft + xDirection * 0.1;

            // Reverse direction if the image goes out of bounds
            if (newTop < 0 || newTop > 100) yDirection *= -1;
            if (newLeft < 0 || newLeft > 100) xDirection *= -1;

            img.css({
                top: newTop + '%',
                left: newLeft + '%'
            });

            requestAnimationFrame(animate); // Continue the animation
        }

        animate(); // Start the animation
    }
});
