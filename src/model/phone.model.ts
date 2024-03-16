/*
Phones:
– Title: The name or title of the item.
– Brand: The brand or manufacturer of the item.
– Model: The model number or name of the item.
– Year: The manufacturing year of the item.
– Operating System: The operating system installed on the phone.
– Processor: The processor or CPU model used in the phone.
– RAM: The amount of RAM (Random Access Memory) installed in the phone.
– Storage: The storage capacity of the phone.
– Camera Specifications: Specifications related to the phone’s camera,including Rear Camera, Front Camera, Additional Cameras.
5
– Battery Capacity: The capacity of the phone’s battery. – Price: The price of the item.
– Image: The image showing the item.
– Description: Description for the item.
 */

export interface Phone {
  id: number;
  title: string;
  brand: string;
  model: string;
  year: number;
  operatingSystem: string;
  processor: string;
  ram: string;
  storage: string;
  cameraSpecifications: string;
  batteryCapacity: string;
  price: number;
  image: string;
  description: string;
}

export const keysOfPhone = [
    {name: "title", type: "string"},
    {name: "brand", type: "select", options: ["Apple", "Samsung", "Google", "Xiaomi", "Huawei", "Sony", "Lg", "Motorola", "Nokia", "Oppo", "Vivo", "Realme", "Asus", "Lenovo"]},
    {name: "model", type: "select"},
    {name: "year", type: "number"},
    {name: "operatingSystem", type: "select", options: ["iOS", "Android"]},
    {name: "processor", type: "select", options: ["Apple A15 Bionic", "Snapdragon 888", "Exynos 2100", "Snapdragon 870", "Snapdragon 865", "Snapdragon 855", "Snapdragon 765G", "Snapdragon 750G", "Snapdragon 732G", "Snapdragon 720G", "Snapdragon 690", "Snapdragon 675", "Snapdragon 665", "Snapdragon 460", "Snapdragon 450", "Snapdragon 439", "Snapdragon 430", "Snapdragon 425", "Snapdragon 410", "Snapdragon 400", "Snapdragon 200", "Snapdragon 210", "Snapdragon 205"]
        },
    {name: "ram", type: "select", options: ["2GB", "3GB", "4GB", "6GB", "8GB", "12GB", "16GB", "32GB"]},
    {name: "storage", type: "select", options: ["16GB", "32GB", "64GB", "128GB", "256GB", "512GB", "1TB"]},
    {name: "cameraSpecifications", type: "string"},
    {name: "batteryCapacity", type: "select", options: ["1000mAh", "2000mAh", "3000mAh", "4000mAh", "5000mAh", "6000mAh", "7000mAh", "8000mAh", "9000mAh", "10000mAh"]},
    {name: "price", type: "number"},
    {name: "image", type: "string"},
    {name: "description", type: "textarea"},
];

export const cameraSpecificationsFields = [
    {name: "main", type: "select", options: ["1MP", "2MP", "3MP", "4MP", "5MP", "6MP", "7MP", "8MP", "9MP", "10MP", "12MP", "16MP", "20MP", "24MP", "32MP", "48MP", "64MP", "108MP"]},
    {name: "ultrawide", type: "select", options: ["1MP", "2MP", "3MP", "4MP", "5MP", "6MP", "7MP", "8MP", "9MP", "10MP", "12MP", "16MP", "20MP", "24MP", "32MP", "48MP", "64MP", "108MP"]},
    {name: "telephoto", type: "select", options: ["1MP", "2MP", "3MP", "4MP", "5MP", "6MP", "7MP", "8MP", "9MP", "10MP", "12MP", "16MP", "20MP", "24MP", "32MP", "48MP", "64MP", "108MP"]},
]

export const brandModels = {
    "": [],
    "Apple": ["iPhone 13 Pro Max", "iPhone 13 Pro", "iPhone 13", "iPhone 13 Mini", "iPhone 12 Pro Max", "iPhone 12 Pro", "iPhone 12", "iPhone 12 Mini", "iPhone 11 Pro Max", "iPhone 11 Pro", "iPhone 11", "iPhone SE (2020)", "iPhone XS Max", "iPhone XS", "iPhone XR", "iPhone X", "iPhone 8 Plus", "iPhone 8", "iPhone 7 Plus", "iPhone 7", "iPhone 6S Plus", "iPhone 6S", "iPhone 6 Plus", "iPhone 6", "iPhone SE (2016)", "iPhone 5S", "iPhone 5C", "iPhone 5", "iPhone 4S", "iPhone 4"],
    "Samsung": ["Galaxy Z Fold 3", "Galaxy Z Flip 3", "Galaxy S21 Ultra", "Galaxy S21 Plus", "Galaxy S21", "Galaxy S20 Ultra", "Galaxy S20 Plus", "Galaxy S20", "Galaxy S10 Plus", "Galaxy S10", "Galaxy S10e", "Galaxy Note 20 Ultra", "Galaxy Note 20", "Galaxy Note 10 Plus", "Galaxy Note 10", "Galaxy Note 9", "Galaxy Note 8", "Galaxy A72", "Galaxy A71", "Galaxy A70", "Galaxy A52", "Galaxy A51", "Galaxy A50", "Galaxy A42", "Galaxy A41", "Galaxy A40", "Galaxy A32", "Galaxy A31", "Galaxy A30", "Galaxy A22", "Galaxy A21", "Galaxy A20", "Galaxy A12", "Galaxy A11", "Galaxy A10", "Galaxy M32", "Galaxy M31", "Galaxy M30", "Galaxy M22", "Galaxy M21", "Galaxy M20", "Galaxy M12", "Galaxy M11", "Galaxy M10", "Galaxy F62", "Galaxy F41", "Galaxy F12", "Galaxy F02s", "Galaxy F01", "Galaxy J7", "Galaxy J6", "Galaxy J5", "Galaxy J4", "Galaxy J3", "Galaxy J2", "Galaxy J1"],
    "Google": ["Pixel 6 Pro", "Pixel 6", "Pixel 5a", "Pixel 5", "Pixel 4a", "Pixel 4a 5G", "Pixel 4", "Pixel 4 XL", "Pixel 3a", "Pixel 3a XL", "Pixel 3", "Pixel 3 XL", "Pixel 2", "Pixel 2 XL", "Pixel", "Pixel XL"],
    "Xiaomi": ["12 Pro", "12", "12 Mini", "12X", "11T Pro", "11T", "11 Lite 5G NE", "11 Lite NE 5G", "11 Lite 5G", "11T Lite", "11 Pro", "11", "10T Pro", "10T", "10T Lite", "10 Pro", "10", "9T Pro", "9T", "9 Pro", "9", "8T", "8 Pro", "8", "7T Pro", "7T", "7 Pro", "7", "6T", "6", "5T", "5", "4", "3", "2", "1"],
    "Huawei": ["P50 Pro", "P50", "P40 Pro", "P40", "P30 Pro", "P30", "P20 Pro", "P20", "P10 Plus", "P10", "P9 Plus", "P9", "P8", "P7", "Mate 40 Pro", "Mate 40", "Mate 30 Pro", "Mate 30", "Mate 20 Pro", "Mate 20", "Mate 10 Pro", "Mate 10", "Mate 9", "Mate 8", "Mate 7", "Nova 8 Pro", "Nova 8", "Nova 7 Pro", "Nova 7", "Nova 6", "Nova 5 Pro", "Nova 5", "Nova 4", "Nova 3", "Nova 2", "Nova 1", "Y9a"],
    "Sony": ["Xperia 1 III", "Xperia 1 II", "Xperia 1", "Xperia 5 III", "Xperia 5 II", "Xperia 5", "Xperia 10 III", "Xperia 10 II", "Xperia 10", "Xperia L4", "Xperia L3", "Xperia L2", "Xperia L1", "Xperia XZ3", "Xperia XZ2", "Xperia XZ1", "Xperia XZ", "Xperia XA2", "Xperia XA1", "Xperia XA", "Xperia X", "Xperia M5", "Xperia M4 Aqua", "Xperia M2", "Xperia M", "Xperia E5", "Xperia E4", "Xperia E3", "Xperia E2", "Xperia E1", "Xperia E"],
    "Lg": ["Wing", "Velvet", "V60 ThinQ", "V50 ThinQ", "V40 ThinQ", "V35 ThinQ", "V30", "V20", "V10", "G8 ThinQ", "G7 ThinQ", "G6", "G5", "G4", "G3", "G2", "G1", "Q8", "Q7", "Q6", "Q5", "Q4", "Q3", "Q2", "Q1", "K92", "K91", "K90", "K80", "K70", "K60", "K50", "K40", "K30", "K20", "K10", "K8", "K7", "K6", "K5", "K4", "K3", "K2", "K1", "X6", "X5", "X4", "X3", "X2", "X1"],
    "Motorola": ["Edge 20 Pro", "Edge 20", "Edge 20 Lite", "Edge 20 Fusion", "Edge 20 Pro", "Edge 20", "Edge 20 Lite", "Edge 20 Fusion", "Edge 20 Pro", "Edge 20", "Edge 20 Lite", "Edge 20 Fusion", "Edge 20 Pro", "Edge 20", "Edge 20 Lite", "Edge 20 Fusion", "Edge 20 Pro", "Edge 20", "Edge 20 Lite", "Edge 20 Fusion", "Edge 20 Pro", "Edge 20", "Edge 20 Lite", "Edge 20 Fusion", "Edge 20 Pro", "Edge 20", "Edge 20 Lite", "Edge 20 Fusion", "Edge 20 Pro", "Edge 20", "Edge 20 Lite", "Edge 20 Fusion", "Edge 20 Pro", "Edge 20", "Edge 20 Lite", "Edge 20 Fusion", "Edge 20 Pro", "Edge 20", "Edge 20 Lite", "Edge 20 Fusion", "Edge 20 Pro", "Edge 20", "Edge 20 Lite", "Edge 20 Fusion", "Edge 20 Pro", "Edge 20", "Edge 20 Lite", "Edge 20 Fusion"],
    "Nokia": ["G50", "G20", "G10", "X20", "X10", "5.4", "5.3", "5.1", "5.1 Plus", "5", "3.4", "3.2", "3.1", "3.1 Plus", "3", "2.4", "2.3", "2.2", "2.1", "2", "1.4", "1.3", "1.1", "1", "9.3 PureView", "9.2 PureView", "8.3 5G", "8.1", "8", "7.2", "7.1", "7 Plus", "7", "6.2", "6.1 Plus", "6.1", "6", "5.1 Plus", "5.1", "5", "4.2", "4.1", "4", "3.2", "3.1", "3", "2.2", "2.1", "2", "1 Plus", "1"],
    "Oppo": ["Find X3 Pro", "Find X3", "Find X2 Pro", "Find X2", "Find X", "Reno 6 Pro", "Reno 6", "Reno 5 Pro", "Reno 5", "Reno 4 Pro", "Reno 4", "Reno 3 Pro", "Reno 3", "Reno 2", "Reno", "A94", "A93", "A92", "A91", "A9", "A8", "A7", "A5", "A3", "A1", "A12", "A11", "A10", "A9", "A8", "A7", "A6", "A5", "A4", "A3", "A2", "A1", "F19 Pro", "F19", "F17 Pro", "F17", "F15", "F11 Pro", "F11", "F9", "F7", "F5", "F3", "F1"],
    "Vivo": ["X70 Pro Plus", "X70 Pro", "X70", "X60 Pro Plus", "X60 Pro", "X60", "X50 Pro Plus", "X50 Pro", "X50", "X30 Pro", "X30", "X27 Pro", "X27", "X23", "X21", "X20 Pro", "X20", "X9", "X7", "X6", "X5", "X4", "X3", "X2", "X1", "Y21", "Y20", "Y19", "Y17", "Y15", "Y13", "Y12", "Y11", "Y9", "Y7", "Y5", "Y3", "Y1", "S10", "S9", "S8", "S7", "S6", "S5", "S4", "S3", "S2", "S1", "Nex 3", "Nex 2", "Nex 1"],
    "Realme": ["GT Master Edition", "GT Neo", "GT", "X7 Max", "X7 Pro", "X7", "X3 SuperZoom", "X3", "X2 Pro", "X2", "V15", "V13", "V11", "V9", "V7", "V5", "V3", "V2", "V1", "Q3 Pro", "Q3", "Q2", "Q1", "Narzo 50", "Narzo 30", "Narzo 20", "Narzo 10", "Narzo 9", "Narzo 8", "Narzo 7", "Narzo 6", "Narzo 5", "Narzo 4", "Narzo 3", "Narzo 2", "Narzo 1", "C25", "C21", "C19", "C17", "C15", "C12", "C11", "C9", "C7", "C5", "C3"],
    "Asus": ["Zenfone 8", "Zenfone 7 Pro", "Zenfone 7", "Zenfone 6", "Zenfone 5", "Zenfone 4", "Zenfone 3", "Zenfone 2", "Zenfone 1", "ROG Phone 5", "ROG Phone 3", "ROG Phone 2", "ROG Phone 1"],
    "Lenovo": ["Legion Phone Duel 2", "Legion Phone Duel", "K13", "K12", "K11", "K10", "K9", "K8", "K7", "K6", "K5", "K4", "K3", "K2", "K1", "Z6 Pro", "Z6", "Z5 Pro", "Z5", "Z4 Pro", "Z4", "Z3 Pro", "Z3", "Z2 Pro", "Z2", "Z1", "S5 Pro", "S5", "S3", "S2", "S1", "P2", "P1", "A8", "A7", "A6", "A5", "A4", "A3", "A2", "A1", "Vibe K6", "Vibe K5", "Vibe K4", "Vibe K3", "Vibe K2", "Vibe K1"],
}