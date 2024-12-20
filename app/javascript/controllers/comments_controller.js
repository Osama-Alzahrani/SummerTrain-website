import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  initialize() {}
  connect() {}
  toggleForm(event) {
    console.log("I clicked the edit button.");
    event.preventDefault();
    event.stopPropagation();
    const formID = event.params["form"];
    const commentBodyID = event.params["body"];
    const editButtonID = event.params["edit"];

    const form = document.getElementById(formID);
    const commentBody = document.getElementById(commentBodyID);
    const editButton = document.getElementById(editButtonID);

    form.classList.toggle("d-none");
    form.classList.toggle("mt-5");
    commentBody.classList.toggle("d-none");
    this.toggleEditButton(editButton,event.params["edittext"],event.params["canceltext"]);
  }

  toggleEditButton(editButton,i18_edit,i18_cancel) {
    if (editButton.innerText === i18_edit) {
      editButton.innerText = i18_cancel;
      this.toggleEditButtonClass(editButton);
    } else {
      editButton.innerText = i18_edit;
      this.toggleEditButtonClass(editButton);
    }
  }

  toggleEditButtonClass(editButton) {
    editButton.classList.toggle("btn-secondary");
    editButton.classList.toggle("btn-warning");
  }
}