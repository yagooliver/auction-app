export class PlaceBid {
  constructor(
    public auctionId: string,
    public price: number,
    public user: string,
  ) {
    this.createdAt = new Date();
  }

  createdAt: Date;

  toJSON() {
    return {
      auctionId: this.auctionId,
      price: this.price,
      user: this.user,
      createdAt: this.createdAt,
    };
  }
}
