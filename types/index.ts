interface Material {
  productID: number;
  count: number;
}

export default interface Product {
  name: string;
  id: number;
  imageURL: string;
  materials: Material[];
  quantity: number;
}