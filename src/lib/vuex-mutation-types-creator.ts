export default (types: string[], options: any = {}) => {
  let namespace: any

  if ("namespace" in options) {
    namespace = options["namespace"]
  }
  const container: any = {}

  types.forEach((type: string) => {
    container[type] = `${(namespace || '')}${type}`
  })

  return container
}
