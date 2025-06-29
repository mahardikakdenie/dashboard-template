export const formattedCapitalize = (text: any): string => {
  if (!text || typeof text !== 'string') return '';

  // Trim whitespace, lowercase semua, lalu ubah huruf pertama setiap kata jadi kapital
  return text
    .trim()
    .toLowerCase()
    .split('-')
    .filter(word => word) // filter string kosong jika ada spasi berlebih
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};
