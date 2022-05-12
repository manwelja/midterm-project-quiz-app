const copyQuizLink = function(url) {
  const shareURL = "http://localhost:8080/takeQuiz/${url}";
  //if the browser supports navigator, create a promise to copy the link to the clipboard
  if (navigator.clipboard) {
    navigator.clipboard.writeText(shareURL)
      .then(() => alert("Link copied to clipboard"));
  }
};
const copyResultsLink = function(url, userId) {
  const shareURL = `http://localhost:8080/results/${url}/${userId}`;
  //if the browser supports navigator, create a promise to copy the link to the clipboard
  if (navigator.clipboard) {
    navigator.clipboard.writeText(shareURL)
      .then(() => alert("Link copied to clipboard"));
  }
};
