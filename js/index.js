var nameInput=document.getElementById('bookmarkName');
var urlInput=document.getElementById('bookmarkUrl');
var hiddenPg=document.getElementById('hiddenPg');
var closeBtn=document.getElementById('closeBtn');




var bookmarksContainer=[];

if (localStorage.getItem("bookmark") != null) {

    bookmarksContainer=JSON.parse(localStorage.getItem('bookmark'));
    displayBookmark(bookmarksContainer);
}

// ==============================> add
function addBookmark() 
{
    if (validateNameInput && validateUrlInput && !search()) {
        var bookmark={
            name:nameInput.value,
            url:urlInput.value,
        }
       
    bookmarksContainer.push(bookmark);

    localStorage.setItem("bookmark",JSON.stringify(bookmarksContainer));
    displayBookmark();
    
    clearForm();

    }
    else{
        hiddenPg.classList.replace("d-none","d-block");

    }
    
 }

// ===============================> display
function displayBookmark() {
    var box=``;
    for (var i = 0; i < bookmarksContainer.length; i++) {
        box+=`<tr>
        <td>${i+1}</td>
        <td>${bookmarksContainer[i].name.charAt(0).toUpperCase() + bookmarksContainer[i].name.slice(1)}</td>
        <td><a class="text-decoration-none text-white" href="${bookmarksContainer[i].url}"><button class="btn btn-visit"><i class="fa-solid fa-eye pe-2"></i> Visit</button></a> </td>
        <td><button class="btn btn-delete" onclick="deleteMark(${i});" ><i class="fa-solid fa-trash-can pe-2"></i> Delete</button></td>
      </tr>`;
       
    }
    document.getElementById('tableBody').innerHTML=box ;
 }

 // =================================> cleear

 function clearForm() {

    nameInput.value="";
    urlInput.value="";
    
 }

//  =================================> delete

function deleteMark(markIndex) {
    bookmarksContainer.splice(markIndex,1);
    localStorage.setItem("bookmark",JSON.stringify(bookmarksContainer));
    displayBookmark(bookmarksContainer); 
}

// ======================================> validation
function validateNameInput() {
    var regex=/^\w{3,}$/;

    if (regex.test(nameInput.value)==true) {
        return true;
    }
    else{
        return false;
    }

}


function validateUrlInput() {
    var regex=/^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/;

    if (regex.test(urlInput.value)==true) {
        return true;
    }
    else{
        return false;
    }

}

// =========================> remove hiddenpg

closeBtn.addEventListener("click",function(){
    hiddenPg.classList.add("d-none");
})

// =======================> input validate
function validateN() {
    if (validateNameInput()==true) {
        nameInput.classList.add("is-valid")
        nameInput.classList.remove("is-invalid")
    }
    else{
        nameInput.classList.add("is-invalid")
        nameInput.classList.remove("is-valid")
    }
}

function validateU() {
    if (validateUrlInput()==true) {
        urlInput.classList.add("is-valid")
        urlInput.classList.remove("is-invalid")
    }
    else{
        urlInput.classList.add("is-invalid")
        urlInput.classList.remove("is-valid")
    }

}


// =====================> no repeat

function search() {
    for (var i = 0; i < bookmarksContainer.length; i++) {
        if(bookmarksContainer[i].name.toLowerCase() == nameInput.value.toLowerCase()){
            alert("bookmark name is already there")
           return true
        }
        
    }
}


