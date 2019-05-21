export class User {
  public _id: string;
  public name: string;
  public email: string;
  public access: string;

  constructor(user: any) {
    this._id = user._id;
    this.name = user.name;
    this.email = user.email;
    this.access = user.access;
  }
}
