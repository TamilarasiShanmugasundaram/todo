
let plus = document.getElementById("plus");
plus.innerHTML = "&#xf067"; 
let newlist = document.getElementById("newlist");
newlist.innerHTML = "&#xf055"; 

var list = ["My Day","Important", "Planned", "Assigned to you", "Tasks"];
var symbol_list = ["&#xf185", "&#xf005", "&#xf073", "&#xf067","&#xf007", "&#xf0ca"];
var parent = document.getElementById("ul");
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

var newitem = document.getElementById("newitem");
newitem.addEventListener("keypress", function (e) {
if (e.code === "Enter") { 
  validate(e);
}
});

function validate(e) {
  let text = e.target.value;
  list.push(text);
  for(i =0;i < 1; i++ ) {
    li = document.createElement("li");
    span = document.createElement("span");
    paragraph = document.createElement("p");
    parent.appendChild(li);
    span.innerHTML = symbol_list[symbol_list.length-1];
    span.className = "fa";
    paragraph.innerHTML = list[list.length-1];
    li.appendChild(span);
    li.appendChild(paragraph);
    paragraph.classList.add("symbol");  
  }
}