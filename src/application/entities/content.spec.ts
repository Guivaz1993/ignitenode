import { Content } from './content';
describe('Notification Content', () => {
  it('it should be able to create a notification content', () => {
    const content = new Content('Você recebeu uma solicitação de amizade');

    expect(content).toBeTruthy();
  });

  it('it should be not able to create a notification content with less than 5 characters', () => {
    expect(() => new Content('Você')).toThrowError();
  });

  it('it should be not able to create a notification content with more than 240 characters', () => {
    expect(() => new Content('V'.repeat(241))).toThrowError();
  });
});
