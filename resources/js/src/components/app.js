require('./bootstrap')
import React from 'react'
import ReactRenderer from './src/ReactRenderer'

import MySimpleComponent from 'components/MySimpleComponent'

const components = [
  {
    name: "MySimpleComponent",
    component: <MySimpleComponent />,
  },
]

new ReactRenderer(components).renderAll()