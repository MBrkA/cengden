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