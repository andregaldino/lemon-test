const units = require('./units')

const calculateTax = (icms) => {
  const { kwhReais, pis, cofins } = units
  return kwhReais / (1 - (pis + cofins + icms))
}

const calculateUsageIcms = () => {
  const { listIcms } = units
  return listIcms.map(el => {
    const kwhReais = calculateTax(el.icms)
    return {
      kwhReais,
      icms: el.icms,
      min: kwhReais * el.start,
      max: kwhReais * el.end,
      start: el.start,
      end: el.end,
      possibleCips: cipByIcms(el)
    }
  })
}

const cipByIcms = (icms) => {
  const { listCips } = units
  return listCips.filter(el => icms.end > el.start)
    .filter(el => icms.start < el.end)
}

const findIcms = (total, listIcms) => listIcms.find(tax =>
  tax.possibleCips.filter(el =>
    (total - el.reais) <= tax.max &&
    (total - el.reais) >= tax.min
  ).length
)

const findCip = (icms, total) => {
  const { possibleCips } = icms
  return possibleCips.find(el => {
    const fare = (total - el.reais) / icms.kwhReais
    if (fare >= el.start && fare <= el.end) return el

    return undefined
  })
}

const calculateKwh = ({ kwhReais, cip, total }) =>
  (total - cip) / kwhReais

const formatKwh = (kwh) => Math.round(kwh)

const formatPercent = (percent) => percent * 100

module.exports.calc = (total) => {

  const icmsTax = findIcms(total, calculateUsageIcms())
  const cip = findCip(icmsTax, total)
  const kwh = calculateKwh({
    kwhReais: icmsTax.kwhReais,
    cip: cip.reais,
    total
  })

  return {
    cip: cip.reais,
    icms: formatPercent(icmsTax.icms),
    kwh: formatKwh(kwh)
  }
}
