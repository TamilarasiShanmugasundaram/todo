  //Global variables
  var categoryList = ["My Day", "Important", "Planned", "Assigned to you", "Tasks"];
  var symbolList = ["&#xf185", "&#xf005", "&#xf073", "&#xf067","&#xf007", "&#xf0ca"];
  var staticList = ["Add to My Day", "Remind Me", "Add due Date", "Repeat", "Pick a Category", "Add file"];
  var symbols = ["&#xf185", "&#xf0f3", "&#xf073", "&#xf133","&#xf02b", "&#xf0c6"];
  var taskList = [];
  var stepList = [];

(function () {

  init();

    /**
     * To call details when page is loaded initially
     */
  function init() {
    initialRender();  
  }

  
    /**
     * To render details for initial page load
     */
  function initialRender() {
    let plusIcon = document.getElementById("plus");
    plusIcon.innerHTML = "&#xf067"; 
    let addIcon = document.getElementById("new-list");
    addIcon.innerHTML = "&#xf055";
    for(i = 0; i < categoryList.length; i++) {
      let parent = document.getElementById("user-category");
      let li = document.createElement("li");
      let icon = document.createElement("icon");
      let span = document.createElement("span");
      parent.appendChild(li);
      icon.innerHTML = symbolList[i];
      icon.className = "fa";
      span.innerHTML = categoryList[i];
      li.appendChild(icon);
      li.appendChild(span);
      span.className = "symbol"; 
    }
  }
  
  /**
   * To bind to add new category in left side
   */
  document.getElementById("new-category").addEventListener("click", addNewCategory); 
    
  /**
   * To add new category in left side
   */
  function addNewCategory() {
    var newitem = document.getElementById("new-category");
    newitem.addEventListener("keypress", function(e) {
      if (e.code === "Enter") { 
        let text = e.target.value;
        if(text != "") {
          categoryList.push(text);
          document.getElementById("new-category").value = "";
          let parent = document.getElementById("user-category");
          let li = document.createElement("li");
          let icon = document.createElement("icon");
          let span = document.createElement("span");
          parent.appendChild(li);
          icon.innerHTML = symbolList[symbolList.length-1];
          icon.className = "fa";
          span.innerHTML = categoryList[categoryList.length-1];
          li.appendChild(icon);
          li.appendChild(span);
          span.className = "symbol";  
        }
      }
    });
  }

  /**
   * To bind which categoty is clicked by user
   */
  document.getElementById("user-category").addEventListener("click", function(event) {
    var tag = event.target;
    if(tag.tagName === "ICON") {
      var tag = tag.nextSibling;
    }
    if(tag.tagName === "LI") {
      var tag = tag.childNodes[1];
    }
    renderRightSide(tag.innerHTML);
  });

  /**
   * To render right side 
   */
  function renderRightSide(category) {
    let title = document.getElementById("title");
    title.innerHTML = category +"      ...";
    let plus = document.getElementById("icon");
    plus.innerHTML = "&#xf067";
    let input = document.getElementById("new-task");
    input.className = "enable";
    input.setAttribute("category", category);
    renderTasks(category);
  }

  /**
   * To render tasks 
   */
  function renderTasks(tag) {
    document.getElementById("user-tasks").innerHTML = "";
    if(taskList.length > 0){
    for(i = 0; i < taskList.length; i++) {
      if(taskList[i].category === tag) {
        document.getElementById("new-task").value = "";
        let parent = document.getElementById("user-tasks");
        for(j = 0; j < taskList[i].tasks.length; j++) { 
          let li = document.createElement("li");
          let input = document.createElement("input");
          let star = document.createElement("icon");
          let taskname = document.createElement("span");
          taskname.innerHTML = taskList[i].tasks[j].taskName;
          input.type = "radio";
          taskname.id = "task-name";
          if(taskList[i].tasks[j].isImportant === "true") {
            star.className = "fa fa-star";
          } else {
            star.className = "far fa-star";
          }
          if(taskList[i].tasks[j].isComplete === "false") {
            input.checked = true;
            taskname.className = "tasks-strikeOut";
          } else {
            taskname.className = "tasks";
          }
          parent.appendChild(li);
          li.appendChild(input);
          li.appendChild(taskname);
          li.appendChild(star);
          li.className = "border";
        }
      }         
    }
  }
}

  /**
   * To bind to add new task in right side 
   */
  document.getElementById("new-task").addEventListener("keypress", addNewTask);

  /**
   * To add new task in right side
   */
  function addNewTask(e) {
    var input = document.getElementById("new-task");
    let category = input.getAttribute("category");
        if (e.code === "Enter" || e.keyCode === 13 || e.which === 13) { 
        let text = e.target.value;
          if(text != "") {
            let value ;
            document.getElementById("new-task"). value = "";
            let parent = document.getElementById("user-tasks");
            let li = document.createElement("li");
            let input = document.createElement("input");
            let star = document.createElement("icon");
            let paragraph = document.createElement("span");
            input.type = "radio";
            paragraph.id = "task-name";
            input.className = "d-block";
            if(category == "Important"){
              star.className = "fa fa-star";
            value = addTask(category, text, "true", "true");
            } else {
              star.className = "far fa-star";
               value = addTask(category, text, "true", "false");
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

  /**
   * Add task in task list
   */
function addTask(categories, Usertask, complete, important) {
  let flag = 0;
  for(i = 0; i < taskList.length; i++){    
    if(categories === taskList[i].category) {
      flag = 1;
      var task = {
        taskName : Usertask,
        isComplete : complete,
        isImportant : important
      }
      taskList[i].tasks.push(task);
     break;
    } }
    if(taskList.length === 0 || flag === 0) {
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
       taskList.push(taskDetails);
      }
   return Usertask;
 }

   /**
   * Bind function when user click on user task list
   */
document.getElementById("user-tasks").addEventListener("click", function(event){
  var target = event.target;
  if(target.tagName == "SPAN" || target.tagName == "LI") {
    renderCornerContainer(target); 
  } 
  if(target.type === "radio") {
    for(i = 0; i < taskList.length; i++){
      for(j = 0; j < taskList[i].tasks.length; j++) {
        if(target.nextSibling.innerHTML === taskList[i].tasks[j].taskName) {
          if(taskList[i].tasks[j].isComplete === "true") {
            target.checked = true;
            taskList[i].tasks[j].isComplete = "false";
           target.nextSibling.className = "tasks-strikeOut";  
          } else {
            taskList[i].tasks[j].isComplete = "true";
            target.nextSibling.className = "tasks";
            target.checked = false;
          }
        }
      }
    }
    renderCornerContainer(target.nextSibling);
  }
  if(target.className ===  "far fa-star") {
    let flag = 0;
    for(i = 0; i < taskList.length; i++){
     for(j = 0; j < taskList[i].tasks.length; j++) {   
        if(target.previousSibling.innerHTML === taskList[i].tasks[j].taskName) {
          taskList[i].tasks[j].isImportant = "true";
          target.className = "fa fa-star";
          addTask("Important", target.previousSibling.innerHTML, "true", "true");
          flag = 1;
          break;
        }
      }
      if(flag === 1){
        break;
      }
    }
    renderCornerContainer(target.previousSibling);
   }  else if(target.className ===  "fa fa-star" ){
        for(i = 0; i < taskList.length; i++){
         if(taskList[i].category === "Important") {
          for(j = 0; j < taskList[i].tasks.length; j++) { 
              if(target.previousSibling.innerHTML === taskList[i].tasks[j].taskName) {
                taskList[i].tasks.splice(j, 1);
              }
            }
          } else{
            for(j = 0; j < taskList[i].tasks.length; j++) { 
              if(target.previousSibling.innerHTML === taskList[i].tasks[j].taskName) {
                taskList[i].tasks[j].isImportant = "false";
                target.className = "far fa-star"; 
              }
            }
          }
        }
        renderCornerContainer(target.previousSibling);
      }
  });

  /**
   * To render corner container
   */
  function renderCornerContainer(target) {
    document.getElementById("user-options").innerHTML = "";
    document.getElementById("user-step").innerHTML = "";
    let rightContainer = document.getElementById("right-container");
    rightContainer.className = "right";
    let parent = document.getElementById("user-step");
    let li = document.createElement("div");
    let input = document.createElement("input");
    let paragraph = document.createElement("span");
    let star = document.createElement("icon");
    input.type ="radio";
    paragraph.id  = "tast-title";
    paragraph.innerHTML = target.innerHTML;
    if(target.className === "tasks-strikeOut") {
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

  /**
   * To render steps
   */ 
  function renderSteps(target, parent) {
    for(i = 0; i < stepList.length; i++) {
      if(stepList[i].taskName == target.innerHTML) {
        for(j = 0; j < stepList[i].stepName.length; j++){
          let list = document.createElement("li");
          let circle = document.createElement("input");
          let name = document.createElement("span");
          let close = document.createElement("icon");
          circle.type = "radio";
          name.innerHTML = stepList[i].stepName[j];
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
  
  /**
   * To render user default option 
   */ 
  function renderUserOptions() {
    let parentNode = document.getElementById("user-options");
    for(i = 0; i < staticList.length; i++) {
      let l = document.createElement("li");
      let p = document.createElement("span");
      let symbol = document.createElement("icon");
      symbol.innerHTML = symbols[i];
      symbol.className = "fa";
      p.innerHTML = staticList[i];
      parentNode.appendChild(l);
      l.appendChild(symbol);
      l.appendChild(p);
      l.className = "border";
      p.className=  "options";
    }
  }

  /**
   * To bind to add new step
   */ 
  document.getElementById("new-step").addEventListener("keypress", addStep); 

  /**
   * To add new step
   */ 
  function addStep(event) {
    let taskTitle = document.getElementById("tast-title");
    if(event.code === "Enter") {
      let parent = document.getElementById("user-step");
      let value = addStepInList(taskTitle.innerHTML, event.target.value);
        let li = document.createElement("li");
        let circle = document.createElement("input");
        let name = document.createElement("span");
        let close = document.createElement("icon");
        circle.type = "radio";
        name.innerHTML = value;
        name.className = "step-title";
        close.className = "fas fa-times";
        parent.appendChild(li);
        li.appendChild(circle);
        li.appendChild(name);
        li.appendChild(close);
        li.className = "border";
        document.getElementById("new-step").value = "";
    }
  }

  /**
   * To add new step in list
   */ 
  function addStepInList(task, step) {
    let flag = 0;
    for(i = 0; i < stepList.length; i++)  {
      if(stepList[i].taskName === task) {
        flag = 1;
        stepList[i].stepName.push(step);
        break;
      } }
      if(stepList.length === 0 || flag === 0) {
        var steps = {
          taskName : task,
          stepName : []
        }
        steps.stepName[0] = step;
       stepList.push(steps);
      }
      return step;
    }
 
  /**
   * To bind when click on step title
   */ 
    document.getElementById("user-step").addEventListener("click", bindUserStep);

  /**
   * To process when click on step title
   */ 
    function bindUserStep(event) {
      target = event.target;      
      if(target.parentNode.tagName === "DIV") {       
        if(target.tagName === "INPUT") {
          for(i = 0; i < taskList.length; i++){
            for(j = 0; j < taskList[i].tasks.length; j++){
              if(taskList[i].tasks[j].taskName === target.nextSibling.innerHTML && taskList[i].tasks[j].isComplete === "false") {
                target.checked = false;
                target.nextSibling.className = "step-title";
                taskList[i].tasks[j].isComplete = "true";
                renderTasks(taskList[i].category);
               } else {
                target.nextSibling.className = "step-strikeOut";
                taskList[i].tasks[j].isComplete = "false";
                renderTasks(taskList[i].category);
              }
            }
          }
        }
        if(target.tagName === "ICON") {
          for(i = 0; i < taskList.length; i++){
            for(j = 0; j < taskList[i].tasks.length; j++){
               if(taskList[i].tasks[j].taskName === target.previousSibling.innerHTML && taskList[i].tasks[j].isImportant === "false") {
                  target.className = "fa fa-star"; 
                  taskList[i].tasks[j].isImportant = "true";
                  renderTasks(taskList[i].category);
                } else {            
                  target.className = "far fa-star"; 
                  taskList[i].tasks[j].isImportant = "false";
                  renderTasks(taskList[i].category);
              }
            }
          }
        }
      }
    }
    
})();
