// Vendor
// APP
import { EntityUtils } from './../../utils/entity-utils/EntityUtils';
import { EntityLabelService } from './EntityLabelService';

describe('Service: EntityLabelService', () => {
    let entityLabelService: EntityLabelService;
    let mockConfig: any = {
        restUrl: 'REST_URL/',
    };
    let mockData: any;
    let httpMock: any;

    beforeEach(() => {
        entityLabelService = new EntityLabelService(null);
        httpMock = {
            get: () => {
                return {
                    subscribe: (res) => {
                        res({
                            data: mockData,
                        });
                    },
                };
            },
        };
        spyOn(httpMock, 'get').and.callThrough();
    });

    it('should initialize correctly.', () => {
        expect(entityLabelService.entityFieldList).toEqual(
            {
                'ClientCorporation': 'id,name',
                'Candidate': 'id,firstName,lastName',
                'ClientContact': 'id,firstName,lastName',
                'Lead': 'id,firstName,lastName',
                'JobOrder': 'id,title',
                'Opportunity': 'id,title',
                'Placement': 'id,candidate,jobOrder',
            },
        );
        expect(entityLabelService.queryEntityFieldList).toEqual(
            {
                'DistributionList': 'id,name',
                'CandidateSource': 'id,name',
            },
        );
    });

    describe('Method: getLabels(http, config, entity, values)', () => {
        it('should get data for a single person\'s record', () => {
            expect(entityLabelService.getLabels).toBeDefined();
            let mockEntity: string = 'Placement';
            let mockValues: any = { id: 1 };
            mockData = [
                { candidate: { firstName: 'Jane', lastName: 'Doe' } },
            ];
            entityLabelService.getLabels(httpMock, mockConfig, mockEntity, mockValues)
                .then((result: any) => {
                    expect(result).toBeDefined();
                    expect(result.label).toBe(`${mockData[0].candidate.firstName} ${mockData[0].candidate.lastName}`);
                });
            let expectedUrl: string = `${mockConfig.restUrl}search/${mockEntity}?fields=${entityLabelService.entityFieldList[mockEntity]}&query=id: ${mockValues.id}&count=500`;
            expect(httpMock.get).toHaveBeenCalledWith(expectedUrl);
        });
        it('should get a data array for multiple person entity records', () => {
            expect(entityLabelService.getLabels).toBeDefined();
            let mockEntity: string = 'Placement';
            let mockValues: any[] = [
                { id: 1 },
                { id: 2 },
                { id: 3 },
            ];
            mockData = [
                { candidate: { firstName: 'Jane', lastName: 'Doe' } },
                { candidate: { firstName: 'Jon', lastName: 'Smith' } },
                { candidate: { firstName: 'Jen', lastName: 'Miller' } },
            ];
            entityLabelService.getLabels(httpMock, mockConfig, mockEntity, mockValues)
                .then((result: any[]) => {
                    expect(result.length).toBe(3);
                    expect(result[0].label).toBe(`${mockData[0].candidate.firstName} ${mockData[0].candidate.lastName}`);
                    expect(result[1].label).toBe(`${mockData[1].candidate.firstName} ${mockData[1].candidate.lastName}`);
                    expect(result[2].label).toBe(`${mockData[2].candidate.firstName} ${mockData[2].candidate.lastName}`);
                });
            let mockIds: number[] = mockValues.map((item) => {
                return item.id;
            });
            let expectedUrl: string = `${mockConfig.restUrl}search/${mockEntity}?fields=${entityLabelService.entityFieldList[mockEntity]}&query=id: ${mockIds.join(' ')}&count=500`;
            expect(httpMock.get).toHaveBeenCalledWith(expectedUrl);
        });
        it('should resolve to an empty array if data is unavailable', () => {
            expect(entityLabelService.getLabels).toBeDefined();
            let mockEntity: string = 'Placement';
            let mockValues: any = { id: 1 };
            mockData = [];
            entityLabelService.getLabels(httpMock, mockConfig, mockEntity, mockValues)
                .then((result: any[]) => {
                    expect(result).toBeDefined();
                    expect(result.length).toBe(0);
                });
            let expectedUrl: string = `${mockConfig.restUrl}search/${mockEntity}?fields=${entityLabelService.entityFieldList[mockEntity]}&query=id: ${mockValues.id}&count=500`;
            expect(httpMock.get).toHaveBeenCalledWith(expectedUrl);
        });
        it('should handle errors', () => {
            expect(entityLabelService.getLabels).toBeDefined();
            httpMock = {
                get: () => {
                    return {
                        subscribe: (res, rej) => {
                            rej();
                        },
                    };
                },
            };
            spyOn(httpMock, 'get').and.callThrough();
            let mockEntity: string = 'Placement';
            let mockValues: any = { id: 1 };
            entityLabelService.getLabels(httpMock, mockConfig, mockEntity, mockValues)
                .then((result: any[]) => {
                    expect(result).toBeDefined();
                    expect(result.length).toBe(0);
                });
            let expectedUrl: string = `${mockConfig.restUrl}search/${mockEntity}?fields=${entityLabelService.entityFieldList[mockEntity]}&query=id: ${mockValues.id}&count=500`;
            expect(httpMock.get).toHaveBeenCalledWith(expectedUrl);
        });
    });

    describe('Method: getMultipleLabels(http, config, values)', () => {
        it('should get data for a single person\'s record', () => {
            expect(entityLabelService.getMultipleLabels).toBeDefined();
            let mockValues: any[] = [
                { id: 1, searchEntity: 'Candidate' },
                { id: 2, searchEntity: 'ClientContact' },
                { id: 3, searchEntity: 'JobOrder' },
                { id: 4, searchEntity: 'Placement' },
            ];
            mockData = [
                { candidate: { firstName: 'Jane', lastName: 'Doe' } },
            ];
            entityLabelService.getMultipleLabels(httpMock, mockConfig, mockValues)
                .then((response) => {
                    expect(response.length).toBe(4);
                });
        });
    });

    describe('Method: getPersonLabels(http, config, values, fields)', () => {
        it('should get data for a single person\'s record', () => {
            expect(entityLabelService.getPersonLabels).toBeDefined();
            let mockValues: any = { id: 1 };
            mockData = [
                { firstName: 'Jane', lastName: 'Doe' },
            ];
            entityLabelService.getPersonLabels(httpMock, mockConfig, mockValues)
                .then((result: any) => {
                    expect(result).toBeDefined();
                    expect(result.label).toBe(`${mockData[0].firstName} ${mockData[0].lastName}`);
                });
            let expectedUrl: string = `${mockConfig.restUrl}query/Person?fields=id,firstName,lastName&where=id = ${mockValues.id}&count=500`;
            expect(httpMock.get).toHaveBeenCalledWith(expectedUrl);
        });
        it('should handle custom fields', () => {
            expect(entityLabelService.getPersonLabels).toBeDefined();
            let mockValues: any = { id: 1 };
            mockData = [
                { firstName: 'Jim', lastName: 'Foe' },
            ];
            let mockFields: string = 'id,email';
            entityLabelService.getPersonLabels(httpMock, mockConfig, mockValues, mockFields)
                .then((result: any) => {
                    expect(result).toBeDefined();
                    expect(result.label).toBe(`${mockData[0].firstName} ${mockData[0].lastName}`);
                });
            let expectedUrl: string = `${mockConfig.restUrl}query/Person?fields=id,email&where=id = ${mockValues.id}&count=500`;
            expect(httpMock.get).toHaveBeenCalledWith(expectedUrl);
        });
        it('should get a data array for a single person entity record', () => {
            expect(entityLabelService.getPersonLabels).toBeDefined();
            let mockValues: any[] = [
                { id: 1 },
            ];
            mockData = [
                { firstName: 'Jane', lastName: 'Doe' },
            ];
            entityLabelService.getPersonLabels(httpMock, mockConfig, mockValues)
                .then((result) => {
                    expect(result).toBeDefined();
                    expect(result[0].label).toBe(`${mockData[0].firstName} ${mockData[0].lastName}`);
                });
            let expectedUrl: string = `${mockConfig.restUrl}query/Person?fields=id,firstName,lastName&where=id IN (1)&count=500`;
            expect(httpMock.get).toHaveBeenCalledWith(expectedUrl);
        });
        it('should ignore null values in the data array', () => {
            expect(entityLabelService.getPersonLabels).toBeDefined();
            let mockValues: any[] = [
                { id: 1 },
                {},
            ];
            mockData = [
                { firstName: 'Jane', lastName: 'Doe' },
            ];
            entityLabelService.getPersonLabels(httpMock, mockConfig, mockValues)
                .then((result) => {
                    expect(result).toBeDefined();
                    expect(result[0].label).toBe(`${mockData[0].firstName} ${mockData[0].lastName}`);
                });
            let expectedUrl: string = `${mockConfig.restUrl}query/Person?fields=id,firstName,lastName&where=id IN (1)&count=500`;
            expect(httpMock.get).toHaveBeenCalledWith(expectedUrl);
        });
        it('should ignore null id values in the data array', () => {
            expect(entityLabelService.getPersonLabels).toBeDefined();
            let mockValues: any[] = [
                { id: 1 },
                { id: null },
            ];
            mockData = [
                { firstName: 'Jane', lastName: 'Doe' },
            ];
            entityLabelService.getPersonLabels(httpMock, mockConfig, mockValues)
                .then((result) => {
                    expect(result).toBeDefined();
                    expect(result[0].label).toBe(`${mockData[0].firstName} ${mockData[0].lastName}`);
                });
            let expectedUrl: string = `${mockConfig.restUrl}query/Person?fields=id,firstName,lastName&where=id IN (1)&count=500`;
            expect(httpMock.get).toHaveBeenCalledWith(expectedUrl);
        });
        it('should get a data array for multiple person entity records', () => {
            expect(entityLabelService.getPersonLabels).toBeDefined();
            let mockValues: any[] = [
                { id: 1 },
                { id: 2 },
                { id: 3 },
            ];
            mockData = [
                { firstName: 'Jane', lastName: 'Doe' },
                { firstName: 'Jon', lastName: 'Smith' },
                { firstName: 'Jen', lastName: 'Miller' },
            ];
            entityLabelService.getPersonLabels(httpMock, mockConfig, mockValues)
                .then((result: any[]) => {
                    expect(result.length).toBe(3);
                    expect(result[0].label).toBe(`${mockData[0].firstName} ${mockData[0].lastName}`);
                    expect(result[1].label).toBe(`${mockData[1].firstName} ${mockData[1].lastName}`);
                    expect(result[2].label).toBe(`${mockData[2].firstName} ${mockData[2].lastName}`);
                });
            let mockIds: number[] = mockValues.map((item) => {
                return item.id;
            });
            let expectedUrl: string = `${mockConfig.restUrl}query/Person?fields=id,firstName,lastName&where=id IN (${mockIds.join(',')})&count=500`;
            expect(httpMock.get).toHaveBeenCalledWith(expectedUrl);
        });
        it('should resolve to an empty array if data is unavailable', () => {
            expect(entityLabelService.getPersonLabels).toBeDefined();
            let mockValues: any = { id: 1 };
            mockData = [];
            entityLabelService.getPersonLabels(httpMock, mockConfig, mockValues)
                .then((result: any[]) => {
                    expect(result).toBeDefined();
                    expect(result.length).toBe(0);
                });
            let expectedUrl: string = `${mockConfig.restUrl}query/Person?fields=id,firstName,lastName&where=id = ${mockValues.id}&count=500`;
            expect(httpMock.get).toHaveBeenCalledWith(expectedUrl);
        });
        it('should handle errors', () => {
            expect(entityLabelService.getPersonLabels).toBeDefined();
            httpMock = {
                get: () => {
                    return {
                        subscribe: (res, rej) => {
                            rej();
                        },
                    };
                },
            };
            spyOn(httpMock, 'get').and.callThrough();
            let mockValues: any = { id: 1 };
            entityLabelService.getPersonLabels(httpMock, mockConfig, mockValues)
                .then((result: any[]) => {
                    expect(result).toBeDefined();
                    expect(result.length).toBe(0);
                });
            let expectedUrl: string = `${mockConfig.restUrl}query/Person?fields=id,firstName,lastName&where=id = ${mockValues.id}&count=500`;
            expect(httpMock.get).toHaveBeenCalledWith(expectedUrl);
        });
    });

    describe('Method: setItemLabel(entity, item)', () => {
        let item: any;
        let entity: any;
        it('should set label with id and title for JobOrder entity', () => {
            // arrange
            entity = 'JobOrder';
            item = {
                id: 123,
                title: 'mockTitle',
            };
            // act
            item = entityLabelService.setItemLabel(entity, item);
            // assert
            expect(item.label).toEqual('123: mockTitle');
        });
        it('should set label with id for JobOrder when title is absent', () => {
            // arrange
            entity = 'JobOrder';
            item = {
                id: 123,
            };
            // act
            item = entityLabelService.setItemLabel(entity, item);
            // assert
            expect(item.label).toEqual(123);
        });
        it('should set label via EntityUtils for entities besides JobOrder and Opportunity', () => {
            // arrange
            entity = 'Candidate';
            item = {};
            spyOn(EntityUtils, 'getEntityLabel').and.returnValue('mockLabel');
            // act
            item = entityLabelService.setItemLabel(entity, item);
            // assert
            expect(item.label).toEqual('mockLabel');
        });
    });
});
