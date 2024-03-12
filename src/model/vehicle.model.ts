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