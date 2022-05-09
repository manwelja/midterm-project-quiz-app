$(document).ready(function () {
  // on click, we want to append html within div
  let counter = 1;
  $("#add-question").on("click", function () {
    counter = counter + 1;
    const $output = $(`<div class="question-indiv">
    <div class="question-top">
      <div class="question-number">Question #${counter}</div>
      <textarea name="question-text" id="question-text" placeholder="Write your question here..."></textarea>
      <select name="correct-answer" id="answer-toggle" placeholder="Correct Answer (A-D)">
        <option value="choice" disabled selected>Correct Answer (A-D)...</option>
        <option value="A">A</option>
        <option value="B">B</option>
        <option value="C">C</option>
        <option value="D">D</option>
      </select>
    </div>
    <div class="question-options">
      <textarea class="question-each-option" name="question-a-text" placeholder="Fill in option A..."></textarea>
      <textarea class="question-each-option" name="question-b-text" placeholder="Fill in option B..."></textarea>
      <textarea class="question-each-option" name="question-c-text" placeholder="Fill in option C..."></textarea>
      <textarea class="question-each-option" name="question-d-text" placeholder="Fill in option D..."></textarea>
    </div>
  </div>`);
    $(".all-questions").append($output);
  });
});
