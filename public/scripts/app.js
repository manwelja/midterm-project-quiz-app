const myFunction = function(url) {
  const shareURL = "http://localhost:8080/takeQuiz/" + url;
  //if the browser supports navigator, create a promise to copy the link to the clipboard
  if (navigator.clipboard) {
    navigator.clipboard.writeText(shareURL)
      .then(() => alert("Link copied to clipboard"));
  }
};

