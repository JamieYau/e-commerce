import { getReviews } from "@/actions/reviewActions";
import { Product } from "@/types/db";
import { Avatar } from "./ui/avatar";
import StarRating from "./StarRating";

type ReviewProps = {
  product: Product;
};

export default async function Reviews({ product }: ReviewProps) {
  const { reviews, totalCount, avgRating } = await getReviews(product.id);
  return (
    <section className="my-8">
      <h2 className="mb-2 text-2xl font-bold">Customer Reviews</h2>
      <div className="mb-1 flex gap-2">
        <StarRating rating={avgRating} size={20} />
        <span>{avgRating.toFixed(1)} out of 5</span>
      </div>
      <span className="text-sm text-muted-foreground">
        {totalCount} ratings
      </span>
      <ul className="mt-8">
        {reviews.map((review) => (
          <li key={review.id} className="border-b pb-4">
            <div className="mb-2 flex items-center">
              <Avatar className="mr-3 h-4 w-4" />
              <div>
                <p className="font-semibold">
                  {review.user?.name || "Anonymous"}
                </p>
                <StarRating rating={review.rating} />
              </div>
            </div>
            <p className="mb-2 text-sm text-muted-foreground">
              {new Date(review.createdAt).toLocaleDateString()}
            </p>
            <p className="">{review.comment}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
