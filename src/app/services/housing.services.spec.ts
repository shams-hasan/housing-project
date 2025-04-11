import { TestBed } from '@angular/core/testing';
import { HousingService } from './housing.services';
import { HousingModel } from '../models/housing.model';
describe('HousingService', () => {

    let service: HousingService; 

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [HousingService] 
        });
        service = TestBed.inject(HousingService); 
    });

    const mockData: HousingModel[] = [
        {
            id: 1, name: 'House 1',
            city: 'Gainesville',
            state: 'GA',
            photo: '',
            availableUnits: 0,
            wifi: false,
            laundry: false
        },
        {
            id: 2, name: 'House 2',
            city: 'Washington D.C',
            state: 'Washington',
            photo: '',
            availableUnits: 0,
            wifi: false,
            laundry: false
        }
    ];

    it('should fetch and parse housing locations correctly', async () => {
        spyOn(window, 'fetch').and.returnValue(Promise.resolve({
            json: () => Promise.resolve(mockData)
        } as Response));

        const result = await service.getAllHousingLocations();

        expect(result).toEqual(mockData); 
        expect(window.fetch).toHaveBeenCalledWith(service.url); 
    });

    it('should return housing location by ID when houses are already loaded', async () => {
        
        const idToFind = 2;
        const result = await service.getHousingLocationById(idToFind);
    
        expect(result).toBeDefined();
        expect(result?.id).toBe(idToFind);
      });
    
      it('should return undefined for non-existing ID when houses are already loaded', async () => {
        const idToFind = 999;
        const result = await service.getHousingLocationById(idToFind);
    
        // Assert
        expect(result).toBeUndefined();
      });


it('should log first name, last name, and email', () => {
    const consoleSpy = spyOn(console, 'log'); 

    const firstName = 'Susan';
    const lastName = 'Kloak';
    const email = 'susan.kloak@gmail.com';

    service.submitApplication(firstName, lastName, email);

    expect(consoleSpy).toHaveBeenCalledWith(firstName, lastName, email);
  });


});
