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

async function seed() {
  console.log("Seeding database...");

  // Clear existing data
  await db.delete(cartItems).execute();
  await db.delete(carts).execute();
  await db.delete(products).execute();
  await db.delete(categories).execute();
  await db.delete(reviews).execute();
  await db.delete(orderItems).execute();
  await db.delete(orders).execute();

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
  const productData = [
    // Smartwatches
    {
      id: uuidv4(),
      name: "Apple Watch Series 8",
      description: "Always-on Retina display. Advanced health features.",
      price: "399.0",
      stock: 100,
      categoryId: categoryData[0].id,
      brand: "Apple",
      imageUrl: "",
      specs: {
        display: "Always-On Retina LTPO OLED display",
        processor: "S8 SiP with 64-bit dual-core processor",
        storage: "32GB",
        waterResistant: "50 meters",
      },
    },
    {
      id: uuidv4(),
      name: "Samsung Galaxy Watch 5",
      description: "Advanced sleep coaching. Enhanced GPS performance.",
      price: "279.99",
      stock: 75,
      categoryId: categoryData[0].id,
      brand: "Samsung",
      imageUrl: "",
      specs: {
        display: "Super AMOLED",
        processor: "Exynos W920 Dual-Core 1.18GHz",
        storage: "16GB",
        waterResistant: "5ATM + IP68",
      },
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
      imageUrl: "",
      specs: {
        resolution: "4K Ultra HD (3840 x 2160)",
        hdrFormat: "Dolby Vision, HDR10, HLG",
        refreshRate: "120Hz",
        smartPlatform: "webOS",
      },
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
      imageUrl: "",
      specs: {
        display: "10.9-inch Liquid Retina display",
        chip: "M1 chip",
        storage: "64GB or 256GB",
        camera: "12MP Wide camera, 12MP Ultra Wide front camera",
      },
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
    },
    {
      id: uuidv4(),
      name: "Samsung Galaxy S23 Ultra",
      description: "The epic new Galaxy S23 Ultra",
      price: "1199.99",
      stock: 150,
      categoryId: categoryData[3].id,
      brand: "Samsung",
      imageUrl: "",
      specs: {
        display: '6.8" Edge Quad HD+ Dynamic AMOLED 2X Display',
        processor: "Snapdragon® 8 Gen 2 Mobile Platform",
        camera: "200MP Wide, 12MP Ultra-Wide, 10MP Telephoto, 10MP Telephoto",
        frontCamera: "12MP Front-Facing Camera",
      },
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
      imageUrl: "",
      specs: {
        display: "13.6-inch Liquid Retina display",
        chip: "Apple M2 chip",
        memory: "8GB unified memory",
        storage: "256GB SSD",
      },
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
      imageUrl: "",
      specs: {
        chipset: "H2 chip",
        sweatAndWaterResistant: "Yes (IPX4)",
        chargingCase: "MagSafe Charging Case",
        batteryLife: "Up to 6 hours of listening time with ANC on",
      },
      stripeProductId: "",
      stripePriceId: "",
    },
  ];

  // stripe data
  for (const product of productData) {
    // Create a product on Stripe
    const stripeProduct = await stripe.products.create({
      name: product.name,
      description: product.description,
    });

    // Create a price for the product on Stripe
    const stripePrice = await stripe.prices.create({
      unit_amount: parseFloat(product.price) * 100,
      currency: "gbp",
      product: stripeProduct.id,
    });

    // Update product data with Stripe IDs
    product.stripeProductId = stripeProduct.id;
    product.stripePriceId = stripePrice.id;
  }

  await db.insert(products).values(productData);
  console.log("Products seeded successfully");

  console.log("Database seeding completed");
}

seed().catch((e) => {
  console.error("Error seeding database:", e);
  process.exit(1);
});
