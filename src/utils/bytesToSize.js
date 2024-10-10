// src/utils/bytesToSize.js

/**
 * Converts bytes to a human-readable string format.
 *
 * @param {number} bytes - The number of bytes.
 * @param {number} [decimals=2] - Number of decimal places to include.
 * @returns {string} - Human-readable string format of bytes.
 */
export default function bytesToSize(bytes, decimals = 2) {
  if (bytes === 0) return '0 Bytes';

  const k = 1024; // Kilobyte
  const dm = decimals < 0 ? 0 : decimals;

  // Array of size units
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

  // Calculate the index of the size unit
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  // Ensure the index is within the bounds of the sizes array
  const sizeIndex = i < sizes.length ? i : sizes.length - 1;

  // Calculate the size in the appropriate unit
  const size = parseFloat((bytes / Math.pow(k, sizeIndex)).toFixed(dm));
  const sizeName = sizes[sizeIndex];

  // Add '+' if the bytes exceed the largest unit
  const exceedsLargestUnit = i >= sizes.length;

  return `${size} ${sizeName}${exceedsLargestUnit ? '+' : ''}`;
}

/* 
    How to use:
    import bytesToSize from 'utils/bytesToSize';
    
    <Typography variant="subtitle2">{bytesToSize(file.size)}</Typography> 
  */
