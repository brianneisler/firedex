const defn = (...forms) => ({
  '@meta': {
    type: 'fn'
  },
  forms,
  eval: async () => {}
})

export default defn
