import express from 'express'
import Menu from './../models/menu'
const router = express.Router();

router.get('/api/list', function (req, res) {
   const data = [
    {
      id: 1,
      title: "轮播",
      _key: "/sowing",
      icon: "home",
      parentID: 0,
      children: ""
    },
    {
      id: 2,
      title: "栏目",
      _key: "/hot",
      icon: "appstore",
      parentID: 0,
      children: [
        {
          id: 5,
          title: "今日热门",
          _key: "/hot/hotOne",
          icon: "appstore",
          parentID: "4",
        },
        {
          id: 6,
          title: "奋斗新时代",
          _key: "/hot/hotTwo",
          icon: "appstore",
          parentID: 4,
        },
        {
          id: 7,
          title: "让新闻离你更近",
          _key: "/hot/hotThree",
          icon: "appstore",
          parentID: 4,
        },
        {
          id: 8,
          title: "吃播来了！",
          _key: "/hot/hotFour",
          icon: "appstore",
          parentID: 4,
        },
        {
          id:9,
          title: "猜你喜欢",
          _key: "/hot/hotFive",
          icon: "appstore",
          parentID: 4,
        }
      ]
    }];
   res.json({
    status: 200,
    data
    })
}
)

module.exports=router
