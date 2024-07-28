// src/utils/wishlistUtils.js
import { db } from '../firebaseConfig';

export const fetchWishlist = async (userId) => {
  try {
    const wishlistRef = db.ref(`wishlists/${userId}`);
    const snapshot = await wishlistRef.once('value');
    const wishlist = snapshot.val();
    return wishlist || [];
  } catch (error) {
    console.error('Error fetching wishlist:', error);
    return [];
  }
};
