//= require jquery
//= require jquery_ujs


function cardClick(postPath) {
    window.location.href = postPath;
  }

function toggleSalary(){
  $("#salary").toggle();
  $("#salaryInput").attr('required')
  ? $("#salaryInput").prop('required',false)
  : $("#salaryInput").prop('required',true);
}