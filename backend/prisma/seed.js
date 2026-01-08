import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Create vendors
  const vendors = await prisma.vendor.createMany({
    data: [
      {
        name: "Mama T's Kitchen",
        hall: 'Canteen',
        contact: '08012345678',
        imageUrl: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c',
      },
      {
        name: 'Babcock Buns',
        hall: 'Vendome',
        contact: '08087654321',
        imageUrl: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587',
      },
      {
        name: 'Spicy Spot',
        hall: 'East Campus',
        contact: '08098765432',
        imageUrl: 'https://images.unsplash.com/photo-1555939594-58d7cb561551',
      },
      {
        name: 'Pasta Paradise',
        hall: 'Canteen',
        contact: '08011223344',
        imageUrl: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9',
      },
      {
        name: 'Burger Haven',
        hall: 'Vendome',
        contact: '08055667788',
        imageUrl: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd',
      },
      {
        name: 'Fresh Bowl',
        hall: 'East Campus',
        contact: '08099887766',
        imageUrl: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c',
      },
    ],
    skipDuplicates: true,
  });

  console.log(`✅ Created ${vendors.count} vendors`);

  // Get vendors to add menu items
  const vendorList = await prisma.vendor.findMany();

  // Create menu items for each vendor
  for (const vendor of vendorList) {
    let menuItems = [];

    if (vendor.name === "Mama T's Kitchen") {
      menuItems = [
        {
          vendorId: vendor.id,
          name: 'Jollof Rice & Chicken',
          description: 'Delicious jollof with grilled chicken',
          price: 2500,
          category: 'Main Courses',
          imageUrl: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c',
        },
        {
          vendorId: vendor.id,
          name: 'Fried Rice & Beef',
          description: 'Tasty fried rice with tender beef',
          price: 2300,
          category: 'Main Courses',
          imageUrl: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c',
        },
        {
          vendorId: vendor.id,
          name: 'Beans & Plantain',
          description: 'Nigerian classic beans with fried plantain',
          price: 1800,
          category: 'Sides',
          imageUrl: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe',
        },
      ];
    } else if (vendor.name === 'Babcock Buns') {
      menuItems = [
        {
          vendorId: vendor.id,
          name: 'Meat Pie',
          description: 'Crispy meat pie with savory filling',
          price: 800,
          category: 'Pastries',
          imageUrl: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587',
        },
        {
          vendorId: vendor.id,
          name: 'Cream Puff',
          description: 'Soft pastry with cream filling',
          price: 600,
          category: 'Pastries',
          imageUrl: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587',
        },
        {
          vendorId: vendor.id,
          name: 'Sausage Roll',
          description: 'Golden sausage wrapped in pastry',
          price: 700,
          category: 'Pastries',
          imageUrl: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587',
        },
      ];
    } else if (vendor.name === 'Spicy Spot') {
      menuItems = [
        {
          vendorId: vendor.id,
          name: 'Spicy Pepper Soup',
          description: 'Hot and flavorful pepper soup',
          price: 1500,
          category: 'Soups',
          imageUrl: 'https://images.unsplash.com/photo-1555939594-58d7cb561551',
        },
        {
          vendorId: vendor.id,
          name: 'Hot Wings',
          description: 'Crispy wings with spicy seasoning',
          price: 2000,
          category: 'Mains',
          imageUrl: 'https://images.unsplash.com/photo-1555939594-58d7cb561551',
        },
        {
          vendorId: vendor.id,
          name: 'Spicy Noodles',
          description: 'Instant noodles with extra spice',
          price: 1000,
          category: 'Quick Bites',
          imageUrl: 'https://images.unsplash.com/photo-1555939594-58d7cb561551',
        },
      ];
    } else if (vendor.name === 'Pasta Paradise') {
      menuItems = [
        {
          vendorId: vendor.id,
          name: 'Spaghetti Carbonara',
          description: 'Creamy carbonara with bacon',
          price: 2800,
          category: 'Pasta',
          imageUrl: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9',
        },
        {
          vendorId: vendor.id,
          name: 'Penne Arrabbiata',
          description: 'Penne in spicy tomato sauce',
          price: 2600,
          category: 'Pasta',
          imageUrl: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9',
        },
        {
          vendorId: vendor.id,
          name: 'Lasagna',
          description: 'Layered pasta with meat sauce',
          price: 3000,
          category: 'Pasta',
          imageUrl: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9',
        },
      ];
    } else if (vendor.name === 'Burger Haven') {
      menuItems = [
        {
          vendorId: vendor.id,
          name: 'Classic Burger',
          description: 'Beef patty with lettuce and tomato',
          price: 2000,
          category: 'Burgers',
          imageUrl: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd',
        },
        {
          vendorId: vendor.id,
          name: 'Chicken Burger',
          description: 'Crispy chicken patty burger',
          price: 1800,
          category: 'Burgers',
          imageUrl: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd',
        },
        {
          vendorId: vendor.id,
          name: 'Fries & Drink Combo',
          description: 'Golden fries with your choice of drink',
          price: 1500,
          category: 'Combos',
          imageUrl: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd',
        },
      ];
    } else if (vendor.name === 'Fresh Bowl') {
      menuItems = [
        {
          vendorId: vendor.id,
          name: 'Greek Salad',
          description: 'Fresh vegetables with feta cheese',
          price: 2200,
          category: 'Salads',
          imageUrl: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c',
        },
        {
          vendorId: vendor.id,
          name: 'Smoothie Bowl',
          description: 'Açai bowl with fresh fruits',
          price: 1800,
          category: 'Breakfast',
          imageUrl: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c',
        },
        {
          vendorId: vendor.id,
          name: 'Detox Juice',
          description: 'Fresh pressed detox juice',
          price: 1200,
          category: 'Beverages',
          imageUrl: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c',
        },
      ];
    }

    if (menuItems.length > 0) {
      await prisma.menuItem.createMany({
        data: menuItems,
        skipDuplicates: true,
      });
    }
  }

  console.log('✅ Created menu items for all vendors');
  console.log('🎉 Database seeding completed!');
}

main()
  .catch(e => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
