const STATUS_MAP = {
  recommended: 'Recommended',
  caution: 'Caution',
  'not recommended': 'Not Recommended',
  not_recommended: 'Not Recommended',
};

export const normalizeStatus = (status) => (
  String(status || '')
    .trim()
    .toLowerCase()
    .replace(/_/g, ' ')
);

export const getStatusColor = (status) => {
  switch (normalizeStatus(status)) {
    case 'recommended':
      return { bg: 'bg-emerald-100', text: 'text-emerald-700', border: 'border-emerald-200' };
    case 'caution':
      return { bg: 'bg-amber-100', text: 'text-amber-700', border: 'border-amber-200' };
    case 'not recommended':
      return { bg: 'bg-rose-100', text: 'text-rose-700', border: 'border-rose-200' };
    default:
      return { bg: 'bg-slate-100', text: 'text-slate-700', border: 'border-slate-200' };
  }
};

export const getStatusDisplay = (status) => STATUS_MAP[normalizeStatus(status)] || status || 'Belum Ada';

export const getStatusBadgeText = (status) => {
  switch (normalizeStatus(status)) {
    case 'recommended':
      return 'Aman';
    case 'caution':
      return 'Peringatan';
    case 'not recommended':
      return 'Bahaya';
    default:
      return 'Info';
  }
};

export const getInitials = (name) => (
  String(name || 'DB')
    .split(' ')
    .filter(Boolean)
    .map((part) => part[0])
    .join('')
    .substring(0, 2)
    .toUpperCase()
);

export const formatDiabetesType = (type) => {
  switch (type) {
    case 'type1':
      return 'Type 1';
    case 'type2':
      return 'Type 2';
    case 'gestational':
      return 'Gestasional';
    case 'prediabetes':
      return 'Prediabetes';
    default:
      return type || 'Member';
  }
};

const padTime = (dateString) => new Intl.DateTimeFormat('id-ID', {
  hour: '2-digit',
  minute: '2-digit',
}).format(new Date(dateString));

export const formatHistoryDate = (dateString) => {
  const targetDate = new Date(dateString);

  if (Number.isNaN(targetDate.getTime())) {
    return '-';
  }

  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const targetDay = new Date(
    targetDate.getFullYear(),
    targetDate.getMonth(),
    targetDate.getDate(),
  );
  const diffDays = Math.round((today - targetDay) / 86400000);

  if (diffDays === 0) {
    return `Hari ini, ${padTime(targetDate)}`;
  }

  if (diffDays === 1) {
    return `Kemarin, ${padTime(targetDate)}`;
  }

  return new Intl.DateTimeFormat('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(targetDate);
};

export const formatPostTime = (dateString) => {
  const targetDate = new Date(dateString);

  if (Number.isNaN(targetDate.getTime())) {
    return '-';
  }

  const diffMs = Date.now() - targetDate.getTime();
  const diffMinutes = Math.max(Math.floor(diffMs / 60000), 0);

  if (diffMinutes < 1) {
    return 'Baru saja';
  }

  if (diffMinutes < 60) {
    return `${diffMinutes} mnt lalu`;
  }

  const diffHours = Math.floor(diffMinutes / 60);
  if (diffHours < 24) {
    return `${diffHours} jam lalu`;
  }

  const diffDays = Math.floor(diffHours / 24);
  if (diffDays < 7) {
    return `${diffDays} hari lalu`;
  }

  return new Intl.DateTimeFormat('id-ID', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(targetDate);
};

export const getDefaultRecommendationReason = (status) => {
  switch (normalizeStatus(status)) {
    case 'recommended':
      return 'Kandungan nutrisi sesuai untuk dikonsumsi oleh penderita diabetes.';
    case 'caution':
      return 'Perhatikan porsi konsumsi dan sesuaikan dengan asupan harian Anda.';
    case 'not recommended':
      return 'Kandungan nutrisi produk ini terlalu tinggi untuk dikonsumsi secara rutin oleh penderita diabetes.';
    default:
      return 'Belum ada rekomendasi untuk hasil ini.';
  }
};
