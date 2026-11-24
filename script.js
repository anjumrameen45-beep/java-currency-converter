const BASE_URL="https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";
const dropdowns=document.querySelectorAll(".dropdown select");
const btn=document.querySelector("form button");
const fromCurr=document.querySelector(".from select");
const toCurr=document.querySelector(".to select");
const msg=document.querySelector(".msg");

for( let select of dropdowns){
for ( Currcode in countryList){
let newOption=document.createElement("option");
newOption.innerText=Currcode;
newOption.value=Currcode;
if(select.name==="from" && Currcode==="USD"){
    newOption.selected="selected";
}else if(select.name==="to" && Currcode==="PKR"){
    newOption.selected="selected";
}
select.append(newOption);
}
select.addEventListener("change",(evt)=>{
    updateFlag(evt.target);
})
}

const updateFlag=(element)=>{
    let Currcode=element.value;
   let countryCode=countryList[Currcode];
   let newSrc=`https://flagsapi.com/${countryCode}/flat/64.png`;
   let img=element.parentElement.querySelector("img");
   img.src = newSrc;

};
btn.addEventListener("click", async (evt)=>{
evt.preventDefault();
let amount=document.querySelector(".amount input");
let amtValue=amount.value;
if (amtValue  === "" || amtValue < 1){
    amtValue=1;
    amount.value= "1"; 
}
//console.log(fromCurr.value , toCurr.value);
const URL=`${BASE_URL}/${fromCurr.value.toLowerCase()}.json`;
let response = await fetch(URL);
let data = await response.json();

console.log(data);
console.log(data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()]);

let rate = data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()];
let finalAmount= amtValue*rate;
msg.innerText=`${amtValue} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;


});

