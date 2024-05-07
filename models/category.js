// models/Category.js
class Category {
  constructor(
    id,
    title,
    color,
    classNumber,
    zipCode,
    latitude,
    longitude,
    timestamp,
    projects = []
  ) {
    this.id = id;
    this.title = title;
    this.color = color;
    this.classNumber = classNumber;
    this.zipCode = zipCode;
    this.latitude = latitude;
    this.longitude = longitude;
    this.timestamp = timestamp;
    this.projects = projects;
  }
}

export default Category;
