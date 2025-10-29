import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import ReviewCard, { ReviewCardProps } from "./ReviewCard";
import TrustBadge from "./TrustBadge";
import { Badge } from "./ui/badge";

const ReviewsSection = () => {
  const reviews: ReviewCardProps[] = [
    {
      id: "1",
      userName: "Rajesh Kumar",
      userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Rajesh",
      rating: 5,
      date: "2 weeks ago",
      title: "Excellent Quality and Fast Delivery",
      review:
        "Ordered 5000 business cards for our company. The quality exceeded our expectations and delivery was prompt. The bulk discount made it very cost-effective. Highly recommend for bulk orders!",
      productName: "Premium Business Cards",
      orderQuantity: 5000,
      verified: true,
      helpful: 24,
      images: [
        "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=400",
      ],
    },
    {
      id: "2",
      userName: "Priya Sharma",
      userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Priya",
      rating: 5,
      date: "1 month ago",
      title: "Perfect for Corporate Gifting",
      review:
        "We ordered 1000 customized diaries for employee gifts. The customization was perfect, and the pricing for bulk was unbeatable. Professional service throughout!",
      productName: "Corporate Diaries",
      orderQuantity: 1000,
      verified: true,
      helpful: 18,
    },
    {
      id: "3",
      userName: "Amit Patel",
      userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Amit",
      rating: 4,
      date: "3 weeks ago",
      title: "Great Value for Money",
      review:
        "Bulk order of letterheads arrived in excellent condition. Quality is top-notch and the bulk pricing saved us a lot. Minor delay in delivery but overall satisfied.",
      productName: "Letterheads Premium",
      orderQuantity: 2500,
      verified: true,
      helpful: 15,
      images: [
        "https://images.unsplash.com/photo-1586075010923-2dd4570fb338?w=400",
        "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=400",
      ],
    },
  ];

  const trustBadges = [
    {
      type: "verified" as const,
      label: "Verified Supplier",
      description: "All products quality checked and certified",
    },
    {
      type: "fast-delivery" as const,
      label: "Fast Delivery",
      description: "Express shipping available for bulk orders",
    },
    {
      type: "quality" as const,
      label: "Premium Quality",
      description: "Industry-leading quality standards",
    },
    {
      type: "bulk-discount" as const,
      label: "Bulk Discounts",
      description: "Save up to 40% on large orders",
    },
  ];

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="inline-block mb-4"
          >
            <Badge variant="secondary" className="text-sm px-4 py-2">
              ⭐ Customer Reviews
            </Badge>
          </motion.div>
          <h2 className="text-4xl md:text-6xl font-heading font-bold mb-4">
            Trusted by Businesses
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            See what our customers say about their bulk orders
          </p>

          {/* Overall Rating */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-6 bg-muted/50 rounded-2xl p-6"
          >
            <div className="text-center">
              <div className="text-5xl font-bold mb-2">4.9</div>
              <div className="flex gap-1 mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>
              <div className="text-sm text-muted-foreground">
                Based on 1,234 reviews
              </div>
            </div>
            <div className="h-20 w-px bg-border" />
            <div className="space-y-2">
              {[5, 4, 3, 2, 1].map((rating) => (
                <div key={rating} className="flex items-center gap-3">
                  <span className="text-sm w-8">{rating}★</span>
                  <div className="w-32 h-2 bg-muted rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{
                        width:
                          rating === 5
                            ? "85%"
                            : rating === 4
                            ? "10%"
                            : rating === 3
                            ? "3%"
                            : "1%",
                      }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.2 }}
                      className="h-full bg-yellow-400"
                    />
                  </div>
                  <span className="text-xs text-muted-foreground w-12">
                    {rating === 5
                      ? "1048"
                      : rating === 4
                      ? "123"
                      : rating === 3
                      ? "37"
                      : "13"}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* Trust Badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-16"
        >
          {trustBadges.map((badge, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <TrustBadge {...badge} variant="detailed" />
            </motion.div>
          ))}
        </motion.div>

        {/* Featured Quote */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative bg-gradient-to-br from-primary/10 via-purple-500/10 to-pink-500/10 rounded-3xl p-12 mb-16 overflow-hidden"
        >
          <Quote className="absolute top-8 left-8 w-16 h-16 text-primary/20" />
          <Quote className="absolute bottom-8 right-8 w-16 h-16 text-primary/20 rotate-180" />
          <div className="relative z-10 text-center max-w-3xl mx-auto">
            <p className="text-2xl md:text-3xl font-heading font-semibold mb-6 leading-relaxed">
              "Switching to bulk orders saved our company over 35% annually.
              The quality and service are consistently excellent!"
            </p>
            <div className="flex items-center justify-center gap-4">
              <img
                src="https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah"
                alt="Sarah"
                className="w-16 h-16 rounded-full border-4 border-white shadow-lg"
              />
              <div className="text-left">
                <p className="font-bold">Sarah Johnson</p>
                <p className="text-sm text-muted-foreground">
                  Procurement Manager, Tech Solutions Inc.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {reviews.map((review, index) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <ReviewCard {...review} />
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <p className="text-muted-foreground mb-4">
            Join 1000+ satisfied customers who trust us for bulk orders
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default ReviewsSection;

