$(document).ready(function () {
  // on click, we want to append html within div
  let counter = 1;
  $("#add-question").on("click", function () {
    counter = counter + 1;
    const $output = $(`<div class="question-indiv">
      <div class="question-top">
        <div class="question-number">Question #${counter}</div>
        <textarea name="question-text" id="question-text" placeholder="Write your question here..."></textarea>
        <label id="answer-toggle-label" for="correct-answer">Set Correct Answer:
        <select name="correct-answer" id="answer-toggle" label="Correct Answer (A-D)">
          <option value="" selected>Select...</option>
          <option value="a">A</option>
          <option value="b">B</option>
          <option value="c">C</option>
          <option value="d">D</option>
        </label>
        </select>
      </div>
      <div class="question-options">
        <textarea class="question-each-option" name="question-a-text" placeholder="Fill in option A..."></textarea>
        <textarea class="question-each-option" name="question-b-text" placeholder="Fill in option B..."></textarea>
        <textarea class="question-each-option" name="question-c-text" placeholder="Fill in option C..."></textarea>
        <textarea class="question-each-option" name="question-d-text" placeholder="Fill in option D..."></textarea>
      </div>
     </div>
   </div>`);
    $(".all-questions").append($output);
  });
});
