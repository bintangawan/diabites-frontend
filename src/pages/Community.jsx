import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { Send, Heart, MessageCircle, Users } from "lucide-react";
import { Card } from "../components/common/Card";

const Community = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([
    { id: 1, name: "Budi Santoso", diabetesType: "Type 2", time: "10 mnt lalu", content: "Ada yang punya rekomendasi camilan rendah gula kalau lagi pengen yang manis-manis malam hari?", likes: 12, comments: 4 },
    { id: 2, name: "Siti Aminah", diabetesType: "Gestasional", time: "1 jam lalu", content: "Hari ini nyoba scan susu almond merk X pakai fitur scanner aplikasi ini, ternyata gulanya lumayan tinggi juga ya. Hati-hati semuanya! 🙌", likes: 24, comments: 8 },
    { id: 3, name: "Andi Pratama", diabetesType: "Type 1", time: "3 jam lalu", content: "Tetap semangat semuanya! Jaga pola makan, rajin olahraga ringan, dan jangan lupa rutin cek gula darah.", likes: 45, comments: 2 },
  ]);

  const [newMessage, setNewMessage] = useState("");

  const getInitials = (name) => name.split(" ").map((n) => n[0]).join("").substring(0, 2).toUpperCase();

  const handleSend = (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;
    const newPost = {
      id: Date.now(),
      name: "Bintang Kurniawan",
      diabetesType: "Type 2",
      time: "Baru saja",
      content: newMessage,
      likes: 0,
      comments: 0,
    };
    setPosts([newPost, ...posts]);
    setNewMessage("");
  };

  const handleGoToDetail = (postId) => {
    navigate(`/community/${postId}`);
  };

  return (
    <div className="flex flex-col h-full bg-slate-50 pb-20">
      
      {/* Title Area */}
      <div className="px-6 py-4 bg-white mb-2 shadow-sm">
        <h1 className="text-lg font-bold text-slate-900 flex items-center gap-2">
          <Users size={20} className="text-teal-600" /> Ruang Berbagi
        </h1>
        <p className="text-xs text-slate-500">Komunitas pejuang diabetes</p>
      </div>

      {/* Feed List */}
      <div className="p-6 space-y-4">
        {posts.map((post) => (
          <Card
            key={post.id}
            noPadding
            className="overflow-hidden cursor-pointer hover:border-teal-300 transition-all hover:shadow-md"
            onClick={() => handleGoToDetail(post.id)} // Navigasi saat Card diklik
          >
            <div className="p-4">
              <div className="flex items-start gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center text-white text-sm font-bold shrink-0 shadow-sm">
                  {getInitials(post.name)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-slate-900 text-sm truncate">{post.name}</h3>
                    <span className="px-2 py-0.5 bg-blue-50 text-blue-600 text-[10px] font-bold rounded-full border border-blue-100 shrink-0">
                      {post.diabetesType}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400">{post.time}</p>
                </div>
              </div>
              <p className="text-sm text-slate-700 leading-relaxed mb-4">
                {post.content}
              </p>
              
              <div className="flex items-center gap-6 pt-3 border-t border-slate-100 text-slate-500">
                <button 
                  className="flex items-center gap-1.5 text-xs font-medium hover:text-rose-600 transition-colors"
                  onClick={(e) => {
                    e.stopPropagation(); // Mencegah Card ikut terklik ulang
                    // Logika like bisa ditambah di sini nanti
                  }}
                >
                  <Heart size={16} /> {post.likes}
                </button>
                
                <button 
                  className="flex items-center gap-1.5 text-xs font-medium hover:text-teal-600 transition-colors"
                  onClick={(e) => {
                    e.stopPropagation(); // Mencegah trigger ganda
                    handleGoToDetail(post.id); // Langsung arahkan ke detail
                  }}
                >
                  <MessageCircle size={16} /> {post.comments} Balasan
                </button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Input Form at Bottom */}
      <div className="fixed bottom-[64px] left-1/2 -translate-x-1/2 w-full max-w-md bg-white border-t border-slate-200 p-3 z-40 pb-safe">
        <form onSubmit={handleSend} className="flex items-center gap-2">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Tuliskan sesuatu..."
            className="flex-1 bg-slate-100 px-4 py-2.5 rounded-full text-sm outline-none focus:ring-2 focus:ring-teal-500 transition-all"
          />
          <button
            type="submit"
            disabled={!newMessage.trim()}
            className="w-10 h-10 bg-teal-600 text-white rounded-full flex items-center justify-center disabled:opacity-50 disabled:bg-slate-300 transition-colors shrink-0"
          >
            <Send size={18} className="ml-0.5" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default Community;