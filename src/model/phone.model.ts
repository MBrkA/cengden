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