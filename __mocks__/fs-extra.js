const fsExtra = jest.genMockFromModule('fs-extra')

fsExtra.outputFile = jest
  .fn()
  .mockReturnValueOnce(Promise.resolve(true))
  .mockReturnValueOnce(Promise.reject(new Error('mock')))

module.exports = fsExtra
