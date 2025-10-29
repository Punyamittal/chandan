import { motion } from "framer-motion";
import { ArrowRight, Percent, TrendingUp } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Link } from "react-router-dom";

interface DealCardProps {
  title: string;
  image: string;
  discount: string;
  minQuantity: string;
  description: string;
  tag?: string;
}

const DealCard = ({
  title,
  image,
  discount,
  minQuantity,
  description,
  tag,
}: DealCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -12, transition: { duration: 0.3 } }}
      className="group relative overflow-hidden rounded-2xl cursor-pointer"
    >
      {/* Image */}
      <div className="relative h-80 overflow-hidden">
        <motion.img
          src={image}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        {/* Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
        
        {/* Tag */}
        {tag && (
          <motion.div
            initial={{ scale: 0, rotate: -45 }}
            whileInView={{ scale: 1, rotate: 0 }}
            className="absolute top-4 right-4"
          >
            <Badge className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-3 py-1 flex items-center gap-1">
              <TrendingUp className="w-3 h-3" />
              {tag}
            </Badge>
          </motion.div>
        )}
        
        {/* Content */}
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h3 className="text-2xl font-heading font-bold mb-2">{title}</h3>
            <p className="text-sm text-white/80 mb-4 line-clamp-2">
              {description}
            </p>
          </motion.div>
          
          {/* Discount Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="flex items-center gap-4 mb-4"
          >
            <div className="flex items-center gap-2 bg-white/20 backdrop-blur-md rounded-full px-4 py-2">
              <Percent className="w-4 h-4" />
              <span className="font-bold">{discount} OFF</span>
            </div>
            <span className="text-sm text-white/70">
              Min. {minQuantity} units
            </span>
          </motion.div>
          
          {/* CTA */}
          <motion.div
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          >
            <Button
              variant="secondary"
              className="w-full group/btn"
            >
              <span>View Deal</span>
              <motion.div
                initial={{ x: 0 }}
                whileHover={{ x: 5 }}
                transition={{ duration: 0.2 }}
              >
                <ArrowRight className="w-4 h-4 ml-2" />
              </motion.div>
            </Button>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

const FeaturedBulkDeals = () => {
  const deals = [
    {
      title: "Business Cards Mega Pack",
      image:
        "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?q=80&w=2940&auto=format&fit=crop",
      discount: "35%",
      minQuantity: "1000",
      description:
        "Premium business cards with custom designs. Multiple finish options available.",
      tag: "Hot Deal",
    },
    {
      title: "Corporate Letterhead Bundle",
      image:
        "https://images.unsplash.com/photo-1586075010923-2dd4570fb338?q=80&w=2787&auto=format&fit=crop",
      discount: "40%",
      minQuantity: "500",
      description:
        "Professional letterheads on high-quality paper. Custom branding included.",
      tag: "Best Seller",
    },
    {
      title: "Custom Diary Collection",
      image:
        "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=2874&auto=format&fit=crop",
      discount: "30%",
      minQuantity: "200",
      description:
        "Customized diaries and notebooks perfect for corporate gifting.",
    },
  ];

  return (
    <section className="py-24 bg-muted/30">
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
              🎯 Featured Bulk Deals
            </Badge>
          </motion.div>
          <h2 className="text-4xl md:text-6xl font-heading font-bold mb-4">
            Exclusive Bulk Discounts
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Save more when you order in bulk. Limited time offers on premium
            printing products.
          </p>
        </motion.div>

        {/* Deals Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {deals.map((deal, index) => (
            <DealCard key={index} {...deal} />
          ))}
        </div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Link to="/bulk-deals">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button size="lg" variant="outline" className="group">
                Explore All Deals
                <motion.div
                  initial={{ x: 0 }}
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <ArrowRight className="w-4 h-4 ml-2" />
                </motion.div>
              </Button>
            </motion.div>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedBulkDeals;

