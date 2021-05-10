(function () {
  init();
})();

function init() {
  let plus = document.getElementById("plus");
  plus.innerHTML = "&#xf067"; 
  let newlist = document.getElementById("newlist");
  newlist.innerHTML = "&#xf055"; 

  var list = ["My Day","Important", "Planned", "Assigned to you", "Tasks"];
  var symbol_list = ["&#xf185", "&#xf005", "&#xf073", "&#xf067","&#xf007", "&#xf0ca"];
  var parent = document.getElementById("userCategory");
  for(i =0;i < list.length; i++ ) {
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

document.getElementById("userCategory").addEventListener("click",function(event) {
  var tag =event.target;
  if(tag.tagName=="SPAN") {
    var tag = tag.nextSibling;
  }
  if(tag.tagName=="LI") {
    var tag = tag.childNodes[1];
  }
  var title = document.getElementById("title");
  title.innerHTML = tag.innerHTML + "...";
  let circle = document.getElementById("circle");
  circle.innerHTML = "&#xf111";
  var parent = document.getElementById("userTasks");
  var input = document.getElementById("newtask");
  input.className = "enable";
});

function addNewList() {
  var newitem = document.getElementById("newitem");
  newitem.addEventListener("keypress", function (e) {
  if (e.code === "Enter") { 
    validate(e);
  }
  });
  function validate(e) {
    var untitled_list = ["Untitled List"]; 
    var symbol_list = ["&#xf185", "&#xf005", "&#xf073", "&#xf067","&#xf007", "&#xf0ca"];
    var list = ["My Day","Important", "Planned", "Assigned to you", "Tasks"];
    let text = e.target.value;
    if(text != "") {
    // if(untitled_list.includes("Untitled List")) {
    //   list.push("Untitled List");
    //   }
    // } else {
      list.push(text);
    
    document.getElementById("newitem"). value = "";
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
}

function addNewTask() {
var input = document.getElementById("newtask");
input.addEventListener("keypress", function (e) {
  if (e.code === "Enter") { 
    validate(e);
  }
  });
  function validate(e) {
    //var untitled_list = ["Untitled List"]; 
    //var symbol_list = ["&#xf185", "&#xf005", "&#xf073", "&#xf067","&#xf007", "&#xf0ca"];
    var list = [];
    let text = e.target.value;
     if(text != "") {
    // if(untitled_list.includes("Untitled List")) {
    //   list.push("Untitled List");
    //   }
    // } else {
      list.push(text);
   // }
    document.getElementById("newtask"). value = "";
      var parent = document.getElementById("userTasks");
      var li = document.createElement("li");
      var span = document.createElement("span");
      var star = document.createElement("span");
      var paragraph = document.createElement("p");
      var hr = document.createElement("hr");
      parent.appendChild(li);
      span.innerHTML = "&#xf111";
      span.className = "fa";
      star.innerHTML = "&#xf005";
      star.className = "fa";
      paragraph.innerHTML = text;
      parent.appendChild(hr);
      li.appendChild(span);
      li.appendChild(paragraph);
      li.appendChild(star);
      paragraph.className = "tasks";
     }
  }
}