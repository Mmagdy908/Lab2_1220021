/*IMPORTANT NOTES
1- you are using JS Name Casing (CamelCasing)
2- make this code as clean as possible 
3- apply all the concepts you learned during this lab (Naming, comments,  functions)
*/

class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

class Rectangle {
  constructor(startingPoint, width, height) {
    this._setData(startingPoint, width, height);
  }

  // ***************
  // METHODS
  // ***************

  _setData(startingPoint, width, height) {
    try {
      if (!height || height <= 0 || !width || width <= 0) {
        throw Error("invalid Width or Height");
      }
      this.startingPoint = startingPoint;
      this.width = width;
      this.height = height;
    } catch (err) {
      console.error(err);
    }
  }

  area() {
    return this.width * this.height;
  }

  perimeter() {
    return 2 * this.width + 2 * this.height;
  }

  updateHeight(height) {
    //TODO: handle case of updating the height of square
    try {
      if (!height || height <= 0) {
        throw new Error("Invalid Height");
      }
      this.height = height;
    } catch (err) {
      console.error(err);
    }
  }

  update({ startingPoint, width, height }) {
    this._setData(startingPoint, width, height);
  }

  fetchHeight() {
    return this.height;
  }

  //Vague
  //function that print the endpoints
  endPoints() {
    const topRight = this.startingPoint.x + this.width;
    const bottomLeft = this.startingPoint.y + this.height;
    console.log("End Point X-Axis (Top Right): " + topRight);
    console.log("End Point Y-Axis (Bottom Left): " + bottomLeft);
  }

  getWidth() {
    return this.w;
  }
}

function createRectangle(x, y, width, height) {
  const startingPoint = new Point(x, y);
  return new Rectangle(startingPoint, width, height);
}

function createSquare(x, y, height) {
  try {
    if (!height || height <= 0) {
      throw new Error("Invalid Height");
    }

    const square = createRectangle(x, y, height, height);
    const area = square.area();
    const perimeter = square.calculatePerimeter();

    console.log("square Area ", area);
    console.log("square Perimeter ", perimeter);
  } catch (err) {
    console.error(err);
  }
}

const rectangle = createRectangle(2, 3, 5, 4);
const square = createSquare();

console.log(square.calculatePerimeter());
square.endPoints();

rectangle.updateHeight(3);
