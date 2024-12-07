//Get the job Form
const form = document.getElementById("Jobform");

//Function to add Skills
function addSkill(event) {

  //Prevent refersh of page
  event.preventDefault();

  //Get the input for skill
  const skillCont = document.getElementById("SkillsRequired");

  //check if the skillcont is empty or not
  if(skillCont.value.trim() == ""){
    return;
  }
  
  //Create a button for skill
  const btn1 = document.createElement("button");
  btn1.innerHTML = skillCont.value;
  btn1.classList.add("btn", "btn-success", "m-3");
  
  //append the skill to skillArray
  SkilsArray.push(skillCont.value);

  //reset the value of skill input
  skillCont.value = "";
  
  //Add the event listener to the button
  btn1.addEventListener("click", (event) => {
    event.preventDefault();
    const text = event.currentTarget.innerHTML;
    const index = SkilsArray.findIndex((p=>p==text));
    console.log(text);

    if(index != -1){
      SkilsArray.splice(index,1);
    }
    console.log(SkilsArray);
    event.currentTarget.remove();

  });

  const getDiv = document.querySelector("#skillcontainer");
  getDiv.append(btn1);
}

//maintain the skill in a array
const SkilsArray = [];


//get the add button
const addbtn = document.querySelector("#add");

//Add the above event listener
addbtn.addEventListener("click", (event) => {
  event.preventDefault();
  addSkill(event);
});


const sub_btn = document.getElementById('submit');
sub_btn.addEventListener('click',()=>{
  const skillCont = document.getElementById("SkillsRequired");

  skillCont.value = SkilsArray;
})