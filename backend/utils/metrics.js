const metrics = {
  requestsTotal: 0,
  errorsTotal: 0,
  requestDurationMsSum: 0,
  requestDurationMsCount: 0
}

const observeRequest = (durationMs) => {
  metrics.requestsTotal += 1
  metrics.requestDurationMsSum += durationMs
  metrics.requestDurationMsCount += 1
}

const observeError = () => {
  metrics.errorsTotal += 1
}

const metricsText = () => {
  const avg = metrics.requestDurationMsCount > 0 ? metrics.requestDurationMsSum / metrics.requestDurationMsCount : 0
  return [
    `roomnook_requests_total ${metrics.requestsTotal}`,
    `roomnook_errors_total ${metrics.errorsTotal}`,
    `roomnook_request_duration_ms_sum ${metrics.requestDurationMsSum}`,
    `roomnook_request_duration_ms_count ${metrics.requestDurationMsCount}`,
    `roomnook_request_duration_ms_avg ${avg}`
  ].join('\n')
}

module.exports = { observeRequest, observeError, metricsText }