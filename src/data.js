export const initialMenu = [
  // Fast Food
  {id:1,code:'FF-001',name:'Regular Burger',category:'Fast Food',price:150,available:true,description:'Classic beef patty with lettuce and mayo'},
  {id:2,code:'FF-002',name:'Zinger Burger',category:'Fast Food',price:280,available:true,description:'Crispy chicken fillet with spicy sauce'},

  // Tea
  {id:3,code:'TEA-001',name:'Doodh Patti',category:'Tea',price:60,available:true,description:'Strong tea made with pure milk'},
  {id:4,code:'TEA-002',name:'Adrak wali Chai',category:'Tea',price:70,available:true,description:'Tea infused with fresh ginger'},
  {id:5,code:'TEA-003',name:'Ilaichi wali Chai',category:'Tea',price:80,available:true,description:'Tea infused with aromatic cardamom'},

  // Drinks - Coca Cola
  {id:6,code:'DRK-CC-R',name:'Coca Cola - Regular',category:'Drinks',brand:'Coca Cola',price:50,available:true,description:'250ml chilled bottle'},
  {id:7,code:'DRK-CC-H',name:'Coca Cola - 0.5L',category:'Drinks',brand:'Coca Cola',price:90,available:true,description:'500ml chilled bottle'},
  {id:8,code:'DRK-CC-F',name:'Coca Cola - 1.5L',category:'Drinks',brand:'Coca Cola',price:180,available:true,description:'1.5 Liter family pack'},

  // Drinks - Sprite
  {id:9,code:'DRK-SP-R',name:'Sprite - Regular',category:'Drinks',brand:'Sprite',price:50,available:true,description:'250ml chilled bottle'},
  {id:10,code:'DRK-SP-H',name:'Sprite - 0.5L',category:'Drinks',brand:'Sprite',price:90,available:true,description:'500ml chilled bottle'},
  {id:11,code:'DRK-SP-F',name:'Sprite - 1.5L',category:'Drinks',brand:'Sprite',price:180,available:true,description:'1.5 Liter family pack'},

  // Drinks - Dew
  {id:12,code:'DRK-DW-R',name:'Mountain Dew - Regular',category:'Drinks',brand:'Mountain Dew',price:50,available:true,description:'250ml chilled bottle'},
  {id:13,code:'DRK-DW-H',name:'Mountain Dew - 0.5L',category:'Drinks',brand:'Mountain Dew',price:90,available:true,description:'500ml chilled bottle'},
  {id:14,code:'DRK-DW-F',name:'Mountain Dew - 1.5L',category:'Drinks',brand:'Mountain Dew',price:180,available:true,description:'1.5 Liter family pack'},

  // Drinks - Pepsi
  {id:15,code:'DRK-PS-R',name:'Pepsi - Regular',category:'Drinks',brand:'Pepsi',price:50,available:true,description:'250ml chilled bottle'},
  {id:16,code:'DRK-PS-H',name:'Pepsi - 0.5L',category:'Drinks',brand:'Pepsi',price:90,available:true,description:'500ml chilled bottle'},
  {id:17,code:'DRK-PS-F',name:'Pepsi - 1.5L',category:'Drinks',brand:'Pepsi',price:180,available:true,description:'1.5 Liter family pack'},

  // Fries
  {id:18,code:'FRY-001',name:'Plain Fries',category:'Fries',price:100,available:true,description:'Crispy salted potato fries'},
  {id:19,code:'FRY-002',name:'Masala Fries',category:'Fries',price:120,available:true,description:'Spicy peri-peri seasoned fries'},
  {id:20,code:'FRY-003',name:'Cheese Fries',category:'Fries',price:180,available:true,description:'Fries topped with melted cheddar cheese'}
];

export const initialOrders = [
  {id:'#1048',type:'Dine-in',label:'Table 05',items:[{menuId:3,qty:2},{menuId:1,qty:1}],status:'Preparing',time:'12:42 PM',paid:false},
  {id:'#1047',type:'Takeout',label:'Counter',items:[{menuId:4,qty:1},{menuId:8,qty:1}],status:'Ready',time:'12:35 PM',paid:false},
  {id:'#1046',type:'Dine-in',label:'Table 02',items:[{menuId:5,qty:2}],status:'Completed',time:'12:18 PM',paid:true}
];

export const initialInventory = [
  {id:1,name:'Tea Leaves (Tapal)',category:'Dry goods',unit:'kg',onHand:10,reorder:5,cost:1200},
  {id:2,name:'Milk',category:'Produce',unit:'liters',onHand:50,reorder:20,cost:180},
  {id:3,name:'Sugar',category:'Dry goods',unit:'kg',onHand:25,reorder:10,cost:140},
  {id:4,name:'Ginger',category:'Produce',unit:'kg',onHand:2,reorder:1,cost:400},
  {id:5,name:'Cardamom',category:'Produce',unit:'grams',onHand:500,reorder:200,cost:5000},
  {id:6,name:'Burger Buns',category:'Bakery',unit:'pcs',onHand:60,reorder:30,cost:25},
  {id:7,name:'Chicken Patties',category:'Proteins',unit:'pcs',onHand:40,reorder:20,cost:120}
];

export const initialCustomers = [
  {id:1,name:'Ali Khan',phone:'0300-1234567',address:'Street 1, Area 51',email:'ali@example.com',visits:14,last:'Aug 27, 2026',spent:4500,segment:'Regular'},
  {id:2,name:'Zeeshan Ahmed',phone:'0321-7654321',address:'Flat 4, G-9',email:'zeeshan@example.com',visits:8,last:'Aug 24, 2026',spent:2200,segment:'Returning'}
];

export const initialExpenses = [
  {id:1,date:'Aug 28, 2026',description:'Milk supply delivery',category:'Food supplies',vendor:'Local Dairy',amount:9000,status:'Paid'},
  {id:2,date:'Aug 27, 2026',description:'Tea stall team payroll',category:'Labor',vendor:'Harbor & Hearth',amount:15000,status:'Paid'}
];

export const initialStaff = [
  {id:1,name:'Aslam Bhai',role:'Chai Master',shift:'8:00 AM – 4:00 PM',hours:38,status:'Clocked in'},
  {id:2,name:'Sajid',role:'Chef (Fast Food)',shift:'10:00 AM – 6:00 PM',hours:41,status:'Clocked in'},
  {id:3,name:'Bilal',role:'Server',shift:'11:00 AM – 7:00 PM',hours:28,status:'Clocked in'}
];

export const initialOnlineOrders = [
  {id:'ON-208',customer:'Avery Brooks',type:'Delivery',address:'House 12, St 4',items:[{name:'Zinger Burger',qty:2,price:280},{name:'Coca Cola - 1.5L',qty:1,price:180}],status:'New',time:'12:51 PM'}
];
