EARN MONEY — HTML/CSS/JavaScript Starter

ফাইল:
- index.html: মূল ওয়েবসাইট
- style.css: ডিজাইন
- app.js: ডেমো কাজ, লোকাল ব্যালেন্স, ডেমো অ্যাডমিন ও withdrawal request
- privacy.html / terms.html: সম্পাদনাযোগ্য টেমপ্লেট

চালানোর নিয়ম:
1. ZIP ফাইল Extract করুন।
2. index.html ফাইলে ডাবল-ক্লিক করুন অথবা VS Code-এর Live Server দিয়ে খুলুন।
3. Admin বাটন → demo password: demo123।
4. Admin থেকে demo task যোগ করুন, user submission approve/reject করুন, withdrawal request দেখুন।

অত্যন্ত গুরুত্বপূর্ণ:
এই প্রকল্পটি শুধু UI/প্রোটোটাইপ। কোনো বাস্তব টাকা পাঠায় না এবং বাস্তব অর্থের জন্য নিরাপদ নয়।
- localStorage ব্যবহারকারীর নিজের ব্রাউজারে থাকে; অন্য ডিভাইসে সিঙ্ক হয় না।
- demo123 পাসওয়ার্ড আসল নিরাপত্তা নয়; source code দেখে যে কেউ জানতে পারে।
- ব্যবহারকারী নিজে localStorage পরিবর্তন করে ব্যালেন্স বাড়াতে পারে।
- বাস্তব লঞ্চের আগে Firebase Authentication + Firestore Security Rules অথবা backend API, server-side admin roles, server-side task review, append-only ledger/transaction log, rate limits, anti-fraud checks, backups ও audit logs যুক্ত করতে হবে।
- balance/withdrawal কখনোই শুধু client-side JavaScript দিয়ে বিশ্বাস করবেন না।
- bKash/Nagad পেমেন্ট এই ডেমোতে স্বয়ংক্রিয় নয়। লাইভ পেমেন্টের জন্য অনুমোদিত merchant/payment integration বা যাচাইকৃত manual payment workflow এবং transaction ID reconciliation দরকার।
- কোনো ব্যবহারকারীকে বিজ্ঞাপন দেখা/ক্লিক করার বিনিময়ে পুরস্কার দেবেন না। Adsterra-এর অনুমোদিত ad code কেবল তাদের dashboard থেকে কপি করে বসান; ad code পরিবর্তন বা ভুয়া traffic/click ব্যবহার করবেন না।

Adsterra:
1. Publisher account-এ সাইট যোগ করে অনুমোদন নিন।
2. Dashboard থেকে ad unit তৈরি করে দেওয়া script কপি করুন।
3. index.html-এ যেখানে বিজ্ঞাপন চাই, সেখানে নিজের ad slot container বসিয়ে Adsterra script যুক্ত করুন। এখানে কোনো নকল/placeholder ad script দেওয়া হয়নি।
4. বিজ্ঞাপনগুলোকে কাজ জমা/উত্তোলন বাটনের সঙ্গে এমনভাবে রাখবেন না যাতে ভুল ক্লিক হয়। সাইটের নিজস্ব traffic ব্যবহার করুন; incentivized traffic নীতি যাচাই করুন।

বাস্তব কাজের উৎস:
- নিজস্ব কাজ: টাইপিং, ডেটা ফরম্যাটিং, বাংলা/ইংরেজি লেখা যাচাই—আগে থেকে পুরস্কার বাজেট নির্ধারণ করুন।
- ক্লায়েন্ট: ছোট ব্যবসার product listing, data cleanup, transcription, translation; লিখিতভাবে scope, deadline, payment নিশ্চিত করুন।
- Marketplace: Fiverr (fiverr.com), Upwork (upwork.com), Clickworker (clickworker.com)। তাদের শর্ত অনুযায়ী কাজ নিন; অন্য প্ল্যাটফর্মের কাজ/সার্ভে পুনরায় বিতরণের অনুমতি আছে ধরে নেবেন না।

লাইভ করার আগে:
[ ] Authentication ও admin role নিরাপদ
[ ] Database rules tested
[ ] Server-side balance ledger
[ ] Task proof moderation + anti-duplicate checks
[ ] Payout reconciliation / support process
[ ] Privacy policy, terms, contact page
[ ] Adsterra approval and ad placement policy checked


Login / Sign up page:
- auth.html যোগ করা হয়েছে। Gmail/Email, mobile number, Login, Sign up এবং Google sign-in button-এর UI আছে।
- এটি এখনো demo UI; কোনো আসল account/password/SMS OTP/Google login যাচাই করে না।
- লাইভে Firebase Authentication চালু করে Email/Password, Google provider এবং Phone OTP provider configure করতে হবে। Firebase-এর config শুধু web app-এর public config হিসেবে ব্যবহার করা হয়; Admin privilege অবশ্যই server-side/Firestore Security Rules দিয়ে সুরক্ষিত রাখতে হবে।

Homepage polish update:
- Category filter chips, search, improved hero CTA, ad placeholder, trust cards and FAQ section added.
- Ad placeholder is not a real advertisement. Insert only the actual ad code supplied in the approved Adsterra dashboard.


বিজ্ঞাপন লিংক:
- index.html-এর TASK BOARD অংশে ৪টি স্পনসরড লিংক যোগ করা হয়েছে।
- এগুলো সাধারণ Adsterra Direct/SmartLink URL হিসেবে ক্লিকযোগ্য লিংক; ব্যানার বিজ্ঞাপনের স্ক্রিপ্ট নয়।
- আপনার Adsterra dashboard-এ সাইট অনুমোদিত এবং লিংক Active আছে কি না নিশ্চিত করুন।
- লিংকে ক্লিকের বিনিময়ে ব্যবহারকারীকে পুরস্কার দেবেন না, জোর করে ক্লিক করাবেন না এবং স্বয়ংক্রিয়ভাবে নতুন ট্যাব খুলবেন না।
- লিংকগুলো সঠিকভাবে কপি হয়েছে কি না Adsterra dashboard-এর URL-এর সঙ্গে মিলিয়ে নিন।
