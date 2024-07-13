import "dotenv/config";
import db from "./db";
import { categories, products } from "./schema";
import { v4 as uuidv4 } from "uuid";

async function seed() {
  console.log("Seeding database...");

  // Seed Categories
  const categoryData = [
    {
      id: uuidv4(),
      name: "Smartwatches",
      description: "Wearable smart devices",
    },
    {
      id: uuidv4(),
      name: "TV & Home",
      description: "Smart TVs and home entertainment systems",
    },
    {
      id: uuidv4(),
      name: "Tablets",
      description: "Portable touchscreen computers",
    },
    {
      id: uuidv4(),
      name: "Phones",
      description: "Smartphones and mobile devices",
    },
    { id: uuidv4(), name: "Laptops", description: "Portable computers" },
    {
      id: uuidv4(),
      name: "Accessories",
      description: "Gadgets and add-ons for your devices",
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
      imageUrl: "https://example.com/apple-watch-series-8.jpg",
      specs: {
        display: "Always-On Retina LTPO OLED display",
        processor: "S8 SiP with 64-bit dual-core processor",
        storage: "32GB",
        waterResistant: "50 meters",
      },
    },
    {
      id: uuidv4(),
      name: "Samsung Galaxy Watch5",
      description: "Advanced sleep coaching. Enhanced GPS performance.",
      price: "279.99",
      stock: 75,
      categoryId: categoryData[0].id,
      brand: "Samsung",
      imageUrl: "https://example.com/samsung-galaxy-watch5.jpg",
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
      imageUrl: "https://example.com/lg-c2-oled-tv.jpg",
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
      imageUrl: "https://example.com/ipad-air-5th-gen.jpg",
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
      name: "iPhone 14 Pro",
      description: "Pro. Beyond.",
      price: "999.0",
      stock: 200,
      categoryId: categoryData[3].id,
      brand: "Apple",
      imageUrl: "https://example.com/iphone-14-pro.jpg",
      specs: {
        display: "6.1-inch Super Retina XDR display",
        chip: "A16 Bionic chip",
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
      imageUrl: "https://example.com/samsung-galaxy-s23-ultra.jpg",
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
      imageUrl: "https://example.com/macbook-air-m2.jpg",
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
      imageUrl: "https://example.com/airpods-pro-2nd-gen.jpg",
      specs: {
        chipset: "H2 chip",
        sweatAndWaterResistant: "Yes (IPX4)",
        chargingCase: "MagSafe Charging Case",
        batteryLife: "Up to 6 hours of listening time with ANC on",
      },
      stripeProductId: null,
      stripePriceId: null,
    },
  ];

  await db.insert(products).values(productData);
  console.log("Products seeded successfully");

  console.log("Database seeding completed");
}

seed().catch((e) => {
  console.error("Error seeding database:", e);
  process.exit(1);
});
