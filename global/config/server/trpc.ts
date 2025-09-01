type rules = {
  invalidateAll: boolean
  exclude?: string[] // Exclude specific procedures
  includeOnly?: string[] // Include specific procedures
}

const invalidationRules: Record<string, rules> = {
  user: {
    invalidateAll: true,
  },
  data: {
    invalidateAll: true,
  },
}

export { invalidationRules }
