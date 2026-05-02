import { useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { ChevronLeft, Heart, MessageCircle, Send, Share2, MoreHorizontal } from 'lucide-react';

const CommunityDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // Mengambil ID dari URL
  
  // Dummy data khusus untuk detail thread
  const [threadData, setThreadData] = useState({
    id: id,
    name: 'Siti Aminah',
    diabetesType: 'Gestasional',
    time: '1 jam lalu',
    content: 'Hari ini nyoba scan susu almond merk X pakai fitur scanner aplikasi ini, ternyata gulanya lumayan tinggi juga ya. Hati-hati semuanya! 🙌',
    likes: 24,
    comments: [
      {
        id: 101,
        name: 'Andi Pratama',
        diabetesType: 'Type 1',
        time: '45 mnt lalu',
        content: 'Wah beneran kak? Padahal klaimnya sehat ya. Harus lebih teliti baca label gizi nih.',
        likes: 5,
        replies: [
          {
            id: 201,
            name: 'Siti Aminah',
            diabetesType: 'Gestasional',
            time: '40 mnt lalu',
            content: 'Iya bener Andi, ternyata mereka pakai pemanis buatan yang lumayan banyak. Mending bikin sendiri di rumah kalau mau aman.',
            likes: 3,
          }
        ]
      },
      {
        id: 102,
        name: 'Budi Santoso',
        diabetesType: 'Type 2',
        time: '30 mnt lalu',
        content: 'Terima kasih infonya! Kemarin hampir aja beli itu. Untung baca post ini.',
        likes: 12,
        replies: []
      }
    ]
  });

  const [replyText, setReplyText] = useState('');
  const [replyingTo, setReplyingTo] = useState(null); // Menyimpan info siapa yang sedang dibalas

  const getInitials = (name) => name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();

  const handleSendReply = (e) => {
    e.preventDefault();
    if (!replyText.trim()) return;

    // Logika dummy untuk menambah komentar/balasan
    const newComment = {
      id: Date.now(),
      name: 'Bintang Kurniawan',
      diabetesType: 'Type 2',
      time: 'Baru saja',
      content: replyText,
      likes: 0,
      replies: []
    };

    const updatedThread = { ...threadData };

    if (replyingTo) {
      // Menambah balasan ke komentar spesifik (Nested)
      const commentIndex = updatedThread.comments.findIndex(c => c.id === replyingTo.commentId);
      if (commentIndex > -1) {
        updatedThread.comments[commentIndex].replies.push(newComment);
      }
    } else {
      // Menambah komentar utama baru
      updatedThread.comments.push(newComment);
    }

    setThreadData(updatedThread);
    setReplyText('');
    setReplyingTo(null); // Reset state balasan
  };

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans max-w-md mx-auto shadow-2xl relative pb-20">
      
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md px-4 py-4 flex items-center justify-between sticky top-0 z-20 border-b border-slate-100">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate(-1)} className="p-2 -ml-2 rounded-full text-slate-600 hover:bg-slate-100 transition-colors">
            <ChevronLeft size={24} />
          </button>
          <h1 className="text-lg font-bold text-slate-900 leading-tight">Thread</h1>
        </div>
        <button className="text-slate-400 hover:text-slate-600">
          <MoreHorizontal size={20} />
        </button>
      </header>

      <div className="p-4 overflow-y-auto">
        
        {/* ==================================
            1. POST UTAMA
            ================================== */}
        <div className="mb-4">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center text-white font-bold shrink-0 shadow-sm">
              {getInitials(threadData.name)}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-slate-900">{threadData.name}</h3>
                <span className="px-2 py-0.5 bg-blue-50 text-blue-600 text-[10px] font-bold rounded-full border border-blue-100 whitespace-nowrap">
                  {threadData.diabetesType}
                </span>
              </div>
              <p className="text-xs text-slate-400">{threadData.time}</p>
            </div>
          </div>
          
          <p className="text-[15px] text-slate-800 leading-relaxed mb-4">
            {threadData.content}
          </p>

          <div className="flex items-center gap-6 py-3 border-y border-slate-100 text-slate-500 mb-6">
            <button className="flex items-center gap-1.5 text-sm font-medium hover:text-rose-600 transition-colors">
              <Heart size={18} /> {threadData.likes}
            </button>
            <button 
              className="flex items-center gap-1.5 text-sm font-medium hover:text-teal-600 transition-colors"
              onClick={() => setReplyingTo(null)} // Fokus membalas post utama
            >
              <MessageCircle size={18} /> Balas
            </button>
            <button className="flex items-center gap-1.5 text-sm font-medium hover:text-blue-600 transition-colors ml-auto">
              <Share2 size={18} /> Bagikan
            </button>
          </div>
        </div>

        {/* ==================================
            2. DAFTAR KOMENTAR & THREADS
            ================================== */}
        <div className="space-y-6">
          {threadData.comments.map((comment) => (
            <div key={comment.id} className="relative">
              
              {/* Komentar Utama */}
              <div className="flex items-start gap-3 relative z-10 bg-white">
                <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center text-slate-600 font-bold shrink-0 z-10">
                  {getInitials(comment.name)}
                </div>
                <div className="flex-1 min-w-0 pt-0.5 pb-2">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-bold text-slate-900 text-sm truncate">{comment.name}</h4>
                    <span className="text-xs text-slate-400">{comment.time}</span>
                  </div>
                  <p className="text-sm text-slate-700 leading-relaxed">{comment.content}</p>
                  
                  {/* Action Bawah Komentar */}
                  <div className="flex items-center gap-4 mt-2 text-slate-400">
                    <button className="flex items-center gap-1 text-xs hover:text-rose-600"><Heart size={14} /> {comment.likes || ''}</button>
                    <button 
                      className="flex items-center gap-1 text-xs hover:text-teal-600 font-medium"
                      onClick={() => setReplyingTo({ commentId: comment.id, name: comment.name })}
                    >
                      <MessageCircle size={14} /> Balas
                    </button>
                  </div>
                </div>
              </div>

              {/* Garis Thread (Jika ada balasan) */}
              {comment.replies.length > 0 && (
                <div className="absolute left-5 top-10 bottom-0 w-0.5 bg-slate-200 -z-0"></div>
              )}

              {/* Nested Replies (Balasan Bertingkat) */}
              {comment.replies.length > 0 && (
                <div className="ml-5 pl-5 pt-3 space-y-4">
                  {comment.replies.map((reply) => (
                    <div key={reply.id} className="flex items-start gap-3 relative z-10 bg-white">
                      {/* Avatar Balasan */}
                      <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 text-xs font-bold shrink-0 z-10 ring-4 ring-white">
                        {getInitials(reply.name)}
                      </div>
                      <div className="flex-1 min-w-0 pt-0.5 pb-2">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-bold text-slate-900 text-sm truncate">{reply.name}</h4>
                          <span className="text-[10px] text-slate-400">{reply.time}</span>
                        </div>
                        <p className="text-sm text-slate-700 leading-relaxed">{reply.content}</p>
                        <div className="flex items-center gap-4 mt-2 text-slate-400">
                          <button className="flex items-center gap-1 text-xs hover:text-rose-600"><Heart size={14} /> {reply.likes || ''}</button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              
            </div>
          ))}
        </div>
      </div>

      {/* ==================================
          3. INPUT FORM STICKY BOTTOM
          ================================== */}
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-white border-t border-slate-200 p-3 z-40 pb-safe">
        
        {/* Indikator sedang membalas siapa */}
        {replyingTo && (
          <div className="flex items-center justify-between px-2 pb-2 mb-2 border-b border-slate-100 text-xs">
            <span className="text-slate-500">Membalas <span className="font-bold text-teal-600">@{replyingTo.name}</span></span>
            <button onClick={() => setReplyingTo(null)} className="text-slate-400 hover:text-slate-700 font-bold px-2">Batal</button>
          </div>
        )}

        <form onSubmit={handleSendReply} className="flex items-end gap-2">
          <textarea
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
            placeholder={replyingTo ? `Balas @${replyingTo.name}...` : "Tambahkan komentar..."}
            className="flex-1 bg-slate-100 px-4 py-2.5 rounded-2xl text-sm outline-none focus:ring-2 focus:ring-teal-500 transition-all resize-none max-h-24 min-h-[44px]"
            rows="1"
          />
          <button 
            type="submit" 
            disabled={!replyText.trim()}
            className="w-11 h-11 bg-teal-600 text-white rounded-full flex items-center justify-center disabled:opacity-50 disabled:bg-slate-300 transition-colors shrink-0"
          >
            <Send size={18} className="ml-0.5 -mt-0.5" />
          </button>
        </form>
      </div>

    </div>
  );
};

export default CommunityDetail;