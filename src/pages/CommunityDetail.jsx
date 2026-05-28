import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  ChevronLeft,
  Heart,
  Loader2,
  MessageCircle,
  MoreHorizontal,
  Send,
  Share2,
} from 'lucide-react';
import toast from 'react-hot-toast';
import { Card } from '../components/common/Card';
import { useUser } from '../context/UserContext';
import { communityApi, extractErrorMessage } from '../services/api';
import { toCommunityThread } from '../utils/viewModels';

const updateCommentTree = (comments, commentId, updater) => comments.map((comment) => {
  if (comment.id === commentId) {
    return updater(comment);
  }

  if (comment.replies?.length) {
    return {
      ...comment,
      replies: updateCommentTree(comment.replies, commentId, updater),
    };
  }

  return comment;
});

const CommunityDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { userProfile } = useUser();
  const [rawThread, setRawThread] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [likedPost, setLikedPost] = useState(false);
  const [likedComments, setLikedComments] = useState({});
  const [replyText, setReplyText] = useState('');
  const [replyingTo, setReplyingTo] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const loadThread = async () => {
      setIsLoading(true);

      try {
        const result = await communityApi.getPostById(id);
        if (isMounted) {
          setRawThread(result);
        }
      } catch (error) {
        toast.error(extractErrorMessage(error));
        if (isMounted) {
          navigate('/community', { replace: true });
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    loadThread();

    return () => {
      isMounted = false;
    };
  }, [id, navigate]);

  const thread = useMemo(() => (
    rawThread ? toCommunityThread(rawThread, userProfile) : null
  ), [rawThread, userProfile]);

  const refreshThread = async () => {
    const result = await communityApi.getPostById(id);
    setRawThread(result);
  };

  const handleTogglePostLike = async () => {
    try {
      const result = await communityApi.togglePostLike(id);
      setLikedPost(result.liked);
      setRawThread((current) => (
        current
          ? {
              ...current,
              _count: {
                ...current._count,
                likes: Math.max((current._count?.likes || 0) + (result.liked ? 1 : -1), 0),
              },
            }
          : current
      ));
    } catch (error) {
      toast.error(extractErrorMessage(error));
    }
  };

  const handleToggleCommentLike = async (commentId) => {
    try {
      const result = await communityApi.toggleCommentLike(commentId);
      setLikedComments((current) => ({
        ...current,
        [commentId]: result.liked,
      }));
      setRawThread((current) => (
        current
          ? {
              ...current,
              comments: updateCommentTree(current.comments || [], commentId, (comment) => ({
                ...comment,
                _count: {
                  ...comment._count,
                  likes: Math.max((comment._count?.likes || 0) + (result.liked ? 1 : -1), 0),
                },
              })),
            }
          : current
      ));
    } catch (error) {
      toast.error(extractErrorMessage(error));
    }
  };

  const handleSendReply = async (event) => {
    event.preventDefault();
    if (!replyText.trim()) {
      return;
    }

    setIsSubmitting(true);

    try {
      await communityApi.createComment(id, {
        content: replyText.trim(),
        ...(replyingTo ? { parentId: replyingTo.commentId } : {}),
      });
      await refreshThread();
      setReplyText('');
      setReplyingTo(null);
      toast.success('Komentar berhasil ditambahkan!');
    } catch (error) {
      toast.error(extractErrorMessage(error));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeletePost = async () => {
    if (!thread?.isOwnPost) {
      toast('Anda hanya bisa menghapus postingan sendiri.');
      return;
    }

    if (!window.confirm('Hapus postingan ini dari komunitas?')) {
      return;
    }

    try {
      await communityApi.deletePost(id);
      toast.success('Postingan berhasil dihapus.');
      navigate('/community', { replace: true });
    } catch (error) {
      toast.error(extractErrorMessage(error));
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center p-6">
        <Card className="text-sm text-slate-500">Memuat thread komunitas...</Card>
      </div>
    );
  }

  if (!thread) {
    return null;
  }

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans max-w-md mx-auto shadow-2xl relative pb-20">
      <header className="bg-white/80 backdrop-blur-md px-4 py-4 flex items-center justify-between sticky top-0 z-20 border-b border-slate-100">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate(-1)} className="p-2 -ml-2 rounded-full text-slate-600 hover:bg-slate-100 transition-colors">
            <ChevronLeft size={24} />
          </button>
          <h1 className="text-lg font-bold text-slate-900 leading-tight">Thread</h1>
        </div>
        <button onClick={handleDeletePost} className="text-slate-400 hover:text-slate-600">
          <MoreHorizontal size={20} />
        </button>
      </header>

      <div className="p-4 overflow-y-auto">
        <div className="mb-4">
          <div className="flex items-center gap-3 mb-3">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-full bg-[var(--diabites-green)] font-bold text-white shadow-sm">
              {thread.author.avatarUrl ? (
                <img src={thread.author.avatarUrl} alt={thread.author.name} className="h-full w-full object-cover" />
              ) : (
                thread.author.initials
              )}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-slate-900">{thread.author.name}</h3>
                <span className="px-2 py-0.5 bg-blue-50 text-blue-600 text-[10px] font-bold rounded-full border border-blue-100 whitespace-nowrap">
                  {thread.author.diabetesTypeLabel}
                </span>
              </div>
              <p className="text-xs text-slate-400">{thread.timeLabel}</p>
            </div>
          </div>

          <p className="text-[15px] text-slate-800 leading-relaxed mb-4">
            {thread.content}
          </p>

          <div className="flex items-center gap-6 py-3 border-y border-slate-100 text-slate-500 mb-6">
            <button
              className={`flex items-center gap-1.5 text-sm font-medium transition-colors ${likedPost ? 'text-rose-600' : 'hover:text-rose-600'}`}
              onClick={handleTogglePostLike}
            >
              <Heart size={18} fill={likedPost ? 'currentColor' : 'none'} /> {thread.likesCount}
            </button>
            <button
              className="flex items-center gap-1.5 text-sm font-medium transition-colors hover:text-[var(--diabites-green)]"
              onClick={() => setReplyingTo(null)}
            >
              <MessageCircle size={18} /> Balas
            </button>
            <button className="flex items-center gap-1.5 text-sm font-medium hover:text-blue-600 transition-colors ml-auto">
              <Share2 size={18} /> Bagikan
            </button>
          </div>
        </div>

        <div className="space-y-6">
          {thread.comments.map((comment) => (
            <div key={comment.id} className="relative">
              <div className="flex items-start gap-3 relative z-10 bg-white">
                <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center overflow-hidden text-slate-600 font-bold shrink-0 z-10">
                  {comment.author.avatarUrl ? (
                    <img src={comment.author.avatarUrl} alt={comment.author.name} className="h-full w-full object-cover" />
                  ) : (
                    comment.author.initials
                  )}
                </div>
                <div className="flex-1 min-w-0 pt-0.5 pb-2">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-bold text-slate-900 text-sm truncate">{comment.author.name}</h4>
                    <span className="text-xs text-slate-400">{comment.timeLabel}</span>
                  </div>
                  <p className="text-sm text-slate-700 leading-relaxed">{comment.content}</p>

                  <div className="flex items-center gap-4 mt-2 text-slate-400">
                    <button
                      className={`flex items-center gap-1 text-xs ${likedComments[comment.id] ? 'text-rose-600' : 'hover:text-rose-600'}`}
                      onClick={() => handleToggleCommentLike(comment.id)}
                    >
                      <Heart size={14} fill={likedComments[comment.id] ? 'currentColor' : 'none'} /> {comment.likesCount || ''}
                    </button>
                    <button
                      className="flex items-center gap-1 text-xs font-medium hover:text-[var(--diabites-green)]"
                      onClick={() => setReplyingTo({ commentId: comment.id, name: comment.author.name })}
                    >
                      <MessageCircle size={14} /> Balas
                    </button>
                  </div>
                </div>
              </div>

              {comment.replies.length > 0 && (
                <div className="absolute left-5 top-10 bottom-0 w-0.5 bg-slate-200 -z-0" />
              )}

              {comment.replies.length > 0 && (
                <div className="ml-5 pl-5 pt-3 space-y-4">
                  {comment.replies.map((reply) => (
                    <div key={reply.id} className="flex items-start gap-3 relative z-10 bg-white">
                      <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center overflow-hidden text-slate-500 text-xs font-bold shrink-0 z-10 ring-4 ring-white">
                        {reply.author.avatarUrl ? (
                          <img src={reply.author.avatarUrl} alt={reply.author.name} className="h-full w-full object-cover" />
                        ) : (
                          reply.author.initials
                        )}
                      </div>
                      <div className="flex-1 min-w-0 pt-0.5 pb-2">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-bold text-slate-900 text-sm truncate">{reply.author.name}</h4>
                          <span className="text-[10px] text-slate-400">{reply.timeLabel}</span>
                        </div>
                        <p className="text-sm text-slate-700 leading-relaxed">{reply.content}</p>
                        <div className="flex items-center gap-4 mt-2 text-slate-400">
                          <button
                            className={`flex items-center gap-1 text-xs ${likedComments[reply.id] ? 'text-rose-600' : 'hover:text-rose-600'}`}
                            onClick={() => handleToggleCommentLike(reply.id)}
                          >
                            <Heart size={14} fill={likedComments[reply.id] ? 'currentColor' : 'none'} /> {reply.likesCount || ''}
                          </button>
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

      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-white border-t border-slate-200 p-3 z-40 pb-safe">
        {replyingTo && (
          <div className="flex items-center justify-between px-2 pb-2 mb-2 border-b border-slate-100 text-xs">
            <span className="text-slate-500">Membalas <span className="font-bold text-[var(--diabites-green)]">@{replyingTo.name}</span></span>
            <button onClick={() => setReplyingTo(null)} className="text-slate-400 hover:text-slate-700 font-bold px-2">Batal</button>
          </div>
        )}

        <form onSubmit={handleSendReply} className="flex items-end gap-2">
          <textarea
            value={replyText}
            onChange={(event) => setReplyText(event.target.value)}
            placeholder={replyingTo ? `Balas @${replyingTo.name}...` : 'Tambahkan komentar...'}
            className="flex-1 resize-none rounded-2xl bg-slate-100 px-4 py-2.5 text-sm outline-none transition-all focus:ring-2 focus:ring-[var(--diabites-green)] max-h-24 min-h-[44px]"
            rows="1"
          />
          <button
            type="submit"
            disabled={!replyText.trim() || isSubmitting}
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[var(--diabites-green)] text-white transition-colors disabled:bg-slate-300 disabled:opacity-50"
          >
            {isSubmitting ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} className="ml-0.5 -mt-0.5" />}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CommunityDetail;
