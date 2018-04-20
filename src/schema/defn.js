const defn = (name, ...forms) => {
  const defineInvocation = (...args) => ({
    '@meta': {
      type: 'invoke'
    },
    args,
  })
  defineInvocation['@meta'] = {
    type: 'fn'
  }
  defineInvocation['@data'] = {
    forms,
    eval: async () => {}
  }
  return defineInvocation
}

export default defn
