let Holders=document.querySelector(".list");
let list=[];
let history;
let add=document.querySelector(".add");
let input=document.querySelector(".insert");
add.addEventListener("click",(event)=>{
    event.preventDefault();
history=input.value.trim();
list.push(history);

renderList();
input.value=" ";

})
function renderList(){
    Holders.innerHTML=list.map((items, index)=>`<li><input type="checkbox">${items}<button onclick= "deleteTask(${index})">Delete</button></li>`).join(" ");

}
function deleteTask(index) {
  list.splice(index, 1); // removes the item from the array
  renderList();          // redraws the list in the DOM
}

