import { Body, Controller, Post, Res, UseGuards } from '@nestjs/common';
import { AuctionService } from './auctions.service';
import { CreateAuctionDto } from './dtos/create-auction.dto';
import { Response } from 'express';
import { AuthGuard } from 'src/auth/guard/auth.guard';

@Controller('api/auctions')
export class AuctionController {
  constructor(private readonly service: AuctionService) {}

  @UseGuards(AuthGuard)
  @Post()
  async createAuction(
    @Body() createAuction: CreateAuctionDto,
    @Res() res: Response,
  ) {
    const auction = await this.service.createAuction(createAuction);
    return res.status(200).json({
      id: auction.id,
      title: auction.title,
      startingPrice: auction.startingPrice,
    });
  }
}
