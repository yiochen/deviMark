export class Artwork {
  name="unnamed";
  link:string;
  thumbnail:any;
  author:string;
  constructor(values){
    if (typeof values === "object"){
      Object.assign(this, values);
    }
  }
}

