export const initialMenu = [
  {id:1,code:'BUR-001',name:'Classic Burger',category:'Burgers',price:16.5,available:true,description:'Smoked cheddar, lettuce, tomato, house sauce'},
  {id:2,code:'ENT-001',name:'Grilled Chicken',category:'Entrees',price:22,available:true,description:'Herb chicken, roasted vegetables, pan jus'},
  {id:3,code:'ENT-002',name:'Seared Salmon',category:'Entrees',price:28,available:true,description:'Citrus glaze, seasonal greens, wild rice'},
  {id:4,code:'SAL-001',name:'Garden Caesar',category:'Salads',price:13.5,available:true,description:'Romaine, parmesan, sourdough croutons'},
  {id:5,code:'BUR-002',name:'Truffle Fries',category:'Burgers',price:8,available:true,description:'Parmesan, herbs, roasted garlic aioli'},
  {id:6,code:'DES-001',name:'Apple Crumble',category:'Desserts',price:9,available:true,description:'Warm apples, oat crumble, vanilla cream'},
  {id:7,code:'BEV-001',name:'Sparkling Water',category:'Beverages',price:4.5,available:false,description:'Chilled twelve-ounce bottle'},
  {id:8,code:'BEV-002',name:'House Lemonade',category:'Beverages',price:5.5,available:true,description:'Fresh lemon, cane sugar, mint'}
];

export const initialOrders = [
  {id:'#1048',type:'Dine-in',label:'Table 12',items:[{menuId:1,qty:2},{menuId:5,qty:1}],status:'Preparing',time:'12:42 PM',paid:false},
  {id:'#1047',type:'Takeout',label:'Pickup',items:[{menuId:2,qty:1},{menuId:8,qty:2}],status:'Ready',time:'12:35 PM',paid:false},
  {id:'#1046',type:'Dine-in',label:'Table 04',items:[{menuId:3,qty:1},{menuId:4,qty:1}],status:'Completed',time:'12:18 PM',paid:true},
  {id:'#1045',type:'Delivery',label:'Order 1045',items:[{menuId:1,qty:1},{menuId:6,qty:2}],status:'Completed',time:'11:56 AM',paid:true},
  {id:'#1044',type:'Dine-in',label:'Table 08',items:[{menuId:2,qty:2}],status:'New',time:'11:44 AM',paid:false},
  {id:'#1043',type:'Takeout',label:'Pickup',items:[{menuId:4,qty:1},{menuId:5,qty:1}],status:'Cancelled',time:'11:31 AM',paid:false}
];

export const initialInventory = [
  {id:1,name:'Chicken breast',category:'Proteins',unit:'lb',onHand:42,reorder:25,cost:4.8},
  {id:2,name:'Long-grain rice',category:'Dry goods',unit:'lb',onHand:18,reorder:30,cost:1.9},
  {id:3,name:'Romaine lettuce',category:'Produce',unit:'cases',onHand:6,reorder:8,cost:28},
  {id:4,name:'Brioche buns',category:'Bakery',unit:'dozen',onHand:14,reorder:10,cost:18},
  {id:5,name:'Atlantic salmon',category:'Proteins',unit:'lb',onHand:19,reorder:12,cost:12.5},
  {id:6,name:'House lemonade',category:'Beverages',unit:'gallons',onHand:11,reorder:6,cost:9.5}
];

export const initialCustomers = [
  {id:1,name:'Evelyn Carter',phone:'555-0101',address:'123 Oak St',email:'evelyn.carter@example.com',visits:14,last:'Aug 27, 2026',spent:842.5,segment:'Regular'},
  {id:2,name:'Marcus Williams',phone:'555-0102',address:'456 Pine St',email:'marcus.w@example.com',visits:8,last:'Aug 24, 2026',spent:416.2,segment:'Returning'},
  {id:3,name:'Olivia Bennett',phone:'555-0103',address:'789 Maple Ave',email:'olivia.b@example.com',visits:23,last:'Aug 29, 2026',spent:1288.75,segment:'VIP'},
  {id:4,name:'Noah Thompson',phone:'555-0104',address:'321 Elm St',email:'noah.t@example.com',visits:3,last:'Aug 12, 2026',spent:154.5,segment:'New'},
  {id:5,name:'Sophia Martinez',phone:'555-0105',address:'654 Cedar Ln',email:'sophia.m@example.com',visits:11,last:'Aug 21, 2026',spent:602.1,segment:'Regular'}
];

export const initialExpenses = [
  {id:1,date:'Aug 28, 2026',description:'Weekly produce delivery',category:'Food supplies',vendor:'Green Valley Farms',amount:684.2,status:'Paid'},
  {id:2,date:'Aug 27, 2026',description:'Kitchen team payroll',category:'Labor',vendor:'Harbor & Hearth',amount:3260,status:'Paid'},
  {id:3,date:'Aug 25, 2026',description:'Electric utility bill',category:'Utilities',vendor:'City Power',amount:418.65,status:'Paid'},
  {id:4,date:'Aug 22, 2026',description:'Local campaign placement',category:'Marketing',vendor:'Downtown Weekly',amount:275,status:'Pending'},
  {id:5,date:'Aug 19, 2026',description:'HVAC service call',category:'Maintenance',vendor:'Northside HVAC',amount:390,status:'Paid'},
  {id:6,date:'Aug 15, 2026',description:'Dry goods restock',category:'Food supplies',vendor:'Metro Foods',amount:958.4,status:'Paid'}
];

export const initialStaff = [
  {id:1,name:'Jordan Reed',role:'Manager',shift:'8:00 AM – 4:00 PM',hours:38,status:'Clocked in'},
  {id:2,name:'Maya Patel',role:'Head chef',shift:'10:00 AM – 6:00 PM',hours:41,status:'Clocked in'},
  {id:3,name:'Liam Brooks',role:'Server',shift:'11:00 AM – 7:00 PM',hours:28,status:'Clocked in'},
  {id:4,name:'Ava Johnson',role:'Server',shift:'4:00 PM – 10:00 PM',hours:22,status:'Scheduled'},
  {id:5,name:'Ethan Clark',role:'Cashier',shift:'12:00 PM – 8:00 PM',hours:31,status:'On break'},
  {id:6,name:'Isabella Moore',role:'Line cook',shift:'4:00 PM – 10:00 PM',hours:25,status:'Scheduled'}
];

export const initialOnlineOrders = [
  {id:'ON-208',customer:'Avery Brooks',type:'Delivery',address:'18 West 42nd Street',items:[{name:'Classic Burger',qty:2,price:16.5},{name:'House Lemonade',qty:2,price:5.5}],status:'New',time:'12:51 PM'},
  {id:'ON-207',customer:'Casey Morgan',type:'Pickup',address:'Pickup at counter',items:[{name:'Seared Salmon',qty:1,price:28},{name:'Garden Caesar',qty:1,price:13.5}],status:'Accepted',time:'12:47 PM'},
  {id:'ON-206',customer:'Riley Parker',type:'Delivery',address:'402 Madison Avenue',items:[{name:'Grilled Chicken',qty:1,price:22},{name:'Apple Crumble',qty:1,price:9}],status:'Preparing',time:'12:39 PM'}
];
