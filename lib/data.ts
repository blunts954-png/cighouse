export type ProductCard = {
  id: string;
  title: string;
  category: string;
  priceBand: string;
  description: string;
  image: string;
  badge: string;
};

export type GalleryImage = {
  src: string;
  alt: string;
  caption: string;
};

export const productCards: ProductCard[] = [
  {
    id: "vape-disposables",
    title: "Vapes and Disposables",
    category: "Fresh Stock",
    priceBand: "$",
    description:
      "Fast-moving flavors, trusted hardware, and updated inventory so regulars can grab favorites without extra stops.",
    image: "/images/yelp-1.jpg",
    badge: "Top Seller"
  },
  {
    id: "glass-rigs",
    title: "Glass and Rigs",
    category: "Premium Shelves",
    priceBand: "$$",
    description:
      "From daily-driver pieces to statement glass, displayed cleanly and backed by staff that can guide the fit.",
    image: "/images/yelp-2.jpg",
    badge: "Hot Drop"
  },
  {
    id: "hookah-shisha",
    title: "Hookah and Shisha",
    category: "Session Ready",
    priceBand: "$$",
    description:
      "Bowls, hoses, charcoal, and flavor picks built for quick restocks and late-night group sessions.",
    image: "/images/yelp-6.jpg",
    badge: "Night Run"
  },
  {
    id: "tobacco-wraps",
    title: "Tobacco, Wraps and Papers",
    category: "Classic Core",
    priceBand: "$",
    description:
      "Cigars, cartons, wraps, cones, and rolling staples in one aisle for smooth in-and-out pickup.",
    image: "/images/yelp-4.jpg",
    badge: "Always Stocked"
  }
];

export const deals = [
  {
    title: "Text Club Deals",
    description:
      "Join the local list for weekly codes, fresh arrivals, and after-work promotions.",
    action: "Text CLUB to (661) 829-5627"
  },
  {
    title: "Disposable Loyalty",
    description:
      "Simple repeat-buyer program idea: buy 10 disposables and unlock one on the house.",
    action: "Ask at checkout"
  },
  {
    title: "Glass Hour",
    description:
      "Promo window blueprint: Tuesday 6 PM to 9 PM with a rotating glass discount.",
    action: "In-store only"
  }
];

export const galleryImages: GalleryImage[] = [
  {
    src: "/images/yelp-1.jpg",
    alt: "Cigarette House product wall",
    caption: "Disposable vape section"
  },
  {
    src: "/images/yelp-2.jpg",
    alt: "Cigarette House interior displays",
    caption: "Wall of glass"
  },
  {
    src: "/images/yelp-3.jpg",
    alt: "Cigarette House counter and products",
    caption: "Counter setup"
  },
  {
    src: "/images/yelp-4.jpg",
    alt: "Cigarette House accessories shelf",
    caption: "Accessories and wraps"
  },
  {
    src: "/images/yelp-5.jpg",
    alt: "Cigarette House hookah related supplies",
    caption: "Hookah and charcoal"
  },
  {
    src: "/images/yelp-6.jpg",
    alt: "Cigarette House stocked interior",
    caption: "Late-night inventory"
  }
];
