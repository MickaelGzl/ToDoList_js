let addBtn = document.getElementById('add');
let content = document.getElementById('taskInput');
let list = document.getElementById('toDoList');
let container = document.getElementsByClassName('container')[0];
let bar = document.getElementById('bar');
let completion = document.getElementById('completion');
let label = document.getElementById('lbl');
let delAlert = document.getElementById('delAlert');
let btnY = document.querySelector('.deleteY');
let btnN = document.querySelector('.deleteN');
let rappelCheck = document.getElementById('noRappel');
let noRappel = false;

let editionMode = false;

/*Lecture des cookies pour récupérer ancienne liste si existe*/
let allCookies = document.cookie.split('; ');
let cookieList = allCookies.find(cookie => cookie.startsWith('liste='));
if(cookieList != undefined){
    let listElems = cookieList.substring(6).split(',')
    let tb = Array.from(listElems);
    tb.forEach(text => {
        let li = document.createElement('li');
        let checkbox = document.createElement('input');
        let span = document.createElement('span');
        let div = document.createElement('div');
        let editBtn = document.createElement('button');
        let delBtn = document.createElement('button');

        if(text.split('_')[1] == 'true'){
            checkbox.checked = true
        }

        li.classList.add('taskListItem');
        checkbox.type = "checkbox";
        checkbox.classList.add('check');
        span.innerText = text.split('_')[0];
        let editI = document.createElement('i')
        let delI = document.createElement('i')
        editI.classList.add('fa-solid', 'fa-pencil')
        editI.style.fontSize = '1em';
        editI.style.color = '#fff';
        delI.classList.add('fa-solid', 'fa-trash-can')
        delI.style.fontSize = '1em';
        delI.style.color = '#fff';

        editBtn.append(editI)
        delBtn.append(delI)
        div.prepend(editBtn);
        div.append(delBtn);
        li.append(div);
        li.prepend(checkbox);
        checkbox.insertAdjacentElement("afterend", span);

        list.append(li);


    })
}

let confirmBtn = document.createElement('button');
let confirmBtnI = document.createElement('i');
confirmBtnI.classList.add('fa-solid', 'fa-check')
confirmBtnI.style.fontSize = '1em';
confirmBtnI.style.color = '#fff';
confirmBtn.append(confirmBtnI);


/*crée élément texte quand aucune tâche*/
let p = document.createElement('p');
    p.innerHTML = "Il n'y a aucune tâche pour le moment"

if(list.childElementCount == 0){
    container.append(p)
    bar.classList.add('hide');
}

/*Création tâche*/
function addATask(){
    if(editionMode == false){
        if(!content.value.trim() == ""){
            if(container.contains(p)){
                container.removeChild(p)
                bar.classList.remove('hide')
            }
            let elems = list.childNodes;
            let tb = Array.from(elems).map(li => li.innerText);
            let validation = true;
            tb.forEach(text =>{
                if(content.value === text){
                    alert('Vous avez déjà enregistré cette tâche.')
                    validation = false;
                }
            })
            if(validation){
            let li = document.createElement('li');
            let checkbox = document.createElement('input');
            let span = document.createElement('span');
            let div = document.createElement('div');
            let editBtn = document.createElement('button');
            let delBtn = document.createElement('button');

            li.classList.add('taskListItem');
            checkbox.type = "checkbox";
            checkbox.classList.add('check');
            span.append(content.value)

            let editI = document.createElement('i')
            let delI = document.createElement('i')
            editI.classList.add('fa-solid', 'fa-pencil')
            editI.style.fontSize = '1em';
            editI.style.color = '#fff';
            delI.classList.add('fa-solid', 'fa-trash-can')
            delI.style.fontSize = '1em';
            delI.style.color = '#fff';

            editBtn.append(editI)
            delBtn.append(delI)
            div.prepend(editBtn);
            div.append(delBtn);
            li.append(div);
            li.prepend(checkbox);
            checkbox.insertAdjacentElement("afterend", span);

            list.append(li);
            content.value = "";
            }
        }
        else{
            content.value = "";
            alert(" Il n'y a aucune tâche à ajouter")
        }
    }
}

content.addEventListener('keydown', function(e){
    if(e.code == 'Enter'){
        addATask();
    }
})

addBtn.addEventListener('click', function(){
    addATask()
})


/*Effacer la tâche*/
function deleteElem(e){
    list.removeChild(e.target.parentNode.parentNode.parentNode);
    let count = list.childElementCount;
    if(count == 0){
        container.append(p);
        bar.classList.add('hide');
    }
    delAlert.classList.add('onTop');
    editionMode = false;
    content.disabled = false;
}

/*Editer la tâche*/
function editElem(e){
    let text = e.target.parentNode.parentNode.previousSibling;
    let saveText = text.innerHTML;
    let input = document.createElement('input');
    input.type = 'text';
    input.value = text.innerHTML;
    text.parentNode.replaceChild(input, text)
    let actualBtn = onModif(e); 

    input.addEventListener('keydown', function(e){
        if(e.code === 'Enter'){
            if(input.value.trim() != ""){
                text.innerHTML = input.value;
                input.parentNode.replaceChild(text, input)
            }
            else{
                text.innerHTML = saveText;
                input.parentNode.replaceChild(text, input)
                alert('L\'activité ne peut pas être un champ vide.')
            }
            text.nextSibling.replaceChild(actualBtn, confirmBtn)
            editionMode = false;
            content.disabled = false
        }
    })   

    input.nextSibling.childNodes[0].addEventListener('click', function(){
        if(input.value.trim() != ""){
            text.innerHTML = input.value;
            input.parentNode.replaceChild(text, input)
        }
        else{
            text.innerHTML = saveText;
            input.parentNode.replaceChild(text, input)
            alert('L\'activité ne peut pas être un champ vide.')
        }
        text.nextSibling.replaceChild(actualBtn, confirmBtn)
        editionMode = false;
        content.disabled = false
    })
}

function onModif(e){
    console.log(e.target.parentNode.parentNode)
    let actualBtn = e.target.parentNode;
    actualBtn.parentNode.replaceChild(confirmBtn, actualBtn);
    return actualBtn
}

function noDel(){
    delAlert.classList.add('onTop');
    editionMode = false;
}

/*click sur éléments liste pour repérer si efface ou édite*/
list.addEventListener('click', function(e){
    if(e.target.classList.contains('fa-trash-can')){
        if(editionMode == false){
            content.disabled = true;
            delAlert.classList.remove('onTop');
            editionMode = true;
            if(noRappel == false){
                btnY.addEventListener('click', function(){
                    deleteElem(e)
                    if(rappelCheck.checked == true){
                    noRappel = true;
                    }  
                })
            }
            else{
                deleteElem(e);
            }
            btnN.addEventListener('click', function(){
                noDel();
                if(rappelCheck.checked == true){
                    noRappel = true;
                }
            })
        }
    }
    if(e.target.classList.contains('fa-pencil')){
        if(editionMode == false){
            editionMode = true;
            content.disabled = true
            editElem(e)
        }
    }
})

/*supprimer le 1er élément de list.chilsNodes, texte*/
let txt = list.childNodes[0]
list.removeChild(txt)

/*adapte meter en enregistre liste dans cookies chaque 0.1sec*/
setInterval(cs, 100)       
function cs(){
    let elems = list.childNodes;
    let count = elems.length;
    completion.max = count;

    let count2 = 0;
    elems.forEach( li => {
         if(li.children[0].checked == true){
            count2 ++;
         }
    })
    completion.value = count2;
    let pourcentComplete = parseFloat(count2 * 100 / count).toFixed(2);
    label.innerHTML = 'Completion: ' + pourcentComplete + '%';

    let tb = Array.from(elems).map(li => li.innerText + '_' + li.children[0].checked);

    if(tb[0]){
        let date = new Date(Date.now() + 86400000)
        date = date.toUTCString();
        document.cookie = 'liste = ' + tb +';path=/; expires=' +date;
    }
}


/*
split élément de to do list si écrit avec une virgule
MutationObserver: voir pour remplacer la fonction qui se déroule toute les 0.1s

drag and drop
*/