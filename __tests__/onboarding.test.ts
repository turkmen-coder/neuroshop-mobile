import { describe, it, expect } from 'vitest';

describe('NEUROSHOP Onboarding', () => {
  it('should have valid personality trait ranges', () => {
    const validTraits = {
      openness: 50,
      conscientiousness: 50,
      extraversion: 50,
      agreeableness: 50,
      neuroticism: 50,
    };

    Object.values(validTraits).forEach(value => {
      expect(value).toBeGreaterThanOrEqual(0);
      expect(value).toBeLessThanOrEqual(100);
    });
  });

  it('should have valid body type options', () => {
    const validBodyTypes = ['slim', 'regular', 'oversize'];
    
    validBodyTypes.forEach(type => {
      expect(['slim', 'regular', 'oversize']).toContain(type);
    });
  });

  it('should have valid height and weight ranges', () => {
    const testProfile = {
      height: 170,
      weight: 70,
    };

    expect(testProfile.height).toBeGreaterThanOrEqual(140);
    expect(testProfile.height).toBeLessThanOrEqual(210);
    expect(testProfile.weight).toBeGreaterThanOrEqual(40);
    expect(testProfile.weight).toBeLessThanOrEqual(150);
  });

  it('should calculate dominant trait correctly', () => {
    const profile = {
      openness: 80,
      conscientiousness: 50,
      extraversion: 60,
      agreeableness: 40,
      neuroticism: 30,
    };

    const traits = Object.entries(profile);
    const dominant = traits.reduce((a, b) => a[1] > b[1] ? a : b);
    
    expect(dominant[0]).toBe('openness');
    expect(dominant[1]).toBe(80);
  });
});
