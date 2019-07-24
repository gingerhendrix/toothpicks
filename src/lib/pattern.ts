
export class Point {
  constructor(public x: number, public y: number) {
  }

  compare(other: Point) {
    const xDiff = this.x - other.x;
    if(xDiff === 0) {
      return this.y - other.y;
    }
    return xDiff;
  }

  equals(other: Point | undefined) {
    if(!other || other.constructor !== Point) {
      return false;
    }
    return this.x === other.x && this.y === other.y;
  }

  toString() {
    return `[${this.x}, ${this.y}]`;
  }
};

export class PointMap {
  private map: Record<string, boolean>

  constructor() {
    this.map = {};
  }

  add(p: Point) {
    this.map[p.toString()] = true;
  }

  addAll(ps: Point[]) {
    ps.forEach(p => this.add(p))
  }

  has(p: Point) {
    return this.map[p.toString()];
  }
}

export enum Orientation {
  horizontal,
  vertical,
}

const invertOrientation = (o: Orientation) =>
  o === Orientation.horizontal ? Orientation.vertical : Orientation.horizontal;

export class Toothpick {
  constructor(public center: Point, public orientation: Orientation) {
  }

  ends(): [Point, Point] {
    if (this.orientation === Orientation.horizontal) {
      return [
        new Point(this.center.x - 1, this.center.y),
        new Point(this.center.x + 1, this.center.y),
      ]
    } else {
      return [
        new Point(this.center.x, this.center.y - 1),
        new Point(this.center.x, this.center.y + 1),
      ]
    }
  }

  points(): [Point, Point, Point] {
    const [first, last] = this.ends();
    return [first, this.center, last];
  }
}

export class Generation {
  constructor(public toothpicks: Array<Toothpick>, public orientation: Orientation) {
  }

  public openEnds(): Array<Point> {
    const ends = this.toothpicks.flatMap(t => t.ends()).sort((a, b) => a.compare(b));
    const openEnds = [];
    for(let i = 0; i < ends.length ; i++) {
      if(ends[i].equals(ends[i + 1])) {
        i++;
        continue;
      }
      openEnds.push(ends[i]);
    }
    return openEnds;
  }
}

export class ToothpickPattern {
  private points: PointMap;

  public generations: Array<Generation> = [];

  constructor() {
    this.points = new PointMap();
    this.initializeFirstGeneration();
  }

  public buildNextGeneration() {
    const last = this.generations[this.generations.length - 1];
    const ends = last.openEnds().filter(p => !this.points.has(p));
    const orientation = invertOrientation(last.orientation);
    const newToothpicks = ends.map(p => new Toothpick(p, orientation));
    const newGeneration = new Generation(newToothpicks, orientation);
    this.points.addAll(this.lastGeneration().toothpicks.flatMap(t => t.points()));
    this.generations.push(newGeneration);
  }

  public lastGeneration() {
    return this.generations[this.generations.length - 1];
  }

  private initializeFirstGeneration() {
    const toothpick = new Toothpick(new Point(0, 0), Orientation.vertical);
    const gen = new Generation([toothpick], Orientation.vertical);
    this.generations.push(gen);
  }

  public debug() {
    console.log("Points", this.points);
    console.log("Generations", this.generations.map(g => g.toothpicks));
  }
}
