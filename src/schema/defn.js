const defn = (...forms) => {
  return {
    '@meta': {
      type: 'fn'
    },
    forms,
    eval: async () => {}
  }
}

export default defn
