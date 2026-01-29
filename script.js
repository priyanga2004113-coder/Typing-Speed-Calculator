const texts={
  easy:"Ravi wakes up every day early in the morning and starts his day with a short walk. He drinks a glass of water and checks his phone for messages. He has simple goals to improve typing speed and stay focused at work His typing practice begins using a basic laptop and a comfortable keyboard. He types slowly and carefully making sure there are no mistakes. During practice he types easy sentences and common words. He sometimes uses simple symbols like at and hash but keeps it minimal. He believes accuracy is more important than speed at the beginning After practice he takes a short break to relax his hands. At work Ravi sends emails updates reports and writes notes. He saves files with clear names and keeps his folders organized. By evening he feels happy because he completed his tasks on time.Later he practices typing again for a few minutes.".repeat(1),
  medium:"Typing practice becomes more effective when numbers and symbols are used more often In daily computer work people type usernames passwords dates and file names Accuracy is very important because a small mistake can cause errors. During practice the typist may type numbers like 2 4 6 8 10 15 and 50 along with symbols such as @ # $ % & * These characters improve finger strength and control Sentences may include details like price 250 rs discount 20 percent or time 9 45 am Using brackets and signs like dash underscore and slash also improves skill. At work files are saved as project_v3 backup_2024 or report_final Copying data such as score 88 percent target 100 or level 5 helps build confidence Symbols like ! ? and colon are also commonly used in messages and instructions. Daily practice for 15 to 30 minutes can bring steady improvement.".repeat(1),
  hard:"At 9:45 a.m. on 27/01/2026, Arjun logged into his system using the password Aru@123#Dev! and opened 3 tabs: Email (12 unread), Dashboard (CPU: 47%), and Reports_v2.5.xlsx. His task was simple—but tricky—finish the audit before 5:00 p.m. The client demanded 99.9% accuracy, 0 errors, and a response time < 2.5s. As he typed {if(user==true){access++;}}, the keyboard clicked nonstop. Suddenly, an alert popped up: Error 404! File not found. “Seriously?” he muttered, checking line #78–#102 for missing symbols like ;, }, or &&.The report included figures such as ₹45,678.90, $1,250.75, and a growth rate of +18.6% compared to Q4-2025. Notes were added using bullet points (*, -, →) and special characters like @, ^, %, and ~.In a world ruled by code, numbers, and symbols, practice isn’t optional—it’s mandatory! ".repeat(1),
  numbers:"12 45 67 89 23.5 90 345 12.45 18322 152 4793 14.896 12335  ".repeat(14)
};

let paragraph="", startTime, intervalId, timerStarted=false, correctChars=0;
let user={};

function startTest(){
  user.name=userName.value;
  user.date=testDate.value;
  user.diff=difficulty.value;

  if(!user.name || !user.date || !user.diff){
    alert("Fill all fields");
    return;
  }

  paragraph=texts[user.diff];
  page1.classList.add("hidden");
  page2.classList.remove("hidden");

  

  textDisplay.innerHTML="";
  paragraph.split("").forEach(c=>{
    let s=document.createElement("span");
    s.innerText=c;
    textDisplay.appendChild(s);
  });

  inputField.value="";
  inputField.disabled=false;
  inputField.focus();

  timerStarted=false;
  correctChars=0;
  timerText.innerText="Time : 0s";
  progressBar.style.width="0%";
  resultBtn.classList.add("hidden");
}

inputField.addEventListener("keydown",e=>{
  if(e.key==="Backspace") e.preventDefault();
});

inputField.addEventListener("input",()=>{
  if(!timerStarted){
    timerStarted=true;
    startTime=Date.now();
    intervalId=setInterval(()=>{
      let sec=Math.floor((Date.now()-startTime)/1000);
      timerText.innerText="Time : "+sec+"s";
    },1000);
  }

  const typed=inputField.value.split("");
  const spans=textDisplay.querySelectorAll("span");
  correctChars=0;

  spans.forEach((s,i)=>{
    if(!typed[i]) s.className="";
    else if(typed[i]===s.innerText){
      s.className="correct";
      correctChars++;
    }else s.className="incorrect";
  });

  progressBar.style.width=(typed.length/paragraph.length)*100+"%";

  if(typed.length>=paragraph.length){
    clearInterval(intervalId);
    user.time=Math.floor((Date.now()-startTime)/1000);
    inputField.disabled=true;
    resultBtn.classList.remove("hidden");
  }
});

function showResult(){
  page2.classList.add("hidden");
  page3.classList.remove("hidden");

  let words=paragraph.trim().split(" ").length;
  rName.innerText=user.name;
  rDate.innerText=user.date;
  rDiff.innerText=user.diff.toUpperCase();
  rTime.innerText=user.time+" s";
  rWpm.innerText=Math.round((words/user.time)*60);
  rAccuracy.innerText=Math.round((correctChars/paragraph.length)*100)+" %";
}

function exportPDF(){
  html2pdf().from(resultCard).save("Typing_Result.pdf");
}
