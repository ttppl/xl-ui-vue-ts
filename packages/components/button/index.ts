import Button from './src/Button.vue'

Button.install = (App) => {
  App.component(Button.name, Button)
}

export default Button
