(function () {
  
  var list = ["My Day","Important", "Planned", "Assigned to you", "Tasks"];
  var symbol_list = ["&#xf185", "&#xf005", "&#xf073", "&#xf067","&#xf007", "&#xf0ca"];
  var task_list = [];
  var task;
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
    
    document.getElementById("userTasks").addEventListener("click",function(event){
    var target = event.target;
    if(target.className == "far fa-circle") {
      for(i=0;i<task_list.length;i++){
        if(target.nextSibling.innerHTML === task_list[i].tasks) {
          if(task_list[i].isComplete === "true") {
          task_list[i].isComplete = "false";
          target.nextSibling.className = "tasks_strikeOut";
          } else {
            task_list[i].isComplete = "true";
            target.nextSibling.className = "tasks";
          }
        }
      }
    }
    });
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
    for(i=0;i<task_list.length;i++){
      document.getElementById("userTasks").childNodes.forEach(ele => {
        ele.remove();
      })
     }
     if(task_list.length > 0){
       for(i =0;i<task_list.length;i++) {
         let catogories =task_list[i].category;
         if(catogories === tag.innerHTML) {
           document.getElementById("newtask"). value = "";
           let parent = document.getElementById("userTasks");
           let li = document.createElement("li");
           let span = document.createElement("span");
           let star = document.createElement("span");
           let paragraph = document.createElement("p");
           let hr = document.createElement("hr");
           parent.appendChild(li);
           span.className = "far fa-circle";
           star.className = "far fa-star";
           paragraph.innerHTML = task_list[i].tasks;
           parent.appendChild(hr);
           li.appendChild(span);
           li.appendChild(paragraph);
           li.appendChild(star);
           if(task_list[i].isComplete == "false") {
            paragraph.className = "tasks_strikeOut";
           } else {
           paragraph.className = "tasks";
           }
         }
       }
     }
  }

  //To bind to add new task in right side
  document.getElementById("newtask").addEventListener("keypress",function(event) {
    addNewTask(event);
  });

  function find(categories, Usertask, flag) {
    task = {
      category : categories,
      tasks  : Usertask,
      isComplete : flag
    };
    task_list.push(task);
    return task_list[task_list.length-1].tasks;
  }

  //To add new task in right side
  function addNewTask(e) {
    var input = document.getElementById("newtask");
    let category = input.getAttribute("category");
        if (e.code === "Enter") { 
        let text = e.target.value;
          if(text != "") {
          let value = find(category,text,"true");
          document.getElementById("newtask"). value = "";
          let parent = document.getElementById("userTasks");
          let li = document.createElement("li");
          let span = document.createElement("span");
          let star = document.createElement("span");
          let paragraph = document.createElement("p");
          let hr = document.createElement("hr");
          parent.appendChild(li);
          span.className = "far fa-circle";
          star.className = "far fa-star";
          paragraph.innerHTML = value;
          parent.appendChild(hr);
          li.appendChild(span);
          li.appendChild(paragraph);
          li.appendChild(star);
          span.id = "circle";
          star.id = "star";
          paragraph.className = "tasks";
        }
      }
   // });  
  //});
}
  
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

}
})();