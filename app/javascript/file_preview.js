function handleFileSelection(input, id) {
    const maxFiles = 2; // Maximum number of files allowed
    const filePreview = document.getElementById('file-preview-' + id);
  
    if (!filePreview) {
      console.error("File preview container not found.");
      return;
    }
  
    // Clear previous previews
    filePreview.innerHTML = '';
  
    // Check the number of selected files
    if (input.files.length > maxFiles) {
      console.error(`Exceeded maximum number of files (${maxFiles}).`);
      // Clear the file input to prevent exceeding the limit
      input.value = '';
      return;
    }
  
    // Proceed with previewing files as usual
    previewFiles(input, id);
  }

function previewFiles(input, id) {
    const filePreview = document.getElementById('file-preview-' + id);
  
    // Check if filePreview element exists
    if (!filePreview) {
      console.error("File preview container not found.");
      return;
    }
  
    // Clear previous previews
    filePreview.innerHTML = '';
  
    // Loop through each selected file
    for (let i = 0; i < input.files.length; i++) {
      const file = input.files[i];
  
      // Check file type
      if (!['image/png', 'image/jpeg', 'application/pdf'].includes(file.type)) {
        console.error(`Invalid file type: ${file.type}. Only PDF, PNG, and JPEG files are allowed.`);
        continue; // Skip this file and move to the next one
      }
  
      const reader = new FileReader();
  
      // Handle file load event
      reader.onload = function(e) {
        if (file.type === 'application/pdf') {
          // If PDF file, create embed element
          const embed = document.createElement('embed');
          embed.src = e.target.result;
          embed.type = 'application/pdf';
          embed.width = '100%';
          embed.height = '500px';
          filePreview.appendChild(embed);
        } else {
          // If image file, create img element
          const img = document.createElement('img');
          img.src = e.target.result;
          img.width = 200; // Set desired width for image previews
          img.height = 200; // Set desired height for image previews
          filePreview.appendChild(img);
        }
      };
  
      // Read file as data URL
      reader.readAsDataURL(file);
    }
  }
  