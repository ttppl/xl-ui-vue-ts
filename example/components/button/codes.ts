export default {
  defaultStyle: `<XlButton>Base</XlButton>
<XlButton type="primary">primary</XlButton>
<XlButton type="warn">warn</XlButton>
<XlButton type="notice">notice</XlButton>
<XlButton type="black">black</XlButton>
<XlButton type="error">error</XlButton>
<XlButton type="success">success</XlButton>`,
  lightStyle: `<XlButton light-style>Base</XlButton>
<XlButton light-style type="primary">primary</XlButton>
<XlButton light-style type="warn">warn</XlButton>
<XlButton light-style type="notice">notice</XlButton>
<XlButton light-style type="black">black</XlButton>
<XlButton light-style type="error">error</XlButton>
<XlButton light-style type="success">success</XlButton>`,
  borderStyle: `<XlButton plain>Base</XlButton>
<XlButton plain type="primary">primary</XlButton>
<XlButton plain type="warn">warn</XlButton>
<XlButton plain type="notice">notice</XlButton>
<XlButton plain type="black">black</XlButton>
<XlButton plain type="error">error</XlButton>
<XlButton plain type="success">success</XlButton>`,
  circleStyle: `<XlButton circle>Base</XlButton>
<XlButton circle type="primary">primary</XlButton>
<XlButton circle type="warn">warn</XlButton>
<XlButton circle type="notice">notice</XlButton>
<XlButton circle type="black">black</XlButton>
<XlButton circle type="error">error</XlButton>
<XlButton circle type="success">success</XlButton>`,
  compositeStyle: '<XlButton light-style plain circle type="primary">primary</XlButton>',
  popStyle: '<XlButton light-style type="primary" :pop-style="{backgroundImage: \'linear-gradient(to right, #A3D9D7 , #3EDAD4)\'}">primary</XlButton>',
  label: '<XlButton light-style type="primary" label="自定义label" />',
  router: `<XlButton light-style type="primary" to="-1">back</XlButton>
<XlButton light-style type="primary" to="index">to index by name</XlButton>
<XlButton light-style type="primary" to="/">to index by path</XlButton>
<XlButton light-style type="primary" :to="{path:'/'}">to index by router object</XlButton>`

}
