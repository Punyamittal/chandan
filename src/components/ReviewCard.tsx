import { motion } from "framer-motion";
import { Star, ThumbsUp, CheckCircle2 } from "lucide-react";
import { Badge } from "./ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { useState } from "react";

export interface ReviewCardProps {
  id: string;
  userName: string;
  userAvatar?: string;
  rating: number;
  date: string;
  title: string;
  review: string;
  productName: string;
  orderQuantity: number;
  verified: boolean;
  helpful: number;
  images?: string[];
}

const ReviewCard = ({
  userName,
  userAvatar,
  rating,
  date,
  title,
  review,
  productName,
  orderQuantity,
  verified,
  helpful,
  images = [],
}: ReviewCardProps) => {
  const [helpfulCount, setHelpfulCount] = useState(helpful);
  const [hasVoted, setHasVoted] = useState(false);

  const handleHelpful = () => {
    if (!hasVoted) {
      setHelpfulCount(helpfulCount + 1);
      setHasVoted(true);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-shadow duration-300"
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <Avatar className="w-12 h-12">
            <AvatarImage src={userAvatar} alt={userName} />
            <AvatarFallback className="bg-primary/10 text-primary font-semibold">
              {userName
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div>
            <div className="flex items-center gap-2">
              <h4 className="font-semibold">{userName}</h4>
              {verified && (
                <Badge
                  variant="secondary"
                  className="flex items-center gap-1 bg-green-100 text-green-700"
                >
                  <CheckCircle2 className="w-3 h-3" />
                  Verified
                </Badge>
              )}
            </div>
            <p className="text-xs text-muted-foreground">{date}</p>
          </div>
        </div>

        {/* Rating Stars */}
        <div className="flex items-center gap-1">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-4 h-4 ${
                i < rating
                  ? "fill-yellow-400 text-yellow-400"
                  : "text-muted-foreground"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Product Info */}
      <div className="mb-3 p-3 bg-muted/50 rounded-lg">
        <p className="text-sm">
          <span className="text-muted-foreground">Product: </span>
          <strong>{productName}</strong>
        </p>
        <p className="text-xs text-muted-foreground mt-1">
          Bulk Order: {orderQuantity.toLocaleString()} units
        </p>
      </div>

      {/* Review Title */}
      <h3 className="font-semibold text-lg mb-2">{title}</h3>

      {/* Review Text */}
      <p className="text-muted-foreground text-sm leading-relaxed mb-4">
        {review}
      </p>

      {/* Review Images */}
      {images.length > 0 && (
        <div className="flex gap-2 mb-4 overflow-x-auto">
          {images.map((img, idx) => (
            <motion.img
              key={idx}
              src={img}
              alt={`Review ${idx + 1}`}
              className="w-20 h-20 object-cover rounded-lg cursor-pointer"
              whileHover={{ scale: 1.1 }}
            />
          ))}
        </div>
      )}

      {/* Helpful Button */}
      <div className="flex items-center gap-4 pt-4 border-t border-border">
        <Button
          variant="ghost"
          size="sm"
          onClick={handleHelpful}
          disabled={hasVoted}
          className={hasVoted ? "text-primary" : ""}
        >
          <ThumbsUp className={`w-4 h-4 mr-2 ${hasVoted ? "fill-primary" : ""}`} />
          Helpful ({helpfulCount})
        </Button>
      </div>
    </motion.div>
  );
};

export default ReviewCard;

