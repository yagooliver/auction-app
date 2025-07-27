export class CreateAuctionDto {
  title: string;
  startingPrice: number;
  endsAt: Date;
  ownerId: string;
  productId: string;
}
