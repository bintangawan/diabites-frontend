import { useEffect, useMemo, useRef, useState } from 'react';
import { Loader2, MessageCircle, Send, Sparkles, X } from 'lucide-react';

const QUICK_PROMPTS = [
  'Apa itu diabetes tipe 2?',
  'Bagaimana membaca gula pada label gizi?',
  'Contoh camilan rendah gula apa saja?',
  'Apa arti karbohidrat total pada kemasan?',
];

const createMessage = (role, content, meta = {}) => ({
  id: `${role}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
  role,
  content,
  meta,
});

const getConfidenceLabel = (confidence) => {
  const numericConfidence = Number(confidence || 0);
  if (!Number.isFinite(numericConfidence) || numericConfidence <= 0) {
    return null;
  }

  return `${Math.round(numericConfidence * 100)}%`;
};

const getSourceLabel = (source) => {
  if (!source) {
    return null;
  }

  switch (String(source).toLowerCase()) {
    case 'local':
      return 'Lokal';
    case 'global':
      return 'Global';
    case 'groq_rag':
      return 'Groq RAG';
    default:
      return String(source).replace(/_/g, ' ');
  }
};

const resolveChatbotEndpoint = (rawUrl) => {
  const trimmedUrl = String(rawUrl || '').trim();

  if (!trimmedUrl) {
    return '';
  }

  if (trimmedUrl.includes('huggingface.co/spaces/')) {
    try {
      const { pathname } = new URL(trimmedUrl);
      const pathParts = pathname.split('/').filter(Boolean);
      const spacesIndex = pathParts.indexOf('spaces');
      const owner = pathParts[spacesIndex + 1];
      const project = pathParts[spacesIndex + 2];

      if (owner && project) {
        return `https://${owner}-${project}.hf.space/chat`;
      }
    } catch {
      return '';
    }
  }

  return trimmedUrl.endsWith('/chat')
    ? trimmedUrl
    : `${trimmedUrl.replace(/\/+$/, '')}/chat`;
};

const Chatbot = () => {
  const chatbotEndpoint = useMemo(
    () => resolveChatbotEndpoint(import.meta.env.VITE_CHATBOT_API_URL),
    [],
  );
  const [isOpen, setIsOpen] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [messages, setMessages] = useState(() => [
    createMessage(
      'assistant',
      'Halo, saya Asisten DiaBites. Saya bisa bantu jawab pertanyaan seputar diabetes, membaca label gizi, dan pilihan konsumsi yang lebih bijak.',
      { source: 'welcome' },
    ),
  ]);
  const messagesRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (!messagesRef.current) {
      return;
    }

    messagesRef.current.scrollTo({
      top: messagesRef.current.scrollHeight,
      behavior: 'smooth',
    });
  }, [messages, isOpen, isSending]);

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
    }
  }, [isOpen]);

  const appendAssistantMessage = (content, meta = {}) => {
    setMessages((currentMessages) => [
      ...currentMessages,
      createMessage('assistant', content, meta),
    ]);
  };

  const sendMessage = async (rawMessage) => {
    const trimmedMessage = rawMessage.trim();

    if (!trimmedMessage || isSending) {
      return;
    }

    const nextUserMessage = createMessage('user', trimmedMessage);
    setMessages((currentMessages) => [...currentMessages, nextUserMessage]);
    setInputValue('');
    setIsSending(true);

    if (!chatbotEndpoint) {
      appendAssistantMessage(
        'Chatbot belum dikonfigurasi. Isi `VITE_CHATBOT_API_URL` di `.env` agar asisten bisa dihubungkan.',
        { source: 'config' },
      );
      setIsSending(false);
      return;
    }

    try {
      const response = await fetch(chatbotEndpoint, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: trimmedMessage }),
      });

      const payload = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(
          typeof payload?.detail === 'string'
            ? payload.detail
            : 'Chatbot sedang belum bisa merespons. Coba lagi sebentar.',
        );
      }

      appendAssistantMessage(
        payload?.response || 'Maaf, saya belum menemukan jawaban yang sesuai.',
        {
          source: payload?.source,
          confidence: payload?.confidence,
          intent: payload?.intent,
        },
      );
    } catch (error) {
      appendAssistantMessage(
        error?.message || 'Koneksi ke chatbot sedang bermasalah. Coba lagi sebentar.',
        { source: 'error' },
      );
    } finally {
      setIsSending(false);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await sendMessage(inputValue);
  };

  const handleKeyDown = async (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      await sendMessage(inputValue);
    }
  };

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-4 z-[110] px-3 sm:bottom-5 sm:px-5">
      <div className="mx-auto flex w-full max-w-7xl justify-end">
        <div className="pointer-events-auto w-full max-w-[21.5rem] sm:max-w-[22rem]">
          {isOpen ? (
            <div className="overflow-hidden rounded-[1.8rem] border border-[var(--diabites-green-border)] bg-white/96 shadow-[0_24px_65px_rgba(15,23,42,0.16)] backdrop-blur-xl">
              <div className="border-b border-[var(--diabites-green-border)] bg-[var(--diabites-green-surface)] px-4 py-3.5">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[1rem] bg-[var(--diabites-green)] text-white shadow-[0_14px_28px_var(--diabites-green-shadow)]">
                      <Sparkles size={18} />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-[var(--diabites-green)]">
                        Asisten DiaBites
                      </p>
                      <p className="mt-0.5 text-xs leading-relaxed text-slate-500">
                        Tanya diabetes dan label gizi
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setIsOpen(false)}
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white text-slate-500 shadow-sm transition-colors hover:bg-slate-50 hover:text-slate-700"
                    aria-label="Tutup chatbot"
                  >
                    <X size={16} />
                  </button>
                </div>
              </div>

              <div className="border-b border-[var(--diabites-green-border)] bg-white px-4 py-2.5">
                <div className="flex gap-2 overflow-x-auto pb-1">
                  {QUICK_PROMPTS.map((prompt) => (
                    <button
                      key={prompt}
                      type="button"
                      onClick={() => sendMessage(prompt)}
                      disabled={isSending}
                      className="shrink-0 rounded-full border border-[var(--diabites-green-border)] bg-[var(--diabites-green-soft)] px-3 py-1.5 text-left text-[11px] font-semibold text-[var(--diabites-green)] transition-colors hover:bg-[var(--diabites-green-panel)] disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {prompt}
                    </button>
                  ))}
                </div>
              </div>

              <div
                ref={messagesRef}
                className="h-[15.5rem] space-y-3 overflow-y-auto bg-[var(--diabites-green-surface)] px-4 py-4 sm:h-[17rem]"
              >
                {messages.map((message) => {
                  const isUser = message.role === 'user';
                  const sourceLabel = getSourceLabel(message.meta?.source);
                  const confidenceLabel = getConfidenceLabel(message.meta?.confidence);

                  return (
                    <div
                      key={message.id}
                      className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[85%] rounded-[1.35rem] px-3.5 py-3 shadow-sm ${
                          isUser
                            ? 'rounded-br-md bg-[var(--diabites-green)] text-white'
                            : 'rounded-bl-md border border-[var(--diabites-green-border)] bg-white text-slate-700'
                        }`}
                      >
                        <p className="text-sm leading-relaxed">{message.content}</p>

                        {!isUser && (sourceLabel || confidenceLabel) ? (
                          <div className="mt-2 flex flex-wrap gap-2 text-[11px] font-medium text-slate-400">
                            {sourceLabel ? <span>Source: {sourceLabel}</span> : null}
                            {confidenceLabel ? <span>Confidence: {confidenceLabel}</span> : null}
                          </div>
                        ) : null}
                      </div>
                    </div>
                  );
                })}

                {isSending ? (
                  <div className="flex justify-start">
                    <div className="rounded-[1.35rem] rounded-bl-md border border-[var(--diabites-green-border)] bg-white px-3.5 py-3 text-slate-500 shadow-sm">
                      <div className="flex items-center gap-2 text-sm">
                        <Loader2 size={16} className="animate-spin text-[var(--diabites-green)]" />
                        Asisten sedang menyusun jawaban...
                      </div>
                    </div>
                  </div>
                ) : null}
              </div>

              <div className="bg-white px-4 pb-4 pt-3">
                <form onSubmit={handleSubmit} className="rounded-[1.4rem] border border-[var(--diabites-green-border)] bg-[var(--diabites-green-surface)] p-2 shadow-sm">
                  <div className="flex items-end gap-2">
                    <textarea
                      ref={inputRef}
                      value={inputValue}
                      onChange={(event) => setInputValue(event.target.value)}
                      onKeyDown={handleKeyDown}
                      rows={1}
                      placeholder="Tulis pertanyaanmu di sini..."
                      className="max-h-24 min-h-[48px] flex-1 resize-none bg-transparent px-3 py-2 text-sm text-slate-700 outline-none placeholder:text-slate-400"
                    />

                    <button
                      type="submit"
                      disabled={!inputValue.trim() || isSending}
                      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[0.95rem] bg-[var(--diabites-green)] text-white shadow-[0_14px_30px_var(--diabites-green-shadow)] transition hover:bg-[var(--diabites-green-dark)] disabled:cursor-not-allowed disabled:opacity-55"
                      aria-label="Kirim pesan"
                    >
                      {isSending ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
                    </button>
                  </div>
                </form>

                <p className="mt-3 px-1 text-[11px] leading-relaxed text-slate-400">
                  Chatbot ini bersifat edukatif dan tidak menggantikan saran dokter atau tenaga kesehatan profesional.
                </p>
              </div>
            </div>
          ) : null}

          {!isOpen ? (
            <button
              type="button"
              onClick={() => setIsOpen(true)}
              className="ml-auto flex h-[3.75rem] w-[3.75rem] items-center justify-center rounded-full bg-[var(--diabites-green)] text-white shadow-[0_22px_50px_var(--diabites-green-shadow)] transition hover:-translate-y-0.5 hover:bg-[var(--diabites-green-dark)]"
              aria-label="Buka chatbot DiaBites"
            >
              <MessageCircle size={24} />
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
