/*
• Vehicles:
– Title: The name or title of the item.
– Type: The type of the vehicle, such as sedan, SUV (Sport Utility Vehicle), electric car, caravan, or truck.
– Brand: The brand or manufacturer of the item.
4
– Model: The specific model of the item.
– Year: The manufacturing year of the item.
– Color: The color of the item.
– Engine Displacement: The engine displacement, typically measured in cubic cen- timeters (cc).
– Fuel Type: The type of fuel the vehicle uses, such as petrol, diesel, electric, etc.
– Transmission Type: The type of transmission, whether automatic or manual.
– Mileage: The total distance traveled by the vehicle, usually measured in kilometers (km) or miles.
– Price: The price of the item.
– Image: The image showing the item. You do not need to implement image upload,
hyperlink to an image file on the Internet is fine
– Description: Description for item.
 */

export interface Vehicle {
  id: number;
  title: string;
  type: string;
  brand: string;
  model: string;
  year: number;
  color: string;
  engineDisplacement: number;
  fuelType: string;
  transmissionType: string;
  mileage: number;
  price: number;
  image: string;
  description: string;
}

export const keysOfVehicle = [
    {name: "title", type: "string"},
    {name: "type", type: "select", options: ["Sedan", "SUV", "Electric Car", "Caravan", "Truck"]},
    {name: "brand", type: "select", options: ["Toyota", "Honda", "Nissan", "Tesla", "Audi", "BMW", "Ford", "Chevrolet", "Jeep", "Ram", "Subaru", "Volkswagen", "Volvo"]},
    {name: "model", type: "select"},
    {name: "year", type: "number"},
    {name: "color", type: "select", options: ["Black", "White", "Silver", "Gray", "Red", "Blue", "Brown", "Green", "Yellow", "Orange", "Purple", "Pink"]},
    {name: "engineDisplacement", type: "select", options: ["1.0L", "1.2L", "1.4L", "1.6L", "1.8L", "2.0L", "2.2L", "2.4L", "2.6L", "2.8L", "3.0L", "3.2L", "3.4L", "3.6L", "3.8L", "4.0L", "4.2L", "4.4L", "4.6L", "4.8L", "5.0L", "5.2L", "5.4L", "5.6L", "5.8L", "6.0L", "6.2L", "6.4L", "6.6L", "6.8L", "7.0L", "7.2L", "7.4L", "7.6L", "7.8L", "8.0L"]},
    {name: "fuelType", type: "select", options: ["Petrol", "Diesel", "Electric"]},
    {name: "transmissionType", type: "select", options: ["Automatic", "Manual"]},
    {name: "mileage", type: "number"},
    {name: "price", type: "number"},
    {name: "image", type: "string"},
    {name: "description", type: "textarea"},
];


export const electricVehicleFields = [
    {name: "batteryCapacity", type: "number"},
    {name: "range", type: "number"},
]

export const caravanFields = [
    {name: "bedCapacity", type: "number"},
    {name: "waterTankCapacity", type: "number"},
]

export const truckFields = [
    {name: "payloadCapacity", type: "number"},
]

export const carTypeFields = {
    "electric": electricVehicleFields,
    "caravan": caravanFields,
    "truck": truckFields,
}

export const brandModels = {
    "": [],
    "Toyota": ["Camry", "Corolla", "Avalon", "Prius", "Yaris", "86", "Sienna", "Tacoma", "Tundra", "C-HR", "RAV4", "Highlander", "4Runner", "Sequoia", "Land Cruiser", "Supra", "Mirai"],
    "Honda": ["Accord", "Civic", "Insight", "Fit", "HR-V", "CR-V", "Passport", "Pilot", "Ridgeline", "Odyssey", "Clarity", "Accord Hybrid", "CR-V Hybrid"],
    "Nissan": ["Versa", "Sentra", "Altima", "Maxima", "370Z", "GT-R", "Kicks", "Rogue", "Murano", "Pathfinder", "Armada", "Frontier", "Titan", "NV", "Leaf"],
    "Tesla": ["Model S", "Model 3", "Model X", "Model Y", "Roadster", "Cybertruck", "Semi", "ATV"],
    "Audi": ["A3", "A4", "A5", "A6", "A7", "A8", "Q3", "Q5", "Q7", "Q8", "TT", "R8", "RS", "S", "e-tron", "SQ"],
    "BMW": ["2 Series", "3 Series", "4 Series", "5 Series", "6 Series", "7 Series", "8 Series", "X1", "X2", "X3", "X4", "X5", "X6", "X7", "Z4", "M", "i"],
    "Ford": ["EcoSport", "Escape", "Edge", "Explorer", "Expedition", "Bronco", "Ranger", "Maverick", "F-150, F-250, F-350, F-450, F-550, F-600, F-650, F-750, F-1500, F-2500, F-3500, F-4500, F-5500, F-6500, F-7500", "Transit", "Mustang", "GT", "Shelby", "Focus", "Fiesta", "Fusion", "Taurus", "C-Max", "Flex", "Freestyle", "Thunderbird", "Falcon", "Fairlane", "Galaxie", "LTD", "Crown Victoria", "Escort", "Tempo", "Contour", "Aspire", "Probe", "Pinto", "Maverick", "Falcon", "Fairmont", "Granada", "Laser", "EXP", "Festiva", "Aerostar", "Windstar", "Freestar", "Transit Connect", "Econoline", "Club Wagon", "Bronco", "Escape", "Excursion", "Edge", "Flex", "Freestyle", "Taurus X", "Explorer Sport Trac", "Bronco Sport", "Maverick", "Courier", "Ranger", "F-Series"],
    "Chevrolet": ["Spark", "Sonic", "Malibu", "Impala", "Camaro", "Corvette", "Blazer", "Equinox", "Traverse", "Tahoe", "Suburban", "Colorado", "Silverado", "Express", "Bolt", "Volt", "Cruze", "Cobalt", "Aveo", "HHR", "Cavalier", "Lumina", "Monte Carlo", "Beretta", "Corsica", "Celebrity", "Caprice", "Chevette", "Nova", "Vega", "Monza", "Citation", "Chevelle", "El Camino", "Corvair", "Biscayne", "Bel Air", "Impala", "Nomad", "Chevy II", "Corvair", "Corvette", "Camaro", "Chevelle", "Nova", "Monte Carlo", "Vega", "Monza", "Caprice", "Malibu", "Lumina", "Celebrity", "Cavalier", "Citation", "Corsica", "Beretta", "Lumina", "Lumina APV", "Kalos"],
    "Jeep": ["Wrangler", "Gladiator", "Compass", "Cherokee, Grand Cherokee", "Renegade", "Patriot", "Liberty", "Commander", "Wagoneer", "Grand Wagoneer", "CJ", "Scrambler", "J-Series", "DJ", "XJ", "ZJ", "WJ", "KJ", "WK", "KK", "WK2", "KL", "WK2", "MK", "MP", "DS", "BU", "MK", "MK74", "MK49"],
    "Ram": ["1500", "2500", "3500", "4500", "5500", "6500", "7500", "1500", "2500", "3500", "4500", "5500", "6500", "7500", "1500", "2500", "3500", "4500", "5500", "6500", "7500", "1500", "2500", "3500", "4500", "5500", "6500", "7500", "1500", "2500", "3500", "4500", "5500", "6500", "7500", "1500", "2500", "3500", "4500", "5500", "6500", "7500", "1500", "2500", "3500", "4500", "5500", "6500", "7500", "1500", "2500", "3500", "4500", "5500", "6500", "7500"],
    "Subaru": ["Impreza", "WRX", "Legacy", "Outback", "Ascent", "Crosstrek", "Forester", "Baja", "Tribeca", "BRZ", "SVX"],
    "Volkswagen": ["Golf","Polo", "Jetta", "Passat", "Arteon", "Tiguan", "Atlas", "Taos", "ID.4", "ID.3", "ID. Buzz", "ID. Space Vizzion", "ID. Buggy", "ID. Crozz", "ID. Roomzz"],
    "Volvo": ["S60", "S90", "V60", "V90", "XC40", "XC60", "XC90", "C40", "C70", "V40", "V50", "V70", "V90", "S40", "S50", "S60", "S70", "S80", "S90", "C30", "C40", "C70", "C80", "C90", "XC40", "XC50", "XC60", "XC70", "XC80", "XC90", "XC100", "P1800", "P1900", "P2000", "P2100", "P2200", "P2300", "P2400", "P2500", "P2600", "P2700", "P2800", "P2900", "P3000", "P3100", "P3200", "P3300", "P3400", "P3500", "P3600", "P3700", "P3800", "P3900", "P4000", "P4100", "P4200", "P4300", "P4400", "P4500", "P4600", "P4700", "P4800", "P4900", "P5000", "P5100", "P5200", "P5300", "P5400", "P5500", "P5600", "P5700", "P5800", "P5900", "P6000", "P6100", "P6200", "P6300", "P6400", "P6500", "P6600", "P6700", "P6800", "P6900", "P7000", "P7100", "P7200", "P7300", "P7400", "P7500", "P7600", "P7700", "P7800", "P7900", "P8000", "P8100", "P8200", "P8300", "P8400", "P8500", "P8600", "P8700", "P8800", "P8900", "P9000", "P9100"],
}