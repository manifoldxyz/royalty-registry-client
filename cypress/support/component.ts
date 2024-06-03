import './commands'
import { mount } from 'cypress/vue2'
import Vuex from 'vuex'
import store from '../../src/store/index'

Cypress.Commands.add('mount', (component, options = {}) => {
  // Setup options object
  options.extensions = options.extensions || {}
  options.extensions.plugins = options.extensions.plugins || []

  // Use store passed in from options, or initialize a new one
  options.store = options.store || store

  // Add Vuex plugin
  options.extensions.plugins.push(Vuex)

  return mount(component, options)
})