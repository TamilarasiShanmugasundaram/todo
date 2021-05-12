(function () {
  
  var list = ["My Day","Important", "Planned", "Assigned to you", "Tasks"];
  var symbol_list = ["&#xf185", "&#xf005", "&#xf073", "&#xf067","&#xf007", "&#xf0ca"];
  var task_list = [];
  var id = 0;
  init();

  function init() {
    //To call details when page is loaded initially
    initialRender();  
    
    // To render details for initial page load
    function initialRender() {
      let plus = document.getElementById("plus");
      plus.innerHTML = "&#xf067"; 
      let newlist = document.getElementById("newlist");
      newlist.innerHTML = "&#xf055";
      for(i =0;i < list.length; i++ ) {
        let parent = document.getElementById("userCategory");
        var li = document.createElement("li");
        var span = document.createElement("span");
        var paragraph = document.createElement("p");
        parent.appendChild(li);
        span.innerHTML = symbol_list[i];
        span.className = "fa";
        paragraph.innerHTML = list[i];
        li.appendChild(span);
        li.appendChild(paragraph);
        paragraph.classList.add("symbol"); 
    }
  }
      //To bind to add new category in left side
      document.getElementById("newCategory").addEventListener("click",function(event) {
        addNewCategory();
      });
    
      
//To add new category in left side
function addNewCategory() {
  var newitem = document.getElementById("newCategory");
  newitem.addEventListener("keypress", function (e) {
  if (e.code === "Enter") { 
    let text = e.target.value;
    if(text != "") {
      list.push(text);
      document.getElementById("newCategory"). value = "";
      var parent = document.getElementById("userCategory");
      var li = document.createElement("li");
      var span = document.createElement("span");
      var paragraph = document.createElement("p");
      parent.appendChild(li);
      span.innerHTML = symbol_list[symbol_list.length-1];
      span.className = "fa";
      paragraph.innerHTML = list[list.length-1];
      li.appendChild(span);
      li.appendChild(paragraph);
      paragraph.classList.add("symbol");  
    }
  }
});
}
    //To bind which categoty is clicked by user
    document.getElementById("userCategory").addEventListener("click",function(event) {
    var tag = event.target;
    if(tag.tagName=="SPAN") {
      var tag = tag.nextSibling;
    }
    if(tag.tagName=="LI") {
      var tag = tag.childNodes[1];
    }
    renderRightSide(tag);
  });

  function renderRightSide(tag) {
    var title = document.getElementById("title");
    title.innerHTML = tag.innerHTML +"      ...";
    var plus = document.getElementById("icon");
    plus.innerHTML = "&#xf067";
    var input = document.getElementById("newtask");
    input.className = "enable";
    input.setAttribute("category",tag.innerHTML);
    renderTasks(tag);
  }
  function renderTasks(tag) {
   // for(i=0;i<task_list.length;i++){
      document.getElementById("userTasks").childNodes.forEach(ele => {
        ele.remove();
      });
    // }
     if(task_list.length > 0){
       for(i =0;i<task_list.length;i++) {
         let catogories =task_list[i].category;
         if(catogories === tag.innerHTML) {
           document.getElementById("newtask"). value = "";
           let parent = document.getElementById("userTasks");
           let li = document.createElement("li");
           let input = document.createElement("input");
           let star = document.createElement("span");
           let paragraph = document.createElement("p");
           let hr = document.createElement("hr");
           parent.appendChild(li);
           input.type = "radio";
           input.id= i; 
           for(j=0;j<task_list[i].tasks.length;j++) {
            paragraph.innerHTML = task_list[i].tasks[j].taskName;
           }
           li.appendChild(input);
           li.appendChild(paragraph);
           li.appendChild(star);
           li.appendChild(hr);
           for(j=0;j<task_list[i].tasks.length;j++) {
             if(task_list[i].tasks[j].isImportant == "true") {
              star.className = "fa fa-star";
             } else {
              star.className = "far fa-star";
             }
           if(task_list[i].tasks[j].isComplete == "false") {
            document.getElementById(i).checked = true;
            paragraph.className = "tasks_strikeOut";
            break;
           } else {
           paragraph.className = "tasks";
           }
          }
          
         }
       }
     }
  }

  //To bind to add new task in right side
  document.getElementById("newtask").addEventListener("keypress",function(event) {
    addNewTask(event);
  });

  //To add new task in right side
  function addNewTask(e) {
    var input = document.getElementById("newtask");
    let category = input.getAttribute("category");
        if (e.code === "Enter") { 
        let text = e.target.value;
          if(text != "") {
            let value ;
          document.getElementById("newtask"). value = "";
          let parent = document.getElementById("userTasks");
          let li = document.createElement("li");
          let input = document.createElement("input");
          let star = document.createElement("span");
          let paragraph = document.createElement("p");
          let hr = document.createElement("hr");
          input.type = "radio";
          input.id = id++;
          star.id = id++;
          input.className = "checkbox";
          if(category == "Important"){
            star.className = "fa fa-star";
           value = addTask(category,text,"true","true");
          } else {
            star.className = "far fa-star";
             value = addTask(category,text,"true","false");
          }
          paragraph.innerHTML = value;
          parent.appendChild(li);
          li.appendChild(input);
          li.appendChild(paragraph);
          li.appendChild(star);
          li.appendChild(hr);
          paragraph.className = "tasks";
        }
      }
}

//Add task in task list
function addTask(categories, Usertask, complete, important) {
  for(i=0;i<task_list.length;i++){    
    if(categories == task_list[i].category) {
     var task = {
        taskName : Usertask,
        isComplete : complete,
        isImportant : important
      }
     task_list[i].tasks.push(task);
     break;
    } else {
      var taskDetails = {
        category : categories,
        tasks  : [
          task = {
            taskName : Usertask,
            isComplete : complete,
            isImportant : important
          }
        ],
      };
      task_list.push(taskDetails);
      break;
    }
  }
  if(task_list.length == 0) {
  var taskDetails = {
     category : categories,
     tasks  : [
       task = {
         taskName : Usertask,
         isComplete : complete,
         isImportant : important
       }
     ],
   };
   task_list.push(taskDetails);
  }
   return Usertask;
 }

 //Bind function whrn user click on user task list
document.getElementById("userTasks").addEventListener("click",function(event){
  var target = event.target;
  if(target.type == "radio") {
    for(i=0;i<task_list.length;i++){
      for(j=0;j<task_list[i].tasks.length;j++) {
        if(target.nextSibling.innerHTML === task_list[i].tasks[j].taskName) {
          if(task_list[i].tasks[j].isComplete === "true") {
            task_list[i].tasks[j].isComplete = "false";
           target.nextSibling.className = "tasks_strikeOut";  
            break;
          } else {
            task_list[i].tasks[j].isComplete = "true";
            document.getElementById(target.id).checked = false;
            target.nextSibling.className = "tasks";
          }
        }
      }
    }
  }
  if(target.className ==  "far fa-star") {
    let flag = 0;
    for(i=0;i<task_list.length;i++){
     for(j=0;j<task_list[i].tasks.length;j++) {   
        if(target.previousSibling.innerHTML === task_list[i].tasks[j].taskName) {
          task_list[i].tasks[j].isImportant = "true";
          target.className = "fa fa-star";
          addTask("Important",target.previousSibling.innerHTML,"true","true");
          flag =1;
        }
      }
      if(flag == 1){
        break;
      }
    }
  } else if(target.className ==  "fa fa-star" ){
      let flag = 0;
      for(i=0;i<task_list.length;i++){
        for(j=0;j<task_list[i].tasks.length;j++) { 
          if(target.previousSibling.innerHTML === task_list[i].tasks[j].taskName) {
            // if(task_list.includes(target.previousSibling.innerHTML) && ){

            // }
           if(task_list[i].category == "Important") {
              target.parentElement.remove();
              task_list.splice(i,1);
            }
            task_list[i].tasks[j].isImportant = "false";
            target.className = "far fa-star";
            flag =1;
          }
        }
        if(flag == 1){
          break;
        }
      }
    }
  });
}
})();