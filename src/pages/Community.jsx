import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, Loader2, MessageCircle, Plus, Send, Users, X } from 'lucide-react';
import toast from 'react-hot-toast';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { useUser } from '../context/UserContext';
import { communityApi, extractErrorMessage } from '../services/api';
import { toCommunityPostCard } from '../utils/viewModels';

const Community = () => {
  const navigate = useNavigate();
  const { userProfile } = useUser();
  const [rawPosts, setRawPosts] = useState([]);
  const [likedPosts, setLikedPosts] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [newMessage, setNewMessage] = useState('');
  const [isComposerOpen, setIsComposerOpen] = useState(false);

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

  useEffect(() => {
    let isMounted = true;

    const loadPosts = async () => {
      setIsLoading(true);

      try {
        const { items } = await communityApi.getPosts({ page: 1, limit: 50 });
        if (isMounted) {
          setRawPosts(items);
        }
      } catch (error) {
        toast.error(extractErrorMessage(error));
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    loadPosts();

    return () => {
      isMounted = false;
    };
  }, []);

  const posts = useMemo(() => (
    rawPosts.map((post) => toCommunityPostCard(post, userProfile))
  ), [rawPosts, userProfile]);

  const openComposer = () => setIsComposerOpen(true);
  const closeComposer = () => setIsComposerOpen(false);

  const handleSend = async (event) => {
    event.preventDefault();
    if (!newMessage.trim()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const createdPost = await communityApi.createPost({ content: newMessage.trim() });
      setRawPosts((currentPosts) => [createdPost, ...currentPosts]);
      setNewMessage('');
      closeComposer();
      toast.success('Postingan berhasil dibuat!');
    } catch (error) {
      toast.error(extractErrorMessage(error));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleToggleLike = async (event, postId) => {
    event.stopPropagation();

    try {
      const result = await communityApi.togglePostLike(postId);
      setLikedPosts((current) => ({
        ...current,
        [postId]: result.liked,
      }));
      setRawPosts((currentPosts) => currentPosts.map((post) => (
        post.id === postId
          ? {
              ...post,
              _count: {
                ...post._count,
                likes: Math.max((post._count?.likes || 0) + (result.liked ? 1 : -1), 0),
              },
            }
          : post
      )));
    } catch (error) {
      toast.error(extractErrorMessage(error));
    }
  };

  return (
    <div className="flex h-full flex-col bg-slate-50 pb-28">
      <div className="mb-2 bg-white px-6 py-4 shadow-sm">
        <h1 className="text-lg font-bold text-slate-900 flex items-center gap-2">
          <Users size={20} className="text-teal-600" /> Ruang Berbagi
        </h1>
        <p className="text-xs text-slate-500">Komunitas pejuang diabetes</p>
      </div>

      <div className="p-6 space-y-4">
        {isLoading && (
          <Card className="text-sm text-slate-500">Memuat postingan komunitas...</Card>
        )}

        {!isLoading && posts.length === 0 && (
          <Card className="text-sm text-slate-500">Belum ada postingan di komunitas.</Card>
        )}

        {!isLoading && posts.map((post) => (
          <Card
            key={post.id}
            noPadding
            className="overflow-hidden cursor-pointer hover:border-teal-300 transition-all hover:shadow-md"
            onClick={() => navigate(`/community/${post.id}`)}
          >
            <div className="p-4">
              <div className="mb-3 flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center overflow-hidden text-white text-sm font-bold shrink-0 shadow-sm">
                  {post.author.avatarUrl ? (
                    <img src={post.author.avatarUrl} alt={post.author.name} className="h-full w-full object-cover" />
                  ) : (
                    post.author.initials
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-slate-900 text-sm truncate">{post.author.name}</h3>
                    <span className="px-2 py-0.5 bg-blue-50 text-blue-600 text-[10px] font-bold rounded-full border border-blue-100 shrink-0">
                      {post.author.diabetesTypeLabel}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400">{post.timeLabel}</p>
                </div>
              </div>
              <p className="text-sm text-slate-700 leading-relaxed mb-4">
                {post.content}
              </p>

              <div className="flex items-center gap-6 border-t border-slate-100 pt-3 text-slate-500">
                <button
                  className={`flex items-center gap-1.5 text-xs font-medium transition-colors ${likedPosts[post.id] ? 'text-rose-600' : 'hover:text-rose-600'}`}
                  onClick={(event) => handleToggleLike(event, post.id)}
                >
                  <Heart size={16} fill={likedPosts[post.id] ? 'currentColor' : 'none'} /> {post.likesCount}
                </button>

                <button
                  className="flex items-center gap-1.5 text-xs font-medium hover:text-teal-600 transition-colors"
                  onClick={(event) => {
                    event.stopPropagation();
                    navigate(`/community/${post.id}`);
                  }}
                >
                  <MessageCircle size={16} /> {post.commentsCount} Balasan
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
                onChange={(event) => setNewMessage(event.target.value)}
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
                <Button type="submit" fullWidth className="!py-3.5" disabled={!newMessage.trim() || isSubmitting}>
                  {isSubmitting ? <Loader2 className="animate-spin" size={18} /> : <Send size={18} />} Submit
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
