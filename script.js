// --- 1. SETUP & CONFIGURATION ---
const { useState, useEffect, useRef } = React;
const { createRoot } = ReactDOM;

// Simple Icon Components
const Icon = ({ path }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">{path}</svg>
);

const Icons = {
  TrendingUp: () => <Icon path={<><polyline points="23 6 13.5 15.5 8.5 10.5 1 18" /><polyline points="17 6 23 6 23 12" /></>} />,
  DollarSign: () => <Icon path={<><line x1="12" y1="1" x2="12" y2="23" /><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" /></>} />,
  CircleCheck: () => <Icon path={<><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></>} />,
  Clock: () => <Icon path={<><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></>} />,
  Phone: () => <Icon path={<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.05 12.05 0 0 0 .57 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.05 12.05 0 0 0 2.81.57A2 2 0 0 1 22 16.92z" />} />,
  Message: () => <Icon path={<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />} />,
  Trash: () => <Icon path={<><polyline points="3 6 5 6 21 6" /><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" /></>} />,
  User: () => <Icon path={<><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></>} />,
  Menu: () => <Icon path={<><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="18" x2="21" y2="18" /></>} />,
  X: () => <Icon path={<><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></>} />,
  LogOut: () => <Icon path={<><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" y1="12" x2="9" y2="12" /></>} />,
  Send: () => <Icon path={<><line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" /></>} />,
  Plus: () => <Icon path={<><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></>} />,
  Search: () => <Icon path={<><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></>} />,
  Clipboard: () => <Icon path={<><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" /><rect x="8" y="2" width="8" height="4" rx="1" ry="1" /></>} />,
  Chat: () => <Icon path={<><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" /></>} />,
  Paperclip: () => <Icon path={<path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48" />} />,
  Star: () => <Icon path={<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />} />,
  FileText: () => <Icon path={<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />} />
};

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDFnAi7RwsbgpItIpl6sgyKP4B2Vl5dEkk",
  authDomain: "just-cleaning-ltd.firebaseapp.com",
  projectId: "just-cleaning-ltd",
  storageBucket: "just-cleaning-ltd.firebasestorage.app",
  messagingSenderId: "285279552442",
  appId: "1:285279552442:web:6c3cfc35635346798b9383",
  measurementId: "G-C2J68H1ETD"
};

if (!firebase.apps.length) firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const auth = firebase.auth(); // Init Auth

// --- TWILIO CONFIGURATION ---
const TWILIO_ACTIONS_URL = "https://just-cleaning-crm-8720.twil.io/website-actions";
const TWILIO_LOGS_URL = "https://just-cleaning-crm-8720.twil.io/get-logs";
const TWILIO_MESSAGES_URL = "https://just-cleaning-crm-8720.twil.io/get-messages"; 

// --- UTILITIES ---
const getStatusColor = (status) => {
  if (status === "New") return "bg-red-100 text-red-800";
  if (status === "Booked") return "bg-green-100 text-green-800";
  return "bg-gray-100";
};

const formatDuration = (seconds) => {
  if (!seconds) return "0s";
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}m ${s}s`;
};

const copyToClipboard = (text) => {
  navigator.clipboard.writeText(text);
  alert("Text copied!");
};

const QUICK_REPLIES = [
  { label: "Quote Link", text: "Hi [Name], your quote for [Service] is ready! Please review and approve here: [JOBBER/QUOTING LINK]" },
  { label: "Missed Call", text: "Hi, this is Jagmeet from Just Cleanings. Sorry I missed your call, I'm on a job site. How can I help you?" }
];

const CHAT_PRESETS = {
  review: "Hi there! We hope you loved the service from Just Cleanings. It would mean the world to us if you could leave a 5-star review here: https://g.page/r/JustCleanings/review",
  reminder: "Hi! This is a friendly reminder that the Just Cleanings team will be arriving at your home today for your scheduled booking. We look forward to serving you!"
};

// --- COMPONENTS ---

// 1. Create Lead Modal (Welcome Text ON)
const CreateLeadModal = ({ onClose }) => {
  const [formData, setFormData] = useState({ name: "", phone: "", address: "", service: "Interior Cleaning", details: "" });
  const [loading, setLoading] = useState(false);
  const services = ["Interior Cleaning", "Post-Construction", "Pressure Washing", "Window Cleaning", "Gutter Cleaning", "Roof Cleaning"];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await db.collection("leads").add({ ...formData, status: "New", createdAt: new Date().toISOString() });
      
      // Auto-Send Welcome Text
      fetch(TWILIO_ACTIONS_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'welcome', to: formData.phone, name: formData.name })
      }).catch(err => console.error(err));

      alert("Lead created & Welcome Text Sent!");
      onClose();
    } catch (err) { alert("Error: " + err.message); }
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden animate-scale-in">
        <div className="bg-slate-900 p-4 flex justify-between items-center text-white">
          <h2 className="font-bold text-lg">Create New Lead</h2>
          <button onClick={onClose} className="hover:text-gray-300 transition-colors"><Icons.X /></button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <input type="text" placeholder="Name" required className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-500 outline-none transition-all" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
          <input type="tel" placeholder="Phone" required className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-500 outline-none transition-all" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} />
          <input type="text" placeholder="Address" required className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-500 outline-none transition-all" value={formData.address} onChange={e => setFormData({...formData, address: e.target.value})} />
          <select className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-500 outline-none transition-all" value={formData.service} onChange={e => setFormData({...formData, service: e.target.value})}>
              {services.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
          <textarea className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-500 outline-none transition-all" rows="3" placeholder="Notes..." value={formData.details} onChange={e => setFormData({...formData, details: e.target.value})} />
          <button type="submit" disabled={loading} className="w-full bg-blue-600 text-white font-bold py-2 rounded hover:bg-blue-700 hover:scale-[1.02] transition-all">{loading ? "Creating..." : "Create Lead"}</button>
        </form>
      </div>
    </div>
  );
};

// 2. Chat Box Component
const ChatBox = ({ lead, onClose }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await fetch(TWILIO_MESSAGES_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ phone: lead.phone })
        });
        const data = await res.json();
        if (data.success) setMessages(data.messages);
      } catch (err) { console.error(err); }
    };
    fetchMessages();
    const interval = setInterval(fetchMessages, 4000); 
    return () => clearInterval(interval);
  }, [lead]);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;
    setSending(true);
    try {
      setMessages([...messages, { body: input, direction: 'outbound-api', date: new Date().toISOString() }]);
      await fetch(TWILIO_ACTIONS_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'sms', to: lead.phone, body: input }) 
      });
      setInput("");
    } catch (err) { alert("Failed to send."); }
    setSending(false);
  };

  const insertPreset = (text) => setInput(text);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-white w-full max-w-2xl h-[600px] rounded-xl shadow-2xl flex flex-col overflow-hidden animate-scale-in">
        <div className="bg-slate-900 p-4 text-white flex justify-between items-center">
          <div>
            <h2 className="font-bold text-lg">{lead.name}</h2>
            <p className="text-xs text-slate-400">{lead.phone}</p>
          </div>
          <button onClick={onClose} className="hover:text-gray-300 transition-colors"><Icons.X /></button>
        </div>
        <div className="flex-1 overflow-y-auto p-4 bg-gray-50 space-y-4" ref={scrollRef}>
          {messages.length === 0 && <p className="text-center text-gray-400 mt-10 animate-fade-in">Start the conversation...</p>}
          {messages.map((m, i) => (
            <div key={i} className={`flex ${m.direction === 'inbound' ? 'justify-start' : 'justify-end'} animate-slide-up`}>
              <div className={`max-w-[70%] p-3 rounded-lg text-sm ${m.direction === 'inbound' ? 'bg-white border text-gray-800 shadow-sm' : 'bg-blue-600 text-white shadow-md'}`}>
                {m.body}
              </div>
            </div>
          ))}
        </div>
        <div className="p-2 bg-white border-t flex gap-2 overflow-x-auto">
          <button onClick={() => insertPreset(CHAT_PRESETS.review)} className="text-xs flex items-center gap-1 bg-yellow-50 text-yellow-700 px-3 py-1 rounded-full border border-yellow-200 hover:bg-yellow-100 hover:scale-105 transition-all">
            <Icons.Star /> Review Request
          </button>
          <button onClick={() => insertPreset(CHAT_PRESETS.reminder)} className="text-xs flex items-center gap-1 bg-blue-50 text-blue-700 px-3 py-1 rounded-full border border-blue-200 hover:bg-blue-100 hover:scale-105 transition-all">
            <Icons.Clock /> Today's Order
          </button>
        </div>
        <div className="p-4 bg-white border-t flex gap-2 items-center">
          <button onClick={() => alert("Upload feature requires MMS activation.")} className="text-gray-400 hover:text-gray-600 transition-colors">
            <Icons.Paperclip />
          </button>
          <input 
            type="text" 
            className="flex-1 border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:border-blue-600 transition-colors"
            placeholder="Type a message..."
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyPress={e => e.key === 'Enter' && sendMessage()}
          />
          <button onClick={sendMessage} disabled={sending} className="bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 hover:scale-110 transition-all">
            <Icons.Send />
          </button>
        </div>
      </div>
    </div>
  );
};

// 3. Call Logs
const CallLogs = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const res = await fetch(TWILIO_LOGS_URL);
        const data = await res.json();
        if (data.success) setLogs(data.logs);
      } catch (error) { console.error(error); }
      setLoading(false);
    };
    fetchLogs();
  }, []);

  const filteredLogs = logs.filter(log => (log.from && log.from.includes(searchTerm)) || (log.to && log.to.includes(searchTerm)));

  return (
    <div className="p-4 md:p-8 space-y-6 max-w-6xl mx-auto h-full flex flex-col animate-fade-in">
      <div className="flex justify-between items-center border-b pb-4">
        <h2 className="text-3xl font-bold text-gray-800">Call Logs</h2>
        <div className="relative">
          <input type="text" placeholder="Search number..." className="pl-9 pr-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500 transition-all focus:ring-2 focus:ring-blue-100" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
          <span className="absolute left-3 top-2.5 text-gray-400"><Icons.Search /></span>
        </div>
      </div>
      <div className="bg-white rounded-xl shadow overflow-hidden flex-1 overflow-y-auto animate-slide-up delay-100">
        {loading ? <div className="p-10 text-center text-gray-500">Loading call history...</div> : (
          <table className="w-full text-left border-collapse">
            <thead className="bg-gray-50 text-gray-600 uppercase text-xs">
              <tr><th className="p-4">Date</th><th className="p-4">Direction</th><th className="p-4">From</th><th className="p-4">To</th><th className="p-4">Status</th><th className="p-4">Duration</th></tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-sm">
              {filteredLogs.map((log, idx) => (
                <tr key={log.sid} className="hover:bg-gray-50 transition-colors">
                  <td className="p-4 text-gray-500">{new Date(log.date).toLocaleString()}</td>
                  <td className="p-4 font-medium text-gray-700 capitalize">{log.direction.replace('-', ' ')}</td>
                  <td className="p-4">{log.from}</td>
                  <td className="p-4">{log.to}</td>
                  <td className="p-4"><span className={`px-2 py-1 rounded text-xs font-bold ${log.status === 'completed' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>{log.status}</span></td>
                  <td className="p-4 font-mono">{formatDuration(log.duration)}</td>
                </tr>
              ))}
              {filteredLogs.length === 0 && <tr><td colSpan="6" className="p-8 text-center text-gray-400">No logs found.</td></tr>}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

// 4. Chat List
const ChatList = ({ leads, openChat }) => {
  return (
    <div className="p-4 md:p-8 space-y-6 max-w-6xl mx-auto h-full overflow-y-auto animate-fade-in">
      <h2 className="text-3xl font-bold text-gray-800 border-b pb-4">Active Chats</h2>
      <div className="grid gap-4">
        {leads.map((lead, idx) => (
          <div key={lead.id} onClick={() => openChat(lead)} className="bg-white p-4 rounded-xl shadow-sm border hover:shadow-md cursor-pointer flex items-center gap-4 transition-all hover:-translate-y-1 animate-slide-up" style={{animationDelay: `${idx * 0.05}s`}}>
            <div className="bg-blue-100 p-4 rounded-full text-blue-600"><Icons.Chat /></div>
            <div>
              <h3 className="font-bold text-lg">{lead.name}</h3>
              <p className="text-sm text-gray-500">Click to open chat with {lead.phone}</p>
            </div>
            <div className="ml-auto text-gray-300 group-hover:text-blue-500 transition-colors"><Icons.Send /></div>
          </div>
        ))}
      </div>
    </div>
  );
};

// 5. Lead List
const LeadList = ({ leads, filter, selectedLead, setSelectedLead, updateStatus, deleteLead, openChat }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [twilioStatus, setTwilioStatus] = useState(null);

  let processedLeads = filter === "All" ? leads : leads.filter(l => l.status === filter);
  if (searchTerm) {
    const lowerTerm = searchTerm.toLowerCase();
    processedLeads = processedLeads.filter(l => l.name.toLowerCase().includes(lowerTerm) || l.phone.includes(lowerTerm));
  }
  processedLeads.sort((a, b) => {
    if (sortBy === "newest") return new Date(b.createdAt) - new Date(a.createdAt);
    if (sortBy === "oldest") return new Date(a.createdAt) - new Date(b.createdAt);
    if (sortBy === "name") return a.name.localeCompare(b.name);
    return 0;
  });

  const handleCall = async (phone) => {
    setTwilioStatus(`Calling...`);
    try {
      await fetch(TWILIO_ACTIONS_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'call', to: phone })
      });
      alert(`Call initiated to ${phone}!`);
    } catch (error) { alert("Error calling."); }
    setTwilioStatus(null);
  };

  return (
    <div className="flex-1 flex overflow-hidden animate-fade-in">
      {/* Sidebar List */}
      <div className={`w-full md:w-1/3 border-r border-gray-200 bg-white flex flex-col ${selectedLead ? "hidden" : "flex"} md:flex`}>
        <div className="p-4 border-b bg-gray-50 space-y-3">
          <h2 className="font-bold text-xl hidden md:block">{filter} Leads</h2>
          <div className="flex gap-2">
            <div className="relative flex-1">
              <span className="absolute left-2.5 top-2.5 text-gray-400"><Icons.Search /></span>
              <input type="text" placeholder="Search..." className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-blue-500 transition-all" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
            </div>
            <select className="border border-gray-300 rounded-lg px-2 text-sm bg-white focus:outline-none" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
              <option value="newest">Newest</option><option value="oldest">Oldest</option><option value="name">Name</option>
            </select>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto p-2">
          {processedLeads.length === 0 ? <div className="text-center py-10 text-gray-400 text-sm">No leads found.</div> : (
            processedLeads.map((lead, idx) => (
              <div key={lead.id} onClick={() => setSelectedLead(lead)} className={`p-4 mb-2 border rounded-xl hover:shadow-md cursor-pointer transition-all animate-slide-up ${selectedLead?.id === lead.id ? "bg-blue-50 border-blue-500 shadow-sm" : "bg-white border-gray-100"}`} style={{animationDelay: `${idx * 0.05}s`}}>
                <div className="flex justify-between font-bold text-gray-900">
                  {lead.name} <span className={`text-xs px-2 py-1 rounded ${getStatusColor(lead.status)}`}>{lead.status}</span>
                </div>
                <div className="text-sm text-gray-500 mt-1">{lead.service}</div>
                <div className="flex justify-between items-center mt-2">
                   <div className="text-xs text-gray-400">{lead.phone}</div>
                   <div className="text-xs text-gray-400">{new Date(lead.createdAt).toLocaleDateString()}</div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Detail View */}
      {selectedLead && (
        <div className="w-full md:w-2/3 bg-gray-50 p-4 md:p-8 overflow-y-auto absolute md:relative z-10 h-full animate-slide-in-right">
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">{selectedLead.name}</h2>
              <button onClick={() => setSelectedLead(null)} className="text-gray-400 hover:text-gray-600 hidden md:block transition-colors"><Icons.X /></button>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="p-3 bg-gray-50 rounded"><span className="text-xs text-gray-500">Phone</span><br />{selectedLead.phone}</div>
              <div className="p-3 bg-gray-50 rounded"><span className="text-xs text-gray-500">Address</span><br />{selectedLead.address}</div>
              <div className="p-3 bg-gray-50 rounded col-span-2"><span className="text-xs text-gray-500">Notes</span><br />{selectedLead.details || "No details provided."}</div>
            </div>

            <div className="flex gap-4 mb-6">
              <button onClick={() => handleCall(selectedLead.phone)} className="flex-1 bg-green-600 text-white py-2 rounded-lg text-center flex justify-center items-center gap-2 hover:bg-green-700 hover:scale-105 transition-all">
                <Icons.Phone /> Call Client
              </button>
              <button onClick={() => openChat(selectedLead)} className="flex-1 bg-blue-600 text-white py-2 rounded-lg text-center flex justify-center items-center gap-2 hover:bg-blue-700 hover:scale-105 transition-all">
                <Icons.Chat /> Open Chat
              </button>
            </div>
            {twilioStatus && <p className="text-center text-sm text-blue-600 mb-4">{twilioStatus}</p>}
            <h3 className="font-bold text-sm text-gray-500 uppercase mb-2">Update Status</h3>
            <div className="flex gap-2 mb-6 flex-wrap">
              {["New", "Contacted", "Quoted", "Booked", "Completed"].map(status => (
                <button key={status} onClick={() => updateStatus(selectedLead.id, status)} className={`px-4 py-2 rounded border text-sm transition-all hover:scale-105 ${selectedLead.status === status ? "bg-blue-600 text-white border-blue-600" : "bg-white border-gray-200 hover:bg-gray-50"}`}>{status}</button>
              ))}
            </div>
            <button onClick={() => deleteLead(selectedLead.id)} className="w-full mt-6 text-red-500 hover:text-red-700 font-medium flex items-center justify-center gap-2 transition-colors"><Icons.Trash /> Delete Lead</button>
          </div>
        </div>
      )}
    </div>
  );
};

// 6. Main Admin Layout
const AdminPanel = ({ user, onLogout }) => {
  const [leads, setLeads] = useState([]);
  const [filter, setFilter] = useState("All");
  const [selectedLead, setSelectedLead] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [view, setView] = useState("leads");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [activeChatLead, setActiveChatLead] = useState(null);

  useEffect(() => {
    return db.collection("leads").orderBy("createdAt", "desc").onSnapshot(snapshot => {
      setLeads(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });
  }, []);

  const handleStatusUpdate = async (id, newStatus) => {
    await db.collection("leads").doc(id).update({ status: newStatus });
    if (selectedLead) setSelectedLead({ ...selectedLead, status: newStatus });
  };
  const handleDelete = async (id) => {
    if (window.confirm("Delete this lead?")) {
      await db.collection("leads").doc(id).delete();
      setSelectedLead(null);
    }
  };

  const renderView = () => {
    if (view === "leads") return <LeadList leads={leads} filter={filter} selectedLead={selectedLead} setSelectedLead={setSelectedLead} updateStatus={handleStatusUpdate} deleteLead={handleDelete} openChat={setActiveChatLead} />;
    if (view === "analytics") return <AnalyticsDashboard leads={leads} />;
    if (view === "logs") return <CallLogs />;
    if (view === "chats") return <ChatList leads={leads} openChat={setActiveChatLead} />;
    return null;
  };

  return (
    <div className="flex h-screen bg-slate-100 overflow-hidden text-slate-800 animate-fade-in">
      {showCreateModal && <CreateLeadModal onClose={() => setShowCreateModal(false)} />}
      {activeChatLead && <ChatBox lead={activeChatLead} onClose={() => setActiveChatLead(null)} />}
      {mobileMenuOpen && <div className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden" onClick={() => setMobileMenuOpen(false)} />}
      
      <div className={`fixed md:relative z-30 w-64 h-full bg-slate-900 text-white transform transition-transform duration-200 ease-in-out ${mobileMenuOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 flex flex-col shadow-2xl`}>
        <div className="p-4 border-b border-slate-800 flex justify-between items-center">
          <h1 className="text-xl font-bold text-blue-400">J. Cleanings</h1>
          <button onClick={() => setMobileMenuOpen(false)} className="md:hidden text-slate-400"><Icons.X /></button>
        </div>
        <div className="space-y-2 p-4 flex-1">
          <button onClick={() => setShowCreateModal(true)} className="w-full text-left px-4 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg text-sm flex items-center gap-2 font-bold text-white mb-6 shadow-lg border border-blue-500 hover:scale-105 transition-all"><Icons.Plus /> New Lead</button>
          
          <button onClick={() => setView("leads")} className={`w-full text-left px-4 py-3 rounded-lg text-sm flex items-center gap-2 transition-all hover:bg-slate-800 ${view === "leads" ? "bg-slate-800 text-blue-400" : ""}`}><Icons.User /> Lead Management</button>
          <button onClick={() => setView("chats")} className={`w-full text-left px-4 py-3 rounded-lg text-sm flex items-center gap-2 transition-all hover:bg-slate-800 ${view === "chats" ? "bg-slate-800 text-blue-400" : ""}`}><Icons.Chat /> Chats</button>
          <button onClick={() => setView("analytics")} className={`w-full text-left px-4 py-3 rounded-lg text-sm flex items-center gap-2 transition-all hover:bg-slate-800 ${view === "analytics" ? "bg-slate-800 text-blue-400" : ""}`}><Icons.TrendingUp /> Analytics</button>
          <button onClick={() => setView("logs")} className={`w-full text-left px-4 py-3 rounded-lg text-sm flex items-center gap-2 transition-all hover:bg-slate-800 ${view === "logs" ? "bg-slate-800 text-blue-400" : ""}`}><Icons.Clipboard /> Call Logs</button>
          
          <div className="p-2"></div>
          {view === "leads" && ["All", "New", "Contacted", "Booked", "Completed"].map(status => (
            <button key={status} onClick={() => { setFilter(status); setMobileMenuOpen(false); setSelectedLead(null); }} className={`w-full text-left px-4 py-1 ml-4 rounded-lg text-xs transition-all hover:bg-slate-800 ${filter === status ? "bg-slate-700" : ""}`}>{status} <span className="float-right bg-slate-800 px-2 rounded-full text-xs">{status === "All" ? leads.length : leads.filter(l => l.status === status).length}</span></button>
          ))}
        </div>
        <button onClick={onLogout} className="p-4 mt-4 flex items-center gap-2 text-red-400 hover:text-red-300 border-t border-slate-800 transition-colors"><Icons.LogOut /> Sign Out</button>
      </div>
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white shadow-sm p-4 flex justify-between items-center md:hidden">
          <button onClick={() => setMobileMenuOpen(true)} className="text-gray-600"><Icons.Menu /></button>
          <h2 className="text-lg font-semibold">{view.charAt(0).toUpperCase() + view.slice(1)}</h2>
          {selectedLead && view === "leads" ? <button onClick={() => setSelectedLead(null)} className="text-gray-600"><Icons.X /></button> : <div className="w-6" />}
        </header>
        <div className="flex-1 overflow-y-auto">{renderView()}</div>
      </div>
    </div>
  );
};

// 7. Login, Analytics, QuoteForm (Authentication Enabled)
const Login = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await auth.signInWithEmailAndPassword(email, password);
      // Auth listener in App component will handle the redirection
    } catch (err) {
      setError("Invalid email or password.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900 p-4 animate-fade-in">
      <div className="bg-slate-800 p-8 rounded-xl shadow-2xl w-full max-w-md border border-slate-700 animate-scale-in">
        <h1 className="text-3xl font-bold text-blue-400 text-center mb-8">Just Cleanings CRM</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <input type="email" required className="w-full bg-slate-700 border border-slate-600 rounded-lg p-3 text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all" placeholder="admin@justcleanings.ca" value={email} onChange={(e) => setEmail(e.target.value)} />
          <input type="password" required className="w-full bg-slate-700 border border-slate-600 rounded-lg p-3 text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} />
          {error && <p className="text-red-400 text-sm text-center">{error}</p>}
          <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg hover:scale-105 transition-all">Login</button>
        </form>
      </div>
    </div>
  );
};
const AnalyticsDashboard = ({ leads }) => {
  const booked = leads.filter(l => l.status === "Booked" || l.status === "Completed").length;
  const revenue = booked * 500;
  return (
    <div className="p-4 md:p-8 space-y-8 max-w-6xl mx-auto animate-fade-in">
      <h2 className="text-3xl font-bold text-gray-800 border-b pb-4">Business Analytics</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-md flex items-center space-x-4 animate-slide-up delay-75"><div className="p-3 rounded-full bg-green-100 text-green-600"><Icons.DollarSign /></div><div><p className="text-sm text-gray-500">Revenue</p><h3 className="text-2xl font-bold">${revenue.toLocaleString()}</h3></div></div>
        <div className="bg-white p-6 rounded-xl shadow-md flex items-center space-x-4 animate-slide-up delay-150"><div className="p-3 rounded-full bg-purple-100 text-purple-600"><Icons.CircleCheck /></div><div><p className="text-sm text-gray-500">Booked Jobs</p><h3 className="text-2xl font-bold">{booked}</h3></div></div>
      </div>
    </div>
  );
};
const QuoteForm = ({ onSuccess }) => {
  const [formData, setFormData] = useState({ name: "", phone: "", address: "", service: "Interior Cleaning", details: "" });
  const [loading, setLoading] = useState(false);
  const services = ["Interior Cleaning", "Post-Construction", "Pressure Washing", "Window Cleaning", "Gutter Cleaning", "Roof Cleaning"];
  const handleSubmit = async (e) => {
    e.preventDefault(); setLoading(true);
    try {
      // 1. ADD LEAD TO DB
      await db.collection("leads").add({ ...formData, status: "New", createdAt: new Date().toISOString() });
      
      // 2. IMMEDIATE WELCOME SMS (Automatic)
      fetch(TWILIO_ACTIONS_URL, { 
        method: 'POST', 
        headers: { 'Content-Type': 'application/json' }, 
        body: JSON.stringify({ action: 'welcome', to: formData.phone, name: formData.name }) 
      }).catch(console.error);

      onSuccess(); setFormData({ name: "", phone: "", address: "", service: "Interior Cleaning", details: "" });
    } catch (err) { alert("Error: " + err.message); }
    setLoading(false);
  };
  return (
    <div className="max-w-lg mx-auto bg-white rounded-xl shadow-lg border border-gray-100 p-6 animate-scale-in">
      <h2 className="text-2xl font-bold text-center mb-6 text-blue-600">Get a Free Quote</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" required className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all" placeholder="Your Name" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
        <input type="tel" required className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all" placeholder="Phone Number" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} />
        <input type="text" required className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all" placeholder="Address" value={formData.address} onChange={e => setFormData({...formData, address: e.target.value})} />
        <select className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all" value={formData.service} onChange={e => setFormData({...formData, service: e.target.value})}>{services.map(s => <option key={s} value={s}>{s}</option>)}</select>
        <button type="submit" disabled={loading} className="w-full bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 hover:scale-105 transition-all">{loading ? "Sending..." : "Get Quote"}</button>
      </form>
    </div>
  );
};

// 8. App Entry
const App = () => {
  const [user, setUser] = useState(null);
  const [view, setView] = useState("landing");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(true);

  // Monitor Firebase Auth State
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(u => {
      if (u) {
        setUser(u);
        setView("admin");
      } else {
        setUser(null);
        setView("landing"); // Or keep it on Landing/Login depending on preference
      }
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const handleLogout = () => { auth.signOut(); };

  if (loading) return <div className="min-h-screen bg-slate-900 flex items-center justify-center text-blue-400">Loading...</div>;

  if (success) return <div className="min-h-screen bg-blue-600 flex items-center justify-center p-4 animate-fade-in"><div className="bg-white p-8 rounded-2xl shadow-xl text-center animate-scale-in"><h2 className="text-2xl font-bold mb-2">Quote Requested!</h2><button onClick={() => setSuccess(false)} className="bg-gray-900 text-white py-3 px-8 rounded-lg mt-4 hover:scale-105 transition-all">Back</button></div></div>;
  
  if (view === "admin") return user ? <AdminPanel user={user} onLogout={handleLogout} /> : <Login />;
  
  // Default to Landing Page
  return (
    <div className="min-h-screen bg-gray-50 font-sans text-slate-800 animate-fade-in">
      <nav className="bg-white shadow-sm p-4 sticky top-0 z-50 flex justify-between max-w-4xl mx-auto"><span className="font-bold text-lg text-blue-600">Just Cleanings</span><button onClick={() => setView("admin")} className="text-xs font-bold text-gray-400 hover:text-blue-600 transition-colors">Owner Login</button></nav>
      <main className="p-4 md:p-8 max-w-4xl mx-auto grid md:grid-cols-2 gap-8 items-center"><div className="space-y-4 animate-slide-in-right"><h1 className="text-4xl font-extrabold text-gray-900">Abbotsford's <span className="text-blue-600">#1 Choice</span></h1><p className="text-lg text-gray-600">Specializing in Interiors, Move-Outs, and Pressure Washing.</p></div><QuoteForm onSuccess={() => setSuccess(true)} /></main>
    </div>
  );
};

const root = createRoot(document.getElementById('root'));
root.render(<React.StrictMode><App /></React.StrictMode>);