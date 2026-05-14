import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { Send, Heart, MessageCircle, Plus, Users, X } from "lucide-react";
import { Card } from "../components/common/Card";
import { Button } from "../components/common/Button";

const Community = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([
    { id: 1, name: "Budi Santoso", diabetesType: "Type 2", time: "10 mnt lalu", content: "Ada yang punya rekomendasi camilan rendah gula kalau lagi pengen yang manis-manis malam hari?", likes: 12, comments: 4 },
    { id: 2, name: "Siti Aminah", diabetesType: "Gestasional", time: "1 jam lalu", content: "Hari ini nyoba scan susu almond merk X pakai fitur scanner aplikasi ini, ternyata gulanya lumayan tinggi juga ya. Hati-hati semuanya! 🙌", likes: 24, comments: 8 },
    { id: 3, name: "Andi Pratama", diabetesType: "Type 1", time: "3 jam lalu", content: "Tetap semangat semuanya! Jaga pola makan, rajin olahraga ringan, dan jangan lupa rutin cek gula darah.", likes: 45, comments: 2 },
  ]);

  const [newMessage, setNewMessage] = useState("");
  const [isComposerOpen, setIsComposerOpen] = useState(false);

  const getInitials = (name) => name.split(" ").map((n) => n[0]).join("").substring(0, 2).toUpperCase();

  useEffect(() => {
    if (!isComposerOpen) {
      return undefined;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isComposerOpen]);

  const openComposer = () => setIsComposerOpen(true);
  const closeComposer = () => setIsComposerOpen(false);

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
    setPosts((currentPosts) => [newPost, ...currentPosts]);
    setNewMessage("");
    closeComposer();
  };

  const handleGoToDetail = (postId) => {
    navigate(`/community/${postId}`);
  };

  return (
    <div className="flex h-full flex-col bg-slate-50 pb-28">
      
      {/* Title Area */}
      <div className="mb-2 bg-white px-6 py-4 shadow-sm">
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
              <div className="mb-3 flex items-start gap-3">
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
              
              <div className="flex items-center gap-6 border-t border-slate-100 pt-3 text-slate-500">
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

      <div className="pointer-events-none fixed bottom-[7.15rem] left-1/2 z-40 flex w-full max-w-md -translate-x-1/2 justify-end px-5">
        <button
          type="button"
          onClick={openComposer}
          className="pointer-events-auto flex h-[3.65rem] w-[3.65rem] items-center justify-center rounded-[1.35rem] bg-[linear-gradient(135deg,#0f766e_0%,#10b981_52%,#22c55e_100%)] text-white shadow-[0_18px_40px_rgba(16,185,129,0.26)] transition-all duration-200 hover:-translate-y-0.5 active:scale-95"
          aria-label="Buat postingan baru"
        >
          <Plus size={24} />
        </button>
      </div>

      {isComposerOpen && (
        <div className="fixed inset-0 z-[100] flex items-end justify-center bg-black/55 p-0 backdrop-blur-sm sm:items-center sm:p-4">
          <div className="max-h-[80vh] w-full max-w-md overflow-y-auto rounded-t-3xl bg-white/98 p-6 shadow-2xl sm:rounded-[28px]">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-slate-900">Tulis Postingan</h2>
                <p className="mt-1 text-sm text-slate-500">
                  Bagikan pengalaman atau pertanyaanmu ke komunitas.
                </p>
              </div>
              <button
                type="button"
                onClick={closeComposer}
                className="rounded-full bg-slate-100 p-2 text-slate-500 transition-colors hover:bg-slate-200"
                aria-label="Tutup modal"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSend} className="space-y-4">
              <textarea
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Tuliskan sesuatu yang ingin kamu bagikan..."
                rows={5}
                className="w-full resize-none rounded-[22px] border border-slate-200 bg-slate-50/90 px-4 py-3 text-sm text-slate-700 outline-none transition-all focus:border-emerald-400 focus:bg-white focus:ring-4 focus:ring-emerald-100"
              />

              <div className="flex gap-3">
                <Button
                  type="button"
                  variant="outline"
                  fullWidth
                  onClick={closeComposer}
                  className="!py-3.5"
                >
                  Batal
                </Button>
                <Button type="submit" fullWidth className="!py-3.5" disabled={!newMessage.trim()}>
                  <Send size={18} /> Submit
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Community;
