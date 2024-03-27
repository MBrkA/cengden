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


export const keysOfLesson = [
    {name: "title", type: "string", required: true},
    {name: "lessons", type: "number", required: true},
    {name: "location", type: "string", required: false},
    {name: "duration", type: "number", required: false},
    {name: "price", type: "number", required: true},
    {name: "image", type: "string", required: false},
    {name: "description", type: "textarea", required: false},
];