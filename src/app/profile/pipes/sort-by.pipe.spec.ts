import { SortByPipe } from './sort-by.pipe';
import { Host } from '../host';
import { SortOrder } from './sort-order';

const host1: Host = { id: 4, name: 'Phil' };
const host2: Host = { id: 1, name: 'Nick' };
const host3: Host = { id: 3, name: 'Oliver' };
const host4: Host = { id: 5, name: 'Jon' };
const host5: Host = { id: 2, name: 'Dan' };

const hosts: Host[] = [
  host1,
  host2,
  host3,
  host4,
  host5
];

describe('SortByPipe', () => {
  let pipe: SortByPipe;

  beforeEach(() => {
    pipe = new SortByPipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should sort alphabetically by id ascending', () => {
    const transformedProfiles = pipe.transform(hosts, SortOrder.Ascending, 'id');
    expect(transformedProfiles).toEqual([host2, host5, host3, host1, host4]);
  });

  it('should sort alphabetically by name ascending', () => {
    const transformedProfiles = pipe.transform(hosts, SortOrder.Ascending, 'name');
    expect(transformedProfiles).toEqual([host5, host4, host2, host3, host1]);
  });

  it('should sort alphabetically by id descending', () => {
    const transformedProfiles = pipe.transform(hosts, SortOrder.Descending, 'id');
    expect(transformedProfiles).toEqual([host4, host1, host3, host5, host2]);
  });

  it('should sort alphabetically by name descending', () => {
    const transformedProfiles = pipe.transform(hosts, SortOrder.Descending, 'name');
    expect(transformedProfiles).toEqual([host1, host3, host2, host4, host5]);
  });
});
