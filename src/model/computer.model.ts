/*
Computers:
– Title: The name or title of the item.
– Type: The type of computer, such as tablet, notebook, or desktop.
– Brand: The brand or manufacturer of the item.
– Model: The model number or name of the item.
– Year: The manufacturing year of the item.
– Processor: The processor or CPU model used in the computer.
– RAM: The amount of RAM (Random Access Memory) installed in the computer. – Storage: The type and capacity of storage (e.g., HDD, SSD) in the computer.
– Graphics Card: The model or type of graphics card installed in the computer.
– Operating System: The operating system installed on the computer.
– Price: The price of the item.
– Image: The image showing the item.
– Description: Description for the item.
 */

export interface Computer {
  id: number;
  title: string;
  type: string;
  brand: string;
  model: string;
  year: number;
  processor: string;
  ram: string;
  storage: string;
  graphicsCard: string;
  operatingSystem: string;
  price: number;
  image: string;
  description: string;
}


export const keysOfComputer = [
    {name: "title", type: "string", required: true},
    {name: "type", type: "select", options: ["Notebook", "Desktop"], required: true},
    {name: "brand", type: "select", options: ["Apple", "Microsoft", "Dell", "HP", "Lenovo", "Acer", "Asus", "Samsung", "LG", "Sony", "Toshiba", "MSI", "Razer", "Alienware", "Gigabyte", "Huawei", "Xiaomi"], required: true},
    {name: "model", type: "select", required: true},
    {name: "year", type: "number", required: false},
    {name: "processor", type: "select", options: ["Apple M1", "Intel Core i9", "Intel Core i7", "Intel Core i5", "Intel Core i3", "Intel Xeon", "AMD Ryzen 9", "AMD Ryzen 7", "AMD Ryzen 5", "AMD Ryzen 3", "AMD Athlon", "AMD A-Series", "AMD FX-Series", "AMD E-Series", "AMD C-Series", "Qualcomm Snapdragon", "MediaTek Helio", "Samsung Exynos", "Nvidia Tegra", "Rockchip RK", "Allwinner A", "Amlogic S", "Broadcom BCM", "Marvell Armada", "HiSilicon Kirin", "Spreadtrum SC", "Unisoc Tiger", "VIA Nano", "Vortex86", "Zilog Z80", "Other"], required: false},
    {name: "ram", type: "select", options: ["2GB", "4GB", "8GB", "16GB", "32GB", "64GB", "128GB", "256GB", "512GB", "1TB", "2TB", "4TB", "8TB", "16TB"], required: false},
    {name: "storage", type: "string", required: false},
    {name: "graphicsCard", type: "select",
        options: [
            "GeForce RTX 3090", "GeForce RTX 3080", "GeForce RTX 3070", "GeForce RTX 3060 Ti", "GeForce RTX 3060", "GeForce RTX 3050 Ti", "GeForce RTX 3050", "GeForce RTX 2080 Ti", "GeForce RTX 2080 SUPER", "GeForce RTX 2080", "GeForce RTX 2070 SUPER", "GeForce RTX 2070", "GeForce RTX 2060 SUPER", "GeForce RTX 2060", "GeForce GTX 1660 Ti", "GeForce GTX 1660 SUPER", "GeForce GTX 1660", "GeForce GTX 1650 SUPER", "GeForce GTX 1650", "GeForce GTX 1080 Ti", "GeForce GTX 1080", "GeForce GTX 1070 Ti", "GeForce GTX 1070", "GeForce GTX 1060 6GB", "GeForce GTX 1060 3GB", "GeForce GTX 1050 Ti", "GeForce GTX 1050", "GeForce GT 1030", "GeForce GT 710",
            "Intel UHD Graphics", "Intel Iris Xe Graphics", "Intel Iris Plus Graphics",
            "Intel Iris Graphics", "Intel HD Graphics", "Nvidia GeForce RTX", "Nvidia GeForce GTX", "Nvidia GeForce MX",
            "Nvidia Quadro", "Nvidia Tesla", "Nvidia Tegra", "AMD Radeon RX", "AMD Radeon Pro", "AMD Radeon Vega",
            "AMD Radeon R", "AMD Radeon HD", "AMD Radeon", "AMD FirePro", "AMD FireStream", "AMD FireMV", "AMD FireGL",
            "AMD FirePro S", "AMD FirePro W", "AMD FirePro D", "AMD FirePro V", "AMD FirePro R", "AMD FirePro S",
            "AMD FirePro M", "AMD FirePro W", "AMD FirePro V", "AMD FirePro D", "AMD FirePro 3D", "AMD FirePro 3D",
        ], required: false},
    {name: "operatingSystem", type: "select", options: ["Windows", "macOS", "Linux", "Chrome OS"], required: false},
    {name: "price", type: "number", required: true},
    {name: "image", type: "string", required: false},
    {name: "description", type: "textarea", required: false},
];


export const storageFields = [
    {name: "ssd", type: "select", options: ["128GB", "256GB", "512GB", "1TB", "2TB", "4TB", "8TB", "16TB"], required: false},
    {name: "hdd", type: "select", options: ["128GB", "256GB", "512GB", "1TB", "2TB", "4TB", "8TB", "16TB"], required: false},
]

export const brandModels = {
    "": [],
    "Apple": ["iPad Pro", "iPad Air", "iPad", "iPad Mini", "MacBook Pro", "MacBook Air", "Mac Mini", "iMac", "Mac Pro"],
    "Microsoft": ["Surface Pro", "Surface Laptop", "Surface Studio", "Surface Book", "Surface Go", "Surface Duo"],
    "Dell": ["Latitude", "XPS", "Inspiron", "Alienware", "G Series", "Vostro", "OptiPlex", "Precision", "PowerEdge"],
    "HP": ["Spectre", "Envy", "Pavilion", "EliteBook", "ProBook", "ZBook", "Omen", "Stream",
        "Chromebook", "Pavilion Gaming", "Pavilion x360", "Elite Dragonfly", "Elite x2", "Elite x360", "Elite c1030"],
    "Lenovo": ["ThinkPad", "IdeaPad", "Yoga", "Legion", "V Series", "ThinkCentre", "IdeaCentre", "Legion Tower", "Legion Laptop", "Legion Desktop"],
    "Acer": ["Aspire", "Swift", "Spin", "Predator", "Nitro", "Chromebook", "ConceptD", "TravelMate", "Extensa"],
    "Asus": ["ZenBook", "VivoBook", "ROG", "TUF", "ExpertBook", "ProArt StudioBook", "Chromebook", "VivoBook Gaming"],
    "Samsung": ["Galaxy Book", "Notebook", "Chromebook", "Galaxy Tab"],
    "LG": ["Gram", "Ultra", "Chromebook"],
    "Sony": ["VAIO"],
    "Toshiba": ["Portégé", "Satellite", "Tecra"],
    "MSI": ["Prestige", "Modern", "Creator", "Workstation", "Gaming", "Content Creation"],
    "Razer": ["Blade", "Blade Stealth", "Blade Pro", "Blade 15", "Blade 17"],
    "Alienware": ["Area-51m", "m15", "m17", "x15", "x17"],
    "Gigabyte": ["Aero", "Aorus", "G5", "G7"],
    "Huawei": ["MateBook", "MatePad"],
    "Xiaomi": ["Mi Notebook", "Mi Pad"],
}