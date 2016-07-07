export class Artwork {
  name="unnamed";
  link:string;
  mature:boolean;
  thumbnail:string;
  content:string;
  author:string;
  constructor(values){
    if (typeof values === "object"){
      Object.assign(this, values);
    }
  }
}

