//----------------------  以下由程序自动生成  --------------------------
//-- 创建时间：2020-11-25 10:05:55
//-- 功能：字典项维护

const dictionariesMap = {EnableStatus:[{label:"启用",value:"True"},{label:"禁用",value:"False"}],FileUploadStatus:[{label:"临时",value:"Temp"},{label:"永久",value:"Used"}],QuotationStatus:[{label:"持平",value:"Flat"},{label:"小涨",value:"SmallRise"},{label:"大涨",value:"BigRise"},{label:"小跌",value:"SmallFall"},{label:"大跌",value:"BigFall"}],IndexType:[{label:"数字类型",value:"Number"},{label:"文本类型",value:"String"}]}
export default {get(name) {return dictionariesMap[name]}}