import { getDefaultRecommendationReason, normalizeStatus } from './helpers';

const ACTIVITY_MULTIPLIER = {
  sedentary: 1.2,
  light: 1.375,
  moderate: 1.55,
  active: 1.725,
};

const FIXED_DAILY_SUGAR_G = 50;
const FIXED_DAILY_SODIUM_MG = 2300;

const AI_RECOMMENDATION_MAP = {
  Recommended: 'recommended',
  Caution: 'caution',
  'Not Recommended': 'not_recommended',
};

export const calculateBMR = (weight, height, age, gender) => {
  if (!weight || !height || !age || !gender) {
    return 0;
  }

  const base = (10 * Number(weight)) + (6.25 * Number(height)) - (5 * Number(age));
  return gender === 'male' ? base + 5 : base - 161;
};

export const calculateTDEE = (bmr, activityLevel) => {
  const multiplier = ACTIVITY_MULTIPLIER[activityLevel] || ACTIVITY_MULTIPLIER.sedentary;
  return Math.round(Number(bmr || 0) * multiplier);
};

export const calculateTDEEFromProfile = (healthProfile) => {
  if (!healthProfile) {
    return 0;
  }

  return calculateTDEE(
    calculateBMR(
      healthProfile.weight,
      healthProfile.height,
      healthProfile.age,
      healthProfile.gender,
    ),
    healthProfile.activityLevel,
  );
};

export const calculateDailyLimits = (tdee) => ({
  calories: tdee,
  sugar: FIXED_DAILY_SUGAR_G,
  carbohydrates: Math.round((tdee * 0.5) / 4),
  fat: Math.round((tdee * 0.3) / 9),
  sodium: FIXED_DAILY_SODIUM_MG,
});

export const getNutritionRecommendation = (nutrition, dailyLimits) => {
  const checks = [
    { key: 'calories', label: 'Kalori', tight: false },
    { key: 'sugar', label: 'Gula', tight: true },
    { key: 'carbohydrates', label: 'Karbohidrat', tight: false },
    { key: 'fat', label: 'Lemak', tight: false },
    { key: 'sodium', label: 'Natrium', tight: true },
  ];

  const violations = [];

  checks.forEach(({ key, label, tight }) => {
    const nutrientValue = Number(nutrition?.[key] || 0);
    const limitValue = Number(dailyLimits?.[key] || 0);

    if (!limitValue) {
      return;
    }

    const ratio = nutrientValue / limitValue;
    const highThreshold = tight ? 0.3 : 0.4;
    const cautionThreshold = tight ? 0.15 : 0.2;

    if (ratio > highThreshold) {
      violations.push({ level: 'not_recommended', label });
      return;
    }

    if (ratio > cautionThreshold) {
      violations.push({ level: 'caution', label });
    }
  });

  if (violations.some((item) => item.level === 'not_recommended')) {
    const flagged = violations
      .filter((item) => item.level === 'not_recommended')
      .map((item) => item.label)
      .join(', ');

    return {
      category: 'not_recommended',
      reason: `Kandungan ${flagged} terlalu tinggi untuk dikonsumsi oleh penderita diabetes.`,
    };
  }

  if (violations.some((item) => item.level === 'caution')) {
    const flagged = violations.map((item) => item.label).join(', ');
    return {
      category: 'caution',
      reason: `Perhatikan asupan ${flagged}. Konsumsi dalam jumlah terbatas.`,
    };
  }

  return {
    category: 'recommended',
    reason: 'Kandungan nutrisi sesuai untuk dikonsumsi oleh penderita diabetes.',
  };
};

export const resolveScanRecommendation = ({
  healthProfile,
  recommendation,
  category,
  categoryReason,
  nutrition,
}) => {
  const normalizedCategory = normalizeStatus(category);

  if (normalizedCategory) {
    return {
      category: normalizedCategory.replace(/ /g, '_'),
      reason: categoryReason || getDefaultRecommendationReason(normalizedCategory),
    };
  }

  if (recommendation && AI_RECOMMENDATION_MAP[recommendation]) {
    const aiCategory = AI_RECOMMENDATION_MAP[recommendation];
    return {
      category: aiCategory,
      reason: getDefaultRecommendationReason(aiCategory),
    };
  }

  if (healthProfile) {
    const limits = calculateDailyLimits(calculateTDEEFromProfile(healthProfile));
    return getNutritionRecommendation(nutrition, limits);
  }

  return {
    category: 'caution',
    reason: getDefaultRecommendationReason('caution'),
  };
};
