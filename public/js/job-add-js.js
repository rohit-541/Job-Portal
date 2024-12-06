const form = document.getElementById("Jobform");
function addSkill(event) {
  event.preventDefault();
  const btn1 = document.createElement("button");
  const skillCont = document.getElementById("SkillsRequired");
  SkilsArray.push(skillCont.value);
  btn1.innerHTML = skillCont.value + " X";
  skillCont.value = "";
  btn1.classList.add("btn", "btn-success", "m-3");
  btn1.addEventListener("click", (event) => {
    event.preventDefault();
    event.currentTarget.remove();
  });
  getDiv.append(btn1);
}
const getDiv = document.querySelector("#skillcontainer");

const SkilsArray = [];

const addbtn = document.querySelector("#add");
console.log(addbtn);

addbtn.addEventListener("click", (event) => {
  event.preventDefault();
  addSkill(event);
});

form.FormData.append("skills", SkilsArray);


