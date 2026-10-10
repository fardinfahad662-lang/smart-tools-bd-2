// EARN MONEY front-end demo only. Not suitable for real money or production use.
const STORAGE_KEY = "earnMoneyDemo_v1";
const seedTasks = [
 {id:"t1",title:"বাংলা টাইপিং অনুশীলন",description:"নিচের ছোট অনুচ্ছেদটি পরিষ্কারভাবে টাইপ করে জমা দিন। অ্যাডমিন বানান ও নির্ভুলতা যাচাই করবেন।",category:"Typing",reward:15,source:"নিজস্ব কাজ"},
 {id:"t2",title:"প্রোডাক্ট তথ্য সাজানো",description:"একটি পণ্যের নাম, বিভাগ ও সংক্ষিপ্ত বিবরণ নির্দিষ্ট ফরম্যাটে লিখুন। বাস্তব ক্লায়েন্টের কাজ হলে তার অনুমতি থাকতে হবে।",category:"Data Entry",reward:25,source:"Client Task"},
 {id:"t3",title:"বাংলা বাক্য যাচাই",description:"প্রদত্ত বাক্যে বানান বা টাইপিং ভুল থাকলে সঠিক সংস্করণ লিখে জমা দিন।",category:"Content",reward:10,source:"নিজস্ব কাজ"},
 {id:"t4",title:"ওয়েবসাইটের তথ্য সংগ্রহ",description:"অনুমোদিত পাবলিক পেজ থেকে চাওয়া তথ্য সংগ্রহ করুন। ব্যক্তিগত বা সংবেদনশীল তথ্য সংগ্রহ করবেন না।",category:"Client Task",reward:30,source:"Client Task"},
 {id:"t5",title:"সাধারণ জ্ঞান কুইজ",description:"পাঁচটি প্রশ্নের উত্তর লিখুন। ডেমোতে অ্যাডমিন উত্তর যাচাই করে অনুমোদন দিতে পারবেন।",category:"Survey",reward:8,source:"নিজস্ব কাজ"},
 {id:"t6",title:"ইংরেজি থেকে বাংলা অনুবাদ",description:"ছোট একটি বাক্যের স্বাভাবিক বাংলা অনুবাদ লিখুন।",category:"Content",reward:20,source:"নিজস্ব কাজ"}
];
let state = loadState();
let adminUnlocked = false;
let activeCategory = "সব";
const $ = id => document.getElementById(id);
function loadState(){try{return JSON.parse(localStorage.getItem(STORAGE_KEY))||{tasks:seedTasks,submissions:[],withdrawals:[],balance:0}}catch{return {tasks:seedTasks,submissions:[],withdrawals:[],balance:0}}}
function save(){localStorage.setItem(STORAGE_KEY,JSON.stringify(state));render()}
function esc(s){return String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]))}
function money(n){return Number(n||0).toLocaleString("en-BD")}
function iconFor(cat){return ({Typing:"⌨", "Data Entry":"▦",Content:"✎","Client Task":"◇",Survey:"☷"})[cat]||"✦"}
function renderTasks(){
 const query=$("searchTask").value.toLowerCase().trim();
 const tasks=state.tasks.filter(t=>(activeCategory==="সব"||t.category===activeCategory)&&(t.title+" "+t.description+" "+t.category).toLowerCase().includes(query));
 $("taskGrid").innerHTML=tasks.length?tasks.map(t=>`<article class="task-card"><div class="task-icon">${iconFor(t.category)}</div><h3>${esc(t.title)}</h3><p>${esc(t.description)}</p><div class="task-bottom"><span class="reward">৳${money(t.reward)}</span><button class="button" data-task="${esc(t.id)}">কাজ খুলুন</button></div></article>`).join(""):`<div class="empty">এই নামে কোনো কাজ পাওয়া যায়নি।</div>`;
 $("taskCount").textContent=state.tasks.length;
 document.querySelectorAll("[data-task]").forEach(b=>b.addEventListener("click",()=>openTask(b.dataset.task)));
}
function renderAdmin(){
 $("submissionsList").innerHTML=state.submissions.length?state.submissions.slice().reverse().map(s=>`<div class="submission"><b>${esc(s.taskTitle)}</b> · ৳${money(s.reward)}<p>স্ট্যাটাস: ${esc(s.status)}<br>জমা: ${esc(s.proof)}</p>${s.status==="Pending"?`<div class="submission-actions"><button class="button" data-approve="${esc(s.id)}">Approve</button><button class="button danger" data-reject="${esc(s.id)}">Reject</button></div>`:""}</div>`).join(""):`<div class="empty">এখনও কোনো কাজ জমা হয়নি।</div>`;
 $("withdrawalsList").innerHTML=state.withdrawals.length?state.withdrawals.slice().reverse().map(w=>`<div class="submission"><b>${esc(w.method)} · ${esc(w.number)}</b><p>পরিমাণ: ৳${money(w.amount)}<br>স্ট্যাটাস: ${esc(w.status)}</p>${w.status==="Pending"?`<div class="submission-actions"><button class="button" data-paid="${esc(w.id)}">Paid (ম্যানুয়ালি যাচাই)</button><button class="button danger" data-wreject="${esc(w.id)}">Reject/Refund</button></div>`:""}</div>`).join(""):`<div class="empty">কোনো উত্তোলনের অনুরোধ নেই।</div>`;
 document.querySelectorAll("[data-approve]").forEach(b=>b.onclick=()=>reviewSubmission(b.dataset.approve,true));
 document.querySelectorAll("[data-reject]").forEach(b=>b.onclick=()=>reviewSubmission(b.dataset.reject,false));
 document.querySelectorAll("[data-paid]").forEach(b=>b.onclick=()=>markPaid(b.dataset.paid));
 document.querySelectorAll("[data-wreject]").forEach(b=>b.onclick=()=>rejectWithdrawal(b.dataset.wreject));
}
function render(){
 $("heroBalance").textContent=money(state.balance);$("walletBalance").textContent=money(state.balance);
 $("submittedCount").textContent=state.submissions.length;
 renderTasks();if(adminUnlocked)renderAdmin();
}
function openTask(id){const t=state.tasks.find(x=>x.id===id);if(!t)return;$("taskId").value=id;$("modalTitle").textContent=t.title;$("modalDescription").textContent=t.description;$("modalMeta").textContent=`${t.category} · ৳${money(t.reward)} · উৎস: ${t.source||"নিজস্ব কাজ"}`;$("proof").value="";$("taskModal").classList.remove("hidden")}
document.querySelectorAll("[data-close]").forEach(b=>b.onclick=()=>$ (b.dataset.close).classList.add("hidden"));
["taskModal","adminModal"].forEach(id=>$(id).addEventListener("click",e=>{if(e.target.id===id)$(id).classList.add("hidden")}));
$("searchTask").addEventListener("input",renderTasks);
document.querySelectorAll("[data-category]").forEach(b=>b.addEventListener("click",()=>{
 activeCategory=b.dataset.category;
 document.querySelectorAll("[data-category]").forEach(x=>x.classList.toggle("active",x===b));
 renderTasks();
}));
$("submitTaskForm").addEventListener("submit",e=>{e.preventDefault();const t=state.tasks.find(x=>x.id===$("taskId").value);if(!t)return;state.submissions.push({id:crypto.randomUUID?crypto.randomUUID():String(Date.now()),taskId:t.id,taskTitle:t.title,reward:Number(t.reward),proof:$("proof").value.trim(),status:"Pending",createdAt:new Date().toISOString()});save();$("taskModal").classList.add("hidden");alert("কাজ জমা হয়েছে। অ্যাডমিন যাচাই না করা পর্যন্ত ব্যালেন্স যোগ হবে না।")});
$("withdrawForm").addEventListener("submit",e=>{e.preventDefault();const amount=Number($("withdrawAmount").value),number=$("walletNumber").value.trim();if(amount<100)return alert("ডেমোতে সর্বনিম্ন উত্তোলন ১০০ টাকা।");if(amount>state.balance)return alert("আপনার ডেমো ব্যালেন্স যথেষ্ট নয়।");state.balance-=amount;state.withdrawals.push({id:crypto.randomUUID?crypto.randomUUID():String(Date.now()),method:$("method").value,number,amount,status:"Pending",createdAt:new Date().toISOString()});save();$("withdrawMessage").textContent="অনুরোধ জমা হয়েছে—বাস্তব পেমেন্ট নয়; অ্যাডমিন ডেমোতে যাচাই করবে।";$("withdrawForm").reset()});
$("adminOpen").onclick=()=>{$("adminModal").classList.remove("hidden");$("adminArea").classList.toggle("hidden",!adminUnlocked);$("adminLoginForm").classList.toggle("hidden",adminUnlocked);if(adminUnlocked)renderAdmin()};
$("adminLoginForm").addEventListener("submit",e=>{e.preventDefault();if($("adminPassword").value==="demo123"){adminUnlocked=true;$("adminArea").classList.remove("hidden");$("adminLoginForm").classList.add("hidden");renderAdmin()}else alert("ভুল ডেমো পাসওয়ার্ড।")});
$("addTaskForm").addEventListener("submit",e=>{e.preventDefault();state.tasks.push({id:crypto.randomUUID?crypto.randomUUID():String(Date.now()),title:$("newTitle").value.trim(),description:$("newDescription").value.trim(),category:$("newCategory").value,reward:Number($("newReward").value),source:"Admin added"});save();e.target.reset();alert("ডেমো কাজ যোগ হয়েছে।")});
function reviewSubmission(id,approve){const s=state.submissions.find(x=>x.id===id);if(!s||s.status!=="Pending")return;if(approve){s.status="Approved";state.balance+=Number(s.reward)}else s.status="Rejected";save()}
function markPaid(id){const w=state.withdrawals.find(x=>x.id===id);if(!w||w.status!=="Pending")return;if(!confirm("আপনি কি bKash/Nagad-এ সত্যিই পেমেন্ট করেছেন এবং ট্রানজ্যাকশন যাচাই করেছেন?"))return;w.status="Paid";save()}
function rejectWithdrawal(id){const w=state.withdrawals.find(x=>x.id===id);if(!w||w.status!=="Pending")return;w.status="Rejected";state.balance+=Number(w.amount);save()}
$("year").textContent=new Date().getFullYear();render();
