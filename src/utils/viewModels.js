import { buildAssetUrl } from '../services/api';
import { resolveScanRecommendation } from './calculators';
import {
  formatDiabetesType,
  formatHistoryDate,
  formatPostTime,
  getInitials,
  getStatusBadgeText,
  getStatusDisplay,
  normalizeStatus,
} from './helpers';

const SCAN_NUTRIENT_CONFIG = [
  { key: 'calories', label: 'Kalori', unit: 'kcal', color: 'bg-sky-500', max: 500 },
  { key: 'sugar', label: 'Gula', unit: 'g', color: 'bg-amber-400', max: 50 },
  { key: 'carbohydrates', label: 'Karbohidrat', unit: 'g', color: 'bg-cyan-500', max: 100 },
  { key: 'fat', label: 'Lemak', unit: 'g', color: 'bg-[var(--diabites-green)]', max: 50 },
  { key: 'sodium', label: 'Sodium', unit: 'mg', color: 'bg-orange-400', max: 1000 },
];

const getSafeScanName = (scan) => scan.productName?.trim() || `Hasil Scan #${scan.id || 'Baru'}`;

const toCommentModel = (comment, currentUserProfile) => ({
  id: comment.id,
  content: comment.content,
  createdAt: comment.createdAt,
  timeLabel: formatPostTime(comment.createdAt),
  likesCount: comment._count?.likes ?? 0,
  repliesCount: comment._count?.replies ?? 0,
  parentId: comment.parentId,
  isOwnComment: comment.user?.id === currentUserProfile?.id,
  author: {
    id: comment.user?.id,
    name: comment.user?.name || 'Member DiaBites',
    avatarUrl: buildAssetUrl(comment.user?.profilePhoto),
    initials: getInitials(comment.user?.name),
    diabetesTypeLabel:
      comment.user?.id === currentUserProfile?.id
        ? formatDiabetesType(currentUserProfile?.diabetesType)
        : 'Member',
  },
  replies: (comment.replies || []).map((reply) => toCommentModel(reply, currentUserProfile)),
});

export const toScanViewModel = (scan, healthProfile) => {
  const recommendation = resolveScanRecommendation({
    healthProfile,
    recommendation: scan.recommendation,
    category: scan.category,
    categoryReason: scan.categoryReason,
    nutrition: {
      calories: scan.calories,
      sugar: scan.sugar,
      carbohydrates: scan.carbohydrates,
      fat: scan.fat,
      sodium: scan.sodium,
    },
  });

  const statusKey = normalizeStatus(recommendation.category).replace(/ /g, '_') || 'caution';

  return {
    id: scan.id,
    name: getSafeScanName(scan),
    imageUrl: buildAssetUrl(scan.imageUrl),
    createdAt: scan.createdAt,
    dateLabel: scan.createdAt ? formatHistoryDate(scan.createdAt) : 'Baru saja',
    statusKey,
    statusLabel: getStatusDisplay(statusKey),
    badgeText: getStatusBadgeText(statusKey),
    reason: recommendation.reason,
    servingSize: scan.servingSize?.trim() || '-',
    nutrients: SCAN_NUTRIENT_CONFIG.map((item) => ({
      ...item,
      value: Number(scan[item.key] || 0),
    })),
    nutrition: {
      calories: Number(scan.calories || 0),
      sugar: Number(scan.sugar || 0),
      carbohydrates: Number(scan.carbohydrates || 0),
      fat: Number(scan.fat || 0),
      sodium: Number(scan.sodium || 0),
    },
  };
};

export const toCommunityPostCard = (post, currentUserProfile) => ({
  id: post.id,
  content: post.content,
  createdAt: post.createdAt,
  timeLabel: formatPostTime(post.createdAt),
  likesCount: post._count?.likes ?? 0,
  commentsCount: post._count?.comments ?? 0,
  isOwnPost: post.user?.id === currentUserProfile?.id,
  author: {
    id: post.user?.id,
    name: post.user?.name || 'Member DiaBites',
    avatarUrl: buildAssetUrl(post.user?.profilePhoto),
    initials: getInitials(post.user?.name),
    diabetesTypeLabel:
      post.user?.id === currentUserProfile?.id
        ? formatDiabetesType(currentUserProfile?.diabetesType)
        : 'Member',
  },
});

export const toCommunityThread = (post, currentUserProfile) => ({
  ...toCommunityPostCard(post, currentUserProfile),
  comments: (post.comments || []).map((comment) => toCommentModel(comment, currentUserProfile)),
});
