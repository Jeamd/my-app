import type {SourceJsonItem} from './index'
// export const preData = {
//     "person": {
//       "name": "Alice",
//       "age": 25,
//       "isStudent": true,
//       "address": {
//         "street": "456 Elm St",
//         "city": "Sometowns",
//         "country": "Canada",
//         "coordinates": {
//           "latitude": 43.6532,
//           "longitude": -79.3832
//         }
//       },
//     },
//     "interests": [
//         {
//             "name": "Reading",
//             "type": "Indoor"
//         },
//         {
//             "name": "Hiking",
//             "type": "Outdoors",
//             "locations": [
//             {
//                 "name": "main Peak",
//                 "altitude": 40000
//             },
//             {
//                 "name": "Forest Traiddddl",
//                 "altitude": 80088888
//             }
//             ]
//         }
//     ],
//   }


// export const curData = {
//     "person": {
//       "name": "Alice2",
//       "age": 25,
//       "isStudent": true,
//       "address": {
//         "street": "456 Elm St",
//         "city": "Sometowns牛逼",
//         "country": "Canada",
//         "coordinates": {
//           "latitude": 43.6532,
//           "longitude": -79.3832
//         }
//       },
//     },
//     "interests": [
//         {
//             "name": "Reading",
//             "type": "Indoor"
//         },
//         {
//             "name": "Hiking",
//             "type": "Outdoor",
//             "locations": [
//             {
//                 "name": "<Mount222></Mount222>ain Peak",
//                 "altitude": 40000
//             },
//             {
//                 "name": "Forest Traiddddl",
//                 "altitude": 80088888
//             }
//             ]
//         }
//     ],
//   }

// export const sourceJsonMap: SourceJsonItem[] = [
//     {
//         dataIndex: 'person',
//         title: '人群',
//         childrenSourceJson: [
//             {
//                 dataIndex: 'name',
//                 title: '姓名',
//             },
//             {
//                 dataIndex: 'age',
//                 title: '年龄',
//             },
//             {
//                 dataIndex: 'isStudent',
//                 title: '是否是学生',
//             },
//             {
//                 dataIndex: 'address',
//                 title: '地址',
//                 handelDiff: (preNode, curNode) => {
//                     const {street:preName, city: preAltitude} =  preNode;
//                     const {street:curName, city: curAltitude} =  curNode;
//                     if(preName + preAltitude !== curName + curAltitude) return true
//                     return false;
//                 },
//                 childrenSourceJson: [
//                     {
//                         dataIndex: 'street',
//                         title: '街道',
//                     },
//                     {
//                         dataIndex: 'city',
//                         title: '城市',
//                     },
//                     {
//                         dataIndex: 'country',
//                         title: '国家',
//                     },
//                     {
//                         dataIndex: 'coordinates',
//                         title: '详细地址',
//                         childrenSourceJson:[{
//                             dataIndex: "longitude",
//                             title: '门牌号'
//                         }]
//                     },
//                 ]
//             },
//         ]
//     },
//     {
//         dataIndex: 'interests',
//         title: '兴趣',
//         childrenSourceJson:[
//             {
//                 dataIndex: 'name',
//                 title: '名称'
//             },
//             {
//                 dataIndex: 'type',
//                 title: '类型'
//             },
//             {
//                 dataIndex: 'locations',
//                 title: '地址',
//                 childrenSourceJson: [
//                     {
//                         dataIndex:'name',
//                         title: '地名',
//                     },
//                     {
//                         dataIndex:'altitude',
//                         title: '距离'
//                     }
//                 ]
//             }
//         ]
//     }
// ]

export const preData = {
    "skuList": [{
		"priceAndStockSource": 0,
		"skuExtAttrInfo": {
			"skuSetMealDetail": {
				"singleTimesPrice": 1200,
				"groups": [{
					"selectNum": 1,
					"setMealContents": [{
							"subContents": [],
							"price": 0,
							"serviceDuration": 0,
							"count": 1,
							"title": "单品名称"
						},
						{
							"subContents": [],
							"price": 0,
							"serviceDuration": 0,
							"count": 3,
							"title": "单品名称2"
						}
					],
					"title": "商品组名称",
					"fromNum": 2
				}],
				"remark": "",
				"title": "",
				"availableTimes": 10
			}
		},
		"skuSalePrice": 3300,
		"skuStatus": 1,
		"skuStock": 99999999,
		"todayStock": 0,
		"outerSkuId": "",
		"todayMarketPrice": 0,
		"todaySinglePrice": 0,
		"calendarPriceStock": [],
		"skuId": 100000943480658,
		"skuMarketPrice": 12000,
		"skuSpecifications": [],
		"storeCode": 0
	}],
}
export const curData = {
    "skuList": [{
		"outerSkuId": "",
		"skuMarketPrice": 12000,
		"skuSalePrice": 3300,
		"skuStock": 99999999,
		"skuId": 100000943480658,
		"skuExtAttrInfo": {
			"skuDinersCount": null,
			"skuSetMealDetail": {
				"availableTimes": 10,
				"singleTimesPrice": 1200,
				"groups": [{
					"title": "商品组名称22",
					"selectNum": 2,
					"fromNum": 4,
					"setMealContents": [{
						"title": "单品名称",
						"count": 12,
						"serviceDuration": 0
					}, {
						"title": "单品名称2",
						"count": 18,
						"serviceDuration": 0
					}]
				}],
				"remark": ""
			}
		}
	}],
}
export const sourceJsonMap: SourceJsonItem[] = [
    {
        dataIndex: 'skuList',
        title: 'sku列表',
        childrenSourceJson: [
            {
                dataIndex: 'outerSkuId',
                title: '其他Id',
            },
            {
                dataIndex: 'skuMarketPrice',
                title: '市场价格',
            },
            {
                dataIndex: 'skuSalePrice',
                title: '销售价格',
            },
            {
                dataIndex: 'skuStock',
                title: '库存',
            },
            {
                dataIndex: 'skuId',
                title: 'ID',
            },
            {
                dataIndex: 'skuExtAttrInfo',
                title: '额外信息',
                childrenSourceJson:[
                    {
                        dataIndex: 'skuDinersCount',
                        title: '就餐人数',
                    },
                    {
                        dataIndex: 'skuSetMealDetail',
                        title: '密封详细信息',
                        childrenSourceJson:[
                            {
                                dataIndex: 'availableTimes',
                                title: '可用时间',
                            },
                            {
                                dataIndex: 'singleTimesPrice',
                                title: '一倍价格',
                            },
                            {
                                dataIndex: 'groups',
                                title: '套餐详情',
                                // 合并子集diff结果
                                margeDiff:true,
                                childrenSourceJson:[
                                    {
                                        dataIndex: 'title',
                                        title: '名称',
                                    },
                                    {
                                        dataIndex: 'selectNum',
                                        title: '选择Num',
                                    },
                                    {
                                        dataIndex: 'fromNum',
                                        title: '弗洛姆',
                                    },
                                    {
                                        dataIndex: 'setMealContents',
                                        title: '设置测量内容',
                                        childrenSourceJson:[
                                            {
                                                dataIndex: 'title',
                                                title: '名称',
                                            },
                                            {
                                                dataIndex: 'count',
                                                title: '计数',
                                            },
                                            {
                                                dataIndex: 'serviceDuration',
                                                title: '服务',
                                            },
                                        ]
                                    },
                                ]
                            },
                        ]
                    },
                ]
            },
        ]
    }
]