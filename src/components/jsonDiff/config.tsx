import type {DiffDataItem, SourceJsonItem} from './index'
import jsonDiff from './index'
import { renderLabel } from './utils'
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

// export const preData = {
//     "skuList": [{
// 		"priceAndStockSource": 0,
// 		"skuExtAttrInfo": {
// 			"skuSetMealDetail": {
// 				"singleTimesPrice": 1200,
// 				"groups": [{
// 					"selectNum": 1,
//                     'choose': {
//                         total: 1,
//                         select: 1
//                     },
// 					"setMealContents": [{
// 							"subContents": [],
// 							"price": 0,
// 							"serviceDuration": 0,
// 							"count": 1,
// 							"title": "单品名称"
// 						},
// 						{
// 							"subContents": [],
// 							"price": 0,
// 							"serviceDuration": 0,
// 							"count": 3,
// 							"title": "单品名称2"
// 						}
// 					],
// 					"title": "商品组名称",
// 					"fromNum": 2
// 				}],
// 				"remark": "",
// 				"title": "",
// 				"availableTimes": 10
// 			}
// 		},
// 		"skuSalePrice": 3300,
// 		"skuStatus": 1,
// 		"skuStock": 99999999,
// 		"todayStock": 0,
// 		"outerSkuId": "",
// 		"todayMarketPrice": 0,
// 		"todaySinglePrice": 0,
// 		"calendarPriceStock": [],
// 		"skuId": 100000943480658,
// 		"skuMarketPrice": 12000,
// 		"skuSpecifications": [],
// 		"storeCode": 0
// 	}],
// }
// export const curData = {
//     "skuList": [{
// 		"outerSkuId": "",
// 		"skuMarketPrice": 12000,
// 		"skuSalePrice": 3300,
// 		"skuStock": 99999999,
// 		"skuId": 100000943480658,
// 		"skuExtAttrInfo": {
// 			"skuDinersCount": null,
// 			"skuSetMealDetail": {
// 				"availableTimes": 10,
// 				"singleTimesPrice": 1200,
// 				"groups": [{
// 					"title": "商品组名称22",
// 					"selectNum": 2,
// 					"fromNum": 4,
//                     'choose': {
//                         total: 3,
//                         select: 1
//                     },
// 					"setMealContents": [{
// 						"title": "单品名称",
// 						"count": 12,
// 						"serviceDuration": 0
// 					}, 
//                     {
// 						"title": "单品名称2",
// 						"count": 18,
// 						"serviceDuration": 0
// 					}],
// 				}],
// 				"remark": ""
// 			}
// 		}
// 	}],
// }
// export const sourceJsonMap: SourceJsonItem[] = [
//     {
//         dataIndex: 'skuList',
//         title: 'sku列表',
//         childrenSourceJson: [
//             {
//                 dataIndex: 'outerSkuId',
//                 title: '其他Id',
//             },
//             {
//                 dataIndex: 'skuMarketPrice',
//                 title: '市场价格',
//             },
//             {
//                 dataIndex: 'skuSalePrice',
//                 title: '销售价格',
//             },
//             {
//                 dataIndex: 'skuStock',
//                 title: '库存',
//             },
//             {
//                 dataIndex: 'skuId',
//                 title: 'ID',
//             },
//             {
//                 dataIndex: 'skuExtAttrInfo',
//                 title: '额外信息',
//                 childrenSourceJson:[
//                     {
//                         dataIndex: 'skuDinersCount',
//                         title: '就餐人数',
//                     },
//                     {
//                         dataIndex: 'skuSetMealDetail',
//                         title: '密封详细信息',
//                         childrenSourceJson:[
//                             {
//                                 dataIndex: 'availableTimes',
//                                 title: '可用时间',
//                             },
//                             {
//                                 dataIndex: 'singleTimesPrice',
//                                 title: '一倍价格',
//                             },
//                             {
//                                 dataIndex: 'groups',
//                                 title: '套餐详情',
//                                 // 合并子集diff结果
//                                 margeDiff:true,
//                                 childrenSourceJson:[
//                                     {
//                                         dataIndex: 'title',
//                                         title: '名称',
//                                     },
//                                     {
//                                         dataIndex: 'choose',
//                                         title: '几选几',
//                                         margeDiff: true,
//                                         // 自定义渲染需要合并子集diff 否则不生效
//                                         render: (value: any, item: DiffDataItem) => {

//                                             return <span key={value + 'new'}>{renderLabel(item.title)}: {value.total}选{value.select}</span>
//                                         }
//                                     },
//                                     {
//                                         dataIndex: 'selectNum',
//                                         title: '选择Num',
//                                     },
//                                     {
//                                         dataIndex: 'fromNum',
//                                         title: '弗洛姆',
//                                     },
//                                     {
//                                         dataIndex: 'setMealContents',
//                                         title: '设置测量内容',
//                                         childrenSourceJson:[
//                                             {
//                                                 dataIndex: 'title',
//                                                 title: '名称',
//                                             },
//                                             {
//                                                 dataIndex: 'count',
//                                                 title: '计数',
//                                             },
//                                             {
//                                                 dataIndex: 'serviceDuration',
//                                                 title: '服务',
//                                             },
//                                         ]
//                                     },
//                                 ]
//                             },
//                         ]
//                     },
//                 ]
//             },
//         ]
//     }
// ]

export const curData = {
    "itemId": 100000916460658,
    "categoryId": 20100009,
    "itemTypeCode": 1,
    "itemTitle": "123456789",
    "itemCarouselUrls": [
        "https://im-kim.staging.kuaishou.com/gateway/pc/unified/common/file/safe?bizType=locallife_item_photo&timestamp=1716367294560&ticket=Ciprd2Fpc2hvcC51bmlmaWVkLnNhZmUubG9jYWxsaWZlX2l0ZW1fcGhvdG8S4AHs13h-vwZnO66v5KMk5pbhXJofvkZv59UXa8oezNGSsUidBqOMRVL0CWZYtH-cUx5LDfvXJK6P6EDtTygwCDoE-OaaJ6_nsYD0fLl_DWOMb2nAW1TdZx4hjcPu4IBYm8-SiI0K3dMfAQdaX-zx7C_PH_tHcV1vOiqYmvabkMrcXGGhroUKtG1LWv7MNaRnfcYJR9BTZ7jqyKIgYvX0Eu-UnEMhl4ez3KqIFYNzU8m35EI-XMPRNAFfZe3d4zPFPGSqaXrf_hBS0HTEXa5M4fIcnAdJp_iGky2s7tNAlorJIRoSvjZFdTplPqWD2tM9171MHFhQIiDfdbs2VVD8N9rRIbANCsuwygwddIzRlBMxvz8d4RMcgCgPMAE"
    ],
    "photoId": null,
    "supplyChainInfo": {},
    "outerItemId": null,
    "verifyMode": [],
    "itemRemark": null,
    "skuList": [
        {
            "skuMarketPrice": 21100,
            "skuSalePrice": 100,
            "skuStock": 11,
            "outerSkuId": "1",
            "skuId": 100000972610658,
            "skuSpecifications": [],
            "skuExtAttrInfo": {
                "skuDinersCount": {
                    "lowestPeopleNum": null,
                    "highestPeopleNum": null
                },
                "skuSetMealDetail": {
                    "groups": [
                        {
                            "title": "套餐分组名称1",
                            "selectNum": 1,
                            "fromNum": 2,
                            "setMealContents": [
                                {
                                    "title": "套餐名称1",
                                    "count": 1,
                                    "price": 10000,
                                    "serviceDuration": 0
                                },
                                {
                                    "title": "套餐名称2",
                                    "count": 2,
                                    "price": 1200,
                                    "serviceDuration": 0
                                }
                            ]
                        },
                        {
                            "title": "套餐分组名称2",
                            "selectNum": 1,
                            "fromNum": 2,
                            "setMealContents": [
                                {
                                    "title": "套餐名称3",
                                    "count": 1,
                                    "price": 1200,
                                    "serviceDuration": 0
                                },
                                {
                                    "title": "套餐名4",
                                    "count": 1,
                                    "price": 11100,
                                    "serviceDuration": 0
                                }
                            ]
                        }
                    ],
                    "remark": "备注备注"
                }
            }
        }
    ],
    "packagePriceType": 1,
    "imageTextDetailList": [
        {
            "imgUrl": "",
            "desc": "11112"
        }
    ],
    "poiIdList": [],
    "showItemInfo": null,
    "salesChannelsType": 1,
    "startSellingTimeV2": 1716301464458,
    "defaultAuditApprovalTime": null,
    "endSellingTime": 1717165438806,
    "expireAutoDelay": null,
    "enableDistribution": true,
    "supportUpdateOuterFlag": true,
}

export const preData = {
    "itemId": 100000916460658,
    "categoryId": 20100009,
    "itemTypeCode": 1,
    "itemTitle": "123456789",
    "itemCarouselUrls": [
        "https://im-kim.staging.kuaishou.com/gateway/pc/unified/common/file/safe?bizType=locallife_item_photo&timestamp=1716367294560&ticket=Ciprd2Fpc2hvcC51bmlmaWVkLnNhZmUubG9jYWxsaWZlX2l0ZW1fcGhvdG8S4AHs13h-vwZnO66v5KMk5pbhXJofvkZv59UXa8oezNGSsUidBqOMRVL0CWZYtH-cUx5LDfvXJK6P6EDtTygwCDoE-OaaJ6_nsYD0fLl_DWOMb2nAW1TdZx4hjcPu4IBYm8-SiI0K3dMfAQdaX-zx7C_PH_tHcV1vOiqYmvabkMrcXGGhroUKtG1LWv7MNaRnfcYJR9BTZ7jqyKIgYvX0Eu-UnEMhl4ez3KqIFYNzU8m35EI-XMPRNAFfZe3d4zPFPGSqaXrf_hBS0HTEXa5M4fIcnAdJp_iGky2s7tNAlorJIRoSvjZFdTplPqWD2tM9171MHFhQIiDfdbs2VVD8N9rRIbANCsuwygwddIzRlBMxvz8d4RMcgCgPMAE"
    ],
    "photoId": null,
    "supplyChainInfo": {},
    "outerItemId": null,
    "verifyMode": [],
    "itemRemark": null,
    "skuList": [
        {
            "priceAndStockSource": 0,
            "skuSalePrice": 100,
            "skuStatus": 1,
            "skuStock": 11,
            "todayStock": 0,
            "outerSkuId": "1",
            "todayMarketPrice": 0,
            "todaySinglePrice": 0,
            "calendarPriceStock": [],
            "skuId": 100000972610658,
            "skuMarketPrice": 100,
            "skuSpecifications": [],
            "storeCode": 0
        }
    ],
    "packagePriceType": 1,
    "imageTextDetailList": [
        {
            "imgUrl": "",
            "desc": "11112"
        }
    ],
    "poiIdList": [],
    "showItemInfo": null,
    "salesChannelsType": 1,
    "startSellingTimeV2": 1716301464458,
    "defaultAuditApprovalTime": null,
    "endSellingTime": 1717165438806,
    "expireAutoDelay": null,
    "enableDistribution": true,
    "supportUpdateOuterFlag": true,
}

export const sourceJsonMap: SourceJsonItem[] = [
    {
        dataIndex: 'itemTitle',
        title: '商品标题',
    },
    {
        dataIndex: 'itemCarouselUrls',
        title: '商品图片',
        margeDiff: true,
        // render: (valData, item) => {
        //     return valData?.map((img) => < img key={img} className={cx(['img-item'])} src={img} />);
        // },
    },
    {
        dataIndex: 'imageTextDetailList',
        title: '图文详情',
        margeDiff: true,
        // render: (valData, item) => {
        //     console.log(valData, '🌈-----生生世世生生世世');
        //     return (
        //         <>
        //             {valData?.map((val, valIndex) => {
        //                 return (
        //                     <div key={valIndex}>
        //                         {val?.imgUrl && < img className={cx(['img-item'])} src={val?.imgUrl} />}
        //                         {val?.desc && <p>{val?.desc}</p >}
        //                     </div>
        //                 );
        //             })}
        //         </>
        //     );
        // },
    },
    {
        dataIndex: 'supplyChainInfo',
        title: '服务商信息',
        handelDiff: (oldData, newData) => {
            let idDiff = oldData?.supplyChainId !== newData?.supplyChainId;
            return idDiff;
        },
        // render: (valData, item) => {
        //     return (
        //         <>
        //             {valData?.supplyChainId && (
        //                 <p>
        //                     {valData?.supplyChainName}：{valData?.supplyChainId}
        //                 </p >
        //             )}
        //         </>
        //     );
        // },
    },
    {
        dataIndex: 'outerItemId',
        title: '商家产品编码',
    },
    {
        dataIndex: 'verifyMode',
        title: '核销方式',
        margeDiff: true,
        // childrenSourceJson: [
        //     {
        //         dataIndex: 'valData',
        //         title: '核销方式',
        //     },
        //     {
        //         dataIndex: 'valData',
        //         title: '核销方式',
        //     },
        // ]
        // render: (valData, item) => {
        //     return (
        //         <>
        //             {valData?.map((val, index) => {
        //                 return (
        //                     <div key={index}>
        //                         <p>
        //                             核销方式{index + 1}：
        //                             {VerifyModeOptions?.find((m, n) => m.value == val.valData)?.label}
        //                         </p >
        //                         {!!val?.deviceList?.length && (
        //                             <>
        //                                 <p className={cx(['size-small'])}>
        //                                     {val?.deviceList?.map?.((m, n) => (
        //                                         <p key={n}>
        //                                             {m.deviceName}（操作键位：
        //                                             {m?.keyPosition?.map?.((k, ki) => (
        //                                                 <span key={ki}>{k.keyName} | </span>
        //                                             ))}
        //                                             ）
        //                                         </p >
        //                                     ))}
        //                                 </p >
        //                             </>
        //                         )}
        //                         {!!val?.guideInfo?.infoId && (
        //                             <>
        //                                 <p className={cx(['size-small'])}>核销引导图文ID：{val?.guideInfo?.infoId}</p >
        //                             </>
        //                         )}
        //                     </div>
        //                 );
        //             })}
        //         </>
        //     );
        // },
    },

    {
        dataIndex: 'skuList',
        title: 'sku列表',
        margeDiff: true,
        childrenSourceJson: [
            {
                dataIndex: 'calendarPriceStock',
                title: '日历价格库存',
            },
            {
                dataIndex: 'outerSkuId',
                title: '商家系统SKU编码',
            },
            {
                dataIndex: 'priceAndStockSource',
                title: '价格和库存来源',
                handelDiff: () => false,
            },
            {
                dataIndex: 'skuId',
                title: '快手SKU ID',
            },
            {
                dataIndex: 'skuMarketPrice',
                title: '门市价（元）',
            },
            {
                dataIndex: 'skuSalePrice',
                title: '团购价（元）',
            },
            {
                dataIndex: 'skuSpecifications',
                title: '规格属性',
                // handelDiff: () => false,
                ignoreField: true,
            },
            {
                dataIndex: 'skuStatus',
                handelDiff: () => false,
            },
            {
                dataIndex: 'skuStock',
                title: '库存',
            },
            {
                dataIndex: 'storeCode',
                handelDiff: () => false,
            },
            {
                dataIndex: 'todayMarketPrice',
                handelDiff: () => false,
            },
            {
                dataIndex: 'todaySinglePrice',
                handelDiff: () => false,
            },
            {
                dataIndex: 'todayStock',
                handelDiff: () => false,
            },
            {
                dataIndex: 'skuExtAttrInfo',
                margeDiff: true,
                childrenSourceJson: [
                    {
                        dataIndex: 'skuDinersCount',
                        title: '就餐',
                        childrenSourceJson: [
                            {
                                dataIndex: 'lowestPeopleNum',
                                title: '最少人数',
                            },
                            {
                                dataIndex: 'highestPeopleNum',
                                title: '最大人数',
                            },
                        ],
                    },
                    {
                        dataIndex: 'skuSetMealDetail',
                        title: '套餐详情',
                        margeDiff: true,
                        childrenSourceJson: [
                            {
                                dataIndex: 'availableTimes',
                                title: '可用时间',
                            },
                            {
                                dataIndex: 'singleTimesPrice',
                                title: '单次售价',
                            },
                            {
                                dataIndex: 'remark',
                                title: '备注',
                            },
                            {
                                dataIndex: 'groups',
                                title: '套餐组',
                                margeDiff: true,
                                // 合并子集diff结果
                                childrenSourceJson: [
                                    {
                                        dataIndex: 'title',
                                        title: '套餐组名称',
                                    },
                                    {
                                        dataIndex: 'selectNum',
                                        title: '可选数量',
                                    },
                                    {
                                        dataIndex: 'fromNum',
                                        title: '总数量',
                                    },
                                    {
                                        dataIndex: 'setMealContents',
                                        title: '单品',
                                        margeDiff: true,
                                        childrenSourceJson: [
                                            {
                                                dataIndex: 'unit',
                                                title: '售卖单位',
                                            },
                                            {
                                                dataIndex: 'title',
                                                title: '单品名称',
                                            },
                                            {
                                                dataIndex: 'count',
                                                title: '份数',
                                            },
                                            {
                                                dataIndex: 'price',
                                                title: '单价',
                                            },
                                            {
                                                dataIndex: 'serviceDuration',
                                                title: '服务时长',
                                            },
                                            {
                                                dataIndex: 'subContents',
                                                title: '服务内容',
                                            },
                                        ],
                                    },
                                ],
                            },
                        ],
                    },
                ],
            },
        ],
    },
];