const chai = require('chai');
const Logger = require('./logger');

chai.should();

describe('log', () => {
  let logger;
  beforeEach(() => {
    logger = new Logger();
  });
  describe('should persist message', () => {
    it('on call', () => {
      // When
      const expectedMessage = 'Message text';
      logger.log(expectedMessage);
      // Then
      logger.messages[0].should.eq(expectedMessage);
    });
    it('in-between calls', () => {
      // Given
      const firstMessage = 'Message text 1';
      logger.log(firstMessage);
      // When
      const secondMessage = 'Message text 2';
      logger.log(secondMessage);
      // Then
      logger.messages[0].should.eq(firstMessage);
    });
  });
});
