class Category {
  constructor(
    id,
    title,
    color,
    classNumber,
    zipCode,
    latitude,
    longitude,
    timestamp
  ) {
    this.id = id;
    this.title = title;
    this.color = color;
    this.classNumber = classNumber;
    this.zipCode = zipCode;
    this.latitude = latitude;
    this.longitude = longitude;
    this.timestamp = timestamp;
  }
}

export default Category;
