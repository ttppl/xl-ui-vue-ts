import Card from './src/Card.vue'

Card.install = (App) => {
  App.component(Card.name, Card)
}

export default Card
