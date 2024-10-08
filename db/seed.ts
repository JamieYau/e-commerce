import "dotenv/config";
import db from "./db";
import {
  cartItems,
  carts,
  categories,
  orderItems,
  orders,
  products,
  reviews,
} from "./schema";
import { v4 as uuidv4 } from "uuid";
import { stripe } from "@/lib/stripe";
import { Product } from "@/types/db";

async function seed() {
  console.log("Seeding database...");

  // Clear existing data
  await db.delete(cartItems).execute();
  await db.delete(carts).execute();
  await db.delete(orderItems).execute();
  await db.delete(orders).execute();
  await db.delete(products).execute();
  await db.delete(categories).execute();
  await db.delete(reviews).execute();

  // Seed Categories
  const categoryData = [
    {
      id: uuidv4(),
      name: "Smartwatches",
      description: "Wearable smart devices",
      imageUrl: "/images/categories/smartwatches.jpg",
    },
    {
      id: uuidv4(),
      name: "TV & Home",
      description: "Smart TVs and home entertainment systems",
      imageUrl: "/images/categories/tv.jpg",
    },
    {
      id: uuidv4(),
      name: "Tablets",
      description: "Portable touchscreen computers",
      imageUrl: "/images/categories/tablets.jpg",
    },
    {
      id: uuidv4(),
      name: "Phones",
      description: "Smartphones and mobile devices",
      imageUrl: "/images/products/iphone-15-pro.png",
    },
    {
      id: uuidv4(),
      name: "Laptops",
      description: "Portable computers",
      imageUrl: "/images/categories/laptops.jpg",
    },
    {
      id: uuidv4(),
      name: "Accessories",
      description: "Gadgets and add-ons for your devices",
      imageUrl: "/images/categories/accessories.jpg",
    },
  ];

  await db.insert(categories).values(categoryData);
  console.log("Categories seeded successfully");

  // Seed Products
  const productData: Product[] = [
    // Smartwatches
    {
      id: uuidv4(),
      name: "Apple Watch Series 8",
      description: "Always-on Retina display. Advanced health features.",
      price: "399.0",
      stock: 100,
      categoryId: categoryData[0].id,
      brand: "Apple",
      imageUrl: "/images/products/apple-watch.jpg",
      specs: {
        display: "Always-On Retina LTPO OLED display",
        processor: "S8 SiP with 64-bit dual-core processor",
        storage: "32GB",
        waterResistant: "50 meters",
      },
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: uuidv4(),
      name: "Samsung Galaxy Watch 5",
      description: "Advanced sleep coaching. Enhanced GPS performance.",
      price: "279.99",
      stock: 75,
      categoryId: categoryData[0].id,
      brand: "Samsung",
      imageUrl: "/images/products/smartwatch.jpg",
      specs: {
        display: "Super AMOLED",
        processor: "Exynos W920 Dual-Core 1.18GHz",
        storage: "16GB",
        waterResistant: "5ATM + IP68",
      },
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    // TV & Home
    {
      id: uuidv4(),
      name: "LG C2 65-Inch OLED TV",
      description: "4K Smart OLED TV with AI ThinQ",
      price: "1796.99",
      stock: 50,
      categoryId: categoryData[1].id,
      brand: "LG",
      imageUrl: "/images/products/tv_mockup.jpg",
      specs: {
        resolution: "4K Ultra HD (3840 x 2160)",
        hdrFormat: "Dolby Vision, HDR10, HLG",
        refreshRate: "120Hz",
        smartPlatform: "webOS",
      },
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: uuidv4(),
      name: "Samsung Odyssey G9",
      description: "49” Dual QHD Curved Gaming Monitor",
      price: "1499.99",
      stock: 50,
      categoryId: categoryData[1].id,
      brand: "Samsung",
      imageUrl: "/images/products/samsung-g9.jpg",
      specs: {
        resolution: "5120 x 1440",
        refreshRate: "240Hz",
        curvature: "1000R",
        panelType: "VA",
      },
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    // Tablets
    {
      id: uuidv4(),
      name: "iPad Air (5th generation)",
      description: "Powerful. Colorful. Wonderful.",
      price: "599.0",
      stock: 120,
      categoryId: categoryData[2].id,
      brand: "Apple",
      imageUrl: "/images/products/ipad-air.jpg",
      specs: {
        display: "10.9-inch Liquid Retina display",
        chip: "M1 chip",
        storage: "64GB or 256GB",
        camera: "12MP Wide camera, 12MP Ultra Wide front camera",
      },
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    // Phones
    {
      id: uuidv4(),
      name: "iPhone 15 Pro",
      description: "Pro. Beyond.",
      price: "999.0",
      stock: 200,
      categoryId: categoryData[3].id,
      brand: "Apple",
      imageUrl: "/images/products/iphone-15-pro.png",
      specs: {
        display: "6.1-inch Super Retina XDR display",
        chip: "A17 Pro chip",
        camera:
          "Pro camera system (48MP Main, 12MP Ultra Wide, 12MP Telephoto)",
        frontCamera: "12MP TrueDepth front camera",
      },
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: uuidv4(),
      name: "Samsung Galaxy S23 Ultra",
      description: "The epic new Galaxy S23 Ultra",
      price: "1199.99",
      stock: 150,
      categoryId: categoryData[3].id,
      brand: "Samsung",
      imageUrl: "/images/products/samsung-galaxy-s24.jpg",
      specs: {
        display: '6.8" Edge Quad HD+ Dynamic AMOLED 2X Display',
        processor: "Snapdragon® 8 Gen 2 Mobile Platform",
        camera: "200MP Wide, 12MP Ultra-Wide, 10MP Telephoto, 10MP Telephoto",
        frontCamera: "12MP Front-Facing Camera",
      },
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    // Laptops
    {
      id: uuidv4(),
      name: "MacBook Air (M2)",
      description: "Supercharged by M2",
      price: "1199.0",
      stock: 80,
      categoryId: categoryData[4].id,
      brand: "Apple",
      imageUrl: "/images/products/macbook.jpg",
      specs: {
        display: "13.6-inch Liquid Retina display",
        chip: "Apple M2 chip",
        memory: "8GB unified memory",
        storage: "256GB SSD",
      },
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    // Accessories
    {
      id: uuidv4(),
      name: "AirPods Pro (2nd generation)",
      description: "Up to 2x more Active Noise Cancellation",
      price: "249.0",
      stock: 300,
      categoryId: categoryData[5].id,
      brand: "Apple",
      imageUrl: "/images/products/airpods-pro.jpg",
      specs: {
        chipset: "H2 chip",
        sweatAndWaterResistant: "Yes (IPX4)",
        chargingCase: "MagSafe Charging Case",
        batteryLife: "Up to 6 hours of listening time with ANC on",
      },
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: uuidv4(),
      name: "Apple AirPods (3rd generation)",
      description: "Personalized Spatial Audio with dynamic head tracking.",
      price: "179.0",
      stock: 250,
      categoryId: categoryData[5].id,
      brand: "Apple",
      imageUrl: "/images/products/airpods-3.jpg",
      specs: {
        chipset: "H1 chip",
        sweatAndWaterResistant: "Yes (IPX4)",
        batteryLife: "Up to 6 hours of listening time",
      },
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: uuidv4(),
      name: "Apple AirPods Max",
      description: "Over-ear headphones with Active Noise Cancellation.",
      price: "549.0",
      stock: 200,
      categoryId: categoryData[5].id,
      brand: "Apple",
      imageUrl: "/images/products/airpods-max.jpg",
      specs: {
        chipset: "H1 chip",
        activeNoiseCancellation: "Yes",
        batteryLife: "Up to 20 hours of listening time",
      },
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];

  await db.insert(products).values(productData);
  console.log("Products seeded successfully");

  // Seed Reviews
  // Existing User IDs in database
  const userIds = [
    "7de26ba2-eefe-4e7f-b5bc-1c67b8b43ead",
    "f6bef38d-72ef-4614-aabf-0e84a6baf800",
  ];
  const reviewData = [];
  const possibleComments = [
    "Great product! Highly recommend.",
    "Not what I expected.",
    "Would buy again!",
    "Average quality, but worth the price.",
    "Exceeded my expectations.",
    "Terrible, don't waste your money.",
    "Love it, use it every day!",
    "Solid product, would recommend to a friend.",
    "The product arrived on time and works perfectly.",
    "Good value for money.",
  ];

  for (const product of productData) {
    const numberOfReviews = Math.floor(Math.random() * 5) + 1; // 1 to 5 reviews per product
    for (let i = 0; i < numberOfReviews; i++) {
      const randomRating = Math.floor(Math.random() * 5) + 1; // 1 to 5 rating
      const randomComment =
        possibleComments[Math.floor(Math.random() * possibleComments.length)];
      const randomUserId = userIds[Math.floor(Math.random() * userIds.length)]; // Pick one of the existing user IDs

      reviewData.push({
        id: uuidv4(),
        productId: product.id,
        userId: randomUserId, // Use one of the existing user IDs
        rating: randomRating,
        comment: randomComment,
        createdAt: new Date(),
      });
    }
  }

  await db.insert(reviews).values(reviewData);
  console.log("Reviews seeded successfully");

  console.log("Database seeding completed");
}

seed().catch((e) => {
  console.error("Error seeding database:", e);
  process.exit(1);
});
