import store from '@/store'

/**
 * @param {Array} value
 * @returns {Boolean}
 * @example see @/views/permission/directive.vue
 */
export default function checkPermission(value) {
  if (value) {
    const roles = store.getters && store.getters.permission_button
    const permissionRoles = value
    const hasPermission = roles.some(role => {
      if (role.buttonCode === permissionRoles) {
        return true
      }
    })

    if (!hasPermission) {
      return false
    }
    return true
  } else {
    return false
  }
}

