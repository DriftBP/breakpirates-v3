import { SortByPipe } from './sort-by.pipe';
import { Host } from '../../profile/host';

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
    const transformedProfiles = pipe.transform(hosts, 'asc', 'id');
    expect(transformedProfiles[0]).toEqual(host2);
    expect(transformedProfiles[1]).toEqual(host5);
    expect(transformedProfiles[2]).toEqual(host3);
    expect(transformedProfiles[3]).toEqual(host1);
    expect(transformedProfiles[4]).toEqual(host4);
  });

  it('should sort alphabetically by name ascending', () => {
    const transformedProfiles = pipe.transform(hosts, 'asc', 'name');
    expect(transformedProfiles[0]).toEqual(host5);
    expect(transformedProfiles[1]).toEqual(host4);
    expect(transformedProfiles[2]).toEqual(host2);
    expect(transformedProfiles[3]).toEqual(host3);
    expect(transformedProfiles[4]).toEqual(host1);
  });

  it('should sort alphabetically by id descending', () => {
    const transformedProfiles = pipe.transform(hosts, 'desc', 'id');
    expect(transformedProfiles[0]).toEqual(host4);
    expect(transformedProfiles[1]).toEqual(host1);
    expect(transformedProfiles[2]).toEqual(host3);
    expect(transformedProfiles[3]).toEqual(host5);
    expect(transformedProfiles[4]).toEqual(host2);
  });

  it('should sort alphabetically by name descending', () => {
    const transformedProfiles = pipe.transform(hosts, 'desc', 'name');
    expect(transformedProfiles[0]).toEqual(host1);
    expect(transformedProfiles[1]).toEqual(host3);
    expect(transformedProfiles[2]).toEqual(host2);
    expect(transformedProfiles[3]).toEqual(host4);
    expect(transformedProfiles[4]).toEqual(host5);
  });
});
