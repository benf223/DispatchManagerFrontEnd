//constructor of location object
export class Location {
  constructor(
    public name: string,
    public address: string,
    public opentime: string,
    public closetime: string,
    public type: string,
	public require: boolean) {
  }
}
