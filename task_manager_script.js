const addTaskBtn=document.getElementById('addTask');
const addTaskField=document.getElementById('taskname');
const addDateBtn=document.getElementById('addDate');
const addDateField=document.getElementById('date');
const addCatgBtn=document.getElementById('addCat');
const addCatgField=document.getElementById('catg2');
const recordsDisplay=document.getElementById('records');
const Taskbtntext=addTaskBtn.innerText;
const Datebtntext=addDateBtn.innerText;
const Catgbtntext=addCatgBtn.innerText;
let TaskArray=[];
let WorkArray=[];
let PersonalArray=[];
let ShoppingArray=[];
let CompleteArray=[];
let edit_id=null;
let objstr=localStorage.getItem('TaskInfo');
if(objstr!=null){

   TaskArray=JSON.parse(objstr);
}
// console.log(TaskArray);
// addTaskBtn.onclick=()=>{
//    const Task=addTaskField.value;
//    TaskArray.push({'task':Task});
//    console.log(TaskArray);
//    SaveInfo(TaskArray);
//    // alert(Task);
// }
// // function addKeyToObject(key,value){
// //      TaskArray[]
// // }
// addDateBtn.onclick=()=>{
//    let index=0;
//    const Date=addDateField.value;
//    TaskArray[0]['date']=Date;
//       // TaskArray.push({'date':Date});
//    // console.log(TaskArray);
//    // alert(Date);
// }
DisplayInfo();
addCatgBtn.onclick=()=>{

   const Task=addTaskField.value;
   const Date=addDateField.value;
   const Catg=addCatgField.value;
   if(edit_id!=null){
TaskArray.splice(edit_id,1,{'name':Task,'date':Date,'catg':Catg});
edit_id=null;
   }
   else{
      if(Task!=null){
         TaskArray.push({'name':Task,'date':Date,'catg':Catg});
      }
      else{
         alert("Task field can't be empty ");
      }
   }
   // console.log(TaskArray);
   SaveInfo(TaskArray);
   addTaskField.value='';
   addDateField.value='';
   addCatgField.value='Work';
   addTaskBtn.innerText=Taskbtntext;
   addDateBtn.innerText=Datebtntext;
   addCatgBtn.innerText=Catgbtntext;
  
}
function SaveInfo(TaskArray){
   let str=JSON.stringify(TaskArray);
   localStorage.setItem('TaskInfo',str);
   DisplayInfo();
}


function DisplayInfo(){
 let statement='';
   
 TaskArray.forEach((Task,i)=>{
   statement+=`<tr>
   <th>${i+1}</th>
   <td>${Task.name}</td>
   <td style="color:green">${findDeadline(Task.date)} </td>
   <td>${findCategory(Task.catg,Task.name,Task.date,Task.catg)}</td>
   <td><i class="btn text-white fa fa-edit btn-info mx-2" onclick='EditInfo(${i})'></i> <i class="btn btn-danger text-white fa fa-trash" onclick='DeleteInfo(${i})'></i><i class="btn fa fa-check-square" style="font-size:36px;color:green" onclick='CompleteInfo(${i})' ></i></td>
 </tr>`;
 });
 recordsDisplay.innerHTML=statement;
}
function findDeadline(date){
   let todayDate=new Date();
   let givenDate=new Date(date);
   let timeDifference = (givenDate.getTime()-todayDate.getTime() );
   let daysDifference = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
   // console.log(daysDifference);
   // if(givenDate.getDate()==todayDate.getDate()){
   //   return `few hours left &nbsp; <i class="fa fa-calendar" style="font-size:24px;color:green"></i>`;
   // }
   // else if(givenDate.getDate()-todayDate.getDate()>=1){
   //    return givenDate.getDate()-todayDate.getDate()+` days left &nbsp; <i class="fa fa-calendar" style="font-size:24px;color:green"></i>`;
   // }
   // else {
   //    return `<span style="color:red">Task Expired</span>&nbsp; <i class="fa fa-calendar" style="font-size:24px;color:red"></i>`;
   // }
   if(daysDifference==0){
      return `few hours left &nbsp; <i class="fa fa-calendar" style="font-size:24px;color:green"></i>`;
    }
    else if(daysDifference>=1){
       return daysDifference+` days left &nbsp; <i class="fa fa-calendar" style="font-size:24px;color:green"></i>`;
    }
    else {
       return `<span style="color:red">Task Expired</span>&nbsp; <i class="fa fa-calendar" style="font-size:24px;color:red"></i>`;
    }
  
   
}
function findCategory(catg,a,b,c){
  if(catg=="Work"){
   WorkArray.push({'name':a,'date':b,'catg':c});
   return `<div style="width:100%;heigth:100%;display:flex;flex-direction:column;justify-content:center;align-items:center;"><button id="b1" style="border-radius:50%;width:15px;height:15px;margin-top:3px;border:2px solid black;background-color:blue;"></button>
   <button id="b2" style="border-radius:50%;width:15px;height:15px; margin-top:2.5px;border:2px solid black" ></button>
 <button id="b3" style="border-radius:50%;width:15px;height:15px;margin-top:2.5px;border:2px solid black" ></button></td></div>`
 
}
else if(catg=="Personal"){
   PersonalArray.push({'name':a,'date':b,'catg':c});
   return `<div style="width:100%;heigth:100%;display:flex;flex-direction:column;justify-content:center;align-items:center;"><button id="b1" style="border-radius:50%;width:15px;height:15px;margin-top:3px;border:2px solid black;"></button>
   <button id="b2" style="border-radius:50%;width:15px;height:15px; margin-top:2.5px;border:2px solid black;background-color:green;" ></button>
   <button id="b3" style="border-radius:50%;width:15px;height:15px;margin-top:2.5px;border:2px solid black" ></button>
   </td></div>`
}
else if(catg=="Shopping"){
   ShoppingArray.push({'name':a,'date':b,'catg':c});
   return `<div style="width:100%;heigth:100%;display:flex;flex-direction:column;justify-content:center;align-items:center;"><button id="b1" style="border-radius:50%;width:15px;height:15px;margin-top:3px;border:2px solid black;"></button>
   <button id="b2" style="border-radius:50%;width:15px;height:15px; margin-top:2.5px;border:2px solid black;" ></button>
   <button id="b3" style="border-radius:50%;width:15px;height:15px;margin-top:2.5px;border:2px solid black;background-color:red;" ></button></td></div>`
}

}
function CompleteInfo(id){
   CompleteArray.push({'name':TaskArray[id].name,'date':TaskArray[id].date,'catg':TaskArray[id].catg});
   // TaskArray[id].name.style.visibility="hidden";
   // TaskArray[id].date.style.visibility="hidden";
   // TaskArray[id].catg.style.visibility="hidden";
   TaskArray.splice(id,1);
   console.log(CompleteArray);
   SaveInfo(TaskArray);
}
function EditInfo(id){
 edit_id=id;
 addTaskField.value=TaskArray[id].name;
 addDateField.value=TaskArray[id].date;
 addCatgField.value=TaskArray[id].catg;
 addTaskBtn.innerText='Save changes';
 addDateBtn.innerText='Save changes';
 addCatgBtn.innerText='Save changes';

}

function DeleteInfo(id){
  TaskArray.splice(id,1);
  SaveInfo(TaskArray);
}


function trans(){
   const ip=document.getElementById("inp");
   ip.style.margin="0.5rem 0rem 0rem -3.9rem";
   ip.style.height="2.5rem";
   ip.style.width="15rem";
   ip.style.visibility="visible";
   ip.style.border="none";
}

const allTr=document.querySelectorAll('#records tr');
const searchInputField=document.querySelector('#inp');
searchInputField.addEventListener('input',function(e){
   const searchStr=e.target.value.toLowerCase();
   recordsDisplay.innerHTML='';
   allTr.forEach(tr=>{
    const td_in_tr= tr.querySelectorAll('td');
if(td_in_tr[0].innerText.toLowerCase().indexOf(searchStr)>-1){
   recordsDisplay.appendChild(tr);
}
   });
   if(recordsDisplay.innerHTML==''){
      recordsDisplay.innerHTML='No records Found';
   }

})

const workBtn=document.getElementById('workbtn');
const perBtn=document.getElementById('perbtn');
const shopBtn=document.getElementById('shopbtn');
const SortBtn=document.getElementById('sortbtn');
const CompBtn=document.getElementById('compbtn');
const Allbtn=document.getElementById('allbtn');

workBtn.onclick=()=>{
 recordsDisplay.innerHTML='';
 let statement='';
   
 WorkArray.forEach((Task,i)=>{
   statement+=`<tr>
   <th>${i+1}</th>
   <td>${Task.name}</td>
   <td style="color:green">${findDeadline(Task.date)} </td>
   <td>${findCategory(Task.catg,Task.name,Task.date,Task.catg)}</td>
   <td><i class="btn text-white fa fa-edit btn-info mx-2" onclick='EditInfo(${i})'></i> <i class="btn btn-danger text-white fa fa-trash" onclick='DeleteInfo(${i})'></i><i class="btn fa fa-check-square" style="font-size:36px;color:green" onclick="CompleteInfo(${Task.name},${Task.date},${Task.catg})" ></i></td>
 </tr>`;
 });
 recordsDisplay.innerHTML=statement;
}

perBtn.onclick=()=>{
   recordsDisplay.innerHTML='';
   let statement='';
     
   PersonalArray.forEach((Task,i)=>{
     statement+=`<tr>
     <th>${i+1}</th>
     <td>${Task.name}</td>
     <td style="color:green">${findDeadline(Task.date)} </td>
     <td>${findCategory(Task.catg,Task.name,Task.date,Task.catg)}</td>
     <td><i class="btn text-white fa fa-edit btn-info mx-2" onclick='EditInfo(${i})'></i> <i class="btn btn-danger text-white fa fa-trash" onclick='DeleteInfo(${i})'></i><i class="btn fa fa-check-square" style="font-size:36px;color:green" onclick="CompleteInfo(${Task.name},${Task.date},${Task.catg})" ></i></td>
   </tr>`;
   });
   recordsDisplay.innerHTML=statement;
  }
  shopBtn.onclick=()=>{
   recordsDisplay.innerHTML='';
   let statement='';
     
   ShoppingArray.forEach((Task,i)=>{
     statement+=`<tr>
     <th>${i+1}</th>
     <td>${Task.name}</td>
     <td style="color:green">${findDeadline(Task.date)} </td>
     <td>${findCategory(Task.catg,Task.name,Task.date,Task.catg)}</td>
     <td><i class="btn text-white fa fa-edit btn-info mx-2" onclick='EditInfo(${i})'></i> <i class="btn btn-danger text-white fa fa-trash" onclick='DeleteInfo(${i})'></i><i class="btn fa fa-check-square" style="font-size:36px;color:green" onclick="CompleteInfo(${Task.name},${Task.date},${Task.catg})" ></i></td>
   </tr>`;
   });
   recordsDisplay.innerHTML=statement;
  }
  CompBtn.onclick=()=>{
   recordsDisplay.innerHTML='';
   let statement='';
     
   CompleteArray.forEach((Task,i)=>{
     statement+=`<tr>
     <th>${i+1}</th>
     <td>${Task.name}</td>
     <td style="color:green">${findDeadline(Task.date)} </td>
     <td>${findCategory(Task.catg,Task.name,Task.date,Task.catg)}</td>
     <td><i class="btn text-white fa fa-edit btn-info mx-2" onclick='EditInfo(${i})'></i> <i class="btn btn-danger text-white fa fa-trash" onclick='DeleteInfo(${i})'></i><i class="btn fa fa-check-square" style="font-size:36px;color:green" onclick="CompleteInfo(${Task.name},${Task.date},${Task.catg})" ></i></td>
   </tr>`;
   });
   recordsDisplay.innerHTML=statement;
  }

  Allbtn.onclick=()=>{
   recordsDisplay.innerHTML='';
   let statement='';
     
   TaskArray.forEach((Task,i)=>{
     statement+=`<tr>
     <th>${i+1}</th>
     <td>${Task.name}</td>
     <td style="color:green">${findDeadline(Task.date)} </td>
     <td>${findCategory(Task.catg,Task.name,Task.date,Task.catg)}</td>
     <td><i class="btn text-white fa fa-edit btn-info mx-2" onclick='EditInfo(${i})'></i> <i class="btn btn-danger text-white fa fa-trash" onclick='DeleteInfo(${i})'></i><i class="btn fa fa-check-square" style="font-size:36px;color:green" onclick="CompleteInfo(${Task.name},${Task.date},${Task.catg})" ></i></td>
   </tr>`;
   });
   recordsDisplay.innerHTML=statement;
  }
function compare(a,b){
   let d1=new Date(a.date);
   let d2=new Date(b.date);
  return d1-d2;
}
SortBtn.onclick=()=>{
   recordsDisplay.innerHTML='';
   TaskArray.sort(compare);
   DisplayInfo(TaskArray);
}
// function record(){
//    var recognition=new webkitSpeechRecognition();
//    recognition.lang = "en-GB";
   
//    recognition.onresult = function(event)
//    {
//       document.getElementById('inp').value=event.results[0][0].transcript;
//    }
//    recognition.start();
// }
function search2(e){
  
   const query=document.getElementById('inp').value;
   const mynotes=JSON.parse(localStorage.getItem('mynotes'))|| [];
   const searchedItems=mynotes.filter((item)=>(item.title.toLowerCase().includes(query.toLowerCase())));
   displayItem(searchedItems);
}
function startAudioTyping(){
   console.log("Called");
   const startRec=document.getElementById('inp');
      var recognition=new webkitSpeechRecognition();
      if("webkitSpeechRecognition" in window){
         recognition.continuous=false;
         recognition.interimResults=true;
         recognition.lang = "en-US";
         startRec.addEventListener("click",()=>{
            recognition.start();
         });
         recognition.onresult = (event)=>{
            const transcript=event.results[0][0].transcript;
            document.querySelector('#inp').value=transcript;

            search2();
         };
         recognition.onerror=(event)=>{
            console.error("Recognition error: ",event.error);
         };
   }
   else{
      console.log("Web Speech API is not supported in this browser");
   }
}
  
startAudioTyping();

window.onload=function(){
   var constraints={audio:true,video:true};
   navigator.mediaDevices.getUserMedia(constraints).then(function(mediaStream){
      var video=document.querySelector('video');
      video.srcObject=mediaStream;
      video.play();
   }).catch(function(err){
      console.log("An error: "+err.message);
   })
}

console.log(CompleteArray);

function SaveInfoWork(WorkArray){
   let str1=JSON.stringify(WorkArray);
   localStorage.setItem('WorkInfo',str1);
}
let objstr1=localStorage.getItem('WorkInfo');
if(objstr1!=null){
   WorkArray=JSON.parse(objstr1);
}

function PersonalInfoWork(PersonalArray){
   let str2=JSON.stringify(PersonalArray);
   localStorage.setItem('PersonalInfo',str2);
}
let objstr2=localStorage.getItem('PersonalInfo');
if(objstr2!=null){
   PersonalArray=JSON.parse(objstr2);
}

function ShoppingInfoWork(ShoppingArray){
   let str3=JSON.stringify(ShoppingArray);
   localStorage.setItem('ShoppingInfo',str3);
}
let objstr3=localStorage.getItem('ShoppingInfo');
if(objstr3!=null){
   ShoppingArray=JSON.parse(objstr3);
}

function CompleteArrayInfoWork(CompleteArray){
   let str4=JSON.stringify(CompleteArray);
   localStorage.setItem('CompleteArrayInfo',str4);
}
let objstr4=localStorage.getItem('CompleteArrayInfo');
if(objstr4!=null){
   CompleteArray=JSON.parse(objstr4);
}

