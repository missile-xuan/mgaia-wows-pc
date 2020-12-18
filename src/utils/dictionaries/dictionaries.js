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
  ] 
}
export default { get(name) { return dictionariesMap[name] } }