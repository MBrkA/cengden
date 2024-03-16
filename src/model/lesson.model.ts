/*
Private Lessons:
– Title: The name or title of the item.
– Tutor Name: The name of the tutor offering the private lesson.
– Lessons: The specific lessons offered, such as Data Structures, Algorithms, C++. – Location: The location where the private lesson will take place.
– Duration: The duration of each lesson session.
– Price: The price of the item.
– Image: The image showing the item.
– Description: Description for the item.

 */

export interface Lesson {
  id: number;
  title: string;
  tutorName: string;
  lessons: string;
  location: string;
  duration: string;
  price: number;
  image: string;
  description: string;
}

export const keysOfLesson = [
    {name: "title", type: "string"},
    {name: "tutorName", type: "string"},
    {name: "lessons", type: "number"},
    {name: "location", type: "string"},
    {name: "duration", type: "number"},
    {name: "price", type: "number"},
    {name: "image", type: "string"},
    {name: "description", type: "textarea"},
];