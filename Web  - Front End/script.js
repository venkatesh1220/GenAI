
const dragArea = document.querySelector('.drag-area');
const dragText = document.querySelector('.header');
const imgContainer = document.querySelector(".imgContainer");

let convertButton = document.querySelector(".custom-button1");;
let button = document.querySelector('.button');
let input = document.querySelector('input');


let file;
let fileURL;

document.getElementById("loader").style.display = "none";


var inputImageURL, outputImageURL;

button.onclick = () => {
    input.click();
};

input.addEventListener('change', function(){
    file = this.files[0];
    dragArea.classList.add('active');

    displayFile();

    console.log("Hi came next");

    var name = document.createElement("button");
    name.classList.add("custom-button1")
    name.textContent = "Convert"    
    imgContainer.appendChild(name);
    convertButton = document.querySelector(".custom-button1");

    convertButton.addEventListener("click", async() => {
        
      var formData = new FormData();
      formData.append('image', file);

      console.log("started"); 

      document.querySelector('h1').style.display = 'none'; // Hide the <h1> element
      document.querySelector('.container').style.display = 'none'; // Hide the container <div>
      document.querySelector('.imgContainer').style.display = 'none';

      document.getElementById("loader").style.display = "flex";

      fetch('http://127.0.0.1:5000/process-image', {
          method: 'POST',
          body: formData,
      })
      .then(response => response.blob())
      .then(blob => {
        var url = URL.createObjectURL(blob);
        outputImageURL = url;

        document.getElementById("loader").style.display = "none";

        window.location.href = "outputIndex.html";
      });
    }, false);


});


dragArea.addEventListener('dragover',(Event) => {
    Event.preventDefault();
    dragText.textContent = 'Release to upload';
    dragArea.classList.add('active');
});


dragArea.addEventListener('dragleave', () => {
    dragText.textContent = 'Drag & Drop';
    dragArea.classList.remove('active');
});


dragArea.addEventListener('drop', (Event) => {
    Event.preventDefault();

    file = Event.dataTransfer.files[0];

    displayFile();
    console.log("Hi came next");

    var name = document.createElement("button");
    name.classList.add("custom-button1")
    name.textContent = "Convert"    
    imgContainer.appendChild(name);
    convertButton = document.querySelector(".custom-button1");

    convertButton.addEventListener("click", async() => {
      Event.preventDefault();
      
      var formData = new FormData();
      formData.append('image', file);

      console.log("started"); 

      document.querySelector('h1').style.display = 'none'; // Hide the <h1> element
      document.querySelector('.container').style.display = 'none'; // Hide the container <div>
      document.querySelector('.imgContainer').style.display = 'none';

      document.getElementById("loader").style.display = "flex";

      fetch('http://127.0.0.1:5000/process-image', {
          method: 'POST',
          body: formData,
      })
      .then(response => response.blob())
      .then(blob => {
        var url = URL.createObjectURL(blob);
        outputImageURL = url;

        document.getElementById("loader").style.display = "none";

        window.location.href = "outputIndex.html";
      });
    }, false);
});




function displayFile(){
  let fileType = file.type;
  let validExtensions = ['image/jpeg','image/jpg','image/png'];
  if(validExtensions.includes(fileType)) {
    let fileReader = new FileReader();
    

    fileReader.onload = () => {
      let fileURL = fileReader.result;

      let imgTag = `<img src="${fileURL}" alt=""> `;
      inputImageURL = fileURL;
      dragArea.innerHTML = imgTag;
    };
    fileReader.readAsDataURL(file);
  }else{
    alert('This file is not an Image');
    dragArea.classList.remove('active');
  }
}


function downloadImage(imageURL, filename) {
  var a = document.createElement('a');
  a.href = imageURL;
  a.download = filename || 'image.png';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}
  

