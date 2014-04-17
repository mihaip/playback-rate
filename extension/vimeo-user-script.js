// Disable Vimeo's disabling of the context menu on videos.
document.addEventListener(
    "contextmenu",
    function(e) {
        e.stopPropagation();
    },
    true);
