//----------------------  以下由程序自动生成  --------------------------
//-- 创建时间：2020-11-25 10:05:55
//-- 功能：字典项维护

const dictionariesMap = { 
  EnableStatus: [{ label: "启用", value: "True" }, { label: "禁用", value: "False" }], 
  Server:[
    { label: "欧服", value: "eu" },
    { label: "亚服", value: "asia" },
    { label: "美服", value: "com" },
    { label: "俄服", value: "ru" },
  ],
  NationList:[
    {label:"ALL",value:""},
    {label:"苏联",value:"ussr"},
    {label:"美国",value:"usa"},
    {label:"英国",value:"uk"},
    {label:"泛亚",value:"pan_asia"},
    {label:"泛美",value:"pan_america"},
    {label:"日本",value:"japan"},
    {label:"意大利",value:"italy"},
    {label:"德国",value:"germany"},
    {label:"法国",value:"france"},
    {label:"欧洲",value:"europe"},
    {label:"英联邦",value:"commonwealth"},
  ],
  ShipTypeList:[
    {label:"ALL",value:""},
    {label:"航母",value:"AirCarrier"},
    {label:"战列",value:"Battleship"},
    {label:"巡洋",value:"Cruiser"},
    {label:"驱逐",value:"Destroyer"}      
  ],
  ShowItemList:[
    "场次",
    '胜利',
    'K/D',
    "经验",
    "场均",
    "命中"
  ]
}
export default { get(name) { return dictionariesMap[name] } }