// Menggunakan rumus Mifflin-St Jeor untuk BMR
export const calculateBMR = (weight, height, age, gender) => {
  if (!weight || !height || !age || !gender) return 0;
  
  // weight dalam kg, height dalam cm, age dalam tahun
  let bmr = (10 * weight) + (6.25 * height) - (5 * age);
  return gender === 'male' ? bmr + 5 : bmr - 161;
};

export const calculateTDEE = (bmr, activityLevel) => {
  const multipliers = {
    sedentary: 1.2,      // Jarang olahraga
    light: 1.375,        // Olahraga ringan 1-3 hari/minggu
    moderate: 1.55,      // Olahraga sedang 3-5 hari/minggu
    active: 1.725,       // Olahraga berat 6-7 hari/minggu
    very_active: 1.9     // Pekerjaan fisik berat / olahraga 2x sehari
  };
  return bmr * (multipliers[activityLevel] || 1.2);
};