import mongoose from 'mongoose'

const menuSchema = mongoose.Schema({
  data: [
    {
      id: Number,
      title: String,
      _key: String,
      icon: String,
      parentID: Number,
      children: String
    },
    {
      id: Number,
      title: String,
      _key: String,
      icon: String,
      parentID: Number,
      children: [
        {
          id: Number,
          title: String,
          _key: String,
          icon: String,
          parentID: Number,
        },
        {
          id: Number,
          title: String,
          _key: String,
          icon: String,
          parentID: Number,
        }
      ]
  }]
}) 

const Menu = mongoose.model('menu', menuSchema)
export default Menu