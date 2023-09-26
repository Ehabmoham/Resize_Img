// Collect App Elements
let inputFile = document.getElementById('upload'),
    uploadImg = document.querySelector('.upload-img'),
    imgContainer = document.querySelector('.img-container'),
    imgHolder = document.querySelector('.img-container .img'),
    imgWidthInput = document.querySelector('.dimanshion .width input'),
    imgHeightInput = document.querySelector('.dimanshion .height input'),
    downloadBtn = document.querySelector('.download-img'),
    resultImg = document.querySelector('.result-img');


inputFile.addEventListener('change' , showImg);

function showImg(evt){

    let files = evt.target.files;

    if(files.length === 0){
    
        console.log('No files selected');
        return;
    }

    let reader =  new FileReader();

    reader.onload = function(event){
        let img =  new Image();
        img.onload = function(){
            uploadImg.style.display =  'none';
            imgContainer.style.display =  'block';

            let imgWidthValue = img.naturalWidth;
            let imgHeightValue = img.naturalHeight;

            imgHolder.appendChild(img);

            imgWidthInput.value = imgWidthValue;
            imgHeightInput.value = imgHeightValue;

        };

        img.src = event.target.result;
    };

    reader.readAsDataURL(files[0]);
};


downloadBtn.addEventListener('click',  ()=>{

    const img = document.querySelector('.img-container .img img')
    const width = imgWidthInput.value;
    const height = imgHeightInput.value;

    let canvas = document.createElement('canvas');
    let ctx = canvas.getContext('2d');

    canvas.width = width;
    canvas.height = height;
    ctx.drawImage(img, 0  , 0, width , height);

    let dataUrl = canvas.toDataURL("image/jpeg");

    let link =  document.createElement('a');
    link.href = dataUrl;

    link.download = "modified_image.jpg";
    link.click();
   
})
