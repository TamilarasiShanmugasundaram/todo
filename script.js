  //Global variables
  var category_list = ["My Day","Important", "Planned", "Assigned to you", "Tasks"];
  var symbol_list = ["&#xf185", "&#xf005", "&#xf073", "&#xf067","&#xf007", "&#xf0ca"];
  var static_List = ["Add to My Day","Remind Me", "Add due Date", "Repeat", "Pick a Category", "Add file"];
  var symbols = ["&#xf185", "&#xf0f3", "&#xf073", "&#xf133","&#xf02b", "&#xf0c6"];
  var task_list = [];
  var step_list = [];

(function () {
  

  init();

  function init() {
    //To call details when page is loaded initially
    initialRender();  
  }

    // To render details for initial page load
    function initialRender() {
      let plus = document.getElementById("plus");
      plus.innerHTML = "&#xf067"; 
      let newlist = document.getElementById("newlist");
      newlist.innerHTML = "&#xf055";
      for(i =0;i < category_list.length; i++ ) {
        let parent = document.getElementById("userCategory");
        let li = document.createElement("li");
        let span = document.createElement("span");
        let paragraph = document.createElement("p");
        parent.appendChild(li);
        span.innerHTML = symbol_list[i];
        span.className = "fa";
        paragraph.innerHTML = category_list[i];
        li.appendChild(span);
        li.appendChild(paragraph);
        paragraph.classList.add("symbol"); 
      }
    }
  
  //To bind to add new category in left side
  document.getElementById("newCategory").addEventListener("click",addNewCategory);
    
  //To add new category in left side
  function addNewCategory() {
    var newitem = document.getElementById("newCategory");
    newitem.addEventListener("keypress", function (e) {
      if (e.code === "Enter" ) { 
        let text = e.target.value;
        if(text != "") {
          category_list.push(text);
          document.getElementById("newCategory"). value = "";
          let parent = document.getElementById("userCategory");
          let li = document.createElement("li");
          let span = document.createElement("span");
          let paragraph = document.createElement("p");
          parent.appendChild(li);
          span.innerHTML = symbol_list[symbol_list.length-1];
          span.className = "fa";
          paragraph.innerHTML = category_list[category_list.length-1];
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
    if(tag.tagName ==="SPAN") {
      var tag = tag.nextSibling;
    }
    if(tag.tagName ==="LI") {
      var tag = tag.childNodes[1];
    }
    renderRightSide(tag, event);
  });

  //To render right side 
  function renderRightSide(tag, event) {
    let title = document.getElementById("title");
    title.innerHTML = tag.innerHTML +"      ...";
    let plus = document.getElementById("icon");
    plus.innerHTML = "&#xf067";
    let input = document.getElementById("newtask");
    input.className = "enable";
    input.setAttribute("category",tag.innerHTML);
    renderTasks(tag.innerHTML);
  }

  //To render tasks
  function renderTasks(tag) {
    for(i=0;i<task_list.length;i++){
      for(j=0;j<task_list[i].tasks.length;j++){
        document.getElementById("userTasks").childNodes.forEach(ele => {
          ele.remove();
      });
     }
    }
    if(task_list.length > 0){
    for(i =0;i<task_list.length;i++) {
      let catogories = task_list[i].category;
      if(catogories === tag) {
        document.getElementById("newtask"). value = "";
        let parent = document.getElementById("userTasks");
        for(j=0;j<task_list[i].tasks.length;j++) { 
          let li = document.createElement("li");
          let input = document.createElement("input");
          let star = document.createElement("span");
          let paragraph = document.createElement("p");
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
          li.className = "border";
        }
      }         
    }
  }
}

  //To bind to add new task in right side
  document.getElementById("newtask").addEventListener("keypress",addNewTask);

  //To add new task in right side
  function addNewTask(e) {
    var input = document.getElementById("newtask");
    let category = input.getAttribute("category");
        if (e.code === "Enter" || e.keyCode === 13 || e.which === 13) { 
        let text = e.target.value;
          if(text != "") {
            let value ;
            document.getElementById("newtask"). value = "";
            let parent = document.getElementById("userTasks");
            let li = document.createElement("li");
            let input = document.createElement("input");
            let star = document.createElement("span");
            let paragraph = document.createElement("p");
            input.type = "radio";
            paragraph.id = "task-name";
            input.className = "d-block";
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
            paragraph.className = "tasks";
            li.className = "border";
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

 //Bind function whrn user click on user task list
document.getElementById("userTasks").addEventListener("click",function(event){
  var target = event.target;
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
         if(task_list[i].category == "Important") {
          for(j=0;j<task_list[i].tasks.length;j++) { 
              if(target.previousSibling.innerHTML == task_list[i].tasks[j].taskName) {
                task_list[i].tasks.splice(j,1);
              }
            }
          } else{
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

  //To render corner container
  function renderCornerContainer(target) {
    if(step_list.length == 0) 
    {
      document.getElementById("user-step").childNodes.forEach(ele => {
        ele.remove();
      });
      for(j=0;j<static_List.length;j++){
        document.getElementById("user-options").childNodes.forEach(ele => {
          ele.remove();
      });
    }}
     for(i=0;i<step_list.length;i++){
       for(j=0;j<step_list[i].stepName.length;j++){
             document.getElementById("user-step").childNodes.forEach(ele => {
        ele.remove();    
            });
          }
        for(j=0;j<static_List.length;j++){
          document.getElementById("user-options").childNodes.forEach(ele => {
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
    renderSteps(target,parent);
    renderUserOptions();
} 

  //To render steps 
  function renderSteps(target, parent) {
    for(i=0;i<step_list.length;i++) {
      if(step_list[i].taskName == target.innerHTML) {
        for(j=0;j<step_list[i].stepName.length;j++){
          let list = document.createElement("li");
          let circle = document.createElement("input");
          let name = document.createElement("p");
          let close = document.createElement("span");
          circle.type = "radio";
          name.innerHTML = step_list[i].stepName[j];
          close.className = "fas fa-times";
          parent.appendChild(list);
          list.appendChild(circle);
          list.appendChild(name);
          list.appendChild(close);
          document.getElementById("new-step").value = "";
          name.className = "step-title";
          list.className = "border";
        }
      }
    }
  }
  //To render user default option 
  function renderUserOptions() {
    let parentNode = document.getElementById("user-options");
    for(i=0;i<static_List.length;i++){
      let l = document.createElement("li");
      let p = document.createElement("p");
      let symbol = document.createElement("span");
      symbol.innerHTML = symbols[i];
      symbol.className = "fa";
      p.innerHTML = static_List[i];
      parentNode.appendChild(l);
      l.appendChild(symbol);
      l.appendChild(p);
      l.className = "border";
      p.className=  "options";
    }
  }
  //To bind to add new step
  document.getElementById("new-step").addEventListener("keypress",addStep); 

  //To add new step
  function addStep(event) {
    let task_title = document.getElementById("tastTitle");
    if(event.code === "Enter") {
      let parent = document.getElementById("user-step");
      let value = addStepInList(task_title.innerHTML, event.target.value);
        let li = document.createElement("li");
        let circle = document.createElement("input");
        let name = document.createElement("p");
        let close = document.createElement("span");
        circle.type = "radio";
        name.innerHTML = value;
        name.className = "new-step-name";
        close.className = "fas fa-times";
        parent.appendChild(li);
        li.appendChild(circle);
        li.appendChild(name);
        li.appendChild(close);
        li.className = "border";
        document.getElementById("new-step").value = "";
    }
  }
  //To add new step in list
  function addStepInList(task, step) {
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
 
    //To bind when click on step title
    document.getElementById("user-step").addEventListener("click",bindUserStep);

    //To process when click on step title
    function bindUserStep(event) {
      target = event.target;      
      if(target.parentNode.tagName === "DIV") {       
        if(target.tagName == "INPUT") {
          for(i=0;i<task_list.length;i++){
            for(j=0;j<task_list[i].tasks.length;j++){
               if(task_list[i].tasks[j].taskName == target.nextSibling.innerHTML) {
                if(task_list[i].tasks[j].isComplete == "false") {
                  target.checked = false;
                  target.nextSibling.className = "step-title";
                  task_list[i].tasks[j].isComplete = "true";
                  renderTasks(task_list[i].category);
                } else {
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
                  target.className = "far fa-star"; 
                  task_list[i].tasks[j].isImportant = "false";
                  renderTasks(task_list[i].category);
                }
              }
            }
          }
        }
      }
    
    }
   

})();
