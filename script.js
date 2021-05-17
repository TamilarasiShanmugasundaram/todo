(function () {
  
  var list = ["My Day","Important", "Planned", "Assigned to you", "Tasks"];
  var symbol_list = ["&#xf185", "&#xf005", "&#xf073", "&#xf067","&#xf007", "&#xf0ca"];
  var static_List = ["My Day","Important", "Planned", "Assigned to you", "Tasks"];
  var symbols = ["&#xf185", "&#xf005", "&#xf073", "&#xf067","&#xf007", "&#xf0ca"];
  var task_list = [];
  var step_list = [];
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
      paragraph.className = "symbol";  
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
    renderRightSide(tag, event);
  });

  function renderRightSide(tag, event) {
    var title = document.getElementById("title");
    title.innerHTML = tag.innerHTML +"      ...";
    var plus = document.getElementById("icon");
    plus.innerHTML = "&#xf067";
    var input = document.getElementById("newtask");
    input.className = "enable";
    input.setAttribute("category",tag.innerHTML);
    renderTasks(tag.innerHTML);
  }
  function renderTasks(tag) {
    for(i=0;i<task_list.length;i++){
      for(j=0;j<task_list[i].tasks.length;j++){
             document.getElementById("userTasks").childNodes.forEach(ele => {
        ele.remove();
      });
     }}
     if(task_list.length > 0){
      for(i =0;i<task_list.length;i++) {
         let catogories =task_list[i].category;
         if(catogories === tag) {
           document.getElementById("newtask"). value = "";
           let parent = document.getElementById("userTasks");
           for(j=0;j<task_list[i].tasks.length;j++) { 
            let li = document.createElement("li");
            let input = document.createElement("input");
            let star = document.createElement("span");
            let paragraph = document.createElement("p");
            let hr = document.createElement("hr");
            paragraph.innerHTML = task_list[i].tasks[j].taskName;
            input.type = "radio";
            paragraph.id = "task-name";
              if(task_list[i].tasks[j].isImportant == "true") {
               star.className = "fa fa-star";
              } else {
               star.className = "far fa-star";
              }
              if(task_list[i].tasks[j].isComplete == "false") {
                input.checked = true;
                paragraph.className = "tasks_strikeOut";
               } else {
               paragraph.className = "tasks";
               }
               parent.appendChild(li);
               li.appendChild(input);
               li.appendChild(paragraph);
               li.appendChild(star);
               li.appendChild(hr);
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
          paragraph.id = "task-name";
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
 
  let flag = 0;
  for(i=0;i<task_list.length;i++){    
    if(categories == task_list[i].category) {
      flag = 1;
     var task = {
        taskName : Usertask,
        isComplete : complete,
        isImportant : important
      }
     task_list[i].tasks.push(task);
     break;
    } }
    if(flag==0) {
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


function renderCornerContainer(target) {
  for(i=0;i<step_list.length;i++){
    for(j=0;j<step_list[i].stepName.length;j++){
           document.getElementById("user-step").childNodes.forEach(ele => {
      ele.remove();
    });
   }}
  let rightContainer = document.getElementById("right-container");
  rightContainer.className = "right";
  let parent = document.getElementById("user-step");
  let li = document.createElement("div");
    let input = document.createElement("input");
    let paragraph = document.createElement("p");
    let star = document.createElement("span");
    input.type ="radio";
    paragraph.id  = "tastTitle";
    paragraph.innerHTML = target.innerHTML;
    if(target.className == "tasks_strikeOut") {
      input.checked = true;
      paragraph.className = "step-strikeOut";
    } else {
      paragraph.className = "step-title";
    }
    star.className =  target.nextSibling.className;
    parent.appendChild(li);
    li.appendChild(input);
    li.appendChild(paragraph);
    li.appendChild(star);
  let plus = document.getElementById("plus-step");
  plus.innerHTML = "&#xf067"; 
for(i=0;i<step_list.length;i++) {
if(step_list[i].taskName == target.innerHTML) {
  for(j=0;j<step_list[i].stepName.length;j++){
    let list = document.createElement("li");
    let circle = document.createElement("input");
    let name = document.createElement("p");
    let close = document.createElement("span");
    let hr = document.createElement("hr");
    circle.type = "radio";
    name.innerHTML = step_list[i].stepName[j];
    close.className = "fas fa-times";
    parent.appendChild(list);
    list.appendChild(circle);
    list.appendChild(name);
    list.appendChild(close);
    list.appendChild(hr);
    document.getElementById("new-step").value = "";
    name.className = "new-step-name";
  }
}
}

} 



 //Bind function whrn user click on user task list
document.getElementById("userTasks").addEventListener("click",function(event){
  var target = event.target;
 
 // alert( target.innerHTML);
  if(target.tagName == "P" || target.tagName =="LI") {
    renderCornerContainer(target); 
  } 
  if(target.type == "radio") {
    for(i=0;i<task_list.length;i++){
      for(j=0;j<task_list[i].tasks.length;j++) {
        if(target.nextSibling.innerHTML === task_list[i].tasks[j].taskName) {
          if(task_list[i].tasks[j].isComplete === "true") {
            target.checked = true;
            task_list[i].tasks[j].isComplete = "false";
           target.nextSibling.className = "tasks_strikeOut";  
          } else {
            task_list[i].tasks[j].isComplete = "true";
           target.nextSibling.className = "tasks";
           target.checked = false;
          }
        }
      }
    }
    renderCornerContainer(target.nextSibling);
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
          break;
        }
      }
      if(flag == 1){
        break;
      }
    }
    renderCornerContainer(target.previousSibling);
   }  else if(target.className ==  "fa fa-star" ){
        for(i=0;i<task_list.length;i++){
         // alert(task_list[i].category);
         if(task_list[i].category == "Important") {
          for(j=0;j<task_list[i].tasks.length;j++) { 
              if(target.previousSibling.innerHTML == task_list[i].tasks[j].taskName) {
               // alert(target.previousSibling.innerHTML);
              //target.parentElement.remove();
              //alert(task_list[i].category);
                task_list[i].tasks.splice(j,1);
              }
            }
          }
          else{
            for(j=0;j<task_list[i].tasks.length;j++) { 
              if(target.previousSibling.innerHTML === task_list[i].tasks[j].taskName) {
                task_list[i].tasks[j].isImportant = "false";
                target.className = "far fa-star"; 
              }
            }
          }
        }
        renderCornerContainer(target.previousSibling);
      }
  });
  document.getElementById("new-step").addEventListener("keypress",function(event) {
    let task_title = document.getElementById("tastTitle");
    if(event.code === "Enter") {
      let parent = document.getElementById("user-step");
      let value = addStep(task_title.innerHTML, event.target.value);
        let li = document.createElement("li");
        let circle = document.createElement("input");
        let name = document.createElement("p");
        let close = document.createElement("span");
        let hr = document.createElement("hr");
        circle.type = "radio";
        name.innerHTML = value;
        name.className = "new-step-name";
        close.className = "fas fa-times";
        parent.appendChild(li);
        li.appendChild(circle);
        li.appendChild(name);
        li.appendChild(close);
        li.appendChild(hr);
        document.getElementById("new-step").value = "";
      }
  });
   
  function addStep(task, step) {
    let flag = 0;
    for(i=0;i<step_list.length;i++)  {
      if(step_list[i].taskName == task) {
        flag= 1;
        step_list[i].stepName.push(step);
        break;
      } }
      if(flag == 0) {
        var steps = {
          taskName : task,
          stepName : []
        }
        steps.stepName[0] = step;
       step_list.push(steps);
      } 
      if(step_list.length == 0 ) {
        var steps = {
          taskName : task,
          stepName : []
        }
        steps.stepName[0] = step;
       step_list.push(steps);
      }
      return step;
    }
 
    document.getElementById("user-step").addEventListener("click",function(event) {
      target = event.target;
      
      if(target.parentNode.tagName === "DIV") {
        
        if(target.tagName == "INPUT") {
         // alert(target.nextSibling.innerHTML);
          for(i=0;i<task_list.length;i++){
            for(j=0;j<task_list[i].tasks.length;j++){
               if(task_list[i].tasks[j].taskName == target.nextSibling.innerHTML) {
                if(task_list[i].tasks[j].isComplete == "false") {
                  //alert("sads");
                  target.checked = false;
                  target.nextSibling.className = "step-title";
                  task_list[i].tasks[j].isComplete = "true";
                  renderTasks(task_list[i].category);
                } else {
                  //alert("sahhhhhhhhhhhhhds");
                  target.nextSibling.className = "step-strikeOut";
                  task_list[i].tasks[j].isComplete = "false";
                  renderTasks(task_list[i].category);
                }
               }
            }
          }
        }
        if(target.tagName == "SPAN") {
          for(i=0;i<task_list.length;i++){
            for(j=0;j<task_list[i].tasks.length;j++){
               if(task_list[i].tasks[j].taskName == target.previousSibling.innerHTML) {
                if(task_list[i].tasks[j].isImportant == "false") {
                  
                  target.className = "fa fa-star"; 
                  task_list[i].tasks[j].isImportant = "true";
                  renderTasks(task_list[i].category);
                } else {
                  //alert(task_list[i].category);
                  
                  target.className = "far fa-star"; 
                  task_list[i].tasks[j].isImportant = "false";
                  renderTasks(task_list[i].category);
                }
               }
            }
          }
        }
      }
    });

    
}
})();
