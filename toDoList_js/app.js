let addBtn = document.getElementById('add');
let content = document.getElementById('taskInput');
let list = document.getElementById('toDoList');
let container = document.getElementsByClassName('container')[0];
let bar = document.getElementById('bar');
let completion = document.getElementById('completion');
let label = document.getElementById('lbl');

/*Lecture des cookies pour récupérer ancienne liste si existe*/
allCookies = document.cookie;
if(allCookies != null){
    let listElems = allCookies.substring(6).split(',')
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
        editI = document.createElement('i')
        delI = document.createElement('i')
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

/*crée élément texte quand aucune tâche*/
let p = document.createElement('p');
    p.innerHTML = "Il n'y a aucune tâche pour le moment"

if(list.childElementCount == 0){
    container.append(p)
    bar.classList.add('hide');
}

/*Création tâche*/
addBtn.addEventListener('click', function(){
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

        editI = document.createElement('i')
        delI = document.createElement('i')
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
})

/*Effacer la tâche*/
function deleteElem(e){
    list.removeChild(e.target.parentNode.parentNode.parentNode);
    let count = list.childElementCount;
    if(count == 0){
        container.append(p);
        bar.classList.add('hide');
    }
}

/*Editer la tâche*/
function editElem(e){
    let text = e.target.parentNode.parentNode.previousSibling;
    let input = document.createElement('input');
    input.type = 'text';
    input.value = text.innerHTML;
    text.parentNode.replaceChild(input, text)
    addEventListener('keydown', function(e){
        if(e.code === 'Enter'){
            text.innerHTML = input.value;
            input.parentNode.replaceChild(text, input)
        }
    })
}

/*click sur éléments liste pour repérer si efface ou édite*/
list.addEventListener('click', function(e){
    if(e.target.classList.contains('fa-trash-can')){
        deleteElem(e)
    }
    if(e.target.classList.contains('fa-pencil')){
        editElem(e)
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
        document.cookie = 'liste = ' + tb +';path=/; domaine=localhost:5174; expires=' +date;
    }
}




/*
this
event.target
*/
