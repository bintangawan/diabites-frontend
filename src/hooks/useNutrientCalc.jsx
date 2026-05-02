import { useMemo } from 'react';

export const useNutrientCalc = (extractedData, consumedPortion) => {
  return useMemo(() => {
    if (!extractedData || !consumedPortion) return extractedData;

    // Menghitung rasio konsumsi terhadap serving size acuan
    const ratio = consumedPortion / extractedData.servingSize;

    return {
      ...extractedData,
      actualCalories: extractedData.calories * ratio,
      actualSugar: extractedData.sugar * ratio,
      actualCarbs: extractedData.carbs * ratio,
      actualFat: extractedData.fat * ratio,
      actualSodium: extractedData.sodium * ratio,
    };
  }, [extractedData, consumedPortion]);
};