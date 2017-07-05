
export function search (items, text, fields) {
  // RegExps
  const finalText = text.trim()
  const words = { reg: new RegExp(`${finalText.replace(/\s+/g, '|')}`, 'gi'), weight: 1 }
  const normal = { reg: new RegExp(finalText, 'gi'), weight: 1000 }
  const exact = { reg: new RegExp(`^${finalText}$`, 'i'), weight: 100000 }
  // Order is important, the first reg is eliminatory
  // Here it's the most fuzzy one
  const regs = [words, normal, exact]

  const includedItems = []
  items.forEach(item => {
    let score = 0

    // RegExps
    for (let i = 0; i < regs.length; i++) {
      const reg = regs[i]
      let regScore = 0

      // Fields
      for (const f of fields) {
        const value = f.field(item)
        if (value) {
          const matched = value.match(reg.reg)
          if (matched) {
            regScore += matched.length * f.weight
          }
        }
      }

      // The first regexp is eliminatory
      if (i === 0 && regScore === 0) {
        return false
      }

      // Matching score
      score += regScore * reg.weight
    }

    // Don't pollute the original array with score info
    includedItems.push({
      item,
      score,
    })
  })

  // This should be quite fast
  includedItems.sort((a, b) => b.score - a.score)

  return includedItems.map(result => result.item)
}
