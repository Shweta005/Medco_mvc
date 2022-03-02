export interface Iorder {
  oid:number,
  pid:number [],
  uid:number,
  totalprice:number,
  quantity: number,
  address: string,
  ordereddate: Date,
  deliverydate:Date,
  coupen:string,
  orderstatus: string
}
