// Client facing scripts here

$(document).ready(function () {
//when user clicks to copy link to clipboard
  $("#copy-link").on("click", function () {
    /* Get the div containing the url */
    const shareURL = document.getElementById("shareLink");

    //if the browser supports navigator, create a promise to copy the link to the clipboard
    if (navigator.clipboard) {
      navigator.clipboard.writeText(shareURL.innerHTML)
        .then(() => alert("Link copied to clipboard"));
    }
  });
});
