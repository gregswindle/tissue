
const initFormatType = () => {
  const format = {
  }
  format.CSV = 'CSV'
  format.JSON = 'JSON'
  return format
}

const initResourceType = () => {
  const resource = {
  }
  resource.ALL = 'ALL'
  resource.ISSUE = 'ISSUE'
  resource.ISSUES = 'ISSUE'
  resource.PR = 'PULL_REQUEST'
  resource.PRS = 'PULL_REQUEST'
  resource.PULL_REQUEST = 'PULL_REQUEST'
  resource.PULL_REQUESTS = 'PULL_REQUEST'
  return resource
}

const exportType = {
  'format': initFormatType(),
  'resource': initResourceType()
}

module.exports = exportType
