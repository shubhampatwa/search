import { Controller, Get, Query } from '@nestjs/common';
import { SearchDTO } from './search.dto';
import { IClinicData } from './search.interface';
import { SearchService } from './search.service';

@Controller()
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @Get('search')
  search(@Query() searchObject: SearchDTO): Promise<IClinicData[]> {
    return this.searchService.search(searchObject);
  }
}
