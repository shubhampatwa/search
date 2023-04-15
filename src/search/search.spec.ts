import { Test, TestingModule } from '@nestjs/testing';
import { plainToInstance } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';
import { SearchController } from './search.controller';
import { SearchDTO } from './search.dto';
import { SearchService } from './search.service';
import { invalidMock1, mock1, mock2, mock3, mock4, mock5, mock6, mock7 } from './__test__/mocks';

describe('AppController', () => {
  let module: TestingModule
  let searchController: SearchController;
  let searchService: SearchService;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      controllers: [SearchController],
      providers: [SearchService],
    }).compile();

    searchController = module.get<SearchController>(SearchController);
    searchService = module.get<SearchService>(SearchService);
    await module.init();
    
  });

  afterEach(async () => await module.close());

  describe('root', () => {
    it('Search Controller should be defined', () => {
      expect(searchController.search(mock7)).toBeDefined();
    });

    it('Search Service should be defined', () => {
      expect(searchService.search(mock7)).toBeDefined();
    });

    it('Search Service should be return data', async () => {
      const result = await searchService.search({});
      expect(result.length).toEqual(15);
    });

    it('Search Service should be return data when only query with name', async () => {
      const result = await searchService.search(mock1);
      expect(result.length).toEqual(1);
      expect(result[0].name).toBeDefined();
      expect(result[0].stateName).toBeDefined();
      expect(result[0].availability).toBeDefined();
    });

    it('Search Service should be return data when only query with stateName', async () => {
      const result = await searchService.search(mock2);
      expect(result.length).toEqual(2);
      result.forEach(clinic => {
        expect(clinic.name).toBeDefined();
        expect(clinic.stateName).toBeDefined();
        expect(clinic.availability).toBeDefined();
      })
    });

    it('Search Service should be return data when only query with availability', async () => {
      const result = await searchService.search(mock3);
      expect(result.length).toEqual(10);
      result.forEach(clinic => {
        expect(clinic.name).toBeDefined();
        expect(clinic.stateName).toBeDefined();
        expect(clinic.availability).toBeDefined();
      })
    });

    it('Search Service should be return data when query with name and stateName', async () => {
      const result = await searchService.search(mock4);
      expect(result.length).toEqual(1);
    });

    it('Search Service should be return data when query with name and availability', async () => {
      const result = await searchService.search(mock5);
      expect(result.length).toEqual(1);
    });

    it('Search Service should be return data when query with stateName and availability', async () => {
      const result = await searchService.search(mock6);
      expect(result.length).toEqual(1);
    });

    it('Search Service should be return data when query with name, stateName and availability', async () => {
      const result = await searchService.search(mock7);
      expect(result.length).toEqual(2);
    });

    it('Search Service should be throw error when query with invalid availability', async () => {
      const searchDtoObject = plainToInstance(SearchDTO, invalidMock1);
      const errors = await validate(searchDtoObject);
      expect(errors.length).not.toBe(0);
      expect(stringified(errors)).toContain(`Availabilty is not valid and please choose from and to key in frame of 0:00 - 23:59`);
    });

    it('Search Service should be throw error when query with invalid availability', async () => {
      const searchDtoObject = plainToInstance(SearchDTO, invalidMock1);
      const errors = await validate(searchDtoObject);
      expect(errors.length).not.toBe(0);
      expect(stringified(errors)).toContain(`Availabilty is not valid and please choose from and to key in frame of 0:00 - 23:59`);
    });
  });
});

const stringified = (errors: ValidationError[]): string => JSON.stringify(errors);
