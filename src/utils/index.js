
// base method
export function isArray(val) {
  return Array.isArray(val);
}

// vue method
let rootInstance = null

export function registRootInstance(vm) {
  if (!vm) return
  rootInstance = vm
}

export function warn(msg) {
  if (process.env === 'development') {
    console.error(`frontend error: ${msg}`)
  }

  if (rootInstance && rootInstance.$message) {
    rootInstance.$message.error(msg)
  } else {
    console.warn('$message失败，rootInstance 未注册')
  }
}
