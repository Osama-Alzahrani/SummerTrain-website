import { Controller } from "@hotwired/stimulus"
import { Editor } from '@tiptap/core'
import Document from '@tiptap/extension-document'
import Paragraph from '@tiptap/extension-paragraph'
import Text from '@tiptap/extension-text'
import ListItem from '@tiptap/extension-list-item'
import BulletList from '@tiptap/extension-bullet-list'
import OrderedList from '@tiptap/extension-ordered-list'
import Bold from '@tiptap/extension-bold'
import Italic from '@tiptap/extension-italic'
import Link from '@tiptap/extension-link'


export default class extends Controller {


  // tiptap controller need to be added to the form
  // a formSubmit action will be programmatically created

  connect() {
    const masterElement = this.element  

    if(!masterElement.nodeName == "FORM"){
      console.log("You must add tiptap to a form element")
    }
    if(!masterElement.querySelector(".tiptap__editor")){
      console.log("We cannot find the tiptap editor")
    }

    // programmatically adding a Stimulus submit action to the form
    // in order to populate form field before submit
    masterElement.setAttribute("data-action", "submit->resumeDataTiptap#formSubmit")
    this.initTiptap(masterElement)    

  }

  formSubmit(event){
    event.preventDefault()
    event.stopPropagation()
  
    const formField = this.element.querySelector(".tiptap__field-content")

    formField.value = this.element.editor.getHTML()
    Turbo.navigator.submitForm(this.element)      
  }

  initTiptap(masterElement){
    const tiptapEditor = masterElement.querySelector(".tiptap__editor")
    
    const textArea = this.element.querySelector(".tiptap__textarea")
    const tipTapContent = textArea.innerHTML
    textArea.innerHTML = ""

    const boldButton = this.element.querySelector(".tiptap__button--bold")
    const italicButton = this.element.querySelector(".tiptap__button--italic")
    const linkButton = this.element.querySelector(".tiptap__button--link")
    const olButton = this.element.querySelector(".tiptap__button--ol")
    const ulButton = this.element.querySelector(".tiptap__button--ul")

    const linkArea = this.element.querySelector(".tiptap__link-area")
    const linkInput = this.element.querySelector(".tiptap__link-field")
    const unsetButton = this.element.querySelector(".tiptap__link-button--unset")

    const editor = new Editor({
      element: textArea,
      extensions: [
        Document,
        Paragraph,
        Text,
        ListItem,
        BulletList,
        OrderedList,
        Bold,
        Italic,
        Link.configure({
          openOnClick: false,
        })
      ],
      type: 'HTML',
      content: tipTapContent,
      autofocus: true,
      editable: true,
      injectCSS: false,
      hideHTMLTags: true,
      onSelectionUpdate({ editor }) {
        boldButton.classList.toggle("tiptap__button--selected", editor.isActive('bold'))
        italicButton.classList.toggle("tiptap__button--selected", editor.isActive('italic'))
        linkButton.classList.toggle("tiptap__button--selected", editor.isActive('link'))
        
        if(!editor.isActive('link')){
          linkArea.classList.toggle("hidden", true)
          linkInput.value = ""
          unsetButton.classList.toggle("hidden", true)
        }else{
          linkArea.classList.toggle("hidden", false)
          let previousUrl = editor.getAttributes('link').href
          linkInput.value = previousUrl
          unsetButton.classList.toggle("hidden", false)
        }
        
        ulButton.classList.toggle("tiptap__button--selected", editor.isActive('bulletList'))
        olButton.classList.toggle("tiptap__button--selected", editor.isActive('orderedList'))
        
      },
    });

    // attaching tiptap editor to the form so we can destroy it in Stimulus
    // disconnect method
    masterElement.editor = editor  
    
  }  


  // The logic happens here
  
  // When toggling out, I auto select the entire element before changing status 
  // for example: the cursor is located in a bold bit of text
  // but the text is not actually selected -> Tiptat will select automatically
  // the whole element
  // this is done with ".extendMarkRange"

  // as you can see it is highly customizable so you can tweak the user
  // experience to your tune

  bold(event){
    const button = event.target.closest(".tiptap__button")
    const editor = this.element.editor
    if(!editor.view.state.selection.empty){
      if(editor.isActive('bold')){
        editor.chain().focus().extendMarkRange('bold').toggleBold().run()
        
      }else{
        editor.chain().focus().toggleBold().run()
      }      
      button.classList.toggle("tiptap__button--selected", editor.isActive('bold')) 
    }else{
      if(editor.isActive('bold')){
        editor.chain().focus().extendMarkRange('bold').toggleBold().run()
      }
    }    
    
      
  }

  italic(){
    const button = event.target.closest(".tiptap__button")
    const editor = this.element.editor
    
    if(!editor.view.state.selection.empty){
      if(editor.isActive('italic')){
        editor.chain().focus().extendMarkRange('italic').toggleItalic().run()
      }else{
        editor.chain().focus().toggleItalic().run()
      }      
      button.classList.toggle("tiptap__button--selected", editor.isActive('italic')) 
    }else{
      if(editor.isActive('italic')){
        editor.chain().focus().extendMarkRange('italic').toggleItalic().run()
      }
    } 
  }

  link(){
    const button = event.target.closest(".tiptap__button")
    const editor = this.element.editor
    const linkArea = this.element.querySelector(".tiptap__link-area")
    const previousUrl = editor.getAttributes('link').href
    const linkInput = this.element.querySelector(".tiptap__link-field")

    if(previousUrl){
      linkInput.value = previousUrl
    }    
    
    if(button.classList.contains("tiptap__button--selected")){
      linkArea.classList.toggle("hidden", true)
      button.classList.toggle("tiptap__button--selected", false)
    }else{
      if(!editor.view.state.selection.empty){
        linkArea.classList.toggle("hidden", false)
        button.classList.toggle("tiptap__button--selected", true)
      }
    }
  }

  setLink(){
    const button = event.target.closest(".tiptap__button")
    const editor = this.element.editor
    const linkInput = this.element.querySelector(".tiptap__link-field").value 
    const previousUrl = editor.getAttributes('link').href
    const unsetButton = this.element.querySelector(".tiptap__link-button--unset")

    
    if(linkInput){
      editor.chain().focus().extendMarkRange('link').setLink({ href: linkInput }).run()  
      unsetButton.classList.toggle("hidden", false)    
    }else{
      editor.chain().focus().extendMarkRange('link').unsetLink().run()
      unsetButton.classList.toggle("hidden", true)
    }
    
  }

  unsetLink(){
    const button = event.target.closest(".tiptap__button")
    const editor = this.element.editor
    const linkInput = this.element.querySelector(".tiptap__link-field").value 
    const previousUrl = editor.getAttributes('link').href
    const unsetButton = this.element.querySelector(".tiptap__link-button--unset")

    editor.chain().focus().extendMarkRange('link').unsetLink().run()
    unsetButton.classList.toggle("hidden", true)

  }

  unorderedList(){
    const button = event.target.closest(".tiptap__button")
    const editor = this.element.editor
    const olButton = this.element.querySelector(".tiptap__button--ol")

    if(editor.isActive("orderedList") && !editor.isActive("bulletList")){
      editor.chain().focus().extendMarkRange('link').toggleOrderedList().run()
      olButton.classList.toggle("tiptap__button--selected", editor.isActive('orderedList'))
    }

    editor.chain().focus().toggleBulletList().run()
    button.classList.toggle("tiptap__button--selected", editor.isActive('bulletList'))
  }

  orderedList(){
    const button = event.target.closest(".tiptap__button")
    const editor = this.element.editor
    const ulButton = this.element.querySelector(".tiptap__button--ul")
    
    if(!editor.isActive("orderedList") && editor.isActive("bulletList")){
      editor.chain().focus().extendMarkRange('link').toggleBulletList().run()
      ulButton.classList.toggle("tiptap__button--selected", editor.isActive('bulletList'))
    }

    editor.chain().focus().toggleOrderedList().run()
    button.classList.toggle("tiptap__button--selected", editor.isActive('orderedList')) 

  }

  preventEnter(event){
    if (event.key === 'Enter' || event.keyCode === 13) {
      event.preventDefault()
    }
  }


  disconnect() {
    this.element.editor.destroy()
  }

}