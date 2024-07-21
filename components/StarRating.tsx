import { IoStarHalfSharp, IoStarOutline, IoStarSharp } from "react-icons/io5";

type StarRatingProps = {
  rating: number;
  size?: number;
};

export default function StarRating({ rating, size = 20 }: StarRatingProps) {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div className="flex items-center">
      {[...Array(fullStars)].map((_, i) => (
        <IoStarSharp
          key={`full-${i}`}
          size={size}
          className="text-yellow-400"
        />
      ))}
      {hasHalfStar && (
        <IoStarHalfSharp size={size} className="text-yellow-400" />
      )}
      {[...Array(emptyStars)].map((_, i) => (
        <IoStarOutline
          key={`empty-${i}`}
          size={size}
          className="text-yellow-400"
        />
      ))}
    </div>
  );;
}
